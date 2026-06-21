/** Inline layout styles so LCP can paint before the Tailwind bundle loads. */
const heroBgStyle = {
  position: 'absolute' as const,
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  objectPosition: 'center' as const,
  opacity: 0.2,
};

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
      style={heroBgStyle}
      fetchPriority="high"
      loading="eager"
      decoding="sync"
    />
  );
}
