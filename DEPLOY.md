# 部署配置（一次性）

GitHub Actions 已配置，首次部署需要添加 Cloudflare Token。

## 第 1 步：添加 GitHub Secret

1. 打开 [pickaxe-tycoon Secrets](https://github.com/quven1990/pickaxe-tycoon/settings/secrets/actions)
2. 点击 **New repository secret**
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: 与 `build-a-ring-farm-wiki` 项目相同的 Token（或新建一个）

> 创建 Token：https://dash.cloudflare.com/profile/api-tokens  
> 权限需包含：
> - **Account → Cloudflare Pages → Edit**（部署）
> - **Zone → Zone → Read**（查 zone id）
> - **Zone → Cache Purge → Purge**（部署后自动清缓存）
>
> 可用模板 **Edit Cloudflare Workers**，再手动加上 Zone 的 Read + Cache Purge。

## 第 2 步：触发部署

Secret 添加后，任选一种方式：

**方式 A — 重新运行 workflow**
1. 打开 [Actions](https://github.com/quven1990/pickaxe-tycoon/actions)
2. 点击失败的 run → **Re-run all jobs**

**方式 B — 本地部署**
```bash
export CLOUDFLARE_API_TOKEN="你的token"
npm run deploy
```

**方式 C — 推送任意 commit 到 main**

## 第 3 步：绑定自定义域名

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → **pickaxe-tycoon**
2. Custom domains → Add → `pickaxe-tycoon.xyz`
3. Custom domains → Add → `www.pickaxe-tycoon.xyz`（两个都要加）

## 第 4 步：SSL 与 www 跳转（SEO 必做）

在 Cloudflare Dashboard → 选择域名 **pickaxe-tycoon.xyz**：

### SSL/TLS
1. **Overview** → 加密模式选 **Full** 或 **Full (strict)**（不要选 Flexible）
2. **Edge Certificates** → 开启 **Always Use HTTPS**
3. 可选：开启 **Automatic HTTPS Rewrites**

### www 跳转到根域名
任选一种方式：

**方式 A — Redirect Rules（推荐）**
1. **Rules** → **Redirect Rules** → Create rule
2. 条件：`Hostname equals www.pickaxe-tycoon.xyz`
3. 动作：Dynamic redirect → `https://pickaxe-tycoon.xyz${uri.path}`，301

**方式 B — Bulk Redirects**
1. **Bulk Redirects** → 添加从 `www.pickaxe-tycoon.xyz/*` 到 `https://pickaxe-tycoon.xyz/$1`

> 若 `www` 未绑定到 Pages 项目，HTTPS 会超时（522）。务必在 Pages 添加 `www` 自定义域名。

## 预期地址

| 环境 | URL |
|------|-----|
| Cloudflare Pages 默认 | https://pickaxe-tycoon.pages.dev |
| 自定义域名 | https://pickaxe-tycoon.xyz |
| www（应 301 跳转） | https://www.pickaxe-tycoon.xyz → pickaxe-tycoon.xyz |

## Google Search Console

域名 Active 后，提交 sitemap：
```
https://pickaxe-tycoon.xyz/sitemap.xml
```

### robots.txt / sitemap「无法抓取」排查

1. **确认 GSC 属性域名正确** — 本站点是 `pickaxe-tycoon.xyz`，不要提交到其他域名属性。
2. **Cloudflare Managed robots.txt** — Dashboard → **Security** / **Bots** → 若开启「Managed robots.txt」，Cloudflare 会在你的 `robots.txt` 前追加 AI 爬虫规则；一般不影响 Googlebot，但若异常可在 Cloudflare 关闭该功能。本站 `robots.txt` 由 `src/app/robots.ts` 在构建时生成（含 `Disallow: /go/`、`/yt/`、`/cdn-cgi/`）。
3. **Bot Fight Mode** — 若开启且拦截 Googlebot，在 **Security → Bots** 关闭或加白名单。
4. **部署后重新提交** — GSC → 站点地图 → 输入 `sitemap.xml` → 提交；或点已有条目右侧 **⋮** → 重新抓取。
5. **`/cdn-cgi/l/email-protection` 404** — Cloudflare **Scrape Shield → Email Address Obfuscation** 会把 HTML 里的 `user@domain` 改成 `/cdn-cgi/l/email-protection` 链接；静态 Pages 无该路由，爬虫/GSC 会报 404。
   - **推荐（一劳永逸）**：Cloudflare Dashboard → 域名 **pickaxe-tycoon.xyz** → **Scrape Shield** → 关闭 **Email Address Obfuscation**。
   - **代码侧**：`ContactEmail` 仅在浏览器 hydration 后拼接邮箱，静态 HTML 不出现 `@` 完整地址；`robots.txt` 已 `Disallow: /cdn-cgi/`。
   - **验证**：`curl -sL https://pickaxe-tycoon.xyz/about/ | grep email-protection` 应无输出。
6. **上线后页面无 CSS** — 通常是部署后浏览器/CDN 缓存了旧 HTML，仍引用已删除的 `/_next/static/css/<hash>.css`（404）。本站 `_headers` 对 HTML 设 `max-age=0, must-revalidate`，对 `/_next/static/*` 设 `immutable` 长缓存。若仍遇到，硬刷新或 Cloudflare **Caching → Purge Everything**。
7. **自检命令**：
   ```bash
   curl -I https://pickaxe-tycoon.xyz/sitemap.xml
   curl -A "Googlebot/2.1" https://pickaxe-tycoon.xyz/robots.txt
   ```
   均应返回 HTTP 200。

## 每日自动同步（Roblox 统计）

GitHub Actions workflow **`Daily Roblox Stats Sync`** 每天 UTC 6:00 运行：

1. 从 Roblox Games API 拉取 visits / favorites / online
2. 更新 `src/data/game.config.json` 统计与 `codes.json` 的 `lastChecked`
3. 校验 pickaxes / codes 数据结构
4. 有变更则 commit → 触发 Pages 部署

本地手动运行：

```bash
npm run sync:roblox
npm run validate:data
```

> 仅自动更新 **Roblox API 可验证的数据**。镐头、矿石、兑换码列表不会自动修改，需人工 PR。

## CI 状态

首次 push 的 workflow 因缺少 `CLOUDFLARE_API_TOKEN` 失败（预期行为）。添加 Secret 后 re-run 即可。
