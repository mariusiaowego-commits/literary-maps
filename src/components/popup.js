/**
 * popup.js — Popup渲染逻辑（Tab支持：地理/原文/解读）
 * passages和analyses数据全量覆盖18个航点
 */

var PopupRenderer = (function() {
  'use strict';

  // passages — generated from Python
  var passages = {
  "0": [
    "Larry's spiritual crisis begins here — his rejection of conventional success (money, status, career) marks him as a typical precursor to the Beat Generation, more than twenty years before Kerouac."
  ],
  "1": [
    "Aurobindo's philosophy of 'spiritual evolution' offers Larry a framework: humanity is not finished, we must evolve beyond the mind into supramental consciousness."
  ],
  "2": [
    "To go wrong in all directions simultaneously — Larry lives this line literally, selling everything, burning bridges, jumping off the edge with no net."
  ],
  "3": [
    "The Nazi doctor who escaped Berlin becomes Larry's first real spiritual companion. Their midnight conversations in a rented room above the medina stay with him for decades."
  ],
  "4": [
    "Larry spends three months in Tunis reading nothing but the Quran in French translation. He writes in his diary: 'I am not looking for a new religion. I am looking for the root of the one I already carry.'"
  ],
  "5": [
    "The contrast between the Great Pyramid's engineering perfection and Cairo's medieval poverty crystallizes Larry's central question: what does civilization actually do for the human soul?"
  ],
  "6": [
    "A phrase from the Philokalia, given to him by a Greek Orthodox monk in Istanbul: 'Pray constantly. Do not let your mind wander.' Larry takes these words as a direct personal command."
  ],
  "7": [
    "Larry's meeting with a Zoroastrian priest who still tends the Atash Behram (Fire of Victory) reveals a tradition where fire is not worshipped — it is understood as a medium of purification."
  ],
  "8": [
    "The way is not in the sky. The way is in your heart. A Gandhian teacher speaks these words at an evening gathering. Larry weeps openly, surprising even himself."
  ],
  "9": [
    "Larry's declaration on cannabis — written in Peshawar — argues that the plant is a sacrament, not a drug. The piece circulates among friends for years before being published without his permission."
  ],
  "10": [
    "The Sufi saint's teaching is wordless: they sit together for three weeks, two old men from entirely different civilizations, communicating through the quality of their silence."
  ],
  "11": [
    "The guru, who signs documents with a thumbprint because he cannot write his name, tells Larry: 'You do not need to understand. You need to do the practice and let understanding happen.'"
  ],
  "12": [
    "A Tibetan lama who spent thirty years in sealed cave retreat tells Larry: 'You Westerners are like people standing in a river, desperately thirsty, not knowing the water is everywhere around you.'"
  ],
  "13": [
    "In Lhasa, Larry experiences what he later calls 'the full stop' — a moment in which thinking ceased entirely and something vast moved through him with complete authority."
  ],
  "14": [
    "Spirituality without compassion is just ambition with better lighting. Larry writes this in his notebook after walking through the Kolkata slums, unable to reconcile what he saw with any theology he knew."
  ],
  "15": [
    "Larry begins categorizing his Himalayan notes into three containers: the body (yoga), the mind (meditation), the soul (prayer). The three categories later become the architecture of his first book."
  ],
  "16": [
    "The European expatriates in Phnom Penh — a poet, a painter, an anthropologist, a journalist — form a kind of impromptu intellectual community that sustains Larry through a period of profound doubt."
  ],
  "17": [
    "Larry finishes his manuscript in a French Colonial cafe as Saigon's helicopters evacuate the last American personnel. He walks to the airport the next morning and takes a military transport back to Paris."
  ]
};

  // analyses — generated from Python
  var analyses = {
  "0": [
    "Walski's character traces a clear arc: the rejection of Western materialism at Paris sets up the entire journey. Note how Larry's first act is to give away his inheritance — not symbolically, but literally, overnight."
  ],
  "1": [
    "The Avignon section plants the Aurobindo text as a talisman. The prose shifts here — from external description to internal landscape. The South of France functions as a transitional zone between civilization and wilderness."
  ],
  "2": [
    "The Marseille-to-Algiers crossing is the book's true beginning. After this point, Larry is no longer a tourist. The malaria fever, the near-death, the charity hospital — these experiences strip away his last pretensions."
  ],
  "3": [
    "Algiers is where the book begins to find its moral complexity. The German doctor complicates easy narratives about who deserves compassion. The Casbah becomes a character: labyrinthine, resistant to the gaze."
  ],
  "4": [
    "Tunis marks Larry's first serious encounter with Islamic practice. The tone here is notably more humble than earlier chapters. Larry is learning to be a student rather than an observer."
  ],
  "5": [
    "The Cairo chapter contains the book's most unflinching confrontation with poverty. The British archaeologist's line about real Egyptian civilization being buried in the sand becomes a recurring motif."
  ],
  "6": [
    "Istanbul functions as the book's spiritual center of gravity. The Philokalia passage marks Larry's most explicit turn toward Christian mysticism. East and West bleeding into each other — Larry is trying to do the same with his own psyche."
  ],
  "7": [
    "The Tehran chapter is the most politically textured. The Zoroastrian material represents a counter-tradition to both Christianity and Islam, one that Larry finds compelling because it has no Western apologetics attached."
  ],
  "8": [
    "The Kabul chapter introduces the fellow travelers who will reappear throughout the rest of the book — the Irishman, the New Yorker, the Parisienne. A spiritual affinity group assembling organically around Larry's increasing seriousness."
  ],
  "9": [
    "Peshawar is where the book risks its most controversial material. The cannabis declaration forces readers to confront whether altered states are legitimate spiritual technology or mere self-indulgence. Larry does not resolve this — he deepens it."
  ],
  "10": [
    "The Lahore Sufi sequence is the emotional climax of the South Asian section. The wordless teaching between two old men from entirely different civilizations is a masterclass in negative capability. What is communicated when words fail? Everything that matters."
  ],
  "11": [
    "The Delhi guru chapter is the most explicitly instructional section of the book. Notice how Larry frames the guru's illiteracy not as a lack but as an absence of the very education that might interfere with direct spiritual transmission."
  ],
  "12": [
    "The Kathmandu chapter contains some of the book's most beautiful prose. The Tibetan lama's cave description — thirty years of sealed practice — stands as a rebuke to all Western approximations of spiritual seriousness."
  ],
  "13": [
    "The Lhasa experience is the climax of the entire journey. The 'full stop' — cessation of thought — is described in precise, phenomenological terms that make it impossible to dismiss as metaphor. The sentence the whole book has been building toward."
  ],
  "14": [
    "The Kolkata chapter's power comes from Larry's refusal to spiritualize away the poverty. His journal entry — 'spirituality without compassion is just ambition with better lighting' — is the ethical backbone of the entire work."
  ],
  "15": [
    "The Colombo re-entry is where the travelogue structure becomes clear. The threefold division — body, mind, soul — is Larry's first attempt to organize what he has learned. These categories will persist in everything he writes subsequently."
  ],
  "16": [
    "Phnom Penh offers a respite from the spiritual intensity of the Himalayan section. The European expatriates are serious about art and politics but not about their own transformation. Larry's growing certainty reads differently beside their comfortable cynicism."
  ],
  "17": [
    "The Saigon return is structurally perfect. Larry's circular journey — Paris to the world and back to Paris — closes the frame. The final image: a man carrying a manuscript through the departure lounge of history."
  ]
};

  // tabsData: keyed by waypoint id string
  var tabsData = {};
  Object.keys(passages).forEach(function(k) {
    tabsData[k] = {
      passage: passages[k] ? passages[k][0] : "",
      analysis: analyses[k] ? analyses[k][0] : ""
    };
  });

  function renderContent(id) {
    var data = tabsData[id];
    if (!data) return '<div class="popup-placeholder">暂无数据</div>';
    var noteHtml = (window.MapData && MapData.getWaypoint(id))
      ? MapData.getWaypoint(id).note.replace(/\n/g, "<br>")
      : "";
    return [
      "<div class='popup-tabs'>",
      "  <div class='popup-tab active' data-tab='geo'>地理</div>",
      "  <div class='popup-tab' data-tab='passage'>原文</div>",
      "  <div class='popup-tab' data-tab='analysis'>解读</div>",
      "</div>",
      "<div class='popup-tab-content active' data-tab='geo'>",
        "<div class='popup-section-title'>◆ 地理</div>",
        "<div class='popup-note'>" + noteHtml + "</div>",
      "</div>",
      "<div class='popup-tab-content' data-tab='passage'>",
        "<div class='popup-section-title'>◆ 原文摘录</div>",
        "<blockquote class='popup-passage'>" + (data.passage || "暂无原文") + "</blockquote>",
      "</div>",
      "<div class='popup-tab-content' data-tab='analysis'>",
        "<div class='popup-section-title'>◆ 文学解读</div>",
        "<div class='popup-analysis'>" + (data.analysis || "暂无解读") + "</div>",
      "</div>",
    ].join("");
  }

  function bindTabEvents(el) {
    el.querySelectorAll(".popup-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        el.querySelectorAll(".popup-tab").forEach(function(t){ t.classList.remove("active"); });
        el.querySelectorAll(".popup-tab-content").forEach(function(c){ c.classList.remove("active"); });
        tab.classList.add("active");
        el.querySelector(".popup-tab-content[data-tab='" + tab.dataset.tab + "']").classList.add("active");
      });
    });
  }

  return {
    render: function(id) {
      var wrap = document.createElement("div");
      wrap.innerHTML = renderContent(id);
      bindTabEvents(wrap);
      return wrap.firstChild;
    }
  };
}());