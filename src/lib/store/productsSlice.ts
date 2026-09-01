// ─── Products Slice ───────────────────────────────────────────────────────────
// Manages all product data fetched from drm.devsinntechnologies.com

import {
  createSlice,
  createAsyncThunk,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchProductsApi, BUSINESS_ID } from "./productsApi";
import type {
  ProductsState,
  ProductsQueryParams,
  Product,
} from "./types";
import type { RootState } from "./store";

// ─── Cache TTL (5 minutes) ────────────────────────────────────────────────────
const CACHE_TTL_MS = 5 * 60 * 1000;

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState: ProductsState = {
  items: [],
  categories: [],
  status: "idle",
  error: null,
  pagination: null,
  activeCategory: "All",
  searchQuery: "",
  lastFetched: null,
  lastFetchedBusinessId: null,
};

// ─── Async Thunk: fetchProducts ───────────────────────────────────────────────
export const fetchProducts = createAsyncThunk<
  { data: Product[]; categories: string[]; total: number; page: number; limit: number; totalPages: number },
  Partial<ProductsQueryParams> | undefined,
  { state: RootState; rejectValue: string }
>(
  "products/fetchAll",
  async (params, { getState, signal, rejectWithValue }) => {
    // ── Cache guard: skip refetch if data is fresh ──
    const { lastFetched, lastFetchedBusinessId, status } = getState().products;
    const businessId = params?.businessId || BUSINESS_ID;
    const now = Date.now();
    if (
      status === "succeeded" &&
      lastFetched &&
      lastFetchedBusinessId === businessId &&
      now - lastFetched < CACHE_TTL_MS &&
      !params?.search &&
      !params?.category
    ) {
      // Return existing data so no network call is made
      const existing = getState().products;
      return {
        data: existing.items,
        categories: existing.categories,
        total: existing.pagination?.total ?? 0,
        page: existing.pagination?.page ?? 1,
        limit: existing.pagination?.limit ?? 100,
        totalPages: existing.pagination?.totalPages ?? 1,
      };
    }

    try {
      const response = await fetchProductsApi(
        { ...params, businessId },
        signal
      );

      // Derive unique category names from the data
      const categories = [
        "All",
        ...Array.from(
          new Set(
            response.data
              .map((p) => p.category?.CategoryName)
              .filter(Boolean)
          )
        ),
      ] as string[];

      return {
        data: response.data,
        categories,
        total: response.pagination.total,
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalPages: response.pagination.totalPages,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.activeCategory = "All";
      state.searchQuery = "";
    },
    invalidateCache(state) {
      state.lastFetched = null;
      state.lastFetchedBusinessId = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.categories = action.payload.categories;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
        };
        state.lastFetched = Date.now();
        state.lastFetchedBusinessId = action.meta.arg?.businessId || BUSINESS_ID;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // Don't change status to failed if the request was cancelled (unmount)
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error = action.payload ?? "Failed to load products.";
      });
  },
});

export const {
  setActiveCategory,
  setSearchQuery,
  resetFilters,
  invalidateCache,
} = productsSlice.actions;

export default productsSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

const selectProductsState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
  selectProductsState,
  (s) => s.items
);

export const selectProductsStatus = createSelector(
  selectProductsState,
  (s) => s.status
);

export const selectProductsError = createSelector(
  selectProductsState,
  (s) => s.error
);

export const selectCategories = createSelector(
  selectProductsState,
  (s) => s.categories
);

export const selectActiveCategory = createSelector(
  selectProductsState,
  (s) => s.activeCategory
);

export const selectSearchQuery = createSelector(
  selectProductsState,
  (s) => s.searchQuery
);

export const selectPagination = createSelector(
  selectProductsState,
  (s) => s.pagination
);

const SEARCH_ALIASES: Record<string, string[]> = {
  biryani: ["biryani", "بریانی", "briyani", "biryanee"],
  "بریانی": ["biryani", "بریانی", "briyani", "biryanee"],
  samosa: ["samosa", "samosay", "samosa chaat", "سموسے", "سموسہ"],
  samosay: ["samosa", "samosay", "samosa chaat", "سموسے", "سموسہ"],
  "سموسے": ["samosa", "samosay", "samosa chaat", "سموسے", "سموسہ"],
  "gol gappay": ["gol gappay", "gol gappy", "golgappy", "gol gappe", "گول گپے"],
  golgappy: ["gol gappay", "gol gappy", "golgappy", "gol gappe", "گول گپے"],
  "گول گپے": ["gol gappay", "gol gappy", "golgappy", "gol gappe", "گول گپے"],
  chutni: ["chutni", "chatni", "chutney", "چٹنی"],
  chatni: ["chutni", "chatni", "chutney", "چٹنی"],
  "چٹنی": ["chutni", "chatni", "chutney", "چٹنی"],
  kabab: ["kabab", "kebab", "seekh kabab", "seekh kebab", "کباب"],
  kebab: ["kabab", "kebab", "seekh kabab", "seekh kebab", "کباب"],
  "کباب": ["kabab", "kebab", "seekh kabab", "seekh kebab", "کباب"],
  "dahi bhallay": ["dahi bhallay", "dahi bhalla", "dahi baray", "دہی بھلے"],
  "دہی بھلے": ["dahi bhallay", "dahi bhalla", "dahi baray", "دہی بھلے"],
  "dal chawal": ["dal chawal", "daal chawal", "dal rice", "دال چاول"],
  "دال چاول": ["dal chawal", "daal chawal", "dal rice", "دال چاول"],
  nuggets: ["nuggets", "nugits", "chicken nuggets", "نگٹس", "نِگٹس"],
  "نِگٹس": ["nuggets", "nugits", "chicken nuggets", "نگٹس", "نِگٹس"],
};

function searchTerms(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return Array.from(new Set([q, ...(SEARCH_ALIASES[q] ?? [])])).map((term) =>
    term.toLowerCase()
  );
}

/** Memoised selector: returns products filtered by activeCategory + searchQuery */
export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectActiveCategory,
  selectSearchQuery,
  (items, category, query) => {
    return items.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category?.CategoryName?.toLowerCase() === category.toLowerCase();

      const terms = searchTerms(query);
      const haystack = [
        product.name,
        product.category?.CategoryName,
        ...Object.entries(SEARCH_ALIASES)
          .filter(([, aliases]) =>
            aliases.some((alias) =>
              `${product.name} ${product.category?.CategoryName ?? ""}`.toLowerCase().includes(alias.toLowerCase())
            )
          )
          .flatMap(([key, aliases]) => [key, ...aliases]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        terms.length === 0 || terms.some((term) => haystack.includes(term));

      return matchesCategory && matchesSearch;
    });
  }
);

/** Select a single product by id */
export const selectProductById = (id: string) =>
  createSelector(selectAllProducts, (items) =>
    items.find((p) => p.id === id) ?? null
  );
