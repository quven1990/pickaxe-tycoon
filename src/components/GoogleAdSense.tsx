import Script from 'next/script';

const ADSENSE_CLIENT = 'ca-pub-9101692675645964';

/** Load after page idle — AdSense lidar.js uses deprecated unload; deferred + Permissions-Policy mitigates GSC warning. */
export default function GoogleAdSense() {
  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
