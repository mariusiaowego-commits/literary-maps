/**
 * map-data.js — 数据加载模块
 * 统一管理所有外部数据的加载和访问
 */

var MapData = (function() {
  'use strict';

  var _waypoints = [];
  var _characters = {};
  var _loaded = false;

  // Sophie 标记位置（硬编码，不常变动）
  var SOPHIE_LAT = 33.8;
  var SOPHIE_LNG = 26.5;

  /**
   * 从 data/waypoints.json 加载航点数据
   * @returns {Promise<Array>}
   */
  function loadWaypoints() {
    return fetch('data/waypoints.json')
      .then(function(resp) {
        if (!resp.ok) throw new Error('Failed to load waypoints.json');
        return resp.json();
      })
      .then(function(data) {
        _waypoints = data;
        return data;
      });
  }

  /**
   * 返回所有航点
   */
  function getWaypoints() {
    return _waypoints;
  }

  /**
   * 根据 id 返回单个航点
   */
  function getWaypoint(id) {
    return _waypoints.find(function(w) { return w.id === id; }) || null;
  }

  /**
   * 根据年份筛选航点
   */
  function getWaypointsByYear(year) {
    return _waypoints.filter(function(w) { return w.year === year; });
  }

  /**
   * 返回所有不同年份（去重排序）
   */
  function getYears() {
    var years = _waypoints.map(function(w) { return w.year; });
    return [...new Set(years)].sort();
  }

  /**
   * 返回 Sophie 标记坐标
   */
  function getSophieCoords() {
    return { lat: SOPHIE_LAT, lng: SOPHIE_LNG };
  }

  /**
   * 返回路线坐标数组（用于 polyline）
   */
  function getRouteCoords() {
    return _waypoints.map(function(w) { return [w.lat, w.lng]; });
  }

  /**
   * 初始化：加载所有数据
   * @returns {Promise}
   */
  function init() {
    if (_loaded) return Promise.resolve();
    return loadWaypoints().then(function() {
      _loaded = true;
    });
  }

  return {
    init: init,
    getWaypoints: getWaypoints,
    getWaypoint: getWaypoint,
    getWaypointsByYear: getWaypointsByYear,
    getYears: getYears,
    getSophieCoords: getSophieCoords,
    getRouteCoords: getRouteCoords,
  };

})();
