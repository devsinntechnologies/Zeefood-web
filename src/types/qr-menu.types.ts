// Types for the standalone QR table menu experience.
// Mock implementations of the lookup functions in data/ will later be swapped
// for real API calls without any of these shapes needing to change.

export interface QRSession {
  tableNumber: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuPageData {
  pageNumber: number;
  categoryId: string;
  categoryName: string;
  items: MenuItem[];
}

export interface QRCartLine {
  item: MenuItem;
  quantity: number;
  note?: string;
}
