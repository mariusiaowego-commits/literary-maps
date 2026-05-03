/**
 * char-panel.js — 人物侧边栏逻辑
 * 点击角色名字 → 展开/收起人物档案
 */

var CharPanel = (function() {
  'use strict';

  // 人物档案数据（后续由 researcher 填充）
  // 格式：characterId -> { name, zh, desc, bio, arc, quotes, motivation }
  var _characters = {
    larry: {
      name: 'LARRY',
      zh: '拉里·达雷尔',
      desc: '流浪追寻生命意义，曾是一战空军飞行员',
      locations: [0, 17],  // 航点 id 数组
      // 以下字段由 researcher 后续填充
      bio: null,
      arc: null,
      quotes: [],
      motivation: null,
    },
    isabel: {
      name: 'ISABEL',
      zh: '伊莎贝尔',
      desc: '拉里的未婚妻，留在巴黎，后嫁给富商格雷',
      locations: [0],
      bio: null,
      arc: null,
      quotes: [],
      motivation: null,
    },
    bradshaw: {
      name: 'MRS. BRADSHAW',
      zh: '布拉肖太太',
      desc: '贵格会信徒，精神导师，引拉里去印度',
      locations: [7],
      bio: null,
      arc: null,
      quotes: [],
      motivation: null,
    },
    sophie: {
      name: 'SOPHIE',
      zh: '索菲·麦克唐纳',
      desc: '丈夫孩子车祸亡后沉沦酒精，青梅竹马',
      locations: [],  // 无固定城市，航海失踪
      bio: null,
      arc: null,
      quotes: [],
      motivation: null,
    },
    landor: {
      name: 'WALTER LANDOR',
      zh: '沃尔特·兰德尔',
      desc: '19世纪英国诗人/作家，《刀锋》第5章引用其诗',
      locations: [],
      bio: null,
      arc: null,
      quotes: [],
      motivation: null,
    },
  };

  /**
   * 加载人物档案数据（后续从 data/characters.json 加载）
   */
  function loadCharacters() {
    return fetch('data/characters.json')
      .then(function(r) { return r.ok ? r.json() : {}; })
      .catch(function() { return {}; })
      .then(function(data) {
        Object.keys(data).forEach(function(key) {
          if (_characters[key]) {
            Object.assign(_characters[key], data[key]);
          }
        });
      });
  }

  /**
   * 获取人物数据
   */
  function getCharacter(id) {
    return _characters[id] || null;
  }

  /**
   * 获取所有人物
   */
  function getAllCharacters() {
    return _characters;
  }

  /**
   * 构建人物面板 HTML（带展开/收起）
   */
  function buildPanelHtml() {
    var html = '';
    Object.keys(_characters).forEach(function(key) {
      var c = _characters[key];
      html += buildCharItemHtml(key, c);
    });
    return html;
  }

  /**
   * 构建单个角色条目的 HTML
   */
  function buildCharItemHtml(key, c) {
    var locationLabel = '';
    if (c.locations.length === 1) {
      var wp = MapData.getWaypoint(c.locations[0]);
      locationLabel = wp ? wp.city + ' · ' + wp.zh : '';
    } else if (c.locations.length > 1) {
      locationLabel = c.locations.map(function(id) {
        var wp = MapData.getWaypoint(id);
        return wp ? wp.city + ' · ' + wp.zh : '';
      }).join(' → ');
    } else {
      locationLabel = c.name === 'SOPHIE' ? 'Lost at Sea · 航海失踪' :
                      c.name === 'WALTER LANDOR' ? '英国' : '';
    }

    var hasDetail = c.bio || c.arc || c.motivation;

    var html = '<div class="char-item"' + (locationLabel ? ' onclick="CharPanel.toggle(\'' + key + '\')"' : '') + '>';
    html += '<div class="c-name">' + c.name + '</div>';
    html += '<div class="c-zh">' + c.zh + '</div>';
    html += '<div class="c-desc">' + c.desc + '</div>';
    if (locationLabel) {
      var isSophie = key === 'sophie';
      html += '<div class="c-city">&#9679; <span ' + (isSophie ? 'style="color:#c46a6a;" ' : '') + '>' + locationLabel + '</span></div>';
    }

    // 展开区域（默认隐藏）
    html += '<div class="char-detail" id="char-detail-' + key + '" style="display:none;">';
    if (hasDetail) {
      if (c.bio) html += '<div class="char-bio"><strong>人物小传：</strong>' + c.bio + '</div>';
      if (c.arc) html += '<div class="char-arc"><strong>人物弧线：</strong>' + c.arc + '</div>';
      if (c.motivation) html += '<div class="char-motivation"><strong>核心动机：</strong>' + c.motivation + '</div>';
      if (c.quotes && c.quotes.length) {
        html += '<div class="char-quotes"><strong>关键引语：</strong>';
        c.quotes.forEach(function(q) {
          html += '<blockquote>“' + q.text + '”</blockquote>';
        });
        html += '</div>';
      }
    } else {
      html += '<div class="popup-empty">人物档案待填充</div>';
    }
    html += '</div>';

    html += '</div>';
    return html;
  }

  /**
   * 切换展开/收起人物档案（供 onclick 调用）
   */
  function toggle(key) {
    // 先执行导航
    var c = _characters[key];
    if (c && c.locations && c.locations.length > 0) {
      var id = c.locations[0];
      var wp = MapData.getWaypoint(id);
      if (wp) {
        window.map && map.flyTo([wp.lat, wp.lng], 8, { duration: 1.4 });
        // 延迟打开 popup
        setTimeout(function() {
          map.eachLayer(function(layer) {
            if (layer instanceof L.CircleMarker) {
              var ll = layer.getLatLng();
              if (Math.abs(ll.lat - wp.lat) < 0.01 && Math.abs(ll.lng - wp.lng) < 0.01) {
                layer.openPopup();
              }
            }
          });
        }, 1500);
      }
    } else if (key === 'sophie') {
      var sc = MapData.getSophieCoords();
      window.map && map.flyTo([sc.lat, sc.lng], 6, { duration: 1.4 });
      setTimeout(function() {
        map.eachLayer(function(layer) {
          if (layer instanceof L.Marker) {
            var ll = layer.getLatLng();
            if (Math.abs(ll.lat - sc.lat) < 1 && Math.abs(ll.lng - sc.lng) < 1) {
              layer.openPopup();
            }
          }
        });
      }, 1500);
    }

    // 展开/收起详情
    var detail = document.getElementById('char-detail-' + key);
    if (detail) {
      var isOpen = detail.style.display !== 'none';
      detail.style.display = isOpen ? 'none' : 'block';
    }
  }

  return {
    loadCharacters: loadCharacters,
    getCharacter: getCharacter,
    getAllCharacters: getAllCharacters,
    buildPanelHtml: buildPanelHtml,
    toggle: toggle,
  };

})();
