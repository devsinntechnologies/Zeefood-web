import { API_BASE_URL, BUSINESS_ID } from "@/lib/api";

export async function GET(
  request: Request,
  context: { params: Promise<{ tableId: string }> },
) {
  const { tableId } = await context.params;
  const incoming = new URL(request.url);
  const businessId = incoming.searchParams.get("businessId") || BUSINESS_ID;

  try {
    const upstream = new URL(`${API_BASE_URL}/public/self-orders/table/${tableId}`);
    upstream.searchParams.set("businessId", businessId);

    const storefrontOrigin = request.headers.get("origin");
    const response = await fetch(upstream, {
      headers: {
        Accept: "application/json",
        ...(storefrontOrigin
          ? { "X-Storefront-Origin": storefrontOrigin }
          : {}),
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Failed to load table:", error);
    return Response.json(
      { success: false, message: "Failed to load table" },
      { status: 502 },
    );
  }
}
