# 🗺️ razors-edge-map 刀锋地图 - 开发计划

## 📋 项目概述

基于 W. Somerset Maugham 小说《刀锋》(1944) 的 Larry Darrell 精神朝圣之旅交互地图。从战后巴黎出发，穿越地中海，跨越南亚，最终在苏伊士运河完成觉醒。

**作者**: mtt
**创建时间**: 2026-05-03
**最后更新**: 2026-05-03

---

## 🎯 核心功能（已实现）

### 1. 地图导航
- Leaflet.js 1.9.4 单文件，无构建步骤
- 18 个航点：Paris → Marseille → Monaco → Nice → Parma → Rome → Istanbul → Athens → Rhodes → Jerusalem → Cairo → Ahmedabad → Delhi → Agra → Udaipur → Bengal → Mumbai → Suez
- 虚线 polyline 连接 Larry 路线
- 3 种可切换底图：NatGeo / Ocean / OSM

### 2. 标记系统
- 蓝色圆形标记：普通城市
- 金色★标记：关键事件（Athens 觉醒、Suez 觉醒）
- 红色×标记：Sophie 地中海失踪位置
- 双语标签（英文 + 中文）

### 3. 交互导航
- 点击角色面板城市名 → `flyToCity(id)` 飞至航点
- 点击年份时间尺 → `flyToYear(yr)` 飞至该年份第一个航点
- 点击 Sophie 卡片 → `flyToSophie()` 飞至地中海失踪位置

### 4. UI 面板
- 角色面板（左侧）：5 个角色可点击定位
- 诗作面板（底部左侧）：Walter Landor《老哲学家遗言》（第五章引语）
- Sophie 卡片（右侧）：悲剧背景故事
- 图例（底部中间右侧）：路线、标记类型说明
- 时间尺（底部中间）：1914/1919/1920/1921/1922/1924 年份导航

---

## 🏗 技术栈

```
前端单文件（无需后端）
├── Leaflet.js 1.9.4      # 地图引擎 (CDN: unpkg)
├── Esri NatGeo           # 底图1
├── Esri Ocean            # 底图2
└── OpenStreetMap         # 底图3
```

---

## 📁 项目结构

```
razors-edge-map/
├── index.html              # 完整地图应用（所有 JS/CSS 内联）
├── SPEC.md                 # 架构规格说明
├── STATUS.md               # 当前开发状态
├── DEVELOPMENT_PLAN.md     # 本文档
├── README.md               # 用户文档
├── docs/                   # 文档目录
│   └── 航点数据说明.md     # 航点数据字段说明
├── src/                    # 预留：未来 JS 模块化
├── assets/                 # 预留：未来图片/数据
├── .gitignore
└── vibe coding log.md     # 开发日志
```

---

## 🗺️ 航点数据结构

航点定义在 `index.html` 底部 JavaScript 数组：

```javascript
var waypoints = [
  { id: 0, lat: 48.8566, lng: -2.3522, city: 'Paris', zh: '巴黎', note: '...', year: 1919, key: false },
  // ...
];
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | integer | 唯一索引（`flyToCity(id)` 使用） |
| `lat` | float | 纬度 |
| `lng` | float | 经度 |
| `city` | string | 英文城市名（地图标签显示） |
| `zh` | string | 中文城市名 |
| `note` | string | 弹出框描述文本 |
| `year` | integer | Larry 到此年份 |
| `key` | boolean | `true` 为金色★关键事件标记 |

Sophie 标记为独立变量，搜索 `SOPHIE_LAT` / `SOPHIE_LNG`：

```javascript
var SOPHIE_LAT = 33.8, SOPHIE_LNG = 26.5;
```

---

## ⌨️ 导航函数

| 函数 | 行为 |
|------|------|
| `flyToCity(id)` | 飞至航点 `id`，动画结束后打开 popup |
| `flyToSophie()` | 飞至 Sophie 标记位置（地中海） |
| `flyToYear(yr)` | 飞至该年份第一个航点 |

所有函数通过 HTML `onclick` 属性触发。

---

## 🎨 设计令牌

```css
--gold:   #c9a84c   /* 关键标记、标题、年份高亮 */
--blue:   #6a9fd8   /* 普通城市标记 */
--red:    #c46a6a   /* Sophie */
--bg:     #1a1a2e   /* 页面背景 */
--panel:  #0a1022   /* 面板背景 */
--text:   #e8d5b0   /* 主文字（暖奶油色） */
--text-muted: #8a8a7a  /* 次要文字 */
```

---

## 🚀 开发路线图

### ✅ 已完成
- [x] 初始地图：18 航点 + 路线 + 底图切换
- [x] 角色/Sophie 导航面板
- [x] 年份时间尺
- [x] Walter Landor 诗作
- [x] 暗色航海主题

### 🔄 进行中
- 架构规范化

### 📋 规划中

#### P1 — 数据与移动端
- 航点数据外置为 `data/waypoints.json`
- 移动端适配：可折叠面板、触摸缩放、底部抽屉

#### P2 — 增强交互
- 时间轴滑块（1914–1924 可拖动）
- 多语言支持（EN/CN/JP）
- 人物关系图 SVG 面板

#### P3 — 内容扩展
- 每城市配 1920 年代历史照片
- PDF 导出 / 打印模式

---

## ✅ 验收标准

1. `open index.html` 直接在浏览器运行，无需服务器
2. 点击任意城市名，地图平滑飞至该位置
3. 点击年份，地图飞至该年份第一个航点
4. 底图切换正常（NatGeo / Ocean / OSM）
5. Sophie 标记在正确位置（地中海）

---

## 📌 注意事项

- Leaflet 版本固定 1.9.4，升级前检查 breaking changes
- 所有航点数据当前硬编码在 `index.html` 底部
- 未来数据外置后，`data/waypoints.json` 由 `.gitignore` 忽略
- 开发测试：浏览器打开 `index.html` 即可

---

**开发收尾**：每次 session 结束前更新 `STATUS.md` 和 `DEVELOPMENT_PLAN.md`，保持后续接手 agent 可读。
