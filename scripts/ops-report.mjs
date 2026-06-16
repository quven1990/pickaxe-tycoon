#!/usr/bin/env node
/**
 * Unified ops snapshot: Plausible + GA4 + GSC + Bing Webmaster.
 * Requires credentials in .env.local — see docs/OPS-ANALYTICS.md
 *
 * Usage:
 *   npm run ops:report
 *   npm run ops:report -- --days 28
 *   npm run ops:report -- --json
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvLocal, PROJECT_ROOT } from './lib/load-env.mjs';

loadEnvLocal();

const SITE = process.env.OPS_SITE_DOMAIN ?? 'pickaxe-tycoon.xyz';
const DAYS = Number(process.argv.includes('--days')
  ? process.argv[process.argv.indexOf('--days') + 1]
  : 7);
const JSON_OUT = process.argv.includes('--json');

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function missing(label, hint) {
  return { ok: false, source: label, error: `Missing credentials: ${hint}` };
}

async function fetchPlausible() {
  const apiKey = process.env.PLAUSIBLE_API_KEY;
  const baseUrl = (process.env.PLAUSIBLE_BASE_URL ?? 'https://plausible.shipsolo.io').replace(/\/$/, '');
  if (!apiKey) return missing('Plausible', 'PLAUSIBLE_API_KEY');

  const body = {
    site_id: SITE,
    metrics: ['visitors', 'pageviews', 'bounce_rate', 'visit_duration'],
    date_range: `${DAYS}d`,
  };

  const res = await fetch(`${baseUrl}/api/v2/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, source: 'Plausible', error: `HTTP ${res.status}: ${text}` };
  }

  const data = await res.json();
  const metrics = data.results?.[0]?.metrics ?? data.metrics ?? data;

  const topPagesBody = {
    site_id: SITE,
    metrics: ['visitors', 'pageviews'],
    date_range: `${DAYS}d`,
    dimensions: ['event:page'],
    order_by: [['visitors', 'desc']],
    pagination: { limit: 8, offset: 0 },
  };

  const pagesRes = await fetch(`${baseUrl}/api/v2/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topPagesBody),
  });

  let topPages = [];
  if (pagesRes.ok) {
    const pagesData = await pagesRes.json();
    topPages = (pagesData.results ?? []).map((row) => ({
      page: row.dimensions?.[0] ?? row.dimension ?? '—',
      visitors: row.metrics?.[0] ?? row.visitors,
      pageviews: row.metrics?.[1] ?? row.pageviews,
    }));
  }

  const sourcesBody = {
    site_id: SITE,
    metrics: ['visitors'],
    date_range: `${DAYS}d`,
    dimensions: ['visit:source'],
    order_by: [['visitors', 'desc']],
    pagination: { limit: 8, offset: 0 },
  };

  const sourcesRes = await fetch(`${baseUrl}/api/v2/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sourcesBody),
  });

  let topSources = [];
  if (sourcesRes.ok) {
    const sourcesData = await sourcesRes.json();
    topSources = (sourcesData.results ?? []).map((row) => ({
      source: row.dimensions?.[0] ?? '—',
      visitors: row.metrics?.[0],
    }));
  }

  return {
    ok: true,
    source: 'Plausible',
    period: `${DAYS}d`,
    totals: {
      visitors: metrics[0] ?? metrics.visitors,
      pageviews: metrics[1] ?? metrics.pageviews,
      bounce_rate: metrics[2] ?? metrics.bounce_rate,
      visit_duration: metrics[3] ?? metrics.visit_duration,
    },
    topPages,
    topSources,
  };
}

function getGoogleAuth() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyPath) return null;
  const abs = resolve(PROJECT_ROOT, keyPath);
  const raw = JSON.parse(readFileSync(abs, 'utf8'));
  return raw;
}

async function fetchGa4() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const creds = getGoogleAuth();
  if (!propertyId) return missing('GA4', 'GA4_PROPERTY_ID');
  if (!creds) return missing('GA4', 'GOOGLE_APPLICATION_CREDENTIALS');

  try {
    const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: creds.client_email,
        private_key: creds.private_key,
      },
    });

    const [overview] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'engagementRate' },
      ],
    });

    const [channels] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 8,
    });

    const [pages] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 8,
    });

    const [referrers] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    });

    const row = overview.rows?.[0];
    return {
      ok: true,
      source: 'GA4',
      period: `last ${DAYS} days`,
      totals: {
        activeUsers: row?.metricValues?.[0]?.value,
        sessions: row?.metricValues?.[1]?.value,
        pageviews: row?.metricValues?.[2]?.value,
        engagementRate: row?.metricValues?.[3]?.value,
      },
      channels: (channels.rows ?? []).map((r) => ({
        channel: r.dimensionValues?.[0]?.value,
        sessions: r.metricValues?.[0]?.value,
      })),
      topPages: (pages.rows ?? []).map((r) => ({
        path: r.dimensionValues?.[0]?.value,
        pageviews: r.metricValues?.[0]?.value,
        users: r.metricValues?.[1]?.value,
      })),
      topSources: (referrers.rows ?? []).map((r) => ({
        source: r.dimensionValues?.[0]?.value,
        medium: r.dimensionValues?.[1]?.value,
        sessions: r.metricValues?.[0]?.value,
      })),
    };
  } catch (err) {
    return { ok: false, source: 'GA4', error: err.message };
  }
}

async function fetchGsc() {
  const siteUrl = process.env.GSC_SITE_URL ?? `sc-domain:${SITE}`;
  const creds = getGoogleAuth();
  if (!creds) return missing('GSC', 'GOOGLE_APPLICATION_CREDENTIALS');

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: creds.client_email,
        private_key: creds.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const startDate = isoDaysAgo(DAYS);
    const endDate = todayIso();

    const [summary, queries, pages] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          rowLimit: 1,
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 10,
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 10,
        },
      }),
    ]);

    const sumRow = summary.data.rows?.[0];
    return {
      ok: true,
      source: 'GSC',
      siteUrl,
      period: `${startDate} → ${endDate}`,
      totals: {
        clicks: sumRow?.clicks ?? 0,
        impressions: sumRow?.impressions ?? 0,
        ctr: sumRow?.ctr ?? 0,
        position: sumRow?.position ?? 0,
      },
      topQueries: (queries.data.rows ?? []).map((r) => ({
        query: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      topPages: (pages.data.rows ?? []).map((r) => ({
        page: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
    };
  } catch (err) {
    return { ok: false, source: 'GSC', error: err.message };
  }
}

async function fetchBing() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  const siteUrl = process.env.BING_SITE_URL ?? `https://${SITE}/`;
  if (!apiKey) return missing('Bing', 'BING_WEBMASTER_API_KEY');

  const base = 'https://ssl.bing.com/webmaster/api.svc/json';
  const qs = new URLSearchParams({ siteUrl, apikey: apiKey });

  try {
    const [queryRes, pageRes, trafficRes] = await Promise.all([
      fetch(`${base}/GetQueryStats?${qs}`),
      fetch(`${base}/GetPageStats?${qs}`),
      fetch(`${base}/GetRankAndTrafficStats?${qs}`),
    ]);

    const queryJson = queryRes.ok ? await queryRes.json() : { d: null };
    const pageJson = pageRes.ok ? await pageRes.json() : { d: null };
    const trafficJson = trafficRes.ok ? await trafficRes.json() : { d: null };

    if (!queryRes.ok && !pageRes.ok) {
      const errText = await queryRes.text();
      return { ok: false, source: 'Bing', error: `HTTP ${queryRes.status}: ${errText.slice(0, 200)}` };
    }

    const queries = (queryJson.d ?? []).slice(0, 10).map((r) => ({
      query: r.Query ?? r.query,
      clicks: r.Clicks ?? r.clicks,
      impressions: r.Impressions ?? r.impressions,
      ctr: r.AvgClickPosition ?? r.avgClickPosition,
    }));

    const pages = (pageJson.d ?? []).slice(0, 10).map((r) => ({
      page: r.Url ?? r.url,
      clicks: r.Clicks ?? r.clicks,
      impressions: r.Impressions ?? r.impressions,
    }));

    const traffic = (trafficJson.d ?? []).slice(-DAYS);

    return {
      ok: true,
      source: 'Bing',
      siteUrl,
      topQueries: queries,
      topPages: pages,
      dailyTraffic: traffic.map((r) => ({
        date: r.Date ?? r.date,
        clicks: r.Clicks ?? r.clicks,
        impressions: r.Impressions ?? r.impressions,
      })),
    };
  } catch (err) {
    return { ok: false, source: 'Bing', error: err.message };
  }
}

function formatReport(report) {
  const lines = [];
  lines.push(`# Ops Report — ${SITE}`);
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Period: last ${DAYS} days`);
  lines.push('');

  for (const block of report.blocks) {
    lines.push(`## ${block.source}${block.ok ? '' : ' (unavailable)'}`);
    if (!block.ok) {
      lines.push(`> ${block.error}`);
      lines.push('');
      continue;
    }

    if (block.totals) {
      lines.push('**Totals**');
      for (const [k, v] of Object.entries(block.totals)) {
        const display = typeof v === 'number' && k.includes('rate')
          ? `${(v * 100).toFixed(1)}%`
          : typeof v === 'number' && k === 'position'
            ? v.toFixed(1)
            : v;
        lines.push(`- ${k}: ${display}`);
      }
      lines.push('');
    }

    if (block.topQueries?.length) {
      lines.push('**Top queries**');
      for (const q of block.topQueries) {
        lines.push(`- ${q.query}: ${q.clicks} clicks / ${q.impressions} imp`);
      }
      lines.push('');
    }

    if (block.topPages?.length) {
      lines.push('**Top pages**');
      for (const p of block.topPages) {
        const label = p.page ?? p.path ?? '—';
        lines.push(`- ${label}: ${p.clicks ?? p.visitors ?? p.pageviews} (${p.impressions ? `${p.impressions} imp` : 'views'})`);
      }
      lines.push('');
    }

    if (block.topSources?.length) {
      lines.push('**Top sources**');
      for (const s of block.topSources) {
        const label = s.medium ? `${s.source} / ${s.medium}` : s.source;
        lines.push(`- ${label}: ${s.visitors ?? s.sessions}`);
      }
      lines.push('');
    }

    if (block.channels?.length) {
      lines.push('**Channels (GA4)**');
      for (const c of block.channels) {
        lines.push(`- ${c.channel}: ${c.sessions} sessions`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

async function main() {
  const [plausible, ga4, gsc, bing] = await Promise.all([
    fetchPlausible(),
    fetchGa4(),
    fetchGsc(),
    fetchBing(),
  ]);

  const report = {
    site: SITE,
    generatedAt: new Date().toISOString(),
    days: DAYS,
    blocks: [plausible, ga4, gsc, bing],
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(formatReport(report));

  const failed = report.blocks.filter((b) => !b.ok);
  if (failed.length) {
    console.log('---');
    console.log(`${failed.length} source(s) need setup — see docs/OPS-ANALYTICS.md`);
    process.exitCode = failed.length === report.blocks.length ? 1 : 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
