'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackEvent('code_copy', { location: 'codes_active' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
