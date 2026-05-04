# Handoff — razors-edge-map 继任者交接

**日期**: 2026-05-04
**当前分支**: `main` (worktree)
**GitHub**: `git@github.com:mariusiaowego-commits/razors-edge-map.git`

---

## 1. 当前任务目标

用户表示上下文太长，准备新 session 继续开发。需要交接项目当前状态，让下一位接手 agent 能直接继续推进。

---

## 2. 当前进展

### Git 状态（已全部 push）
- `main` = `origin/main` = `4f8da15`（最新）
- `416248c` = 最新 commit（docs: update STATUS.md + DEVELOPMENT_PLAN.md）
- hermes worktree (`hermes-d6b90d13`) 落后 main 6 commits，架构不同（外置 data/ JSON），无需处理

### 本次完成的工作
1. **Git 健康度全面检查** — status / branches / diff / JS runtime 验证
2. **发现并修复 Critical Bug** — `geo-mumbai` 语法损坏（Trivandrum 插入时前缀丢失），已修复并 push
3. **Trivandrum year_end 修正** — 1922 → 2023（符合 Larry 印度行程）
4. **UI 截图审查** — playwright 截图（headless Chrome 无法加载 OSM 瓦片，属环境限制非代码问题）
5. **STATUS.md + DEVELOPMENT_PLAN.md** — 全面重写，已 push

### 今日之前（Session 历史）的进展
- Benares 航点（geo-benares, 贝纳勒斯，1922）
- Trivandrum 航点（geo-trivandrum, 特里凡得琅，1922-2023）
- Sri Ramakrishna 人物（color `#e8a060`，默认隐藏）
- Larry 印度哲学引语 ×10（Shiva / Vedanta / 吠檀多 / 陀思妥耶夫斯基 / moksha）
- Kashmir significance 更新为 `shiva_enlightenment`
- Larry 路线 coords 插入 Benares + Trivandrum

---

## 3. 关键上下文

### 项目架构
- **单文件 inline 数据**：`index.html`（2025 行），所有 JS/CSS/数据内联
- **无构建工具**：file:// 直接打开，无需服务器
- **hermes worktree 存在**但落后且架构不同（外置 JSON），不影响 main 开发

### 关键数据约束
- `flyToYear()` 范围：1919-2029
- `visibleCharacters.ramakrishna = false`（默认隐藏，通过图例切换）
- `visibleCharacters.suzanne = false`（默认隐藏）
- `visibleCharacters.elliott = true` / `suzanne = false`（需在 init() 中已处理）
- 航点总数：19 个，所有航点数据结构完整

### 最近发现的 Bug 模式
- **Python 批量字符串替换**（非 patch）插入航点时，容易丢失前一行末尾或后一行开头的引号括号
- 修复方法：patch tool 逐行精确匹配，或 Python replace 后立即 git diff 验证

---

## 4. 关键发现

1. **hermes worktree 是 main 的祖先节点**，不是 ahead/behind 关系。`git log main..hermes/hermes-d6b90d13` 输出为空，`hermes` 落后 6 commits，两边架构完全不同（inline vs 外置 JSON）

2. **patch tool 偶发截断问题**：Python bulk string replace 时若涉及换行符附近，容易产生不完整的行（如 `{ id: '\n` 孤行）

3. **headless Chrome 无法加载 OSM 瓦片**：本地开发 `open index.html` 正常，但 playwright headless 模式截图黑屏，属网络限制非代码缺陷

4. **主分支和 GitHub 完全同步**：无需 PR，本次所有改动已 push

---

## 5. 未完成事项

### P1（可立即继续）
- Benares / Trivandrum popup 4 标签内容深化（地理/情节/毛姆视角/面子）
- Ramakrishna 路线可视化（visible: false，可选）

### P2
- Status Objects 物品图片补充（当前 thumbnail placeholder）
- 各航点历史照片集成
- 移动端适配

### P3
- 多语言 EN/CN/JP 切换
- PDF 导出
- 人物关系图

---

## 6. 建议接手路径

1. **先读** `STATUS.md` 和 `DEVELOPMENT_PLAN.md`，了解项目全貌
2. **验证当前状态**：`cd /Users/mt16/dev/razors-edge-map && open index.html`，手动检查 Benares 和 Trivandrum popup 是否正常渲染
3. **确认无 error**：浏览器控制台无 JS 报错
4. **开始 P1 任务**或按用户新需求开发

---

## 7. 风险与注意事项

- **hermes worktree 不要轻易合入 main**：架构差异大，需要手动合并策略
- **新增航点时**：确保 year_start 在 1919-2029 范围内；新增后验证 `geo-xxx` ID 全局唯一
- **patch tool** 适合精确行内替换；跨多行或换行符附近改用 Python 文件操作后立即 git diff 验证
- **不推荐**：用 hermes worktree 做主要开发环境，其 data/ JSON 外置架构与 main 不兼容

---

**下一位 Agent 的第一步**：`cd /Users/mt16/dev/razors-edge-map && open index.html`，浏览器手动验证 Benares popup 的 4 个标签内容是否完整渲染。
