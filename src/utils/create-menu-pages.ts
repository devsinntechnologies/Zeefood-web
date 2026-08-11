import type { MenuCategory, MenuPageData } from "@/types/qr-menu.types";

const MAX_ITEMS_PER_PAGE = 8;
const IDEAL_ITEMS_PER_PAGE = 7;

// Splits categories into one-page-at-a-time menu pages. Categories stay
// together on their own page(s) rather than mixing dishes from different
// categories on one page. A category with more than MAX_ITEMS_PER_PAGE items
// spills onto a following page (still labelled with the same category name)
// instead of forcing everything to fit.
export function createMenuPages(categories: MenuCategory[]): MenuPageData[] {
  const pages: MenuPageData[] = [];

  categories.forEach((category) => {
    if (category.items.length === 0) return;

    if (category.items.length <= MAX_ITEMS_PER_PAGE) {
      pages.push({
        pageNumber: 0,
        categoryId: category.id,
        categoryName: category.name,
        items: category.items,
      });
      return;
    }

    for (let start = 0; start < category.items.length; start += IDEAL_ITEMS_PER_PAGE) {
      pages.push({
        pageNumber: 0,
        categoryId: category.id,
        categoryName: category.name,
        items: category.items.slice(start, start + IDEAL_ITEMS_PER_PAGE),
      });
    }
  });

  return pages.map((page, index) => ({ ...page, pageNumber: index + 1 }));
}
