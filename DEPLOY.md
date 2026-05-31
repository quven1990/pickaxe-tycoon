# 部署配置（一次性）

GitHub Actions 已配置，首次部署需要添加 Cloudflare Token。

## 第 1 步：添加 GitHub Secret

1. 打开 [pickaxe-tycoon Secrets](https://github.com/quven1990/pickaxe-tycoon/settings/secrets/actions)
2. 点击 **New repository secret**
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: 与 `build-a-ring-farm-wiki` 项目相同的 Token（或新建一个）

> 创建 Token：https://dash.cloudflare.com/profile/api-tokens  
> 模板：**Edit Cloudflare Workers**（包含 Pages 部署权限）

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
