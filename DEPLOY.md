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

## 预期地址

| 环境 | URL |
|------|-----|
| Cloudflare Pages 默认 | https://pickaxe-tycoon.pages.dev |
| 自定义域名 | https://pickaxe-tycoon.xyz |

> 注意：当前 `pickaxe-tycoon.pages.dev` 可能还是旧版内容，成功部署后会更新为新站。

## CI 状态

首次 push 的 workflow 因缺少 `CLOUDFLARE_API_TOKEN` 失败（预期行为）。添加 Secret 后 re-run 即可。
