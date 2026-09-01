import { API_BASE_URL, BUSINESS_ID } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ success: false, message: "Invalid order payload" }, { status: 400 });
  }

  try {
    const storefrontOrigin = request.headers.get("origin");
    const response = await fetch(`${API_BASE_URL}/public/self-orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(storefrontOrigin
          ? { "X-Storefront-Origin": storefrontOrigin }
          : {}),
      },
      body: JSON.stringify({
        ...body,
        businessId: body.businessId || BUSINESS_ID,
      }),
    });

    const data = await response.json().catch(() => ({}));
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Failed to submit self-order:", error);
    return Response.json(
      { success: false, message: "Failed to submit table order" },
      { status: 502 },
    );
  }
}
