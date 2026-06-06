'use client';

import { useEffect, useState } from 'react';

interface ContactEmailProps {
  local: string;
  domain: string;
  className?: string;
  /** Show address text after hydration; default true */
  showAddress?: boolean;
  children?: React.ReactNode;
}

/**
 * Opens mailto via client-side JS. Email is assembled only after hydration so
 * Cloudflare Email Obfuscation does not rewrite HTML to /cdn-cgi/l/email-protection.
 */
export default function ContactEmail({
  local,
  domain,
  className = 'text-amber-400 hover:text-amber-300 cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit underline-offset-2 hover:underline',
  showAddress = true,
  children,
}: ContactEmailProps) {
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const email = `${local}@${domain}`;

  function openMail() {
    window.location.href = `mailto:${email}`;
  }

  async function copyEmail(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      openMail();
    }
  }

  const label =
    children ?? (showAddress && ready ? email : 'Contact us');

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button type="button" onClick={openMail} className={className}>
        {label}
      </button>
      {showAddress && ready && (
        <button
          type="button"
          onClick={copyEmail}
          className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400 hover:text-amber-300"
          aria-label={`Copy ${email}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
    </span>
  );
}
