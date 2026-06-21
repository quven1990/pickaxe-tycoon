/** Discoverable LCP image — replaces CSS background so the browser can fetch early. */
export default function HeroBackground() {
  return (
    <img
      src="/hero-bg.webp"
      alt=""
      aria-hidden
      width={768}
      height={432}
      className="absolute inset-0 h-full w-full object-cover object-center opacity-20"
      fetchPriority="high"
      loading="eager"
      decoding="async"
    />
  );
}
