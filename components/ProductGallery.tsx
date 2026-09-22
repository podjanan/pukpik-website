"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const slides = images.length ? images : ["/images/products/cat-bag.svg"];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-pink-50/80 p-4 sm:p-6">
      <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[28px] border-2 border-pink-100 bg-white shadow-candy">
        <Image src={slides[index]} alt={alt} fill priority className="object-cover" />
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="รูปก่อนหน้า"
              onClick={prev}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-pink-100 bg-white/95 text-rose shadow-md"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="รูปถัดไป"
              onClick={next}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-pink-100 bg-white/95 text-rose shadow-md"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="mx-auto mt-4 flex max-w-md justify-center gap-2">
          {slides.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              aria-label={`ดูรูปที่ ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative h-14 w-14 overflow-hidden rounded-xl border-2 transition ${
                i === index ? "border-rose ring-2 ring-rose/30" : "border-pink-100 opacity-80"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
