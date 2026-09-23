"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { categories as defaultCategories, products as defaultProducts, type Product } from "@/data/products";

export function ShopContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get("cat");

  const [productList, setProductList] = useState<Product[]>(defaultProducts);
  const [categoryList, setCategoryList] = useState<string[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);

  const [active, setActive] = useState("ทั้งหมด");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products)) {
            setProductList(data.products);
          }
          if (data.categories && Array.isArray(data.categories)) {
            setCategoryList(data.categories);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (catFromUrl && categoryList.includes(catFromUrl)) {
      setActive(catFromUrl);
    }
  }, [catFromUrl, categoryList]);

  const filtered = useMemo(
    () => (active === "ทั้งหมด" ? productList : productList.filter((p) => p.category === active)),
    [active, productList],
  );

  return (
    <main>
      <section className="paper border-b border-pink-200 py-8 text-center md:py-12">
        <div className="shell">
          <p className="text-xs font-bold uppercase tracking-widest text-rose">Shop</p>
          <h1 className="title mt-2">รวมสินค้าน่ารักๆ</h1>
          <p className="subtitle text-sm">ของที่ PUKPIK อยากแนะนำจากแบรนด์ต่าง ๆ</p>
        </div>
      </section>

      <section className="shell section">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryList.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                active === c
                  ? "border-rose bg-rose text-white shadow-md"
                  : "border-pink-200 bg-white text-[#725d65] hover:bg-pink-50"
              }`}
            >
              {c === "ทั้งหมด" ? "All" : c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-sm font-semibold text-[#866b75]">
            <span className="inline-block animate-bounce">🎀</span> กำลังโหลดสินค้าล่าสุด...
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </section>
    </main>
  );
}
