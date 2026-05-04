# The Razor's Edge — Literary Cartography Project
## 刀锋文学地图 · 多角色叙事引擎

**状态**: 重构规划中
**最后更新**: 2026-05-04
**愿景**: 从单人物航线地图 → 多角色文学宇宙拆解平台

---

## 1. 项目愿景

### 核心定位
一个可交互的文学地图叙事引擎，以《刀锋》(W. Somerset Maugham, 1944) 为首个完整案例，实现：

> **一张地图 + N条角色生命脉络 + 结构化情节数据库 + 多媒体引用网络**

### 五大核心目标

| # | 目标 | 具体内容 |
|---|------|----------|
| 1 | 地图叙事 | 展示所有角色在不同时间点的地理位置及故事 |
| 2 | 视角标记 | Maugham 本人作为作家角色在小说中的观察视角 |
| 3 | 高能情节 | 被广泛讨论的情节/名言/哲学探讨，在地图明确标注 |
| 4 | 角色脉络 | 每角色独立颜色航线 + 节点叙事（故事/引语/出处） |
| 5 | 结构化数据 | 分门别类的数据库，支持后续生图/信息图输出 |

---

## 2. 扩展性架构

### 单书数据驱动
```
books/razors-edge/
├── meta.json           # 书籍元信息
├── characters.json     # 人物表
├── waypoints.json      # 地理节点表
├── events.json         # 场景/情节表
├── quotes.json         # 名言/引语表
└── references.json     # 外部引用（书籍/诗歌/著作URL）

index.html              # 引擎（书 agnostic）
data/
  razors-edge.json      # 合并后的完整数据（运行时加载）
  books-manifest.json   # 书单索引
```

### 多书扩展
换书只需替换 data 目录，无需改动 index.html。
books-manifest.json 示例：
```json
{
  "razors-edge": { "title": "The Razor's Edge", "lang": "EN", "status": "active" },
  "the-moon-and-sixpence": { "title": "月亮与六便士", "lang": "EN/ZH", "status": "planned" }
}
```

---

## 3. 数据模型（核心）

### 3.1 书籍元信息 `meta.json`
```json
{
  "id": "razors-edge",
  "title": "The Razor's Edge",
  "title_zh": "刀锋",
  "author": "W. Somerset Maugham",
  "author_zh": "威廉·萨默塞特·毛姆",
  "author_as_character": true,
  "author_note": "Maugham在小说中以第三人称叙述者身份出现，他同时是书中的角色，通过与各人物的交往收集故事素材",
  "published": 1944,
  "chapters": 24,
  "narrative_voice": "third_person_omniscient_with_author_as_witness"
}
```

### 3.2 人物表 `characters.json`
```json
[{
  "id": "larry",
  "name": "Larry Darrell",
  "name_zh": "拉里·达雷尔",
  "color": "#e8c060",
  "color_alt": "#ffd700",
  "role": "protagonist",
  "route_id": "larry-route",
  "bio": "一战英国皇家空军飞行员，战争创伤后放弃世俗成功，追寻精神意义",
  "bio_zh": "...",
  "arc": "从存在主义危机到东方证道，最终回归世俗服务",
  "motivation": "寻找'万物的为什么'的答案",
  "is_key_character": true,
  "is_author_observer": false
}, {
  "id": "maugham",
  "name": "W. Somerset Maugham",
  "name_zh": "毛姆（叙述者）",
  "color": "#9b8df0",
  "role": "narrator_as_character",
  "route_id": "maugham-route",
  "bio": "小说叙述者，同时也是书中的角色。通过社交圈收集各人物的故事素材。",
  "bio_zh": "...",
  "arc": "从好奇的旁观者到反思自己的人生选择",
  "motivation": "记录真实的生命故事，探寻世俗成功与精神自由的关系",
  "is_key_character": true,
  "is_author_observer": true
}, {
  "id": "isabel",
  "name": "Isabel Porterfield",
  "name_zh": "伊莎贝尔·波特菲尔德",
  "color": "#e89ac7",
  "role": "main_supporting",
  "route_id": "isabel-route",
  "bio": "...",
  "bio_zh": "...",
  "is_key_character": true
}, {
  "id": "sophie",
  "name": "Sophie Warren",
  "name_zh": "苏菲·沃伦",
  "color": "#c46a6a",
  "role": "tragic_counterpoint",
  "route_id": "sophie-route",
  "bio": "...",
  "bio_zh": "...",
  "is_key_character": true
}, {
  "id": "gray",
  "name": "Gray M. Dalton",
  "name_zh": "格雷·道尔顿",
  "color": "#6a9fd8",
  "role": "supporting",
  "route_id": "gray-route",
  "bio": "..."
}, {
  "id": "elliott",
  "name": "Elliott Randolph",
  "name_zh": "埃利奥特·兰道夫",
  "color": "#7fc97f",
  "role": "comic_relief",
  "route_id": "elliott-route",
  "bio": "..."
}, {
  "id": "landor",
  "name": "Walter Landor",
  "name_zh": "沃尔特·兰德尔",
  "color": "#b8d4e8",
  "role": "spiritual_touchstone",
  "route_id": "landor-route",
  "bio": "..."
}]
```

### 3.3 地理节点表 `waypoints.json`
```json
[{
  "id": "geo-paris",
  "lat": 48.8566,
  "lng": 2.3522,
  "city": "Paris",
  "city_zh": "巴黎",
  "country": "France",
  "year_start": 1919,
  "year_end": 1920,
  "significance": "journey_origin",
  "maugham_presence": true,
  "maugham_narrative": "我在拉里在巴黎的阁楼里第一次见到他。他坐在窗边，手里拿着一本斯宾诺莎，目光望向窗外永恒的塞纳河。",
  "maugham_narrative_zh": "..."
}]
```

### 3.4 角色路线表 `character_routes.json`
```json
[{
  "route_id": "larry-route",
  "character_id": "larry",
  "color": "#e8c060",
  "weight": 3,
  "dash_array": "10, 6",
  "opacity": 0.8,
  "nodes": [
    {
      "node_id": "larry-001",
      "waypoint_id": "geo-paris",
      "year": 1919,
      "month": 4,
      "event_id": "larry-paris-departure",
      "event_ids": ["larry-paris-departure", "larry-isabel-breakup"],
      "narrative": "拉里在巴黎拉丁区的阁楼里阅读哲学，伊莎贝尔从芝加哥赶来探望，试图说服他回到正常生活轨道...",
      "narrative_zh": "...",
      "is_highlight": true
    },
    {
      "node_id": "larry-002",
      "waypoint_id": "geo-marseille",
      "year": 1919,
      "month": 6,
      "event_id": "larry-marseille-embark",
      "narrative": "拉里在马赛港登上东方货轮...",
      "narrative_zh": "..."
    }
  ]
}]
```

### 3.5 事件/场景表 `events.json`
```json
[{
  "event_id": "larry-isabel-breakup",
  "type": "pivotal_conversation",
  "significance": "high_energy",
  "title": "拉里与伊莎贝尔的决裂对话",
  "title_zh": "晃膀子",
  "waypoint_id": "geo-paris",
  "characters": ["larry", "isabel"],
  "year": 1919,
  "chapter": "Ch7",
  "pages": "112-118",
  "excerpt": "...",
  "excerpt_zh": "...",
  "analysis": "...",
  "analysis_zh": "...",
  "is_most_discussed": true,
  "discussion_tags": ["存在主义", "物质vs精神", "晃膀子"],
  "icon": "quote"
}]
```

### 3.6 名言/引语表 `quotes.json`
```json
[{
  "quote_id": "q001",
  "speaker_id": "larry",
  "text": "I want to find out what the monks are trying to find out. I want to get rid of the barrier between myself and God.",
  "text_zh": "我想知道那些僧侣们想要发现的东西。我想打通自己与上帝之间的屏障。",
  "source_book": "The Razor's Edge",
  "source_chapter": "Part Two, Ch14",
  "source_page": "243",
  "event_id": "larry-spiritual-goal",
  "waypoint_id": "geo-paris",
  "year": 1919,
  "url": "https://en.wikipedia.org/wiki/The_Razor%27s_Edge_(novel)",
  "icon": "quote",
  "is_famous": true,
  "discussion_count_estimate": "50000+",
  "tags": ["信仰", "神秘主义", "战争创伤"]
}, {
  "quote_id": "q002",
  "speaker_id": "landor",
  "text": "I strove with none, for none was worth my strife; Nature I loved, and next to Nature, Art; I warmed both hands before the fire of Life; It sinks, and I am ready to depart.",
  "text_zh": "我不与人争，因无人值得我争斗。我爱自然，其次爱与自然相近的艺术。我把双手伸向生命之火取暖。火萎了，我已准备好离开。",
  "source_book": "Dying Speech of an Old Philosopher",
  "source_author": "Walter Savage Landor",
  "source_year": 1850,
  "source_url": "https://www.poetryfoundation.org/poems/56159/dying-speech-of-an-old-philosopher",
  "referenced_in_book": "The Razor's Edge",
  "referenced_chapter": "Part One, Ch5",
  "waypoint_id": "geo-paris",
  "icon": "poem",
  "is_famous": true
}]
```

### 3.7 外部引用表 `references.json`
```json
[{
  "ref_id": "ref001",
  "type": "book",
  "title": "The Bhagavad Gita",
  "title_zh": "薄伽梵歌",
  "author": "Vyasa",
  "author_zh": "毗耶娑",
  "url": "https://www.gutenberg.org/ebooks/23885",
  "referenced_by": "larry",
  "event_id": "larry-india-practice",
  "context": "拉里在印度修行期间阅读的根本经典之一"
}, {
  "ref_id": "ref002",
  "type": "poem",
  "title": "Dying Speech of an Old Philosopher",
  "title_zh": "老哲学家的临终遗言",
  "author": "Walter Savage Landor",
  "url": "https://www.poetryfoundation.org/poems/56159/dying-speech-of-an-old-philosopher",
  "referenced_by": "larry",
  "referenced_in_event": "larry-landor-meeting"
}]
```

---

## 4. 地图层设计

### 4.1 航线层
- 每个角色一条 Polyline，独立的颜色和透明度
- Larry: 金色实线 `#e8c060`
- Maugham: 紫色实线 `#9b8df0`
- Isabel: 粉色实线 `#e89ac7`
- Sophie: 红色虚线 `#c46a6a` (象征断裂)
- Gray: 蓝色线 `#6a9fd8`
- Elliott: 绿色线 `#7fc97f`
- Landor: 浅蓝线 `#b8d4e8`

### 4.2 节点图标
| 节点类型 | 图标 | 颜色 |
|----------|------|------|
| 关键事件（高能情节） | ★ | 金色 |
| 普通地点 | ● | 角色颜色 |
| Maugham观察点 | ◆ | 紫色 |
| 角色交汇点 | ◇ | 白色高亮 |
| Sophie失踪 | ✕ | 红色 |

### 4.3 地图交互
- **点击航线**: 显示该角色整条路线概览
- **点击节点**: 弹出3Tab详情（地理叙事/原文引语/文学解读）
- **点击交汇点**: 展示多角色同时在场的高能场景
- **时间轴刷**: 拖动刷选年份范围，高亮该时期所有角色位置

---

## 5. 人物角色数据（第一版完整列表）

### Larry Darrell 路线节点
| 节点 | 地点 | 年份 | 关键事件 |
|------|------|------|----------|
| 001 | Paris · 巴黎 | 1919 | 起点：放弃婚约、阅读哲学 |
| 002 | Marseille · 马赛 | 1919 | 登上货轮 |
| 003 | Suez · 苏伊士 | 1919 | 第一次看见光（高能情节） |
| 004 | Cairo · 开罗 | 1920 | 与考古学家对话 |
| 005 | Colombo · 科伦坡 | 1921 | 接触佛教 |
| 006 | Madras · 马德拉斯 | 1921 | 修行道场 |
| 007 | Hyderabad · 海得拉巴 | 1921 | 苏菲派旋转舞 |
| 008 | Goa · 果阿 | 1921 | 整理笔记 |
| 009 | Kashmir · 克什米尔 | 1922 | 证道（高能情节） |
| 010 | Kolkata · 加尔各答 | 1922 | 见证贫穷与精神并存 |
| 011 | Anuradhapura · 阿努拉德普勒 | 1922 | 菩提树下七天（高能情节） |
| 012 | Mumbai · 孟买 | 1923 | 登船返回欧洲 |
| 013 | Brussels · 布鲁塞尔 | 1923 | 获知Sophie丈夫自杀 |
| 014 | Brussels · 布鲁塞尔 | 1924 | 带Sophie航海（高能情节） |
| 015 | Gibraltar · 直布罗陀 | 1924 | Sophie短暂恢复 |
| 016 | Suez · 苏伊士 | 1924 | Sophie失踪（结局高能情节） |

### Maugham 路线节点
| 节点 | 地点 | 年份 | 关键事件 |
|------|------|------|----------|
| 001 | Paris · 巴黎 | 1919 | 与Larry初次见面 |
| 002 | London · 伦敦 | 1920 | 社交圈听闻Larry事迹 |
| 003 | New York · 纽约 | 1921 | 美国出版界反应 |
| 004 | Paris · 巴黎 | 1924 | Larry归来，重逢 |

### Isabel 路线节点
| 节点 | 地点 | 年份 | 关键事件 |
|------|------|------|----------|
| 001 | Chicago · 芝加哥 | 1919 | Larry解除婚约 |
| 002 | Paris · 巴黎 | 1919 | 探视Larry失败 |
| 003 | Paris · 巴黎 | 1924 | Larry归来，再次相遇 |

### Sophie 路线节点
| 节点 | 地点 | 年份 | 关键事件 |
|------|------|------|----------|
| 001 | Illinois · 伊利诺伊 | 1919 | 幸福家庭生活 |
| 002 | London · 伦敦 | 1923 | 丈夫儿子车祸身亡，沉沦酒精 |
| 003 | London · 伦敦 | 1924 | Larry找到她 |
| 004 | Marseille · 马赛 | 1924 | 登上邮轮 |
| 005 | Suez · 苏伊士 | 1924 | 失踪（高能情节） |

---

## 6. 高能情节列表（第一批）

| # | 情节 | 人物 | 地点 | 章节 | 讨论度 |
|---|------|------|------|------|--------|
| 1 | "晃膀子"对话 | Larry/Isabel | Paris | Ch7 | ★★★★★ |
| 2 | 苏伊士第一次看见光 | Larry | Suez | Ch12 | ★★★★ |
| 3 | 克什米尔证道 | Larry | Kashmir | Ch17 | ★★★★★ |
| 4 | 菩提树下七天 | Larry | Anuradhapura | Ch19 | ★★★★ |
| 5 | Sophie失踪 | Larry/Sophie | Suez | Ch24 | ★★★★★ |
| 6 | Sophie丈夫车祸 | Sophie | Illinois | Ch11 | ★★★ |
| 7 | 兰德尔诗作 | Landor/Larry | Paris | Ch5 | ★★★★★ |
| 8 | 毛姆重逢Larry | Maugham/Larry | Paris | Ch24 | ★★★ |

---

## 7. UI/UX 设计

### 7.1 布局
```
+--[人物面板]--+--------[地图]--------+--[图例]--+
| 角色列表    |                          | 路线颜色 |
| (可折叠)    |    Leaflet Map Canvas    | 节点图标 |
|             |                          |          |
| [角色选择]  |                          | [时间轴] |
+-------------+--------------------------+----------+
|          [底部时间尺 / 年份刷选器]                    |
+----------------------------------------------------+
|          [引语浮层面板 — 可展开/收起]                |
+----------------------------------------------------+
```

### 7.2 引语浮层面板
- 默认折叠，只显示当前选中节点的最名言
- 展开后显示：原文 + 中文 + 出处 + URL链接
- 支持一键跳转外部阅读

### 7.3 人物面板设计
- 角色列表（可多选，显示叠加路线）
- 每个角色展开：简介 + 弧线 + 关键引语 + 所在城市
- 点击城市名称 → 地图飞至该点

---

## 8. 技术实现

### 现状
- 单 HTML 文件，内联 JS/CSS
- Leaflet.js 1.9.4 CDN
- 航点数据部分内联（src/map-data.js）

### 目标架构
```
index.html          # 主引擎（保持无构建步骤）
src/
  engine.js         # 地图引擎逻辑（角色路由渲染、交互管理）
  panels.js         # 侧边栏/浮层面板渲染
  data-loader.js    # 数据加载（从 books/<book>/data.json 异步加载）
data/
  razors-edge.json  # 完整合并数据（当前目标书籍）
books/
  razors-edge/
    meta.json
    characters.json
    waypoints.json
    character_routes.json
    events.json
    quotes.json
    references.json
```

### 扩展步骤
1. **Phase 1（当前）**: 重构数据结构，完成 razors-edge 全量数据
2. **Phase 2**: 重写 engine.js 支持多角色路由
3. **Phase 3**: 实现引语浮层面板 + 外部URL
4. **Phase 4**: 实现多书籍切换（books-manifest）
5. **Phase 5**: 图像导出接口（供生图model调用）

---

## 9. 设计原则

1. **file:// 兼容**: 所有数据内联，无外部 CORS 请求
2. **书 agnostic**: index.html 完全不知道具体是哪本书
3. **数据即文档**: JSON 数据本身带有中文注释，可读性强
4. **结构化输出**: 数据表支持直接导入图像生成pipeline
5. **移动端非优先**: PC端深度交互体验优先

---

## 10. 参考资料

- [The Razor's Edge - Wikipedia](https://en.wikipedia.org/wiki/The_Razor%27s_Edge_(novel))
- [Walter Savage Landor - Poetry Foundation](https://www.poetryfoundation.org/poets/walter-savag)
- [Leaflet.js Documentation](https://leafletjs.com/reference.html)
