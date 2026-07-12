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

### 第 1 步：确认资源类型（最重要）

GSC 里必须用下面**之一**，不要用 `http://` 或 `www` 单独建资源：

| 推荐 | 资源 |
|------|------|
| ⭐ 首选 | **网域资源** → `pickaxe-tycoon.xyz`（DNS 验证） |
| 备选 | **网址前缀** → `https://pickaxe-tycoon.xyz/`（注意是 **https** + 无 www） |

### 第 2 步：提交 sitemap

在 **站点地图** 输入框只填（推荐新地址）：

```
sitemap_index.xml
```

或完整 URL：

```
https://pickaxe-tycoon.xyz/sitemap_index.xml
```

（`sitemap_index.xml` 与 `sitemap.xml` 内容相同，均含全部 10 个页面 URL，任选其一提交 GSC 即可。）

### 第 3 步：用 URL 检查工具验证（最关键）

GSC → **网址检查** → 输入 `https://pickaxe-tycoon.xyz/sitemap_index.xml` → 点 **测试实际网址**（不是「测试已发布网址」）。

| 结果 | 含义 |
|------|------|
| ✅ 200 + 能下载 XML | sitemap 没问题，GSC 站点地图页只是**更新慢**（等 24–72h） |
| ❌ 无法抓取 / 403 / 5xx | Cloudflare 仍在拦 Google，按下面 Cloudflare 项操作 |

> **说明：** 我用 curl 模拟 Googlebot 访问 sitemap 返回 **200**，文件合法。若 GSC「站点地图」仍显示无法抓取但「网址检查」成功，属于 GSC 状态延迟，不必反复删加 sitemap。

### 常见误区：GSC 资源类型错了

| 错误资源 | 问题 |
|----------|------|
| `http://pickaxe-tycoon.xyz` | 协议不对，sitemap 易报无法抓取 |
| `https://www.pickaxe-tycoon.xyz` | www 会 301，部分 GSC 视图会异常 |
| `pickaxe-tycoon.pages.dev` | 不是正式域名 |

**正确：** 网域资源 `pickaxe-tycoon.xyz`，或网址前缀 `https://pickaxe-tycoon.xyz/`

### robots.txt / sitemap「无法抓取」排查

1. **确认 GSC 属性域名正确** — 本站点是 `pickaxe-tycoon.xyz`，不要提交到 `http://`、`www` 或其他域名属性。
2. **Cloudflare Managed robots.txt（强烈建议关闭）** — Dashboard → **Security** → **Bots** → 关闭 **Managed robots.txt** / Content Signals。开启后 Cloudflare 会在你的 `robots.txt` **前面**插入大段 AI 爬虫规则，部分 GSC 抓取会异常。本站使用静态 `public/robots.txt`。
3. **Bot Fight Mode / Super Bot Fight Mode** — **必须关闭**或确保 Verified Bots 放行。路径：**Security → Bots**。这是 GSC「无法抓取」最常见原因之一。
4. **WAF 自定义规则** — 检查是否有规则拦截 `Googlebot` 或 `sitemap.xml`。
5. **SSL 模式** — **SSL/TLS → Overview** 选 **Full** 或 **Full (strict)**，不要 Flexible。
6. **删除旧 sitemap 后等 24–48h** — GSC 状态更新很慢；删除 → 重新提交 `sitemap.xml` 后，「上次读取」可能要隔天才有。
7. **`/cdn-cgi/l/email-protection` 404** — Cloudflare **Scrape Shield → Email Address Obfuscation** 会把 HTML 里的 `user@domain` 改成 `/cdn-cgi/l/email-protection` 链接；静态 Pages 无该路由，爬虫/GSC 会报 404。
   - **推荐（一劳永逸）**：Cloudflare Dashboard → 域名 **pickaxe-tycoon.xyz** → **Scrape Shield** → 关闭 **Email Address Obfuscation**。
   - **代码侧**：`ContactEmail` 仅在浏览器 hydration 后拼接邮箱，静态 HTML 不出现 `@` 完整地址；`robots.txt` 已 `Disallow: /cdn-cgi/`。
   - **验证**：`curl -sL https://pickaxe-tycoon.xyz/about/ | grep email-protection` 应无输出。
8. **sitemap 响应头** — `curl -sI https://pickaxe-tycoon.xyz/sitemap.xml` 应只有**一条** `cache-control`，`content-type: application/xml`。若出现两条 cache-control 说明 `_headers` 规则冲突（已修复）。
9. **上线后页面无 CSS** — 通常是部署后 CDN 仍缓存旧 HTML。GitHub Actions 在 **Deploy to Cloudflare Pages** 之后会自动跑 **Purge Cloudflare cache**；若该步失败，去 Token 补 **Zone → Cache Purge** 权限后 Re-run。也可手动：Cloudflare **Caching → Purge Everything**。
10. **自检命令**：
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

## 部署失败排查（Cloudflare 红色记录）

若 Cloudflare Pages 里每天出现 `chore: daily Roblox stats sync` 的红色失败，但你没有手动操作，通常是 **两套部署源冲突**：

| 部署源 | 触发方式 | 本项目预期 |
|--------|----------|------------|
| **GitHub Actions + wrangler** | push / daily sync 完成后 | ✅ 唯一正确路径 |
| **Cloudflare Pages 直连 Git** | 每次 push 自动构建 | ❌ 应关闭 |

### 原因

1. `Daily Roblox Stats Sync` 用 `github-actions[bot]` 自动 push → **不会触发** GitHub 的 `push` workflow（GitHub 防循环机制）。
2. Cloudflare Pages 若仍绑定 GitHub 仓库，会对每次 bot push 尝试构建，但 Pages 侧没有正确 build 配置 → 显示 `No deployment available`（红色）。
3. 你手动 push（如 Evomon 外链）时，GitHub Actions 能成功部署（绿色那条）。

### 修复步骤

**A. 关闭 Cloudflare 直连 Git（必做，一次即可）**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → **pickaxe-tycoon**
2. **Settings** → **Builds & deployments**（或 **Build configuration**）
3. 若显示已连接 GitHub 仓库 → **Disconnect** / 改为 **Direct Upload only**
4. 之后只由 GitHub Actions 的 `wrangler pages deploy` 上传 `out/`

**B. 确认 GitHub Secret 有效**

1. [Actions Secrets](https://github.com/quven1990/pickaxe-tycoon/settings/secrets/actions) → `CLOUDFLARE_API_TOKEN` 存在且未过期
2. Token 权限：Account **Pages Edit** + Zone **Read** + **Cache Purge**

**C. 手动验证部署**

1. [Actions](https://github.com/quven1990/pickaxe-tycoon/actions) → **Deploy to Cloudflare Pages** → **Run workflow**
2. 或本地：`npm run deploy`（需 `CLOUDFLARE_API_TOKEN`）

`deploy-cloudflare.yml` 已配置：daily sync 完成后自动链式触发 Deploy，无需每天手动操作。
