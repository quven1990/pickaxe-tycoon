/** Split address so static HTML never contains a full `user@domain` string (Cloudflare obfuscation). */
export function parseEmailAddress(email: string): { local: string; domain: string } {
  const at = email.indexOf('@');
  if (at === -1) return { local: email, domain: '' };
  return { local: email.slice(0, at), domain: email.slice(at + 1) };
}
