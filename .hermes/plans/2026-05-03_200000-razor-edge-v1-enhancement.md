# 刀锋地图 v1.1 增强方案

**目标**: 将单文件 Leaflet 地图升级为内容详尽、可持续迭代的《刀锋》文学互动地图
**计划日期**: 2026-05-03

---

## 一、产品方案

### 核心定位

不是一个普通的旅游地图，而是一个**《刀锋》文学解读宇宙**——原著原文、名人引述、文学分析、扩展阅读全部整合在同一张交互地图上。用户打开地图时，看到的不只是"巴黎"，而是 Larry 在巴黎的精神状态、雨果/柏格森/《薄伽梵歌》的原文引用、以及 Maugham 为什么选择这些城市。

### 内容分层

| 层级 | 内容 | 数据来源 |
|------|------|----------|
| L1 地理层 | 航点、城市标记、路线 | 现有 waypoints 数组 |
| L2 原文层 | 小说摘录、章节引语 | 用户贴原文 + researcher 整理 |
| L3 人物层 | 角色生平、心理分析、人物关系 | researcher 提供 |
| L4 文学层 | 引述的名人著作信息、Maugham 的意图分析 | researcher + 讨论产出 |
| L5 扩展层 | 哲学背景、历史背景、比较文学 | researcher + 圆桌讨论 |

### 用户与 Agent 的三种对话模式

**模式 A — 原文解读**
```
用户贴原文片段 → researcher 分析背景/引用 → 生成解读内容 → 加入地图
```

**模式 B — 引述扩展**
```
用户指定名人/著作 → researcher 提供真实信息 + 文学讨论 → 内容加入地图
```

**模式 C — 主观讨论**
```
用户发表阅读感受 → researcher + 其他 agent 圆桌讨论 → 提炼洞见 → 加入地图
```

### 内容沉淀流程

所有讨论产出 → 写入 `docs/contents/` 目录（JSON 分块存储）→ 最终渲染到地图 popup / panel / modal

---

## 二、地图交互 UI/UX 方案

### 当前问题

- 地图 popup 空间有限，不适合展示长文本（原文、引语）
- 角色面板过于简单，没有人物深度信息
- 时间尺只能跳转，不能展示年份内的故事线
- 没有"章节导航"的概念

### UI 组件规划

**A. 航点 Popup 升级**
- 标题：城市 + 年份
- Tab 切换：「地理」「原文」「解读」
- 原文 Tab：显示该城市相关的小说摘录（用户提供或 researcher 整理）
- 解读 Tab：文学背景、分析
- 底部：「扩展阅读」折叠区

**B. 人物侧边栏升级**
- 点击角色头像/名字 → 展开人物全档案（而非只跳转到城市）
- 档案包含：角色简介、人物弧线、关键章节引用、心理动机分析
- 当前只做了位置跳转，内容为空

**C. 章节/时间导航面板（新增）**
- 替代当前简陋的时间尺
- 按小说章节/部分组织：Part One (1913-1919) / Part Two (1919-1920) / Part Three (1920-1922) / Part Four (1924)
- 点击 Part 标题 → 地图飞至该部分的第一个航点

**D. 名人引述面板（新增）**
- 当航点 popup 或人物档案中提到某名人著作时
- 可展开看到该著作的真实信息卡
- 类似 Wikipedia infobox 风格

**E. 地图全屏阅读模式**
- 地图缩小到右上角小窗
- 主视图变为「当前航点内容阅读器」
- 适合深度阅读地图中积累的内容

### 交互原则

- 所有新增内容默认折叠，渐进展开（不要一打开 popup 就是满满文字）
- 移动端：底部抽屉 sheet 替代侧边栏
- 键盘导航：Esc 关闭弹窗，Tab 切换 tab

---

## 三、技术实现方案

### 阶段划分

#### 阶段 0 — 数据基础设施（本次不实现，先规划）
将 hardcoded JS 数据外置，为后续内容扩展打基础。

```
data/
├── waypoints.json          # 航点基础数据（lat/lng/city/zh/year/key）
├── passages.json           # 原文摘录（城市/章节 → 原文片段）
├── characters.json         # 人物档案（扩展字段）
├── references.json         # 名人引述数据（书名/作者/引文/解读）
└── analysis.json           # researcher + 讨论产出的文学分析
```

#### 阶段 1 — UI 组件化（P1）
拆分 `index.html` 的 UI 组件，为每个新功能准备插槽。

- 将 popup 内容结构化（HTML 模板 → JS 渲染函数）
- 人物侧边栏组件化
- 时间/章节导航组件化
- CSS 变量统一管理设计令牌

#### 阶段 2 — 内容层接入（P1 后期）
接入 `data/` 数据，popup 显示真实内容。

#### 阶段 3 — 多 agent 协作流程（P2）
定义 researcher 参与讨论的标准 SOP，将产出格式化写入 `/Users/mt16/dev/razors-edge-map/docs/contents/`。内容文件由 Git 追踪，随项目一起版本管理。

---

## 四、实施计划

### 本次（阶段 1 先行）

**Step 1**: 创建 `data/waypoints.json`，将 `index.html` 底部的 `waypoints` 数组迁移出来
**Step 2**: 创建 `src/map-data.js`，统一管理数据加载（fetch JSON，注入到 Leaflet）
**Step 3**: 创建 `src/components/` 目录，规划 UI 组件文件结构
**Step 4**: 重构 popup 渲染逻辑，支持 tab 切换（地理/原文/解读）
**Step 5**: 重构人物侧边栏，支持展开收起人物档案
**Step 6**: 更新 `.gitignore` 忽略 `data/` 目录（内容数据不进 Git）

### 本次不实施（记录在 DEVELOPMENT_PLAN.md P2）

- `docs/contents/` 目录（路径确认：`/Users/mt16/dev/razors-edge-map/docs/contents/`，Git 追踪）
- researcher agent 协作 SOP
- 章节导航面板
- 扩展层数据

---

## 五、文件变更预览

| 文件 | 操作 | 说明 |
|------|------|------|
| `data/waypoints.json` | 新建 | 航点基础数据（Git 追踪） |
| `data/.gitkeep` | 新建 | 占位，确保目录被 Git 追踪 |
| `docs/contents/` | 新建 | 内容沉淀目录，Git 追踪（原文/引述/分析产出） |
| `src/map-data.js` | 新建 | 数据加载模块 |
| `src/components/popup.js` | 新建 | Popup 渲染逻辑 |
| `src/components/char-panel.js` | 新建 | 人物侧边栏逻辑 |
| `src/components/tabs.js` | 新建 | Tab 切换组件 |
| `index.html` | 修改 | 引入外置数据 + 重构 popup/面板渲染 |
| `.gitignore` | 修改 | 保留 `data/` 和 `docs/contents/` 的 Git 追踪（内容文件需版本化） |

---

## 六、风险与开放问题

1. **内容版权**：小说原文是否可展示？建议只用摘录（<100字）+ 注明章节位置
2. **数据规模**：内容多了之后单文件 popup 不再适合，需要考虑知识库式的展示方式（侧滑 panel vs popup）
3. **多 agent 协作**：如何让 researcher 的产出自动沉淀到 `docs/contents/`？需要定义明确的数据格式和 SOP
4. **移动端**：当前 UI 未做移动端适配，内容丰富后矛盾会更突出

---

## 七、验证步骤

1. `open index.html` 浏览器直接打开，数据从 `data/waypoints.json` 加载，地图功能与之前完全一致
2. 点击任意航点 popup，有三个 Tab 切换
3. 点击人物名字，侧边栏展开人物档案（目前为空数据壳）
4. `git status` 无意外变更
