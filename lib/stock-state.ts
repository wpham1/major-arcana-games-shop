// The four stock states DESIGN.md shows on every tile. Kept free of database
// imports so client components can use it too.

export type StockState = "in_stock" | "low_stock" | "preorder" | "sold_out";

export const LOW_STOCK_THRESHOLD = 5;

export function getStockState(stock: number, isPreorder: boolean): StockState {
  // A pre-order whose allocation has run out is sold out like anything else.
  if (stock <= 0) return "sold_out";
  if (isPreorder) return "preorder";
  return stock <= LOW_STOCK_THRESHOLD ? "low_stock" : "in_stock";
}
