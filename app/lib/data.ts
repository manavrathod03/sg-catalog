export type ProductType = "SHIRT" | "PANT";
export type SleeveType = "FULL" | "HALF";
export type SizeKey =
  | "30" | "32" | "34" | "36" | "38"
  | "40" | "42" | "44" | "46" | "48" | "50" | "52";

export type BadgeType = "selling_fast" | "low_stock" | "new" | "trending" | null;

export interface StockEntry {
  sleeve: SleeveType;
  size: SizeKey;
  quantity: number;
}

export interface ColorItem {
  color_id: number;
  color_number: number;
  name: string;
  code: string;
  badge: BadgeType;
  image: string;
  videos: string[];
  images: string[];
  stock: StockEntry[];
}

export interface Design {
  design_id: number;
  design_number: number;
  name: string;
  description: string;
  price_cash: number;
  price_credit: number;
  product_type: ProductType;
  is_big_size: boolean;
  cover_image: string;
  videos: string[];
  images: string[];
  colors: ColorItem[];
}

export const designs: Design[] = [
  {
    design_id: 1,
    design_number: 101,
    name: "Classic Oxford",
    description: "A timeless Oxford weave shirt with a relaxed fit, perfect for both formal and casual occasions.",
    price_cash: 549,
    price_credit: 599,
    product_type: "SHIRT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    ],
    colors: [
      {
        color_id: 1,
        color_number: 1,
        name: "White",
        code: "#F5F5F5",
        badge: "selling_fast",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 12 },
          { sleeve: "FULL", size: "40", quantity: 8 },
          { sleeve: "FULL", size: "42", quantity: 3 },
          { sleeve: "FULL", size: "44", quantity: 0 },
          { sleeve: "HALF", size: "38", quantity: 5 },
          { sleeve: "HALF", size: "40", quantity: 0 },
        ],
      },
      {
        color_id: 2,
        color_number: 2,
        name: "Sky Blue",
        code: "#87CEEB",
        badge: "new",
        image: "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "36", quantity: 6 },
          { sleeve: "FULL", size: "38", quantity: 10 },
          { sleeve: "FULL", size: "40", quantity: 10 },
          { sleeve: "FULL", size: "42", quantity: 4 },
          { sleeve: "HALF", size: "38", quantity: 8 },
          { sleeve: "HALF", size: "40", quantity: 6 },
        ],
      },
      {
        color_id: 3,
        color_number: 3,
        name: "Navy",
        code: "#1B2A4A",
        badge: null,
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 0 },
          { sleeve: "FULL", size: "40", quantity: 0 },
          { sleeve: "FULL", size: "42", quantity: 2 },
          { sleeve: "HALF", size: "40", quantity: 1 },
        ],
      },
      {
        color_id: 4,
        color_number: 4,
        name: "Mint Green",
        code: "#98D8C8",
        badge: "trending",
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "36", quantity: 4 },
          { sleeve: "FULL", size: "38", quantity: 9 },
          { sleeve: "FULL", size: "40", quantity: 7 },
          { sleeve: "HALF", size: "38", quantity: 5 },
        ],
      },
    ],
  },
  {
    design_id: 2,
    design_number: 102,
    name: "Linen Casual",
    description: "Breathable linen fabric with a loose silhouette. Made for warm days and easy styling.",
    price_cash: 649,
    price_credit: 699,
    product_type: "SHIRT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80",
    ],
    colors: [
      {
        color_id: 5,
        color_number: 1,
        name: "Beige",
        code: "#D4B896",
        badge: "new",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 15 },
          { sleeve: "FULL", size: "40", quantity: 12 },
          { sleeve: "HALF", size: "38", quantity: 8 },
          { sleeve: "HALF", size: "40", quantity: 6 },
        ],
      },
      {
        color_id: 6,
        color_number: 2,
        name: "Olive",
        code: "#6B7C45",
        badge: "selling_fast",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "36", quantity: 2 },
          { sleeve: "FULL", size: "38", quantity: 1 },
          { sleeve: "FULL", size: "40", quantity: 0 },
          { sleeve: "HALF", size: "38", quantity: 3 },
        ],
      },
      {
        color_id: 7,
        color_number: 3,
        name: "Terracotta",
        code: "#C47A5A",
        badge: "trending",
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 7 },
          { sleeve: "FULL", size: "40", quantity: 5 },
          { sleeve: "HALF", size: "38", quantity: 4 },
        ],
      },
    ],
  },
  {
    design_id: 3,
    design_number: 103,
    name: "Slim Chino",
    description: "Tailored slim-fit chinos with a mid-rise waist. Versatile enough for the office or weekend.",
    price_cash: 799,
    price_credit: 849,
    product_type: "PANT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
    colors: [
      {
        color_id: 8,
        color_number: 1,
        name: "Khaki",
        code: "#C3B091",
        badge: null,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "30", quantity: 5 },
          { sleeve: "FULL", size: "32", quantity: 8 },
          { sleeve: "FULL", size: "34", quantity: 10 },
          { sleeve: "FULL", size: "36", quantity: 6 },
        ],
      },
      {
        color_id: 9,
        color_number: 2,
        name: "Charcoal",
        code: "#36454F",
        badge: "selling_fast",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4bfce4?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4bfce4?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "30", quantity: 0 },
          { sleeve: "FULL", size: "32", quantity: 3 },
          { sleeve: "FULL", size: "34", quantity: 2 },
          { sleeve: "FULL", size: "36", quantity: 0 },
        ],
      },
      {
        color_id: 10,
        color_number: 3,
        name: "Caramel",
        code: "#C68E5A",
        badge: "low_stock",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "30", quantity: 1 },
          { sleeve: "FULL", size: "32", quantity: 0 },
          { sleeve: "FULL", size: "34", quantity: 1 },
        ],
      },
    ],
  },
  {
    design_id: 4,
    design_number: 104,
    name: "Printed Voile",
    description: "Lightweight voile with a subtle all-over print. Drapes beautifully and stays cool.",
    price_cash: 499,
    price_credit: 549,
    product_type: "SHIRT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=800&q=80",
    ],
    colors: [
      {
        color_id: 11,
        color_number: 1,
        name: "Blue Floral",
        code: "#4A90D9",
        badge: "new",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"],
        stock: [
          { sleeve: "HALF", size: "38", quantity: 10 },
          { sleeve: "HALF", size: "40", quantity: 8 },
          { sleeve: "HALF", size: "42", quantity: 5 },
        ],
      },
      {
        color_id: 12,
        color_number: 2,
        name: "Pink Motif",
        code: "#E8A0A0",
        badge: "trending",
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80"],
        stock: [
          { sleeve: "HALF", size: "36", quantity: 6 },
          { sleeve: "HALF", size: "38", quantity: 9 },
          { sleeve: "HALF", size: "40", quantity: 4 },
        ],
      },
    ],
  },
  {
    design_id: 5,
    design_number: 105,
    name: "Denim Cargo",
    description: "Heavy-duty denim cargo pants with four utility pockets. A workhorse silhouette built to last.",
    price_cash: 999,
    price_credit: 1099,
    product_type: "PANT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=800&q=80",
    ],
    colors: [
      {
        color_id: 13,
        color_number: 1,
        name: "Raw Indigo",
        code: "#2B3A6B",
        badge: null,
        image: "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "30", quantity: 4 },
          { sleeve: "FULL", size: "32", quantity: 7 },
          { sleeve: "FULL", size: "34", quantity: 5 },
        ],
      },
      {
        color_id: 14,
        color_number: 2,
        name: "Washed Black",
        code: "#2A2A2A",
        badge: "selling_fast",
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "30", quantity: 2 },
          { sleeve: "FULL", size: "32", quantity: 1 },
          { sleeve: "FULL", size: "34", quantity: 0 },
        ],
      },
    ],
  },
  {
    design_id: 6,
    design_number: 106,
    name: "Dobby Texture",
    description: "Subtle dobby weave adds quiet texture to an otherwise clean silhouette.",
    price_cash: 599,
    price_credit: 649,
    product_type: "SHIRT",
    is_big_size: false,
    cover_image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    videos: [],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    ],
    colors: [
      {
        color_id: 15,
        color_number: 1,
        name: "Pearl White",
        code: "#F0EDE8",
        badge: null,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 6 },
          { sleeve: "FULL", size: "40", quantity: 8 },
          { sleeve: "FULL", size: "42", quantity: 4 },
          { sleeve: "HALF", size: "38", quantity: 5 },
        ],
      },
      {
        color_id: 16,
        color_number: 2,
        name: "Storm Grey",
        code: "#8A9BA8",
        badge: "low_stock",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "38", quantity: 2 },
          { sleeve: "FULL", size: "40", quantity: 1 },
          { sleeve: "HALF", size: "38", quantity: 1 },
        ],
      },
      {
        color_id: 17,
        color_number: 3,
        name: "Dusty Rose",
        code: "#D4A5A5",
        badge: "new",
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
        videos: [],
        images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80"],
        stock: [
          { sleeve: "FULL", size: "36", quantity: 5 },
          { sleeve: "FULL", size: "38", quantity: 7 },
          { sleeve: "FULL", size: "40", quantity: 6 },
          { sleeve: "HALF", size: "36", quantity: 3 },
          { sleeve: "HALF", size: "38", quantity: 4 },
        ],
      },
    ],
  },
];
