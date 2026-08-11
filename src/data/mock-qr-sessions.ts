import type { QRSession } from "@/types/qr-menu.types";

// Mock token -> table lookup. Each printed table QR encodes an opaque token
// like this instead of a readable table number, so the URL never reveals
// which table it belongs to.
//
// Later, getMockSession(token) will be replaced with a real
// validateQRToken(token) API call that checks the token server-side.
const mockSessions: Record<string, QRSession> = {
  a8F29xQp71Km: { tableNumber: "08" },
  f91Ks82LmQ4Z: { tableNumber: "03" },
  Zt4nQwE7xR2v: { tableNumber: "12" },
  p6Bd0LxV93Wk: { tableNumber: "05" },
  Hk28mYtR5qXs: { tableNumber: "01" },
};

export function getMockSession(token: string): QRSession | null {
  return mockSessions[token] ?? null;
}

export const mockTokensForDemo = Object.keys(mockSessions);
