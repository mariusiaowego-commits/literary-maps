/**
 * popup.js — Popup 渲染逻辑（Tab 支持）
 * 三个 Tab：地理 / 原文 / 解读
 * 原文和解读内容从 data/ 目录加载（后续由 researcher 填充）
 */

var PopupRenderer = (function() {
  'use strict';

  var _passages = {};  // waypointId -> [passage objects]
  var _analyses = {};  // waypointId -> [analysis strings]

  /**
   * 加载 content 数据（passages.json / analyses.json）
   * 失败时静默忽略，popup 降级为单 Tab 模式
   */
  function loadContent() {
    return Promise.all([
      fetch('data/passages.json').then(function(r) { return r.ok ? r.json() : {}; }).catch(function() { return {}; }),
      fetch('data/analyses.json').then(function(r) { return r.ok ? r.json() : {}; }).catch(function() { return {}; }),
    ]).then(function(results) {
      _passages = results[0];
      _analyses = results[1];
    });
  }

  /**
   * 构建 Popup HTML（带 Tab 结构）
   */
  function buildHtml(wp) {
    var tabsId = 'popup-tabs-' + wp.id;

    var html = '<div class="popup-header">';
    html += '<div class="popup-title">' + wp.city + ' · ' + wp.zh + '</div>';
    html += '<div class="popup-yr">&#9201; ' + wp.year + (wp.key ? ' · ★ Key Event' : '') + '</div>';
    html += '</div>';

    // Tab buttons
    html += '<div class="popup-tabs" id="' + tabsId + '-btns">';
    html += '<button class="popup-tab-btn active" data-tab="geo" onclick="PopupRenderer.switchTab(' + wp.id + ', \'geo\')">地理</button>';
    html += '<button class="popup-tab-btn' + (hasPassages(wp.id) ? '' : ' disabled') + '" data-tab="passage" onclick="PopupRenderer.switchTab(' + wp.id + ', \'passage\')">原文</button>';
    html += '<button class="popup-tab-btn' + (hasAnalyses(wp.id) ? '' : ' disabled') + '" data-tab="analysis" onclick="PopupRenderer.switchTab(' + wp.id + ', \'analysis\')">解读</button>';
    html += '</div>';

    // Tab content area
    html += '<div class="popup-tab-content" id="' + tabsId + '-content">';
    html += renderGeoTab(wp);
    html += '</div>';

    return html;
  }

  /**
   * 渲染地理 Tab
   */
  function renderGeoTab(wp) {
    return '<div class="popup-geo">' + wp.note + '</div>';
  }

  /**
   * 渲染原文 Tab
   */
  function renderPassageTab(wp) {
    if (!hasPassages(wp.id)) {
      return '<div class="popup-empty">原文摘录待填充</div>';
    }
    var passages = _passages[wp.id] || [];
    var html = '';
    passages.forEach(function(p) {
      html += '<div class="popup-passage">';
      if (p.source) html += '<div class="popup-passage-src">' + p.source + '</div>';
      html += '<div class="popup-passage-text">“' + p.text + '”</div>';
      if (p.ref) html += '<div class="popup-passage-ref">' + p.ref + '</div>';
      html += '</div>';
    });
    return html;
  }

  /**
   * 渲染解读 Tab
   */
  function renderAnalysisTab(wp) {
    if (!hasAnalyses(wp.id)) {
      return '<div class="popup-empty">文学解读待填充</div>';
    }
    var analyses = _analyses[wp.id] || [];
    var html = '';
    analyses.forEach(function(a) {
      html += '<div class="popup-analysis">' + a + '</div>';
    });
    return html;
  }

  function hasPassages(id) {
    return Array.isArray(_passages[id]) && _passages[id].length > 0;
  }

  function hasAnalyses(id) {
    return Array.isArray(_analyses[id]) && _analyses[id].length > 0;
  }

  /**
   * 切换 Tab（供 onclick 调用）
   */
  function switchTab(wpId, tab) {
    var wp = MapData.getWaypoint(wpId);
    if (!wp) return;

    // 更新按钮状态
    var btns = document.querySelectorAll('#popup-tabs-' + wpId + '-btns .popup-tab-btn');
    btns.forEach(function(b) {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    // 更新内容
    var content = document.getElementById('popup-tabs-' + wpId + '-content');
    if (!content) return;

    if (tab === 'geo') {
      content.innerHTML = renderGeoTab(wp);
    } else if (tab === 'passage') {
      content.innerHTML = renderPassageTab(wp);
    } else if (tab === 'analysis') {
      content.innerHTML = renderAnalysisTab(wp);
    }
  }

  return {
    loadContent: loadContent,
    buildHtml: buildHtml,
    switchTab: switchTab,
  };

})();
