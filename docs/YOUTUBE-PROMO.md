# YouTube 评论推广 & 来源追踪

## 追踪原理

评论里不要贴裸链接，使用 **带 UTM 的短链**，GA4 / Plausible 会自动记录来源。

### 短链格式（YouTube 评论推荐 — 无 query，可点击）

```
https://pickaxe-tycoon.xyz/yt/VIDEO_ID/calculator/
https://pickaxe-tycoon.xyz/yt/VIDEO_ID/          → 首页
```

| 路径段 | 落地页 |
|--------|--------|
| `calculator` | 合并计算器 |
| `beginner-guide` | 新手指南 |
| `tier-list` | Tier 榜 |
| `wiki` | Wiki |
| `codes` | 兑换码 |

跳转后仍会附加 UTM（在浏览器跳转时写入），GA4 campaign = 视频 ID。

### 旧格式（勿用于 YouTube 评论）

```
https://pickaxe-tycoon.xyz/go/?v=VIDEO_ID&to=/calculator/
```

YouTube 常不把带 `?v=&to=` 的 URL 识别为可点击链接。

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

完整评论见 [`YOUTUBE-COMMENTS-READY.md`](./YOUTUBE-COMMENTS-READY.md)。

| 视频 | 频道 | 短链 |
|------|------|------|
| [META Beginner Guide](https://www.youtube.com/watch?v=qLk29P_Itz4) | AbductedByRobloxians | `/yt/qLk29P_Itz4/calculator/` |
| [Full Guide](https://www.youtube.com/watch?v=OOw3yi0C3J0) | Rondoblox | `/yt/OOw3yi0C3J0/beginner-guide/` |
| [NOOB to PRO](https://www.youtube.com/watch?v=h_byDzchcFY) | Stu | `/yt/h_byDzchcFY/beginner-guide/` |
| [How to Make Money](https://www.youtube.com/watch?v=uZzhQBvVH5Y) | Rondoblox | `/yt/uZzhQBvVH5Y/calculator/` |
| [Basic Overview 0 Robux](https://www.youtube.com/watch?v=YEcEekyjVVE) | MBT | `/yt/YEcEekyjVVE/beginner-guide/` |
| [100x MONEY Noob](https://www.youtube.com/watch?v=dgMUGdxTt3E) | NagRoblox | `/yt/dgMUGdxTt3E/beginner-guide/` |
| [NOOB to PRO](https://www.youtube.com/watch?v=FZDkXHjvbOM) | AJPlays | `/yt/FZDkXHjvbOM/beginner-guide/` |
| [MAX LEVEL $9,999,999](https://www.youtube.com/watch?v=TRQx52aLZOM) | Melon and Sunny Games | `/yt/TRQx52aLZOM/tier-list/` |
| [TOO FAR](https://www.youtube.com/watch?v=tr81UVBjveo) | Bax | `/yt/tr81UVBjveo/calculator/` |
| [Merging BILLIONS](https://www.youtube.com/watch?v=3v1cjdEOU7k) | OTTER ON ROBLOX | `/yt/3v1cjdEOU7k/calculator/` |
| [STRONGEST Pickaxe](https://www.youtube.com/watch?v=KjMpOvhBgdk) | Its Me Younger | `/yt/KjMpOvhBgdk/tier-list/` |
| [OVERPOWERED PICKAXE](https://www.youtube.com/watch?v=u8n7PtBBo30) | mykey | `/yt/u8n7PtBBo30/tier-list/` |
| [Open 18 lvl axe](https://www.youtube.com/watch?v=Y7vmmbAcweU) | MyStreetFun | `/yt/Y7vmmbAcweU/wiki/` |
| [Luckiest players](https://www.youtube.com/watch?v=M3A09zZl-ik) | MoreofApologist | `/yt/M3A09zZl-ik/wiki/` |
| [Just Got INSANE](https://www.youtube.com/watch?v=8ZHfR3bP6dg) | Itz Shivraj GamerZ | `/yt/8ZHfR3bP6dg/` |

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
