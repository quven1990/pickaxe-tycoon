import Script from 'next/script';

const PLAUSIBLE_SCRIPT = 'https://plausible.shipsolo.io/js/pa-fxismSqWDBg3iZ0oQLSK9.js';

export default function PlausibleAnalytics() {
  return (
    <>
      <Script src={PLAUSIBLE_SCRIPT} strategy="lazyOnload" />
      <Script id="plausible-analytics" strategy="lazyOnload">
        {`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}
      </Script>
    </>
  );
}
