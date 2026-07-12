#!/usr/bin/env node
/**
 * One-shot / CI Cloudflare P0 fixes:
 * 1. Disable managed robots.txt (stops Content-Signals prepend on /robots.txt)
 * 2. Disable Pages Git auto-deploy (wrangler direct upload is the only deploy path)
 */

const TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim().replace(/\r/g, '');
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? 'a17c720d27e1e3b502bef6b0d57c5472';
const ZONE_NAME = process.env.PURGE_ZONE_NAME ?? 'pickaxe-tycoon.xyz';
const PAGES_PROJECT = process.env.PAGES_PROJECT_NAME ?? 'pickaxe-tycoon';
const SITE_URL = process.env.VERIFY_SITE_URL ?? `https://${ZONE_NAME}`;

async function cfRequest(path, { method = 'GET', body } = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { ok: Boolean(data.success), data, status: res.status };
}

async function cfFetch(path, options) {
  const { ok, data, status } = await cfRequest(path, options);
  if (!ok) {
    throw new Error(`${path} HTTP ${status}: ${JSON.stringify(data.errors ?? data.messages ?? data)}`);
  }
  return data.result;
}

async function getZoneId() {
  const zones = await cfFetch(`/zones?name=${encodeURIComponent(ZONE_NAME)}`);
  if (!zones?.length) throw new Error(`Zone not found: ${ZONE_NAME}`);
  return zones[0].id;
}

async function disableManagedRobotsTxt(zoneId) {
  const payload = {
    is_robots_txt_managed: false,
    cf_robots_variant: 'off',
  };
  for (const method of ['PUT', 'PATCH']) {
    const { ok, data, status } = await cfRequest(`/zones/${zoneId}/bot_management`, {
      method,
      body: payload,
    });
    if (ok) {
      console.log(`Managed robots.txt disabled via ${method}.`);
      return true;
    }
    const code = data.errors?.[0]?.code;
    if (status === 404 || code === 10000) {
      console.log(`bot_management ${method} unavailable on this plan (${status}) — skip.`);
      return false;
    }
  }
  console.warn('::warning::Could not disable managed robots.txt via API — disable in Dashboard → Security → Bots.');
  return false;
}

async function disablePagesGitAutoDeploy() {
  const project = await cfFetch(`/accounts/${ACCOUNT_ID}/pages/projects/${PAGES_PROJECT}`);
  const source = project?.source;
  if (!source || source.type !== 'github') {
    console.log('Pages project is not Git-linked — skip auto-deploy disable.');
    return;
  }

  const config = source.config ?? {};
  if (config.deployments_enabled === false && config.production_deployments_enabled === false) {
    console.log('Pages Git auto-deploy already disabled.');
    return;
  }

  await cfFetch(`/accounts/${ACCOUNT_ID}/pages/projects/${PAGES_PROJECT}`, {
    method: 'PATCH',
    body: {
      source: {
        type: 'github',
        config: {
          ...config,
          deployments_enabled: false,
          production_deployments_enabled: false,
        },
      },
    },
  });
  console.log('Pages Git auto-deploy disabled (wrangler remains deploy path).');
}

async function verifyRobotsTxt(managedDisabled) {
  const res = await fetch(`${SITE_URL.replace(/\/$/, '')}/robots.txt`, { redirect: 'follow' });
  if (!res.ok) throw new Error(`robots.txt HTTP ${res.status}`);
  const text = await res.text();
  if (text.includes('BEGIN Cloudflare Managed content')) {
    const msg =
      'robots.txt still prepends Cloudflare managed block — disable Managed robots.txt in Dashboard → Security → Bots.';
    if (managedDisabled) {
      throw new Error(`${msg} (API reported success; wait a few minutes and re-run.)`);
    }
    console.warn(`::warning::${msg}`);
    return;
  }
  if (!text.includes('pickaxe-tycoon.xyz/sitemap_index.xml')) {
    throw new Error('robots.txt missing project sitemap line.');
  }
  console.log('robots.txt verified (site rules only).');
}

async function main() {
  if (!TOKEN) throw new Error('Missing CLOUDFLARE_API_TOKEN');

  const zoneId = await getZoneId();
  console.log(`Zone ${ZONE_NAME} → ${zoneId}`);

  const managedDisabled = await disableManagedRobotsTxt(zoneId);
  await disablePagesGitAutoDeploy();

  // Allow edge config to propagate before verification.
  await new Promise((r) => setTimeout(r, 5000));
  await verifyRobotsTxt(managedDisabled);
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
