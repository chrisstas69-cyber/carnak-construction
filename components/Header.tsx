"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/lib/ui";
import { Wordmark } from "./Wordmark";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Smart sticky: tuck away while scrolling down, return on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 16);
        if (y > 560 && y > lastY + 6) setHidden(true);
        else if (y < lastY - 6 || y <= 560) setHidden(false);
        lastY = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const targets = site.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
      const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <>
      <header
        data-surface="dark"
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-paper transition-[translate,background-color,border-color] duration-500 ease-[var(--ease-build)]",
          hidden && !open && "-translate-y-full focus-within:translate-none",
          scrolled || open ? "border-b border-white/10 bg-ink/95 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6">
          <a href="#top" aria-label={`${site.legalName} — back to top`} className="shrink-0" onClick={() => open && close(false)}>
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative py-2 text-sm font-medium tracking-wide transition-colors",
                        isActive ? "text-paper" : "text-concrete-300 hover:text-paper",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px bg-rust-300 transition-all duration-300",
                          isActive ? "w-full" : "w-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 font-mono text-[0.8125rem] tracking-wide text-concrete-200 transition-colors hover:text-paper xl:flex"
            >
              <Phone aria-hidden="true" className="size-3.5 text-rust-300" strokeWidth={2} />
              {site.phone.display}
            </a>
            <span className="hidden sm:block">
              <a href={site.primaryCta.href} className={buttonClasses("primary", "md")}>
                {site.primaryCta.label}
              </a>
            </span>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 grid size-11 place-items-center rounded-[2px] text-paper transition-colors hover:bg-white/5 lg:hidden"
            >
              {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        data-surface="dark"
        className="menu-panel fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto border-t border-white/10 bg-ink text-paper lg:hidden"
      >
        <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0" />
        <div className="shell relative flex min-h-full flex-col pb-10 pt-6">
          <nav aria-label="Mobile">
            <ol className="border-t border-white/10">
              {site.nav.map((item, i) => (
                <li key={item.href} className="border-b border-white/10">
                  <a
                    href={item.href}
                    onClick={() => close(false)}
                    className="group flex items-baseline gap-5 py-5 text-paper"
                  >
                    <span className="font-mono text-xs text-rust-300">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[2.5rem] transition-colors group-hover:text-concrete-300">{item.label}</span>
                    <ArrowRight aria-hidden="true" className="ml-auto size-5 self-center text-concrete transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            <a href={site.primaryCta.href} onClick={() => close(false)} className={buttonClasses("primary", "lg", "w-full")}>
              {site.primaryCta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a href={site.phone.href} className={buttonClasses("outline-dark", "lg", "w-full")}>
              <Phone aria-hidden="true" className="size-4 text-rust-300" />
              Call {site.phone.display}
            </a>
            <p className="eyebrow pt-2 text-center text-concrete">
              {site.location.city}, {site.location.region} · {site.serviceAreaShort}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
