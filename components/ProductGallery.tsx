"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const slides = images.length ? images : ["/images/products/cat-bag.svg"];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="relative flex flex-col items-center">
      {/* Main Image Polaroid Frame */}
      <div className="group relative aspect-square w-full max-w-md overflow-hidden rounded-[32px] border-4 border-pink-200/90 bg-white shadow-[0_10px_28px_rgba(244,114,182,0.18)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(244,114,182,0.25)]">
        <Image src={slides[index]} alt={alt} fill priority className="object-cover transition duration-300 group-hover:scale-105" />

        {/* Decorative corner doodle */}
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 z-10 text-base text-pink-400 select-none">
          ✦
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute right-3 bottom-3 z-10 text-base text-pink-400 select-none">
          ♡
        </span>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="รูปก่อนหน้า"
              onClick={prev}
              className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-pink-200 bg-white/95 text-rose shadow-md transition hover:scale-110 hover:bg-pink-50"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="รูปถัดไป"
              onClick={next}
              className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-pink-200 bg-white/95 text-rose shadow-md transition hover:scale-110 hover:bg-pink-50"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selector */}
      {slides.length > 1 && (
        <div className="mt-4 flex max-w-md items-center justify-center gap-2.5">
          {slides.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              aria-label={`ดูรูปที่ ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-16 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                i === index
                  ? "scale-105 border-rose ring-4 ring-pink-200/80 shadow-candy"
                  : "border-pink-200/70 opacity-70 hover:opacity-100 hover:scale-102"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
              {i === index && (
                <div className="absolute right-1 top-1 z-10 grid h-4 w-4 place-items-center rounded-full bg-rose text-white">
                  <Heart size={10} fill="currentColor" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
