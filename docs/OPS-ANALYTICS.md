# 运营数据 API 接入（让 Cursor Agent 直接读数）

目标：在对话里说「帮我看下最近 7 天流量」，Agent 运行 `npm run ops:report` 即可拉取 **Plausible / GA4 / GSC / Bing** 汇总，用于决策。

> 后台虽已开通，但 **API 凭证不会自动进项目**。按下面配一次 `.env.local` 后，Agent 就能通过接口读数据。

---

## 快速开始

```bash
cp .env.example .env.local
# 按下面章节填好各平台的 key / ID
mkdir -p credentials
# 把 Google 服务账号 JSON 放到 credentials/google-service-account.json

npm install          # 安装 googleapis + @google-analytics/data
npm run ops:report   # 人类可读报告
npm run ops:report -- --json   # JSON（方便 Agent 解析）
npm run ops:report -- --days 28
```

`.env.local` 和 `credentials/*.json` 已在 `.gitignore`，**不要提交到 Git**。

---

## 1. Plausible（shipsolo 实例）

1. 登录 https://plausible.shipsolo.io
2. 右上角账号 → **Settings** → **API keys**
3. 新建 **Stats API** key，复制到 `.env.local`：

```env
PLAUSIBLE_BASE_URL=https://plausible.shipsolo.io
PLAUSIBLE_API_KEY=你的key
```

4. `site_id` 脚本里默认用 `pickaxe-tycoon.xyz`（与 Plausible 里添加的域名一致）

验证：

```bash
curl -X POST 'https://plausible.shipsolo.io/api/v2/query' \
  -H "Authorization: Bearer $PLAUSIBLE_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"site_id":"pickaxe-tycoon.xyz","metrics":["visitors"],"date_range":"7d"}'
```

---

## 2. GA4 + GSC（共用 Google 服务账号）

Google 两套 API 用 **同一个服务账号 JSON**，一次配置两边都能用。

### 2.1 创建 Cloud 项目 & 启用 API

1. https://console.cloud.google.com
2. 新建或选择项目（如 `pickaxe-tycoon-ops`）
3. **API 和服务 → 库**，启用：
   - **Google Analytics Data API**
   - **Google Search Console API**

### 2.2 创建服务账号

1. **IAM → 服务账号 → 创建**
2. 名称随意，如 `pickaxe-ops-reader`
3. **密钥 → 添加密钥 → JSON** → 下载
4. 保存到项目：`credentials/google-service-account.json`
5. `.env.local`：

```env
GOOGLE_APPLICATION_CREDENTIALS=credentials/google-service-account.json
```

记下 JSON 里的 `client_email`（形如 `xxx@xxx.iam.gserviceaccount.com`）。

### 2.3 授权 GA4

1. https://analytics.google.com → **管理**
2. 选对 **Pickaxe Tycoon** 属性
3. **属性访问权限 → +** → 添加服务账号邮箱 → 角色 **查看者**

查 **Property ID**（纯数字，不是 `G-0DQRK66KZR`）：

- 管理 → 属性设置 → **属性 ID**

```env
GA4_PROPERTY_ID=123456789
```

站点代码里的 Measurement ID：`G-0DQRK66KZR`（`src/components/GoogleAnalytics.tsx`）

### 2.4 授权 GSC

1. https://search.google.com/search-console
2. 选对 `pickaxe-tycoon.xyz` 资源
3. **设置 → 用户和权限 → 添加用户**
4. 填服务账号 `client_email` → 权限 **受限** 或 **完整**（只读够用）

```env
# 网域资源（推荐）
GSC_SITE_URL=sc-domain:pickaxe-tycoon.xyz
# 或网址前缀资源
# GSC_SITE_URL=https://pickaxe-tycoon.xyz/
```

---

## 3. Bing Webmaster

1. https://www.bing.com/webmasters → 选对站点
2. **设置 → API 访问 → 生成 API 密钥**

```env
BING_WEBMASTER_API_KEY=你的key
BING_SITE_URL=https://pickaxe-tycoon.xyz/
```

> IndexNow（部署自动提交）≠ Webmaster API。看搜索点击数据必须用 API key。

---

## 4. 在 Cursor 里怎么用

配好 `.env.local` 后，对话中可以直接说：

- 「跑一下 ops report，帮我分析该推哪篇内容」
- 「对比 GSC 和 GA4 最近 7 天，/guides/max-level/ 表现如何」
- 「YouTube 短链来的流量在 Plausible 里占比多少」

Agent 会执行：

```bash
npm run ops:report -- --days 7
```

并根据输出给决策建议。

### 可选：MCP（更自动化）

若希望 Agent **不用跑 shell 也能调 Plausible**，可在 Cursor **Settings → MCP** 添加社区 server（如 `plausible-mcp`），`PLAUSIBLE_API_KEY` 和 `PLAUSIBLE_API_URL=https://plausible.shipsolo.io` 配在 MCP env 里。

GA4/GSC 暂无官方 MCP，本项目用 `ops-report` 脚本即可。

---

## 5. 指标怎么对照（避免误判）

| 场景 | 优先看 |
|------|--------|
| 实时有没有人 | Plausible Realtime |
| 页面受欢迎程度 | Plausible top pages + GA4 页面路径 |
| Google 搜索带来了多少点击 | **GSC**（只有 Google 搜索） |
| Bing 搜索表现 | **Bing Webmaster** |
| YouTube 评论短链效果 | GA4 `youtube / referral` 或 Plausible `visit:source` |
| 用户卡在哪个按钮 | Microsoft Clarity（`wzahp4y5hr`，需单独登录后台） |
| 广告收入 | AdSense 后台（`ca-pub-9101692675645964`） |

**数字对不齐是正常的**：GA4 和 Plausible 统计口径不同；GSC 只含 Google 自然搜索点击，不含直接访问。

---

## 6. 故障排查

| 报错 | 处理 |
|------|------|
| Plausible 401 | API key 错误或过期，重新生成 |
| GA4 PERMISSION_DENIED | 服务账号未加入 GA4 属性，或 Property ID 填错 |
| GSC User does not have sufficient permission | 服务账号未加入 GSC；或 `GSC_SITE_URL` 与资源类型不匹配 |
| Bing 401/403 | API key 错误或 siteUrl 与 Bing 里绑定的 URL 不一致 |
| 全部 skipped | `.env.local` 不存在或为空，先 `cp .env.example .env.local` |

---

## 7. 安全提醒

- 不要把 `.env.local`、`credentials/*.json` 提交到 Git
- 服务账号只需 **只读** 权限
- 若 key 泄露：Cloud Console 删旧 key → 各平台轮换
