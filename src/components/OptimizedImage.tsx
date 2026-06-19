import type { CSSProperties } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
};

function webpSrc(src: string) {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

/** WebP + PNG/JPEG fallback — same visual, smaller transfer. */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  loading,
}: OptimizedImageProps) {
  const imgLoading = priority ? 'eager' : (loading ?? 'lazy');

  return (
    <picture className="contents">
      <source srcSet={webpSrc(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={imgLoading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'low'}
      />
    </picture>
  );
}
