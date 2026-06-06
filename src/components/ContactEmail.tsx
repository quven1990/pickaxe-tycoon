'use client';

import { useState } from 'react';

interface ContactEmailProps {
  email: string;
  className?: string;
  /** Show address text; default true */
  showAddress?: boolean;
  children?: React.ReactNode;
}

/**
 * Opens mailto via client-side JS so Cloudflare Email Obfuscation
 * does not rewrite links to /cdn-cgi/l/email-protection (404).
 */
export default function ContactEmail({
  email,
  className = 'text-amber-400 hover:text-amber-300 cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit underline-offset-2 hover:underline',
  showAddress = true,
  children,
}: ContactEmailProps) {
  const [copied, setCopied] = useState(false);

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

  const label = children ?? (showAddress ? email : 'email us');

  return (
    <span className="inline-flex items-center gap-2 flex-wrap">
      <button type="button" onClick={openMail} className={className}>
        {label}
      </button>
      {showAddress && (
        <button
          type="button"
          onClick={copyEmail}
          className="px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-400 hover:text-amber-300 border border-zinc-700"
          aria-label={`Copy ${email}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
    </span>
  );
}
