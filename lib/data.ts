// Centralized content for the FurniFlex home page.
// Image URLs point at Unsplash's CDN so they can be swapped easily.

const U = (id: string, w = 1200, h = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// Transparent product cutouts (pngall.com) for cards that show a single piece
// on a plain background — Flash Sale and the New Collection cards.
const PNG = {
  armchair: "https://www.pngall.com/wp-content/uploads/2016/05/Armchair-PNG-Image.png",
  chair: "https://www.pngall.com/wp-content/uploads/2016/04/Chair-Free-Download-PNG.png",
  table: "https://www.pngall.com/wp-content/uploads/2016/04/Table-Free-Download-PNG.png",
  diningTable: "https://www.pngall.com/wp-content/uploads/2016/04/Dining-Table-Free-PNG-Image.png",
  lamp: "https://www.pngall.com/wp-content/uploads/2016/04/Lamp-Free-Download-PNG.png",
  bookshelf: "https://www.pngall.com/wp-content/uploads/13/Bookshelf-Modern-PNG-Image.png",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const heroPanels = [
  {
    id: "bed",
    title: "Bed Room",
    meta: "1200+ item",
    image: U("1505693416388-ac5ce068fe85", 1100, 1300),
  },
  {
    id: "living",
    title: "Living Room",
    meta: "900+ item",
    image: U("1586023492125-27b2c045efd7", 1100, 1300),
  },
  {
    id: "waiting",
    title: "Waiting Room",
    meta: "600+ item",
    image: U("1567016432779-094069958ea5", 1100, 1300),
  },
  {
    id: "dining",
    title: "Dining Room",
    meta: "750+ item",
    image: U("1617806118233-18e1de247200", 1100, 1300),
  },
];

export const heroStats = [
  { value: 2500, suffix: "+", label: "Unique Styles" },
  { value: 5000, suffix: "+", label: "Happy Customer" },
  { value: 300, suffix: "+", label: "Certified Outlets" },
];

export const features = [
  { icon: "Truck", title: "Fast & Free Shipping" },
  { icon: "ShoppingBag", title: "Easy to Shop" },
  { icon: "Headphones", title: "24/7 Support" },
  { icon: "RefreshCw", title: "Hassle Free Returns" },
];

export const collections = [
  {
    title: "Center Table",
    items: ["Square table", "Round table", "Wooden table", "Glass table"],
    image: PNG.diningTable,
  },
  {
    title: "Accent Chairs",
    items: ["Arm chair", "wing chair", "cafe chair", "wheels chair"],
    image: PNG.chair,
    tall: true,
  },
  {
    title: "Lighting Lamp",
    items: ["Flore lamps", "Tripod lamps", "Table lamps", "Study lamps"],
    image: PNG.lamp,
  },
];

export const featuredCategories = [
  { name: "Side Table", count: 120, image: U("1532372320572-cda25653a26d", 400, 400) },
  { name: "Arm Chair", count: 45, image: U("1598300042247-d088f8ab3a91", 400, 400) },
  { name: "Dinner Table", count: 120, image: U("1577140917170-285929fb55b7", 400, 400) },
  { name: "Pillow", count: 150, image: U("1616627561839-074385245ff6", 400, 400) },
  { name: "Wall Clock", count: 40, image: U("1563861826100-9cb868fdbe1c", 400, 400) },
  { name: "Sofa", count: 210, image: U("1555041469-a586c61ea9bc", 400, 400) },
];

export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  liked?: boolean;
  category: string;
  image: string;
};

export const productTabs = [
  "Bed Room",
  "Living Room",
  "Dining Room",
  "Outdoor",
  "Indoor",
];

export const products: Product[] = [
  { id: 1, name: "Luxe Lounge Sofa", price: 235.99, discount: 20, category: "Living Room", image: U("1567538096630-e0c55bd6374c", 600, 600) },
  { id: 2, name: "Comfort Haven Sofa", price: 250.99, discount: 10, liked: true, category: "Living Room", image: U("1493663284031-b7e3aefcae8e", 600, 600) },
  { id: 3, name: "Round Wicker Chair", price: 180.99, discount: 25, category: "Outdoor", image: U("1503602642458-232111445657", 600, 600) },
  { id: 4, name: "Teal Ottoman", price: 125.99, discount: 10, liked: true, category: "Living Room", image: U("1532372320572-cda25653a26d", 600, 600) },
  { id: 5, name: "White Fleece Throw Pillow", price: 99.99, discount: 30, category: "Indoor", image: U("1616627561839-074385245ff6", 600, 600) },
  { id: 6, name: "Pillows on Bed Set", price: 999.99, discount: 20, category: "Bed Room", image: U("1505693416388-ac5ce068fe85", 600, 600) },
  { id: 7, name: "Rustic Coffee Table", price: 149.99, discount: 15, category: "Living Room", image: U("1530018607912-eff2daa1bac4", 600, 600) },
  { id: 8, name: "Modern Bookshelf", price: 320.0, discount: 12, category: "Indoor", image: U("1594620302200-9a762244a156", 600, 600) },
  { id: 9, name: "Oak Dining Table", price: 380.0, discount: 10, category: "Dining Room", image: U("1577140917170-285929fb55b7", 600, 600) },
  { id: 10, name: "Round Dinner Table", price: 235.99, discount: 15, liked: true, category: "Dining Room", image: U("1530018607912-eff2daa1bac4", 600, 600) },
  { id: 11, name: "Walnut Dining Set", price: 540.0, discount: 20, category: "Dining Room", image: U("1617806118233-18e1de247200", 600, 600) },
  { id: 12, name: "Glass Top Table", price: 299.99, discount: 18, category: "Dining Room", image: U("1532372320572-cda25653a26d", 600, 600) },
];

// --- Products page ---

export type ShopProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number;
  discount: number;
  liked?: boolean;
  category: string;
  material: string;
  color: string;
  inStock: boolean;
  image: string;
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// images grouped by look so cards stay sensible
const IMG = {
  officeChair: U("1567016432779-094069958ea5", 600, 600),
  armChair: U("1598300042247-d088f8ab3a91", 600, 600),
  wicker: U("1503602642458-232111445657", 600, 600),
  sofaDark: U("1493663284031-b7e3aefcae8e", 600, 600),
  sofa: U("1555041469-a586c61ea9bc", 600, 600),
  armchairLight: U("1567538096630-e0c55bd6374c", 600, 600),
  woodTable: U("1530018607912-eff2daa1bac4", 600, 600),
  dinnerTable: U("1577140917170-285929fb55b7", 600, 600),
  lamp: U("1543198126-a8ad8e47fb22", 600, 600),
  clock: U("1563861826100-9cb868fdbe1c", 600, 600),
  ottoman: U("1532372320572-cda25653a26d", 600, 600),
  pouf: U("1616627561839-074385245ff6", 600, 600),
  bookshelf: U("1594620302200-9a762244a156", 600, 600),
  bed: U("1505693416388-ac5ce068fe85", 600, 600),
};

let _id = 0;
const P = (
  name: string,
  category: string,
  material: string,
  color: string,
  price: number,
  discount: number,
  image: string,
  inStock = true,
  liked = false
): ShopProduct => ({
  id: ++_id,
  name,
  slug: slugify(name),
  category,
  material,
  color,
  price,
  discount,
  oldPrice: Math.round((price / (1 - discount / 100)) * 100) / 100,
  inStock,
  liked,
  image,
});

export const shopProducts: ShopProduct[] = [
  P("Zenith Zephyr Chair", "Office", "Upholstered", "Black", 235.99, 20, IMG.officeChair, true, true),
  P("Crestline Cozy Chair", "Living Room", "Cloth", "Grey", 200.99, 20, IMG.armChair, true, true),
  P("Nova Nest Chair", "Office", "Plastic", "Black", 180.99, 15, IMG.officeChair),
  P("Luxe Lounge Chair", "Living Room", "Upholstered", "White", 240.99, 10, IMG.armchairLight),
  P("Luxe Lounge Sofa", "Living Room", "Cloth", "Blue", 85.99, 15, IMG.sofaDark, false),
  P("Foot Rests Tufting", "Decor", "Upholstered", "Green", 49.99, 20, IMG.ottoman),
  P("Teal Ottoman", "Decor", "Upholstered", "Green", 235.99, 10, IMG.ottoman),
  P("Swivel Home Chair", "Office", "Plastic", "Black", 130.99, 21, IMG.officeChair),
  P("Luxe Wall Clock", "Decor", "Glass", "Black", 235.99, 20, IMG.clock),
  P("Arm Chair", "Living Room", "Upholstered", "Blue", 235.99, 10, IMG.armChair, true, true),
  P("Luxe Comfort Sofa", "Living Room", "Cloth", "Blue", 235.99, 20, IMG.sofa),
  P("Rustic Office Table", "Office", "Wood", "Brown", 299.99, 20, IMG.woodTable),
  P("Foot Rests Tuffet", "Decor", "Cloth", "Red", 33.99, 20, IMG.pouf),
  P("Orange Table Lamp", "Decor", "Glass", "Orange", 111.99, 15, IMG.lamp),
  P("Square Table", "Kitchen", "Wood", "Brown", 235.99, 15, IMG.dinnerTable),
  P("Modern Bookshelf", "Office", "Wood", "Brown", 320.0, 12, IMG.bookshelf),
  P("Vintage Leather Armchair", "Living Room", "Upholstered", "Brown", 599.0, 25, IMG.armchairLight),
  P("Round Wicker Chair", "Outdoor", "Rattan", "Brown", 180.99, 25, IMG.wicker),
  P("Cloud Linen Sofa", "Living Room", "Cloth", "White", 420.5, 18, IMG.armchairLight),
  P("Midnight Velvet Sofa", "Living Room", "Upholstered", "Blue", 510.0, 15, IMG.sofaDark, false),
  P("Oak Dining Table", "Kitchen", "Wood", "Brown", 380.0, 10, IMG.dinnerTable),
  P("Glass Coffee Table", "Living Room", "Glass", "White", 160.0, 20, IMG.woodTable),
  P("Rattan Lounge Set", "Outdoor", "Rattan", "Brown", 540.0, 30, IMG.wicker),
  P("Cozy Bed Frame", "Bedroom", "Wood", "Grey", 480.0, 15, IMG.bed),
  P("Plush Bed Set", "Bedroom", "Cloth", "White", 999.99, 20, IMG.bed, true, true),
  P("Ceramic Table Lamp", "Decor", "Glass", "Orange", 75.0, 10, IMG.lamp),
  P("Minimal Wall Clock", "Decor", "Plastic", "White", 45.0, 15, IMG.clock, false),
  P("Accent Pouf", "Decor", "Cloth", "Red", 60.0, 20, IMG.pouf),
  P("Ergo Office Chair", "Office", "Plastic", "Grey", 210.0, 18, IMG.officeChair),
  P("Garden Bench", "Outdoor", "Wood", "Brown", 250.0, 22, IMG.woodTable, false),
  P("Velvet Wing Chair", "Living Room", "Upholstered", "Green", 320.0, 12, IMG.armChair),
  P("Kitchen Bar Stool", "Kitchen", "Plastic", "Black", 90.0, 15, IMG.officeChair),
  P("Reading Floor Lamp", "Decor", "Glass", "Black", 130.0, 10, IMG.lamp),
  P("Side Storage Table", "Living Room", "Wood", "Brown", 140.0, 14, IMG.ottoman),
];

export const PRODUCTS_PER_PAGE = 15;

export type Category = {
  name: string;
  blurb: string;
  image: string;
  span: string;
};

// Room categories shown on the Categories page (counts derive from shopProducts).
export const categories: Category[] = [
  { name: "Living Room", blurb: "Sofas, chairs & coffee tables", image: IMG.sofa, span: "lg:col-span-2 lg:row-span-2" },
  { name: "Bedroom", blurb: "Beds, frames & nightstands", image: IMG.bed, span: "lg:col-span-2" },
  { name: "Office", blurb: "Desks, chairs & shelving", image: IMG.officeChair, span: "" },
  { name: "Kitchen", blurb: "Dining tables & stools", image: IMG.dinnerTable, span: "" },
  { name: "Outdoor", blurb: "Patio & garden pieces", image: IMG.wicker, span: "lg:col-span-2" },
  { name: "Decor", blurb: "Lamps, clocks & accents", image: IMG.lamp, span: "lg:col-span-2" },
];

export function categoryCount(name: string) {
  return shopProducts.filter((p) => p.category === name).length;
}

export const filterGroups = {
  categories: ["Bedroom", "Living Room", "Office", "Kitchen", "Outdoor", "Decor"],
  materials: ["Cloth", "Wood", "Upholstered", "Glass", "Plastic", "Rattan"],
  colors: ["Brown", "Orange", "Grey", "Black", "Blue", "White", "Green", "Red"],
  availability: ["In Stock", "Out of Stock"],
  priceBounds: [0, 1000] as [number, number],
};

export const sortOptions = [
  "Default Sorting",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A to Z",
];

// --- Product detail page ---

export function getShopProductBySlug(slug: string) {
  return shopProducts.find((p) => p.slug === slug);
}

// Products in the same category (fallback to others) for the related rails.
export function relatedProducts(product: ShopProduct, count: number) {
  const sameCategory = shopProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const others = shopProducts.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

// Builds the descriptive detail content for any product.
export function productDetail(p: ShopProduct) {
  return {
    headline: `My Art Design ${p.material} - Modern ${p.name} With Premium Build For Home, Office, Hotel & Cafe.`,
    code: `99${String(p.id).padStart(4, "0")}`,
    rating: 4.9,
    reviews: 140,
    sold: 431,
    save: Math.round(p.oldPrice - p.price),
    gallery: [p.image, p.image, p.image],
  };
}

export const productCoupon = {
  title: "GET EXTRA 15% OFF",
  subtitle: "ON PURCHASE OF 2+ STYLES",
  code: "TW015",
};

export const productDescription =
  "Our chair collection features a variety of designs, materials, and finishes to match any decor scheme. From timeless classics to cutting-edge contemporary pieces, each chair is carefully crafted with attention to detail and durability in mind. Whether you prefer the warmth of wood, the sophistication of leather, or the versatility of metal and plastic, you'll find the perfect chair to elevate your home or office.";

export const productAbout = [
  "This chair is specifically designed with a small footprint, making it ideal for cozy spaces where maximizing seating capacity is essential.",
  "Despite its small size, comfort is not compromised. The seat and backrest are carefully contoured to provide adequate support for comfortable sitting, even during extended periods.",
  "Despite its compactness, this chair boasts a sturdy construction, ensuring stability and durability. Its robust frame can withstand daily use without wobbling or weakening over time.",
  "Designed for convenience, assembly of this chair is quick and straightforward. With minimal parts and clear instructions, you can have it set up and ready to use in no time.",
  "While perfect for small apartments, dorm rooms, or compact dining areas, this chair is also versatile enough to serve as an extra seating option in various settings, including offices, waiting rooms, or even outdoor patios.",
];

// Product Information tab
export const technicalDetails: [string, string][] = [
  ["Brand", "KOLLIEE"],
  ["Color", "Black"],
  ["Product Dimensions", '24"D x 24.4"W x 35.8"H'],
  ["Size", "Large"],
  ["Back Style", "Solid Back"],
  ["Style", "Modern"],
  ["Unit Count", "1.0 Count"],
];

export const additionalInformation: {
  label: string;
  value: string;
  type?: "rating";
}[] = [
  { label: "ASIN", value: "B07Y1P9F7K" },
  { label: "Customer Reviews", value: "", type: "rating" },
  { label: "Product Dimensions", value: '24"D x 24.4"W x 35.8"H' },
  { label: "Best Seller Rank", value: "#298,293 in Home & kitchen" },
  { label: "Date First Available", value: "May 03, 2024" },
];

export const warranty = {
  intro:
    "FurniFlex.com Return Policy: Regardless of your statutory right of withdrawal, you enjoy a 30-day right of return for many products. For exceptions and conditions, see ",
  introLink: "Return details.",
  manufacturer: "Manufacturer's warranty can be requested from customer service. ",
  manufacturerLink: "Click here",
  manufacturerTail: " to make a request to customer service.",
};

// Review tab
export const reviewSummary = {
  average: 4.7,
  totalRatings: 7900,
  breakdown: [
    { star: 5, pct: 65 },
    { star: 4, pct: 15 },
    { star: 3, pct: 7 },
    { star: 2, pct: 8 },
    { star: 1, pct: 5 },
  ],
  say: "Customers like the appearance and ease of assembly of the chair. They mention that it looks nice, the white color is beautiful, and is easy to assemble. They are also happy with value. However, some customers have reported that the chair makes a squeaky noise when they tilt back. Opinions are mixed on size, back support, quality, and comfort.",
  aspects: [
    { label: "Ease of assembly", sentiment: "positive" },
    { label: "Value", sentiment: "positive" },
    { label: "Back Support", sentiment: "positive" },
    { label: "Comfort", sentiment: "neutral" },
    { label: "Quality", sentiment: "neutral" },
    { label: "Durability", sentiment: "neutral" },
    { label: "Fit", sentiment: "neutral" },
    { label: "Size", sentiment: "mixed" },
  ] as { label: string; sentiment: "positive" | "neutral" | "mixed" }[],
};

export const reviewSortOptions = [
  "Recent reviews",
  "Top reviews",
  "Highest rated",
  "Lowest rated",
];

export const productReviews = [
  {
    name: "Karim Aboul",
    avatar: U("1500648767791-00dcc994a43e", 100, 100),
    verified: true,
    date: "May 5, 2024",
    rating: 5,
    title: "Comfortable, bang for your buck!",
    text: "The first chair came with a broken leg, but the replacement came within days and I love it. Set up was fast and easy the chair is sturdy and comfortable and will do the job until I'm ready to upgrade. Thank you.",
    helpful: 3,
  },
  {
    name: "Aisha Saleh",
    avatar: U("1438761681033-6461ffad8d80", 100, 100),
    verified: true,
    date: "April 24, 2024",
    rating: 5,
    title: "Amazing chair",
    text: "Great value! Good quality chair, I little complicated to put together but the instructions are pretty simple, it's just awkward to build. All and all it's a great chair and very comfortable.",
    helpful: 5,
  },
  {
    name: "Fatima Zahra",
    avatar: U("1507003211169-0a1dd7228f2d", 100, 100),
    verified: true,
    date: "April 9, 2024",
    rating: 5,
    title: "A bit of a struggle to assemble",
    text: "The chair came with all its pieces, and easy to follow assembly instructions. The most difficult part of putting it together was putting the seat on. I purchased 3, and with each one, the seat gave me the hardest time. They are very nice and great for my kids.",
    helpful: 12,
    image: U("1567016432779-094069958ea5", 400, 300),
  },
  {
    name: "Yousef Adel",
    avatar: U("1494790108377-be9c29b29330", 100, 100),
    verified: true,
    date: "March 17, 2024",
    rating: 5,
    title: "Easy to assemble, and its comfortable.",
    text: "For the price I don't know how they do it with shipping. Its super comfortable. And it was easy to put together. For the first time the instructions that came with something you build was clear and concise.",
    helpful: 3,
  },
];

export type Review = {
  id: number;
  name: string;
  avatar: string;
  verified: boolean;
  date: string;
  rating: number;
  title: string;
  text: string;
  helpful: number;
  image?: string;
};

export const REVIEWS_PER_PAGE = 5;

const A = {
  man1: U("1500648767791-00dcc994a43e", 100, 100),
  woman1: U("1438761681033-6461ffad8d80", 100, 100),
  man2: U("1507003211169-0a1dd7228f2d", 100, 100),
  woman2: U("1494790108377-be9c29b29330", 100, 100),
};

// Curated, distinct reviews — page count is derived from this real data.
const moreReviews: Omit<Review, "id">[] = [
  { name: "Tariq Mahmoud", avatar: A.man1, verified: true, date: "March 2, 2024", rating: 4, title: "Solid for the price", text: "Good chair for daily work. The lumbar support is decent and it rolls smoothly on hardwood floors. Took off a star because the armrests aren't adjustable.", helpful: 8 },
  { name: "Mona Farouk", avatar: A.woman1, verified: true, date: "Feb 26, 2024", rating: 5, title: "Exceeded expectations", text: "I was hesitant ordering furniture online but this arrived well packaged and looks exactly like the photos. Very comfortable for long hours.", helpful: 14 },
  { name: "Hassan Ali", avatar: A.man2, verified: false, date: "Feb 14, 2024", rating: 3, title: "Comfortable but squeaks", text: "It's comfortable and looks nice, but after a few weeks it started making a squeaky noise when I lean back. A bit of oil helped temporarily.", helpful: 6 },
  { name: "Salma Ibrahim", avatar: A.woman2, verified: true, date: "Feb 3, 2024", rating: 5, title: "Perfect home office chair", text: "Assembly was quick and the instructions were clear. It feels sturdy and the height range fits my desk perfectly. Highly recommend.", helpful: 21 },
  { name: "Khaled Nasser", avatar: A.man1, verified: true, date: "Jan 28, 2024", rating: 4, title: "Great value", text: "You get a lot of chair for the money. Build quality is better than I expected at this price point. Would buy again.", helpful: 9 },
  { name: "Rania Habib", avatar: A.woman1, verified: true, date: "Jan 19, 2024", rating: 5, title: "Looks great in my study", text: "The finish is beautiful and it matches my desk really well. Comfortable enough that I don't need a cushion. Very happy.", helpful: 12 },
  { name: "Bilal Hamdan", avatar: A.man2, verified: false, date: "Jan 11, 2024", rating: 2, title: "Seat is a bit firm", text: "Sturdy and well made, but the seat padding is firmer than I'd like for all-day use. Fine for occasional sitting.", helpful: 4 },
  { name: "Yasmin Darwish", avatar: A.woman2, verified: true, date: "Jan 5, 2024", rating: 5, title: "Would buy again", text: "Second one I've purchased for the family. Consistent quality and they hold up well to daily use by the kids.", helpful: 17 },
  { name: "Walid Sharif", avatar: A.man1, verified: true, date: "Dec 22, 2023", rating: 4, title: "Comfortable and stylish", text: "Modern look that fits my apartment. Wheels glide nicely and it reclines just enough. Minor wobble at first that I fixed by tightening the screws.", helpful: 7 },
  { name: "Hana Mostafa", avatar: A.woman1, verified: true, date: "Dec 15, 2023", rating: 5, title: "Best purchase this year", text: "Genuinely surprised by how comfortable this is. I work 8+ hours a day and my back feels much better than with my old chair.", helpful: 25 },
  { name: "Ramy Fawzy", avatar: A.man2, verified: true, date: "Dec 8, 2023", rating: 4, title: "Sturdy and reliable", text: "No complaints after two months of heavy use. Nothing has loosened or worn down. Solid everyday chair.", helpful: 5 },
  { name: "Sahar Othman", avatar: A.woman2, verified: false, date: "Nov 30, 2023", rating: 3, title: "Good, but shipping was slow", text: "The chair itself is great once it arrived, but delivery took longer than estimated. Quality is good for the price though.", helpful: 3 },
];

// Full list: the 4 detailed reviews first, then the curated set.
export const allReviews: Review[] = [...productReviews, ...moreReviews].map(
  (r, i) => ({ id: i + 1, ...r })
);

export const flashSale = {
  title: "Vintage Leather Armchair",
  description:
    "Bring a touch of retro charm to your home with this vintage leather armchair. Sturdy construction ensures durability.",
  price: 599,
  oldPrice: 799,
  image: PNG.armchair,
  side: [
    { title: "Rustic Coffee Table", image: PNG.table },
    { title: "Modern Bookshelf", image: PNG.bookshelf },
  ],
};

export const aboutPage = {
  heading: "Discover FurniFlex - Where Innovation Meets Design",
  eyebrow: "FurniFlex Challenging",
  storyTitle: "The FurniFlex Journey Story",
  storyIntro:
    "The FurniFlex Journey: Transforming spaces with innovative design. Explore our story of craftsmanship and style, creating furniture that inspires and enhances modern living.",
  heroImage: U("1600585154340-be6161a56a0c", 1200, 700),
  milestones: [
    {
      icon: "Sparkles",
      title: "From Humble Beginnings",
      text: "Our story began in 2010 in a small workshop, driven by a passion for creating beautiful and comfortable furniture. What started as a modest operation has grown into a beloved brand known for its quality and design.",
      image: U("1556228453-efd6c1ff04f6", 700, 500),
    },
    {
      icon: "Award",
      title: "Milestones and Achievements",
      text: "Over the years, we've reached several significant milestones. In 2012, we launched our first online store, making our products accessible to a wider audience. By 2015, we had expanded our product line to include not only classic furniture pieces but also contemporary designs that cater to modern tastes.",
      image: U("1586023492125-27b2c045efd7", 700, 500),
    },
    {
      icon: "TrendingUp",
      title: "Innovation and Growth",
      text: "Innovation has always been at the heart of what we do. In 2018, we introduced our first line of eco-friendly furniture, crafted from sustainable materials. This commitment to the environment has not only won us accolades but also the trust and loyalty of our customers.",
      image: U("1530018607912-eff2daa1bac4", 700, 500),
    },
    {
      icon: "Globe",
      title: "Our Global Reach",
      text: "Today, FurniFlex serves customers around the world. With distribution partners in key locations, we ensure that our high-quality furniture reaches your home efficiently and safely. Our global presence is a testament to the love and support of our customers.",
      image: U("1505693416388-ac5ce068fe85", 700, 500),
    },
    {
      icon: "Telescope",
      title: "Looking Ahead",
      text: "As we look to the future, our goal remains the same: to create furniture that combines style, comfort, and sustainability. We're excited about the new designs and innovations we have in store, and we're committed to making your home a beautiful, comfortable, and happy place.",
      image: U("1567538096630-e0c55bd6374c", 700, 500),
    },
  ],
  team: [
    { name: "Youssef Hegazy", role: "CEO & Owner", image: U("1494790108377-be9c29b29330", 500, 600) },
    { name: "Amina Saleh", role: "Lead Interior Designer", image: U("1500648767791-00dcc994a43e", 500, 600) },
    { name: "Tarek Mansour", role: "DIY Expert", image: U("1507003211169-0a1dd7228f2d", 500, 600) },
  ],
};

export const contactInfo = {
  intro:
    "We're here for you every step of the way. Whether you have questions, need order assistance, or want to share feedback, our friendly customer support team is ready to assist. Our team is here to help! Reach out to us via",
  methods: [
    { icon: "Mail", label: "Mail", value: "mdaminur.oc@gmail.com", tint: "bg-orange-100 text-orange-500" },
    { icon: "Phone", label: "Phone", value: "+88 01405074838", tint: "bg-indigo-100 text-indigo-500" },
    { icon: "Printer", label: "Fax", value: "(401) 279-9587", tint: "bg-purple-100 text-purple-500" },
    { icon: "MapPin", label: "Office", value: "5678 Seltice Way Coeur D Alene", tint: "bg-emerald-100 text-emerald-500" },
  ],
};

export const offerBanner = {
  image: U("1586023492125-27b2c045efd7", 800, 600),
};

export const testimonials = [
  {
    title: "Exceptional Quality & Service",
    quote:
      "I recently purchased a beautiful dining set from FurniFlex, and I couldn't be happier! The quality is top-notch, and it looks even better in person than it did online. Plus, the customer service team was incredibly helpful throughout the entire process. Highly recommend!",
    name: "Layla Hassan",
    location: "Cairo, Egypt",
  },
  {
    title: "Craftsmanship That Lasts",
    quote:
      "The craftsmanship is outstanding and delivery was right on time. Our living room feels brand new. I'll definitely be shopping here again for the rest of the house.",
    name: "Omar Khalil",
    location: "Dubai, UAE",
  },
  {
    title: "A Seamless Experience",
    quote:
      "From browsing to checkout everything was seamless. The pieces are sturdy, elegant, and exactly as pictured. FurniFlex has earned a lifelong customer.",
    name: "Nour Mansour",
    location: "Riyadh, Saudi Arabia",
  },
  {
    title: "Worth Every Penny",
    quote:
      "Beautiful pieces that completely transformed my apartment. The materials feel premium and the assembly was effortless. The whole team went above and beyond.",
    name: "Yasmin Darwish",
    location: "Abu Dhabi, UAE",
  },
  {
    title: "My Go-To Furniture Store",
    quote:
      "I've furnished two homes with FurniFlex now. Consistent quality, fair prices, and the delivery tracking kept me informed the whole way. Couldn't ask for more.",
    name: "Karim Aboul",
    location: "Amman, Jordan",
  },
];

export const faqs = [
  {
    q: "How do I choose the right furniture for my space?",
    a: "Start by measuring your room and noting traffic flow. Consider the scale of existing pieces, your color palette, and how the space is used day to day. Our product pages list exact dimensions to help you plan.",
  },
  {
    q: "What materials are your furniture items made of?",
    a: "We use solid hardwoods, kiln-dried frames, premium upholstery fabrics, and responsibly sourced veneers. Each product page details the specific materials and care instructions.",
  },
  {
    q: "What is your delivery process?",
    a: "We offer white-glove delivery service for most furniture items, which includes professional assembly and placement in your desired room. Delivery times may vary depending on your location and product availability. You will be contacted to schedule a delivery appointment once your order is ready to ship.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "You can return most items within 30 days of delivery for a full refund, provided they are in original condition. Exchanges are free, and our support team will arrange pickup for larger pieces.",
  },
  {
    q: "How can I contact customer support for assistance?",
    a: "Our team is available 24/7 via live chat, email at support@furniflex.com, or by phone at 1 (100) 234-5678. We typically respond within a few minutes during business hours.",
  },
];

export const newsletter = {
  image: U("1505693416388-ac5ce068fe85", 800, 600),
  priceTag: "29.$",
};

export const footerColumns: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "About",
    links: [
      { label: "Our Company", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Delivery Information", href: "/delivery" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Return", href: "/returns" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Checkout", href: "/cart" },
    ],
  },
];

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  ago: string;
  category: string;
  image: string;
};

const B = (
  title: string,
  author: string,
  date: string,
  ago: string,
  category: string,
  image: string
): BlogPost => ({
  id: 0, // assigned below
  slug: slugify(title),
  title,
  author,
  date,
  ago,
  category,
  image,
});

export const blogPosts: BlogPost[] = [
  B("First Time Home Owner Ideas", "Huda Kamal", "Apr 19, 24", "3 hours ago", "Design Inspiration", U("1556228453-efd6c1ff04f6", 600, 450)),
  B("How To Keep Your Furniture Clean", "Sami Rashed", "Apr 20, 24", "12 hours ago", "Furniture Care", U("1567016376408-0226e4d0c1ea", 600, 450)),
  B("Small Space Furniture Apartment Ideas", "Huda Kamal", "Apr 20, 24", "16 hours ago", "Home Organization", U("1493663284031-b7e3aefcae8e", 600, 450)),
  B("Design Inspiration", "Huda Kamal", "Apr 22, 24", "1 day ago", "Design Inspiration", U("1505693416388-ac5ce068fe85", 600, 450)),
  B("Furniture Care Tips", "Sami Rashed", "Apr 22, 24", "1 day ago", "Furniture Care", U("1586023492125-27b2c045efd7", 600, 450)),
  B("Home Organization", "Huda Kamal", "May 24, 24", "2 days ago", "Home Organization", U("1493663284031-b7e3aefcae8e", 600, 450)),
  B("Product Spotlights", "Sami Rashed", "Apr 20, 24", "3 days ago", "Product Spotlights", U("1555041469-a586c61ea9bc", 600, 450)),
  B("Choosing the Perfect Sofa", "Huda Kamal", "May 19, 24", "4 days ago", "Sofa", U("1567538096630-e0c55bd6374c", 600, 450)),
  B("Lighting Your Living Space", "Sami Rashed", "May 20, 24", "5 days ago", "Living Room", U("1543198126-a8ad8e47fb22", 600, 450)),
  B("Sustainable Furniture Guide", "Huda Kamal", "May 21, 24", "6 days ago", "Design Inspiration", U("1594620302200-9a762244a156", 600, 450)),
  B("Mixing Modern & Vintage", "Sami Rashed", "May 23, 24", "1 week ago", "Design Inspiration", U("1530018607912-eff2daa1bac4", 600, 450)),
  B("Outdoor Furniture Essentials", "Huda Kamal", "May 25, 24", "1 week ago", "Living Room", U("1503602642458-232111445657", 600, 450)),
].map((p, i) => ({ ...p, id: i + 1 }));

export const BLOG_PER_PAGE = 9;

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

// Shared article content for the blog detail page.
export const blogArticle = {
  welcomeTitle: "Welcome to Our Blog!",
  welcomeIntro:
    "At Furniture FurniFlex., we're committed to helping you create a home that not only looks beautiful but also feels comfortable and inviting. Our blog is your ultimate resource for design inspiration, practical tips, and the latest trends in home furnishings.",
  writtenBy: { name: "Mariam Adel", avatar: U("1438761681033-6461ffad8d80", 100, 100) },
  title: "Transform Your Living Room with These Top 5 Design Tips",
  intro:
    "Your living room is the heart of your home, a place where you relax, entertain guests, and spend quality time with family. Transforming it into a stylish, functional space can enhance your overall living experience. Here are our top 10 design tips to help you create a living room that you'll love.",
  sections: [
    {
      title: "Choose a Cohesive Color Scheme",
      text: "Selecting a color palette that complements your personal style and the overall theme of your home is crucial. Opt for three main colors: a dominant color for the walls, a secondary color for large furniture pieces, and an accent color for accessories and decor items.",
    },
    {
      title: "Invest in Quality Seating",
      text: "Comfortable and stylish seating is essential. Consider a mix of a plush sofa, cozy armchairs, and stylish ottomans. Ensure the fabrics are durable and easy to clean, especially if you have kids or pets.",
    },
    {
      title: "Create a Focal Point",
      text: "A focal point anchors the room and draws the eye. This could be a statement piece of art, a bold piece of furniture, or a beautiful fireplace. Arrange your seating around this focal point to create a balanced and inviting layout.",
    },
    {
      title: "Incorporate Various Textures",
      text: "Adding different textures can make your living room feel more dynamic and inviting. Mix materials like wood, metal, glass, and textiles. Think soft throw blankets, patterned rugs, and sleek metal accents.",
    },
    {
      title: "Optimize Lighting",
      text: "Layered lighting enhances the functionality and ambiance of your living room. Combine overhead lighting with task lighting (like floor lamps) and accent lighting (such as wall sconces). Use dimmers to adjust the mood.",
    },
  ],
  socials: [
    { platform: "Facebook", handle: "Eduard Franz" },
    { platform: "Instagram", handle: "@Eduard Franz" },
    { platform: "LinkedIn", handle: "Eduard Franz" },
    { platform: "Youtube", handle: "Eduard Franz" },
  ],
  categories: [
    "Design Inspiration",
    "Furniture Care",
    "Sofa",
    "Product Spotlights",
    "Home Organization",
    "Living Room",
  ],
};
