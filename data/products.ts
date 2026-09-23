export type Platform = "shopee" | "lazada" | "official" | "tiktok";
export type Product = {
  slug: string;
  name: string;
  brand: string;
  image: string;
  images?: string[];
  category: string;
  description: string;
  tags: string[];
  links: Partial<Record<Platform, string>>;
};

const product = (
  slug: string,
  name: string,
  brand: string,
  category: string,
  image = "/images/products/cat-bag.svg",
): Product => ({
  slug,
  name,
  brand,
  category,
  image,
  images: [image],
  description:
    "ไอเทมน่ารักโทนพาสเทลที่ PUKPIK อยากบอกต่อ ใช้งานง่ายและเหมาะกับทุกวันเลยค่ะ ♡ ดีไซน์คิ้วท์ ถือแล้วรู้สึกมีความสุขทุกครั้ง",
  tags: [category, "น่ารัก", "แนะนำโดย PUKPIK"],
  links: { shopee: "https://shopee.co.th", lazada: "https://lazada.co.th", official: "https://example.com" },
});

export const products: Product[] = [
  product("cute-cat-bag", "กระเป๋าน้องแมวสุดคิวท์", "MINISO", "แฟชั่น"),
  product("pastel-bottle", "ขวดน้ำพาสเทล", "Cathy Doll", "ของใช้"),
  product("bunny-plush", "ตุ๊กตาน้องกระต่าย", "Sanrio", "ของใช้"),
  product("pink-notebook", "สมุดบันทึกสีชมพู", "Kokuyo", "ของใช้"),
  product("daily-pouch", "กระเป๋าเครื่องสำอาง", "MUJI", "สินค้าแต่งหน้า"),
  product("room-lamp", "โคมไฟหัวใจ", "HomeHuk", "ของใช้"),
];

export const categories = ["ทั้งหมด", "ของใช้", "สินค้าแต่งหน้า", "แฟชั่น"];
