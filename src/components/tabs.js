/**
 * tabs.js — Tab 切换组件
 * 给定容器 DOM id，内部管理 tab 切换逻辑
 */
var Tabs = (function() {
  'use strict';

  /**
   * 初始化一个 tab 组件
   * @param {string} containerId - 包含 .tab-buttons 和 .tab-content 的容器 id
   * @param {Array} tabs - [{id, label}] tab 配置
   * @param {Function} renderer - function(tabId, containerId) 返回该 tab 的 HTML 内容
   */
  function init(containerId, tabs, renderer) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // 构建 tab 按钮行
    var btnRow = document.createElement('div');
    btnRow.className = 'tab-buttons';

    tabs.forEach(function(tab, i) {
      var btn = document.createElement('button');
      btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
      btn.textContent = tab.label;
      btn.dataset.tab = tab.id;
      btn.addEventListener('click', function() {
        switchTab(containerId, tabs, renderer, tab.id);
      });
      btnRow.appendChild(btn);
    });

    // 构建 content 区
    var content = document.createElement('div');
    content.className = 'tab-content';
    content.id = containerId + '-content';

    container.insertBefore(btnRow, container.firstChild);
    container.appendChild(content);

    // 渲染第一个 tab
    renderContent(containerId, tabs, renderer, tabs[0].id);
  }

  function switchTab(containerId, tabs, renderer, tabId) {
    // 更新按钮状态
    var btns = document.querySelectorAll('#' + containerId + ' .tab-btn');
    btns.forEach(function(b) {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    // 渲染内容
    renderContent(containerId, tabs, renderer, tabId);
  }

  function renderContent(containerId, tabs, renderer, tabId) {
    var content = document.getElementById(containerId + '-content');
    if (!content) return;
    content.innerHTML = renderer(tabId, containerId);
  }

  return { init: init };

})();
