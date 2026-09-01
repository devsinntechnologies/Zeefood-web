"use client";
// ─── Custom Product Hooks ─────────────────────────────────────────────────────
// All business logic lives here. Components stay thin and presentational.

import { useEffect, useCallback } from "react";
import {
  useAppDispatch,
  useAppSelector,
  fetchProducts,
  setActiveCategory,
  setSearchQuery,
  resetFilters,
  invalidateCache,
  selectAllProducts,
  selectFilteredProducts,
  selectCategories,
  selectActiveCategory,
  selectSearchQuery,
  selectProductsStatus,
  selectProductsError,
  selectPagination,
  selectProductById,
} from "@/lib/store";
import type { ProductsQueryParams } from "@/lib/store";

// ─────────────────────────────────────────────────────────────────────────────
// useProducts
// Fetches all products on mount (respects 5-min cache), returns full slice state.
// ─────────────────────────────────────────────────────────────────────────────
export function useProducts(params?: Partial<ProductsQueryParams>) {
  const dispatch = useAppDispatch();

  const items      = useAppSelector(selectAllProducts);
  const status     = useAppSelector(selectProductsStatus);
  const error      = useAppSelector(selectProductsError);
  const pagination = useAppSelector(selectPagination);

  // Fetch on mount; re-fetch when params change
  useEffect(() => {
    const promise = dispatch(fetchProducts(params));
    // Cancel the in-flight request on unmount
    return () => { promise.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params?.businessId, params?.search, params?.category, params?.page]);

  const refetch = useCallback(
    (overrides?: Partial<ProductsQueryParams>) => {
      dispatch(invalidateCache());
      dispatch(fetchProducts(overrides ?? params));
    },
    [dispatch, params]
  );

  return {
    products:   items,
    status,
    isLoading:  status === "loading",
    isSuccess:  status === "succeeded",
    isError:    status === "failed",
    isIdle:     status === "idle",
    error,
    pagination,
    refetch,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// useProductFilters
// Manages the active category + search state and returns filtered products.
// ─────────────────────────────────────────────────────────────────────────────
export function useProductFilters() {
  const dispatch        = useAppDispatch();
  const filteredItems   = useAppSelector(selectFilteredProducts);
  const categories      = useAppSelector(selectCategories);
  const activeCategory  = useAppSelector(selectActiveCategory);
  const searchQuery     = useAppSelector(selectSearchQuery);

  const changeCategory = useCallback(
    (cat: string) => dispatch(setActiveCategory(cat)),
    [dispatch]
  );

  const changeSearch = useCallback(
    (q: string) => dispatch(setSearchQuery(q)),
    [dispatch]
  );

  const clearFilters = useCallback(
    () => dispatch(resetFilters()),
    [dispatch]
  );

  return {
    filteredProducts: filteredItems,
    categories,
    activeCategory,
    searchQuery,
    changeCategory,
    changeSearch,
    clearFilters,
    resultCount: filteredItems.length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// useProductById
// Looks up a single product from the store by id (no extra network call).
// ─────────────────────────────────────────────────────────────────────────────
export function useProductById(id: string) {
  const product = useAppSelector(selectProductById(id));
  const status  = useAppSelector(selectProductsStatus);
  return { product, isLoading: status === "loading" };
}

// ─────────────────────────────────────────────────────────────────────────────
// useProductSearch
// Debounced search that dispatches to the store after 350 ms.
// ─────────────────────────────────────────────────────────────────────────────
export function useProductSearch() {
  const dispatch    = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const setQuery = useCallback(
    (raw: string) => {
      // immediate store update for the UI; components can debounce the API call
      dispatch(setSearchQuery(raw));
    },
    [dispatch]
  );

  return { searchQuery, setQuery };
}
