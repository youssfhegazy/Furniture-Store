// Mock data + types for the admin dashboard.
// Kept as pure data (no React) so it can be swapped for MongoDB-backed API
// calls later — each export mirrors a likely collection shape.

import { shopProducts, categories, categoryCount, type ShopProduct } from "./data";

/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatMoney = (n: number) => usd.format(n);

export const formatCompact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/* -------------------------------------------------------------------------- */
/*  Orders                                                                     */
/* -------------------------------------------------------------------------- */

export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "In Production",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string; // ISO date
  amount: number;
  items: number;
  status: OrderStatus;
  product: string; // headline item, for quick scanning
};

// A spread of realistic furniture orders across every status.
export const orders: Order[] = [
  { id: "ORD-1042", customer: "Layla Hassan", email: "layla.hassan@gmail.com", date: "2026-06-18", amount: 1240, items: 2, status: "Delivered", product: "Plush Bed Set" },
  { id: "ORD-1041", customer: "Omar Khalil", email: "o.khalil@outlook.com", date: "2026-06-18", amount: 540, items: 1, status: "Shipped", product: "Walnut Dining Set" },
  { id: "ORD-1040", customer: "Nour Mansour", email: "nour.mansour@gmail.com", date: "2026-06-17", amount: 2360, items: 4, status: "In Production", product: "Sectional Living Set" },
  { id: "ORD-1039", customer: "Karim Aboul", email: "karim.aboul@gmail.com", date: "2026-06-17", amount: 320, items: 1, status: "Processing", product: "Velvet Wing Chair" },
  { id: "ORD-1038", customer: "Aisha Saleh", email: "aisha.saleh@icloud.com", date: "2026-06-16", amount: 180, items: 1, status: "Pending", product: "Round Wicker Chair" },
  { id: "ORD-1037", customer: "Hassan Ali", email: "hassan.ali@gmail.com", date: "2026-06-16", amount: 980, items: 3, status: "Delivered", product: "Oak Dining Table" },
  { id: "ORD-1036", customer: "Rania Habib", email: "rania.habib@gmail.com", date: "2026-06-15", amount: 480, items: 1, status: "In Production", product: "Cozy Bed Frame" },
  { id: "ORD-1035", customer: "Bilal Hamdan", email: "bilal.hamdan@gmail.com", date: "2026-06-15", amount: 75, items: 1, status: "Cancelled", product: "Ceramic Table Lamp" },
  { id: "ORD-1034", customer: "Yasmin Darwish", email: "yasmin.darwish@gmail.com", date: "2026-06-14", amount: 1320, items: 2, status: "Shipped", product: "Rattan Lounge Set" },
  { id: "ORD-1033", customer: "Tariq Mahmoud", email: "tariq.mahmoud@gmail.com", date: "2026-06-14", amount: 250, items: 1, status: "Processing", product: "Garden Bench" },
  { id: "ORD-1032", customer: "Mona Farouk", email: "mona.farouk@gmail.com", date: "2026-06-13", amount: 640, items: 2, status: "Delivered", product: "Midnight Velvet Sofa" },
  { id: "ORD-1031", customer: "Walid Sharif", email: "walid.sharif@gmail.com", date: "2026-06-13", amount: 210, items: 1, status: "Pending", product: "Ergo Office Chair" },
  { id: "ORD-1030", customer: "Hana Mostafa", email: "hana.mostafa@gmail.com", date: "2026-06-12", amount: 1890, items: 3, status: "In Production", product: "Master Bedroom Suite" },
  { id: "ORD-1029", customer: "Khaled Nasser", email: "khaled.nasser@gmail.com", date: "2026-06-12", amount: 420, items: 1, status: "Shipped", product: "Cloud Linen Sofa" },
  { id: "ORD-1028", customer: "Sahar Othman", email: "sahar.othman@gmail.com", date: "2026-06-11", amount: 160, items: 1, status: "Delivered", product: "Glass Coffee Table" },
];

/* -------------------------------------------------------------------------- */
/*  Customers                                                                  */
/* -------------------------------------------------------------------------- */

export type Customer = {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  spent: number;
  joined: string;
  status: "Active" | "New" | "VIP";
};

export const customers: Customer[] = [
  { id: "CUS-204", name: "Layla Hassan", email: "layla.hassan@gmail.com", location: "Cairo, Egypt", orders: 12, spent: 8420, joined: "2024-02-11", status: "VIP" },
  { id: "CUS-203", name: "Omar Khalil", email: "o.khalil@outlook.com", location: "Dubai, UAE", orders: 7, spent: 3110, joined: "2024-05-03", status: "Active" },
  { id: "CUS-202", name: "Nour Mansour", email: "nour.mansour@gmail.com", location: "Riyadh, Saudi Arabia", orders: 9, spent: 5240, joined: "2024-01-22", status: "VIP" },
  { id: "CUS-201", name: "Karim Aboul", email: "karim.aboul@gmail.com", location: "Amman, Jordan", orders: 3, spent: 980, joined: "2025-09-14", status: "Active" },
  { id: "CUS-200", name: "Aisha Saleh", email: "aisha.saleh@icloud.com", location: "Doha, Qatar", orders: 1, spent: 180, joined: "2026-06-02", status: "New" },
  { id: "CUS-199", name: "Hassan Ali", email: "hassan.ali@gmail.com", location: "Jeddah, Saudi Arabia", orders: 6, spent: 4120, joined: "2024-08-19", status: "Active" },
  { id: "CUS-198", name: "Rania Habib", email: "rania.habib@gmail.com", location: "Beirut, Lebanon", orders: 4, spent: 1760, joined: "2025-03-27", status: "Active" },
  { id: "CUS-197", name: "Yasmin Darwish", email: "yasmin.darwish@gmail.com", location: "Abu Dhabi, UAE", orders: 2, spent: 1540, joined: "2026-04-09", status: "New" },
];

/* -------------------------------------------------------------------------- */
/*  Dashboard analytics                                                        */
/* -------------------------------------------------------------------------- */

export const monthlyRevenue: { month: string; revenue: number }[] = [
  { month: "Jul", revenue: 32400 },
  { month: "Aug", revenue: 28900 },
  { month: "Sep", revenue: 41200 },
  { month: "Oct", revenue: 38600 },
  { month: "Nov", revenue: 52800 },
  { month: "Dec", revenue: 61400 },
  { month: "Jan", revenue: 44700 },
  { month: "Feb", revenue: 39800 },
  { month: "Mar", revenue: 47300 },
  { month: "Apr", revenue: 51900 },
  { month: "May", revenue: 58200 },
  { month: "Jun", revenue: 49600 },
];

// Sales split by room category — colours chosen to sit in the warm palette.
export const salesByCategory: { name: string; value: number; color: string }[] = [
  { name: "Living Room", value: 38, color: "#d97706" }, // amber-600
  { name: "Bedroom", value: 24, color: "#b08968" }, // wood
  { name: "Kitchen", value: 16, color: "#2c4a43" }, // brand teal
  { name: "Office", value: 12, color: "#a16207" }, // amber-700
  { name: "Outdoor", value: 6, color: "#78716c" }, // stone-500
  { name: "Decor", value: 4, color: "#e0a82e" }, // brand gold
];

const LOW_STOCK_THRESHOLD = 8;

// Derive headline figures from real product data where it makes sense.
export const dashboardStats = {
  revenue: monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0),
  revenueDelta: 12.4,
  orders: 1284,
  ordersDelta: 8.2,
  products: shopProducts.length,
  productsDelta: 3.1,
  lowStock: shopProducts.filter((p) => !p.inStock).length + 5,
  lowStockDelta: -2,
};

/* -------------------------------------------------------------------------- */
/*  Products (admin view)                                                      */
/* -------------------------------------------------------------------------- */

export type StockState = "In Stock" | "Low Stock" | "Out of Stock";

export type AdminProduct = ShopProduct & {
  stock: number;
  stockState: StockState;
};

// Attach a synthetic stock count so the table can show real status badges.
export const adminProducts: AdminProduct[] = shopProducts.map((p, i) => {
  const stock = p.inStock ? ((i * 7 + 3) % 40) + 1 : 0;
  const stockState: StockState =
    stock === 0 ? "Out of Stock" : stock <= LOW_STOCK_THRESHOLD ? "Low Stock" : "In Stock";
  return { ...p, stock, stockState };
});

/* -------------------------------------------------------------------------- */
/*  Categories (admin view)                                                    */
/* -------------------------------------------------------------------------- */

export const adminCategories = categories.map((c, i) => ({
  id: i + 1,
  name: c.name,
  blurb: c.blurb,
  image: c.image,
  products: categoryCount(c.name),
}));

// Furniture-specific option sets reused by the product form.
export const materialOptions = ["Wood", "Upholstered", "Cloth", "Glass", "Plastic", "Rattan", "Metal", "Leather"];
export const woodTypes = ["Oak", "Walnut", "Teak", "Pine", "Mahogany", "Birch", "Bamboo"];
export const colorOptions = ["Brown", "Black", "White", "Grey", "Blue", "Green", "Red", "Orange", "Beige"];
export const categoryOptions = categories.map((c) => c.name);
