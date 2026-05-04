# 🗺️ razors-edge-map 刀锋地图 - 开发计划

**最后更新**: 2026-05-04

---

## 📋 项目概述

基于 W. Somerset Maugham 小说《刀锋》(1944) 的 Larry Darrell 精神朝圣之旅交互地图。追踪 Larry、Isabel、Sophie、Gray、Elliott 五个角色从战后巴黎出发，穿越地中海、南亚，最终在苏伊士完成精神觉醒的历程。

**作者**: mtt
**创建时间**: 2026-05-03

---

## 🎯 已完成功能

### 地图导航
- Leaflet.js 1.9.4 单文件，无构建步骤（file:// 直接打开）
- 19 个航点覆盖全球：Paris → Chicago → Suez → Cairo → 印度（7城）→ London → Gibraltar → Seville → Malaga → Nice
- 6 条角色路线：Larry / Isabel / Sophie / Gray / Elliott / Suzanne
- 3 种可切换底图：NatGeo / Ocean / OSM

### 标记系统
- 普通航点：蓝色圆形标记
- 关键事件航点：金色★（geo-suez / geo-kashmir / geo-benares / geo-trivandrum / geo-london / geo-nice）
- Sophie 失踪标记：红色×
- 双语城市名标签（英文 + 中文）

### 交互导航
- `flyToWaypoint(id)` — 飞至指定航点
- `flyToYear(yr)` — 飞至该年份第一个航点
- `toggleRoute(charId)` — 切换角色路线显示
- `setSliderYear(yr)` — 同步滑块位置

### UI 面板
- **角色面板**（左侧）：bio / arc / 动机 / 引语，点击城市名定位
- **时间轴**（底部）：1919-2029 滑块，拖动时显示 timeline-brief 叙事摘要
- **图例**（右下）：7 条路线可点击切换
- **Status Objects 模态框**：全目录卡片，点击飞至航点
- **EPIGRAPH 引语面板**：Landor 诗作

### 数据内容
- STATUS_OBJECTS 数据库（物品卡片：type / owner / location / novel_scene / story / historical_context）
- 毛姆叙述文本（maugham + maugham_zh 双语）
- 引语数组 QUOTES（speaker / text / zh / chapter）
- 15 个 EVENTS 事件条目

---

## 🗺️ 航点数据结构

航点定义在 `index.html` 的 `WAYPOINTS` 数组：

```javascript
{ id: 'geo-benares',
  lat: 25.3176, lng: 82.9739,
  city: 'Benares', city_zh: '贝纳勒斯',
  country: 'India',
  year_start: 1922, year_end: 1922,
  characters: ['larry','maugham'],
  significance: 'hindu_sacred_centre',
  is_highlight: true,
  maugham: '...', maugham_zh: '...',
  events: ['...'], joint_note: null }
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一 ID（flyToWaypoint 使用） |
| `lat/lng` | float | 地理坐标 |
| `city` | string | 英文城市名 |
| `city_zh` | string | 中文城市名 |
| `year_start/end` | integer | 角色在该城市的时间范围 |
| `characters` | array | 涉及的角色 ID |
| `significance` | string | 叙事意义标签 |
| `is_highlight` | boolean | 是否为金色★关键航点 |
| `maugham` | string | 毛姆叙述英文 |
| `maugham_zh` | string | 毛姆叙述中文 |
| `events` | array | 关联事件 ID |

---

## ⌨️ 公开 API

所有函数通过 HTML onclick 或暴露在全局 `window` 对象上：

| 函数 | 说明 |
|------|------|
| `toggleRoute(id)` | 切换角色路线 |
| `flyToWaypoint(id)` | 飞至航点 |
| `flyToYear(yr)` | 飞至年份 |
| `setSliderYear(yr)` | 同步滑块 |
| `switchTab(name)` | 切换 popup 标签 |
| `toggleStatusPanel()` | 开关状态面板 |
| `openStatusModal()` | 打开全目录模态框 |
| `buildStatusPanel()` | 构建状态面板 |
| `buildTimelineBrief(yr)` | 构建叙事摘要 |
| `toggleStatusCard(id)` | 开关状态卡片 |
| `closeCharPanel()` | 关闭角色面板 |

---

## 🎨 设计令牌

```css
--gold:   #c9a84c   /* 关键标记、标题、年份高亮 */
--blue:   #6a9fd8   /* 普通城市标记 */
--red:    #c46a6a   /* Sophie 标记 */
--bg:     #1a1a2e   /* 页面背景 */
--panel:  #0a1022   /* 面板背景 */
--text:   #e8d5b0   /* 主文字（暖奶油色） */
```

---

## 📁 项目结构

```
razors-edge-map/
├── index.html              # 完整地图应用（所有 JS/CSS 内联）
├── STATUS.md               # 当前开发状态
├── DEVELOPMENT_PLAN.md     # 本文档
├── README.md               # 用户文档
└── .gitignore
```

---

## 🚀 开发路线图

### ✅ 已完成
- [x] 初始地图：单角色地中海路线
- [x] v2.0 多角色文学架构（4 路线 / 16 航点 / 15 事件）
- [x] 时间轴滑块 + timeline-brief
- [x] Status Objects 数据库 + UI
- [x] 4 标签 popup（地理/情节/毛姆视角/面子）
- [x] 图例可交互
- [x] India 内容（Benares / Trivandrum / Sri Ramakrishna）
- [x] Suzanne Rouvier 角色
- [x] 修复：Mumbai entry 语法损坏

### 📋 规划中

#### P1 — 内容深化
- Benares / Trivandrum popup 标签内容填充（情节/解读可补充）
- Ramakrishna 路线可视化（visible:false 状态，可选实现）

#### P2 — 内容丰富
- Status Objects 物品历史图片（当前 placeholder）
- 各航点 1920 年代历史照片
- 移动端适配（可折叠面板、触摸友好缩放、底部抽屉）

#### P3 — 扩展功能
- 多语言 EN/CN/JP 切换
- PDF 导出 / 打印模式
- 人物关系图 SVG 面板

---

## 🧪 验收标准

1. `open index.html` 直接在浏览器运行，无需服务器
2. 点击任意城市名，地图平滑飞至该位置并打开 popup
3. 拖动时间轴滑块，地图飞至该年份，timeline-brief 显示叙事摘要
4. 点击图例条目，切换对应角色路线
5. 点击 Status Objects 模态框卡片，飞至对应航点
6. Benares / Trivandrum popup 4 个标签全部正常渲染

---

## ⚠️ 注意事项

- 所有数据当前硬编码在 `index.html` 内（inline data 架构）
- hermes worktree (`hermes-d6b90d13`) 维护外置 data/ JSON 架构，落后 main 6 commits
- `flyToYear()` 范围 1919-2029，新航点 year_start 应在此范围内
- Leaflet 版本固定 1.9.4

---

**开发收尾**: 每次 session 结束前更新 `STATUS.md` 和 `DEVELOPMENT_PLAN.md`
