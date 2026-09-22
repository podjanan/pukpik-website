import { Suspense } from "react";
import { ShopContent } from "./ShopContent";

export default function Shop() {
  return (
    <Suspense fallback={<main className="shell section text-center text-sm text-[#866b75]">กำลังโหลด...</main>}>
      <ShopContent />
    </Suspense>
  );
}
