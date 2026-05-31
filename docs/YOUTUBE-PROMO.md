# YouTube 评论推广 & 来源追踪

## 追踪原理

评论里不要贴裸链接，使用 **带 UTM 的短链**，GA4 / Plausible 会自动记录来源。

### 短链格式（推荐，按视频区分）

```
https://pickaxe-tycoon.xyz/go/?v=VIDEO_ID&to=/calculator/
```

| 参数 | 含义 | 示例 |
|------|------|------|
| `v` | 视频 ID（写入 utm_campaign） | `qLk29P_Itz4` |
| `to` | 落地页路径 | `/calculator/`、`/codes/`、`/` |
| `c` | 可选，评论变体 A/B | `helpful-tip` |

跳转后实际 URL 示例：

```
https://pickaxe-tycoon.xyz/calculator/?utm_source=youtube&utm_medium=comment&utm_campaign=qLk29P_Itz4
```

### 完整 UTM 链接（不用短链时）

```
https://pickaxe-tycoon.xyz/calculator/?utm_source=youtube&utm_medium=comment&utm_campaign=qLk29P_Itz4
```

---

## 在哪里看数据

### Google Analytics (GA4)

1. [GA4 后台](https://analytics.google.com/) → 你的媒体资源
2. **报告 → 流量获取 → 流量获取**
3. 维度选 **会话来源/媒介**，找 `youtube / comment`
4. 或 **探索** → 添加维度 `Session campaign` 看每个视频 ID

### Plausible (shipsolo.io)

1. 打开 Plausible 仪表盘
2. 筛选 **Source** = `youtube` 或 **UTM Campaign** = 视频 ID

---

## 适合评论的视频（Pickaxe Tycoon，非 Simulator）

| 视频 | 频道 | 适合推广的页面 | 短链示例 |
|------|------|----------------|----------|
| [META Beginner Guide Tutorial](https://www.youtube.com/watch?v=qLk29P_Itz4) | AbductedByRobloxians | `/calculator/` | `.../go/?v=qLk29P_Itz4&to=/calculator/` |
| [Spending $9,999,999 to MAX LEVEL](https://www.youtube.com/watch?v=TRQx52aLZOM) | Melon and Sunny Games | `/tier-list/` | `.../go/?v=TRQx52aLZOM&to=/tier-list/` |
| [Just Got INSANE](https://www.youtube.com/watch?v=8ZHfR3bP6dg) | Itz Shivraj GamerZ | `/` | `.../go/?v=8ZHfR3bP6dg` |
| [luckiest players](https://www.youtube.com/watch?v=M3A09zZl-ik) | MoreofApologist | `/wiki/` | `.../go/?v=M3A09zZl-ik&to=/wiki/` |
| [Open 18 lvl axe](https://www.youtube.com/watch?v=Y7vmmbAcweU) | MyStreetFun | `/wiki/` | `.../go/?v=Y7vmmbAcweU&to=/wiki/` |
| [100x MONEY Noob start](https://www.youtube.com/watch?v=dgMUGdxTt3E) | NagRoblox | `/beginner-guide/` | `.../go/?v=dgMUGdxTt3E&to=/beginner-guide/` |
| [Took Pickaxe Tycoon TOO FAR](https://www.youtube.com/watch?v=tr81UVBjveo) | Bax | `/calculator/` | `.../go/?v=tr81UVBjveo&to=/calculator/` |
| [Open mega Axe](https://www.youtube.com/watch?v=uZNLyLcVxGE) | MyStreetFun | `/tier-list/` | `.../go/?v=uZNLyLcVxGE&to=/tier-list/` |

> ⚠️ 避开 **Pickaxe Simulator** / **Pickaxe Mining Simulator** 视频（不同游戏）。

---

## 评论模板（英文，提供价值，避免 spam）

**新手向视频：**

> If you're planning merges, this free merge calculator shows how many pickaxes you need from Wood → Legendary: https://pickaxe-tycoon.xyz/go/?v=VIDEO_ID&to=/calculator/ (unofficial fan site, updated daily)

**Codes 向（即使暂无码）：**

> No active codes confirmed yet — this page tracks Pickaxe Tycoon codes daily (not Pickaxe Simulator): https://pickaxe-tycoon.xyz/go/?v=VIDEO_ID&to=/codes/

**Tier / 进度向：**

> Full 24-tier pickaxe list + Magmatic Cavern info: https://pickaxe-tycoon.xyz/go/?v=VIDEO_ID&to=/wiki/

---

## 注意事项

1. **不要刷同一链接**：同一视频 1 条即可；多视频分散评论
2. **说明是 fan site**：避免被当成官方
3. **YouTube 可能隐藏含链接评论**：链接放回复、或 Pin 自己的补充评论
4. **定期在 GA4 看 `utm_campaign`**：哪个视频带来流量就重点维护哪条评论
