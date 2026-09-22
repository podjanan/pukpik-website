export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-rose shadow-sm">
        <span aria-hidden>✦</span>
        {title}
        <span aria-hidden>♡</span>
      </div>
      {subtitle && <p className="subtitle text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}
