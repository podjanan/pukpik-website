"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export function ShopContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get("cat");
  const initial = catFromUrl && categories.includes(catFromUrl) ? catFromUrl : "ทั้งหมด";
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (catFromUrl && categories.includes(catFromUrl)) setActive(catFromUrl);
  }, [catFromUrl]);

  const filtered = useMemo(
    () => (active === "ทั้งหมด" ? products : products.filter((p) => p.category === active)),
    [active],
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
          {categories.map((c) => (
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
        <ProductGrid products={filtered} />
      </section>
    </main>
  );
}
