# 260505-handoff.md — razors-edge-map 开发交接

## Session 日期
2026-05-04 夜间 → 2026-05-05 凌晨

---

## 已完成的工作

### Q 键 toggle quote-panel 修复 ✓
- **Root cause**: `init()` 第 1515 行无条件调用 `showContextQuote()`，页面一加载就加了 `visible` class，导致 Q 键 toggle 行为变成"关闭"而非"切换"
- **Fix**: 去掉 init 里的 `showContextQuote()` 调用，panel 初始隐藏，Q 键独立控制
- **Commit**: `697051d` — 已 push

### Legend toggle 路线残留问题 — 进行中（未解决）❌
- **现象**: 点击 legend 人物项取消选择后，地图上的路线仍然存在
- **当前状态**: alert 调试确认 `toggleRoute()` 函数能正常到达，`routeLayers['larry']` 存在，`map.removeLayer()` 执行无报错，但路线不从地图上消失
- **Commit**: `ef5241c` — 已 push，带有连环 alert 调试代码

---

## 待解决问题：Legend 取消选择后路线不消失

### 已知信息

1. **Legend item onclick 绑定了 `RazorMap.toggleRoute('larry')`** — alert 确认函数能到达
2. **`toggleRoute` 逻辑**（当前代码，带 alert 调试）:
   ```javascript
   function toggleRoute(charId) {
     visibleCharacters[charId] = !visibleCharacters[charId];
     if (visibleCharacters[charId]) {
       addRoute(charId);
     } else {
       if (routeLayers[charId]) {
         map.removeLayer(routeLayers[charId]);
         delete routeLayers[charId];
       }
     }
     buildCharPanel();
     syncLegendState();
   }
   ```

3. **`routeLayers` 初始化**（line 1422）: `var routeLayers = {};`

4. **`addRoute` 函数**:
   ```javascript
   function addRoute(charId) {
     var r = ROUTES[charId];
     if (!r) return;
     var polyline = L.polyline(r.coords, { color: r.color, ... });
     polyline.addTo(map);
     routeLayers[charId] = polyline;
   }
   ```

5. **`init()` 里所有人物默认 visible=true**（line 1427）

### 最可能的原因（明天验证）

`syncLegendState()` 在 `toggleRoute` 末尾被调用，它会遍历所有人物——包括当前被取消的那个。
`syncLegendState` 的逻辑：
```javascript
if (visibleCharacters[id]) {
  el.classList.add('active');
  if (!routeLayers[id]) addRoute(id);  // ← 如果路线刚被删除但 visible=true 会重建！
} else {
  el.classList.add('inactive');
  if (routeLayers[id]) { map.removeLayer(routeLayers[id]); delete routeLayers[id]; }
}
```

关键：`syncLegendState` 先于 `toggleRoute` 里的 `map.removeLayer` 执行？不，`toggleRoute` 的 `else` 分支已经删除了路线，然后 `syncLegendState` 才执行。

**另一个可能**: 路线在 init 时通过 `addRoute` 加了一次，但 `syncLegendState` 在 init 结束时也被调用，如果 `syncLegendState` 的 `if (!routeLayers[id]) addRoute(id)` 被调用但 `routeLayers[id]` 已经存在，就不会重复添加。逻辑看起来对。

**需要检查**: `ROUTES` 对象里 Larry 的 key 是否真的是 `'larry'`？

### 下一步

1. 确认 `ROUTES` 里 Larry 的实际 key（可能是 `'larry_d'` 而非 `'larry'`）
2. 在 `toggleRoute` else 分支加 `console.log` 打印 `routeLayers[charId]` 的内容
3. 去掉 alert 调试代码，恢复正常功能

---

## 最近的 commits
```
ef5241c debug: add alerts in toggleRoute to trace route removal failure
697051d fix: remove auto-show of quote panel on init; Q key now toggles independently
ef75e94 fix: proper legend toggle system — all 9 legend items now fully control map layers
```

---

## 文件路径
`/Users/mt16/dev/razors-edge-map/index.html`
