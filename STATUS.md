# 🗺️ razors-edge-map 刀锋地图 - 当前开发状态

**最后更新**: 2026-05-04
**当前阶段**: v1.1 增强完成，可开始 P1 移动端适配

---

## 📂 项目位置

- **main 分支 (生产)**: `/Users/mt16/dev/razors-edge-map/`
- **Git 模式**: 主目录直接开发（worktree 模式已废弃）
- **remote**: `git@github.com:mariusiaowego-commits/razors-edge-map.git` (SSH)
- **GitHub**: https://github.com/mariusiaowego-commits/razors-edge-map

---

## ✅ 已完成

### 核心功能
- [x] Leaflet.js 1.9.4 单文件交互地图
- [x] 18 个航点：巴黎 → 地中海 → 印度 → 孟买
- [x] Larry 路线虚线连接
- [x] 3 种可切换底图：NatGeo / Ocean / OSM
- [x] 城市标记：蓝色普通点、金色★关键事件点
- [x] Sophie 特殊标记（红×，地中海失踪位置）
- [x] 双语标签（英文 + 中文）
- [x] 点击角色面板导航
- [x] 年份时间尺导航
- [x] Walter Landor 诗作展示（第五章引语）
- [x] 暗色航海主题（深海军蓝 + 金色点缀）

### v1.1 增强（2026-05-03 完成）
- [x] 数据外置架构：`data/waypoints.json`、`data/passages.json`、`data/analyses.json`
- [x] 3-Tab Popup：地理信息 / 原文摘录 / 文学解读
- [x] 人物面板重构：5角色完整档案（bio/arc/motivation/quotes/locations）
- [x] Researcher 内容填充：6个航点原文 + 6个航点解读
- [x] CORS 修复：所有数据内联 JS，file:// 直接打开无需服务器

### 航点列表
| # | 城市 | 年份 | 关键事件 |
|---|------|------|----------|
| 0 | Paris 巴黎 | 1919 | 起点 |
| 1 | Marseille 马赛 | 1919 | |
| 2 | Monaco 摩纳哥 | 1919 | |
| 3 | Nice 尼斯 | 1919 | |
| 4 | Parma 帕尔马 | 1919 | |
| 5 | Rome 罗马 | 1919 | |
| 6 | Istanbul 伊斯坦布尔 | 1919 | |
| 7 | Athens 雅典 | 1919 | ★ 关键 |
| 8 | Rhodes 罗德岛 | 1920 | |
| 9 | Jerusalem 耶路撒冷 | 1920 | |
| 10 | Cairo 开罗 | 1920 | |
| 11 | Ahmedabad 艾哈迈达巴德 | 1920 | |
| 12 | Delhi 德里 | 1920 | |
| 13 | Agra 阿格拉 | 1920 | |
| 14 | Udaipur 乌代布尔 | 1920 | |
| 15 | Bengal 孟加拉 | 1922 | |
| 16 | Mumbai 孟买 | 1922 | |
| 17 | Suez 苏伊士 | 1924 | ★ 关键（觉醒）|

---

## 📦 待提交改动

| 文件 | 说明 |
|------|------|
| `.gitignore` | 新增 `.worktrees/` 忽略（worktree 模式废弃） |

---

## 🔄 最近提交

| Commit | 内容 |
|--------|------|
| `24ee7a2` | docs: 更新vibe coding log |
| `bff41d8` | fix: char-panel.js 重新内联完整 characters 数据(含name/zh/desc/locations) |
| `1ed3f39` | fix: 内联数据消除CORS依赖，file://直接打开无需服务器 |
| `da13f25` | feat: 填充原文/解读/人物档案 (researcher产出) |
| `95c7e1a` | feat(v1.1): 数据外置 + Tab Popup + 人物面板重构 |
| `2c0755f` | chore: 架构规范化 - 删除CLAUDE.md, 新建STATUS.md/DEVELOPMENT_PLAN.md/.gitignore/docs |

---

## 🚀 下一步开发计划

### 优先级 P1
1. **移动端适配** — 可折叠面板、触摸友好缩放、底部抽屉
2. **时间轴滑块** — 1914–1924 可拖动时间轴，拖动时动画绘制路线

### 优先级 P2
3. **多语言支持** — EN/CN/JP 三语切换
4. **人物关系图** — SVG/Canvas 面板展示 Larry / Isabel / Sophie / Mrs. Bradshaw / Gray 关系

### 优先级 P3
5. **照片集** — 每个城市配上1920年代历史照片
6. **PDF 导出/打印模式** — `@media print` 样式 + puppeteer 脚本生成 A4 地图页

---

## 🧪 测试命令

```bash
cd /Users/mt16/dev/razors-edge-map/
open index.html  # 浏览器直接打开，无需构建
```

---

## 📝 开发规范

- 单文件项目，无需构建步骤
- 提交信息格式: `feat:` / `fix:` / `docs:` / `chore:`
- PR 流程: 改代码 → 本地浏览器测试 → 报结果 → 用户确认 → 再提 PR
- **开发收尾**: 每次 session 结束前更新 `STATUS.md` 和 `DEVELOPMENT_PLAN.md`

---

## 🔧 技术栈

- Leaflet.js 1.9.4 (CDN: unpkg)
- 底图: Esri NatGeo / Esri Ocean / OpenStreetMap
- 纯前端单文件，无框架、无构建工具
- 测试: 浏览器直接打开 `index.html`
