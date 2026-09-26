import { site } from "@/data/site";

export function CredibilityStrip() {
  return (
    <div className="border-t border-white/10 bg-ink-2">
      <div className="shell">
        <dl className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-5">
          {site.credibility.map((item) => (
            <div key={item.label} className="bg-ink-2 py-6 pr-4 odd:last:col-span-2 lg:odd:last:col-span-1 lg:py-8 [&:not(:first-child)]:pl-5 lg:[&:not(:first-child)]:pl-7 max-lg:odd:pl-0!">
              <dt className="eyebrow text-concrete">{item.label}</dt>
              <dd className="mt-2 font-display text-xl font-semibold uppercase leading-tight tracking-wide text-paper sm:text-2xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
