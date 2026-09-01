// ─── Products API Service ─────────────────────────────────────────────────────
// Centralised API calls with proper error handling and request cancellation.

import { API_BASE_URL, BUSINESS_ID } from "@/lib/api";
import type { ProductsApiResponse, ProductsQueryParams } from "./types";

export { BUSINESS_ID };

const PRODUCTS_PATH = "/public/products";

function productsUrl(params: Record<string, string | number | undefined>): string {
  const qs = buildQueryString({
    businessId: params.businessId || BUSINESS_ID,
    ...params,
  });
  return `${API_BASE_URL}${PRODUCTS_PATH}?${qs}`;
}

/**
 * Converts a params object into a URLSearchParams string,
 * filtering out undefined / empty values.
 */
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      qs.set(key, String(value));
    }
  }
  return qs.toString();
}

/**
 * Fetch products from the DRM public products API.
 *
 * @param params   - businessId, optional search, category, page, limit
 * @param signal   - AbortSignal from createAsyncThunk for request cancellation
 */
export async function fetchProductsApi(
  params: ProductsQueryParams,
  signal?: AbortSignal
): Promise<ProductsApiResponse> {
  const qs = buildQueryString({
    businessId: params.businessId || BUSINESS_ID,
    search: params.search,
    category: params.category,
    page: params.page ?? 1,
    limit: params.limit ?? 100,
  });

  const url =
    typeof window === "undefined"
      ? productsUrl({
          businessId: params.businessId || BUSINESS_ID,
          search: params.search,
          category: params.category,
          page: params.page ?? 1,
          limit: params.limit ?? 100,
        })
      : `/api/products?${qs}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    signal,
    // Next.js 15+ cache control
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Products API error: ${response.status} ${response.statusText}`
    );
  }

  const json: ProductsApiResponse = await response.json();

  if (!json.success) {
    throw new Error(json.message ?? "Unknown API error");
  }

  return json;
}
