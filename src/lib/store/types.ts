// ─── API Response Types (matching drm.devsinntechnologies.com) ───────────────

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  CategoryName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sortOrder: number;
  inStock: number;
  status: "ACTIVE" | "INACTIVE";
  image: string | null;
  categoryId: string;
  category: ProductCategory;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiMeta {
  requestId: string;
  timestamp: string;
  executionTime: string;
  path: string;
  method: string;
  userId: string | null;
}

export interface ProductsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Product[];
  pagination: Pagination;
  meta: ApiMeta;
}

// ─── Query Parameters ─────────────────────────────────────────────────────────

export interface ProductsQueryParams {
  businessId: string;
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

// ─── Redux State Types ────────────────────────────────────────────────────────

export type FetchStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProductsState {
  items: Product[];
  categories: string[];               // unique category names derived from data
  status: FetchStatus;
  error: string | null;
  pagination: Pagination | null;
  activeCategory: string;
  searchQuery: string;
  lastFetched: number | null;          // epoch ms — for cache invalidation
  lastFetchedBusinessId: string | null;
}
