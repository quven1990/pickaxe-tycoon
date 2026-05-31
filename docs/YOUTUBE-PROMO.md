# YouTube 评论推广 & 来源追踪

## 追踪（只看 YouTube 总量即可）

评论里用站内短路径，跳转后自动带上：

```
utm_source=youtube&utm_medium=comment
```

**GA4：** 报告 → 流量获取 → 来源/媒介 → 找 `youtube / comment`  
**Plausible：** Source = `youtube`

不需要按视频 ID 区分。

---

## 评论里写什么（裸域名，不要 https）

| 写这个 | 跳转 |
|--------|------|
| `pickaxe-tycoon.xyz/c` | 计算器 |
| `pickaxe-tycoon.xyz/b` | 新手指南 |
| `pickaxe-tycoon.xyz/t` | Tier 榜 |
| `pickaxe-tycoon.xyz/w` | Wiki |
| `pickaxe-tycoon.xyz` | 首页 |

YouTube 常不识别 `https://` 完整链接，优先用裸域名；若仍不可点，见 [`YOUTUBE-COMMENTS-READY.md`](./YOUTUBE-COMMENTS-READY.md) 里的 Google 搜索方案。

---

## 评论模板

**计算器向：**

```
For merge math (3 → 1 tier), free calculator:

pickaxe-tycoon.xyz/c

Unofficial fan site — not Pickaxe Simulator
```

**新手指南向：**

```
Beginner guide (deposit → merge → tower):

pickaxe-tycoon.xyz/b

Fan-made, not official
```

**Tier / Wiki 向：**

```
Full 24-tier list + Magmatic Cavern info:

pickaxe-tycoon.xyz/t
```

或 `pickaxe-tycoon.xyz/w`

---

## 推荐视频列表

完整评论见 [`YOUTUBE-COMMENTS-READY.md`](./YOUTUBE-COMMENTS-READY.md)。

| 视频 | 频道 | 建议贴 |
|------|------|--------|
| [META Beginner Guide](https://www.youtube.com/watch?v=qLk29P_Itz4) | AbductedByRobloxians | `/c` |
| [Full Guide](https://www.youtube.com/watch?v=OOw3yi0C3J0) | Rondoblox | `/b` |
| [NOOB to PRO](https://www.youtube.com/watch?v=h_byDzchcFY) | Stu | `/b` |
| [How to Make Money](https://www.youtube.com/watch?v=uZzhQBvVH5Y) | Rondoblox | `/c` |
| [Basic Overview](https://www.youtube.com/watch?v=YEcEekyjVVE) | MBT | `/b` |
| [100x MONEY](https://www.youtube.com/watch?v=dgMUGdxTt3E) | NagRoblox | `/b` |
| [NOOB to PRO](https://www.youtube.com/watch?v=FZDkXHjvbOM) | AJPlays | `/b` |
| [MAX LEVEL](https://www.youtube.com/watch?v=TRQx52aLZOM) | Melon and Sunny | `/t` |
| [TOO FAR](https://www.youtube.com/watch?v=tr81UVBjveo) | Bax | `/c` |
| [Merging BILLIONS](https://www.youtube.com/watch?v=3v1cjdEOU7k) | OTTER ON ROBLOX | `/c` |
| [STRONGEST Pickaxe](https://www.youtube.com/watch?v=KjMpOvhBgdk) | Its Me Younger | `/t` |
| [OVERPOWERED](https://www.youtube.com/watch?v=u8n7PtBBo30) | mykey | `/t` |
| [Open 18 lvl axe](https://www.youtube.com/watch?v=Y7vmmbAcweU) | MyStreetFun | `/w` |
| [Luckiest players](https://www.youtube.com/watch?v=M3A09zZl-ik) | MoreofApologist | `/w` |
| [Just Got INSANE](https://www.youtube.com/watch?v=8ZHfR3bP6dg) | Itz Shivraj GamerZ | 首页 |

> ⚠️ 避开 **Pickaxe Simulator** 视频（不同游戏）。

---

## 注意事项

1. 每个视频只发 1 条，分散几天发  
2. 写明 unofficial fan site  
3. YouTube 账号需手机验证，外链才更容易可点  
4. GA4 看 `youtube / comment` 总量即可
