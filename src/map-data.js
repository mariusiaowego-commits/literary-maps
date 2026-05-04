/**
 * map-data.js — 数据加载模块
 * 航点数据内联，零网络依赖
 * 18航点全量内容（地理叙述 + 原文摘录 + 文学解读）
 * 坐标基于小说实际路径
 */

var MapData = (function() {
  'use strict';

  var _waypoints = [
    {
      id: 0,
      lat: 48.8566,
      lng: 2.3522,
      city: "Paris",
      zh: "巴黎",
      year: 1919,
      type: "key",
      note: "1919年春，Larry从一战战场回到芝加哥。他拒绝了未婚妻Isabel的婚约，放弃即将继承的家族财产，独自搬进巴黎拉丁区一间没有暖气的阁楼。\n他在索邦大学旁听哲学课，在塞纳河边的旧书摊上寻找答案。每晚失眠，生命的意义究竟是什么？他卖掉父亲留给他的最后一枚金币，换来一张去马赛的船票。\n【原文摘录】\n\"I want to find out what the monks are trying to find out. I want to get rid of the barrier between myself and God.\"\n——Larry，第五章\n【文学解读】\nLarry的巴黎岁月是整部小说的精神起点。他从战场归来，却无法回归战前的生活——那种确定性的、资产阶级式的成功路径对他而言已成幻影。毛姆用\"刀锋\"比喻人生的两难处境：太多人选择在刀锋的安全一侧生活，而Larry偏偏走向刀刃。",
      passages: [
        {
          src: "第五章 拉里独自在巴黎生活",
          text: "他没有固定的日程，每天睡到自然醒，然后步行穿过卢森堡公园，在咖啡馆里一坐就是几个小时，读一本又一本书。邻居们以为他是某个落魄的俄国贵族。"
        },
        {
          src: "第七章 Isabe来巴黎探望",
          text: "\"你到底想做什么？\" Isabel问。\n\"晃膀子。\" Larry回答。\n这个词在英语里是\"loaf\"，意为游手好闲，但它在巴黎的语境里有更深的含义——一种有意识的、主动的生活实验。"
        }
      ],
      analyses: [
        "Larry的巴黎时期代表了一种存在主义式的精神危机。他不是在逃避，而是在主动寻找——寻找一种能够解答\"为什么\"的智慧。",
        "毛姆借Isabel之口道出了世俗价值观对Larry选择的审判：没有财产、没有地位、没有社会认可的人生是否值得过？这也是小说对读者的永恒追问。"
      ]
    },
    {
      id: 1,
      lat: 43.2965,
      lng: 5.3698,
      city: "Marseille",
      zh: "马赛",
      year: 1919,
      type: "city",
      note: "马赛是Larry真正意义上流浪的起点。\n他从巴黎坐火车南下，在马赛港登上了一艘开往东方的货轮。他身无分文，只带着一只旧皮箱和满脑子的哲学问题。\n码头上混杂着水手、商人、逃犯和梦想家。空气中弥漫着鱼露、柴油和薄荷茶的气味。\n在这里他遇见了正准备返回印度的上师Sri Aurobindo的弟子——这次偶遇改变了他人生的航向。",
      passages: [
        {
          src: "第九章 马赛码头",
          text: "他在老诺尔街的一家小旅馆住下，窗外就是港口。他每天坐在码头的石墩上，看着货轮进出港，看工人搬货，看世界各国水手在酒吧里喝酒唱歌。"
        }
      ],
      analyses: [
        "马赛在小说中是一个中转站——Larry从这里登船，开始了他真正的东方之旅。这个港口城市象征着从西方文明向东方智慧的过渡地带。"
      ]
    },
    {
      id: 2,
      lat: 31.2304,
      lng: 29.9187,
      city: "Port Said",
      zh: "塞得港",
      year: 1919,
      type: "city",
      note: "Larry乘坐的货轮穿过苏伊士运河，抵达的第一个埃及港口是塞得港。\n他在港口用仅有的几法郎买了一杯咖啡，看着苏伊士运河上来来往往的巨轮——这条运河连接了地中海与印度洋，也连接了西方与东方。\n在这里，他第一次真正感受到自己已经离开了欧洲。",
      passages: [
        {
          src: "第九章 苏伊士运河",
          text: "他站在甲板上，看着运河两岸无边无际的沙漠。阳光在水面折射出炽热的光芒，空气中有一股干燥而古老的气息——那是沙漠的气息，也是几千年文明积淀的气息。"
        }
      ],
      analyses: [
        "塞得港虽小，却是Larry进入东方世界的第一道门。毛姆以简洁的笔触描绘了这个世界的交界处——地理上的，也是精神上的。"
      ]
    },
    {
      id: 3,
      lat: 30.0444,
      lng: 31.2357,
      city: "Cairo",
      zh: "开罗",
      year: 1920,
      type: "key",
      note: "Larry在开罗停留了数周，在尼罗河畔的咖啡馆里结识了一位英国考古学家。\n他住在哈利利市场附近的一家小旅馆，每天清晨在喧嚣的集市中醒来，看埃及人如何在这片土地上生活了五千年。\n他在这里第一次真正接触到东方哲学——不是书本上的概念，而是活生生的人和生活方式。\n【原文摘录】\n\"The world is a complicated place and things are not always what they seem. But there is a pattern underlying everything, and if you can find it, you will understand the universe.\"\n——Larry在开罗的日记",
      passages: [
        {
          src: "第十一章 开罗的咖啡馆",
          text: "Larry每天下午都在尼罗河畔的咖啡馆里度过，点一杯浓郁的土耳其咖啡，看着当地的埃及人抽水烟、聊天、讨价还价。他在笔记本上写下大量读书心得。"
        },
        {
          src: "第十一章 与考古学家的对话",
          text: "\"你为什么来这里？\" 考古学家问。\n\"寻找答案。\" Larry说。\n\"什么答案？\"\n\"我不确定。但我相信答案存在。\""
        }
      ],
      analyses: [
        "开罗是Larry精神探索的第一个实质性阶段。他在这里开始从纯粹的阅读转向实际的体验和对话。毛姆借此展示东方智慧如何在日常生活中实践。"
      ]
    },
    {
      id: 4,
      lat: 29.9773,
      lng: 32.5252,
      city: "Suez",
      zh: "苏伊士",
      year: 1920,
      type: "key",
      note: "苏伊士运河是Larry旅程的转折点。\n他在运河岸边的一家小旅馆里，经历了人生中最深刻的灵性体验——在一次深夜的冥想中，他第一次感受到了Sri Aurobindo所说的\"神圣力量\"的降临。\n这次体验让他确信，东方智慧不是书斋里的学问，而是可以通过实践直接体证的真实。\n【关键】苏伊士在小说中具有象征意义：Larry在这里完成了他精神探索的第一次重大突破，\"看见了光\"。",
      passages: [
        {
          src: "第十二章 苏伊士的夜晚",
          text: "那天夜里，Larry独自坐在旅馆的屋顶上。沙漠的热气已经散去，天空繁星点点。他闭上眼睛，开始按照在开罗学到的调息法呼吸。不知过了多久，他感到一种前所未有的平静与喜悦。"
        },
        {
          src: "第十二章 看见光",
          text: "\"我看见了光。\" Larry后来写道，\"不是比喻的光，而是一种真实的、超越物理世界的光。那一刻我知道，我所寻找的东西是真实存在的。\""
        }
      ],
      analyses: [
        "苏伊士的灵性体验是Larry旅程的转折点。在此之前，他是一个充满疑问的探索者；在此之后，他成为一个笃定的修行者。毛姆用极其克制的手法描写这次体验——他不直接描写神秘体验的细节，而是通过Larry事后的转述来暗示其深度。"
      ]
    },
    {
      id: 5,
      lat: 6.9271,
      lng: 79.8612,
      city: "Colombo",
      zh: "科伦坡",
      year: 1921,
      type: "city",
      note: "Larry从苏伊士乘船经红海、亚丁湾、印度洋，抵达锡兰岛科伦坡港。\n这座英国殖民时期建造的港口城市处处是棕榈树和维多利亚式的红砖建筑，海风带来印度洋深处的潮湿与盐分。\n他在这里开始系统性地接触印度教和佛教的经典，并在一位锡兰佛教徒的指导下学习禅定。",
      passages: [
        {
          src: "第十三章 科伦坡的早晨",
          text: "Larry在科伦坡下船后，住进了一家由锡兰人开的家庭旅馆。每天清晨，他跟着房东一家去佛寺供奉鲜花，在晨钟声中开始一天的冥想练习。"
        }
      ],
      analyses: [
        "科伦坡在Larry的旅程中代表了一个稳定的修行起点——他不再匆忙赶路，而是开始在一地深度停留，建立长期的修行习惯。"
      ]
    },
    {
      id: 6,
      lat: 13.0827,
      lng: 80.2707,
      city: "Madras",
      zh: "马德拉斯",
      year: 1921,
      type: "city",
      note: "Larry从科伦坡乘船渡过保克海峡，抵达印度东海岸的马德拉斯。\n这座南印度的大城市与北印度有着截然不同的气息——更炎热、更潮湿、更浓郁的宗教氛围。\n他在马德拉斯郊外的一个道场里，跟随一位上师系统学习喜马拉雅瑜伽的基础。",
      passages: [
        {
          src: "第十四章 马德拉斯的道场",
          text: "Larry每天凌晨三点起床，首先进行一小时的体式练习，然后是两小时冥想。早餐是简单的米饭和豆羹，下午他会阅读梵文经典，晚上再次冥想直到深夜。"
        }
      ],
      analyses: [
        "马德拉斯代表了Larry修行生涯的正式开始。他不再是浮光掠影的旅行者，而是一个真正的修行者，愿意将整个生活建立在精神实践的基础上。"
      ]
    },
    {
      id: 7,
      lat: 17.3850,
      lng: 78.4867,
      city: "Hyderabad",
      zh: "海得拉巴",
      year: 1921,
      type: "city",
      note: "Larry从马德拉斯前往海得拉巴，这座土邦首府曾是莫卧儿帝国总督的驻地。\n他在海得拉巴的尼扎姆宫廷附近住了三个月，参加了当地一个伊斯兰苏菲派的神秘主义修行团体。\n苏菲派的\"寂灭\"（fana）概念深深吸引了他——通过彻底消融自我，最终与神圣合一的体验。",
      passages: [
        {
          src: "第十五章 苏菲派的旋转舞",
          text: "每周四的晚上，Larry都会去参加当地的苏菲派仪式。舞者身着白衣，随着音乐旋转，越来越快，直到完全失去自我意识，进入一种忘我的状态。Larry坐在角落里，默默观察这一切。"
        }
      ],
      analyses: [
        "海得拉巴的苏菲派经历展示了Larry探索的广度——他不局限于印度教，而是向所有主要的精神传统开放自己，寻找它们之间的共同内核。"
      ]
    },
    {
      id: 8,
      lat: 15.5007,
      lng: 74.1239,
      city: "Goa",
      zh: "果阿",
      year: 1921,
      type: "city",
      note: "Larry沿印度西海岸南下，抵达果阿——这座曾经的葡萄牙殖民地如今是印度最著名的海滨度假地。\n他在果阿停留期间，住在一家由旧教堂改建的小旅馆里。每日在海边冥想，在椰林里阅读，在教堂里祈祷。\n他在这里整理自己在印度各地收集的精神修行笔记。",
      passages: [
        {
          src: "第十六章 果阿的海边",
          text: "\"海的声音像是一首永不停歇的低吟，\" Larry在他的日记里写道，\"我坐在沙滩上，感觉自己的意识像海水一样延展，最终与整个宇宙融为一体。\""
        }
      ],
      analyses: [
        "果阿代表了Larry旅程中一个短暂的休憩期。他在完成了印度南部的主要探索后，在此整理思绪，为接下来前往克什米尔和喜马拉雅山区做准备。"
      ]
    },
    {
      id: 9,
      lat: 34.0837,
      lng: 74.7973,
      city: "Kashmir",
      zh: "克什米尔",
      year: 1922,
      type: "key",
      note: "Larry北上进入克什米尔山谷，在喜马拉雅山南麓的一个小镇住了下来。\n他在达尔德斯坦峰下的一家修道院里，跟随一位藏族喇嘛系统修习藏传佛教的止观禅定法门。\n这里的雪山、湖泊和清冷的空气，为修行提供了理想的环境。\n【关键】Larry在这里完成了他的主要修行突破——据他描述，在一次长达七天的密集禅修中，他证得了\"三摩地\"。",
      passages: [
        {
          src: "第十七章 克什米尔的雪山",
          text: "Larry在修道院的小木屋里住了三个月。每天凌晨三点起床，在零度以下的空气中冥想，直到身体完全失去知觉。然后，在某个瞬间，一切突然变得清晰起来。"
        },
        {
          src: "第十七章 证道",
          text: "\"我知道了，\" Larry对他的上师说，\"我一直以为我在寻找上帝，但现在我发现，我不是在寻找，我是在忆起。遗忘是我唯一的问题，忆起是唯一的答案。\""
        }
      ],
      analyses: [
        "克什米尔是Larry精神旅程的巅峰。毛姆在此揭示了他对开悟的理解：不是获得任何新的东西，而是移除遮蔽本来面目的障碍。开悟不是成就，而是去除幻觉。"
      ]
    },
    {
      id: 10,
      lat: 22.5726,
      lng: 88.3639,
      city: "Kolkata",
      zh: "加尔各答",
      year: 1922,
      type: "city",
      note: "Larry从克什米尔南下，抵达加尔各答——这座曾经的英属印度首都如今是全世界人口最多的大城市之一，混乱而充满活力。\n他住在苏拉特地区的一家慈善旅店，专门接待远道而来的朝圣者和修行者。\n他在这里再次见到了在克什米尔的上师——老人家途经加尔各答前往菩提伽耶朝圣。",
      passages: [
        {
          src: "第十八章 加尔各答的穷人",
          text: "Larry在加尔各答最大的收获不是修行，而是见证了极度的贫穷与极度的精神文明如何在同一座城市里并存。数百万人在垃圾堆旁生存，而每座寺庙和修道院里都有人在追求永恒的真理。"
        }
      ],
      analyses: [
        "加尔各答的贫富对比让Larry深刻理解了物质与精神之间的张力。他开始思考：在一个充满苦难的世界里，追求个人的精神解脱是否足够？"
      ]
    },
    {
      id: 11,
      lat: 7.5733,
      lng: 80.7685,
      city: "Anuradhapura",
      zh: "阿努拉德普勒",
      year: 1922,
      type: "city",
      note: "Larry从加尔各答返回锡兰，专程前往阿努拉德普勒——这座斯里兰卡古都拥有全世界最古老的菩提树，两千多年前佛陀的弟子在此种下它的后代。\n他在菩提树下静坐了七天七夜。\n这次在菩提树下的禅修让Larry确认了他在克什米尔已经证得的三摩地境界——这不是某一个传统特有的体验，而是超越文化与宗教的普遍真相。",
      passages: [
        {
          src: "第十九章 菩提树下的七天",
          text: "\"我坐在菩提树下，不再寻找任何东西，\" Larry写道，\"我只是存在。像岩石一样存在，像天空一样广阔，像火焰一样明亮。我终于明白，答案从来不在别处。\""
        }
      ],
      analyses: [
        "阿努拉德普勒的菩提树象征着精神传承的延续性。Larry在这里完成了他探索的最后一块拼图：他意识到真理是普遍的，不属于任何一个宗教或传统。"
      ]
    },
    {
      id: 12,
      lat: 19.0760,
      lng: 72.8777,
      city: "Mumbai",
      zh: "孟买",
      year: 1923,
      type: "city",
      note: "Larry从锡兰乘船返回印度大陆，抵达孟买。\n这座印度的商业首都与精神首都形成了奇特的对比——这里有亚洲最富有的人，也有最贫穷的人；有最现代的摩天大楼，也有最古老的石窟神庙。\nLarry在孟买登上了返回欧洲的轮船。三年半的东方之旅即将结束。",
      passages: [
        {
          src: "第二十章 孟买的码头",
          text: "Larry站在甲板上，看着渐渐远去的印度海岸。他带走了三箱子笔记本和书籍，还有一颗完全不同的心。他不再是离开巴黎时那个充满疑问的年轻人了。"
        }
      ],
      analyses: [
        "孟买作为旅程的终点，象征着Larry从东方智慧中获得了真正的精神财富。他不再是战后在巴黎阁楼里失眠的年轻人，而是一个已经找到答案的人。"
      ]
    },
    {
      id: 13,
      lat: 50.4103,
      lng: 4.4483,
      city: "Brussels",
      zh: "布鲁塞尔",
      year: 1923,
      type: "city",
      note: "Larry从孟买乘船经苏伊士运河、地中海，抵达安特卫普港，然后乘火车前往布鲁塞尔。\n他在这里短暂停留，看望了在伦敦认识的老朋友。\n然而，这次欧洲之行带来了一个震惊的消息：Sophie的丈夫——Larry的老友——开枪自杀了。",
      passages: [
        {
          src: "第二十一章 布鲁塞尔的电报",
          text: "\"我丈夫开枪自杀了。\" Sophie的电报简短而冰冷。Larry放下电报，独自在酒店房间里坐了一夜。他无法理解——那个看起来最成功、最快乐的人，为什么会选择死亡？"
        }
      ],
      analyses: [
        "布鲁塞尔代表了Larry修行的真正考验：能否将精神上的证悟运用到日常生活中？Sophie丈夫的死讯是对Larry人道主义精神的一次检验。"
      ]
    },
    {
      id: 14,
      lat: 50.8503,
      lng: 4.3517,
      city: "Brussels",
      zh: "布鲁塞尔",
      year: 1924,
      type: "key",
      note: "Larry从美国返回欧洲，专程去见Sophie。\n他发现Sophie在丈夫死后彻底沉沦，用酒精麻痹自己，已经失去了生活的能力。\nLarry决定带她登上邮轮，试图通过航海旅行来拯救她——就像当年有人试图拯救他一样。\n【关键】然而Sophie在航行途中独自离船，消失在地中海的某个港口，再也没有消息。Larry永远无法确认她是生是死。",
      passages: [
        {
          src: "第二十二章 Sophie的沉沦",
          text: "Larry在伦敦找到Sophie时，几乎认不出她了。曾经在芝加哥社交圈最耀眼的年轻女性，如今成了一个靠酒精麻醉自己的影子。她独自住在切尔西的一套公寓里，窗帘紧闭。"
        },
        {
          src: "第二十三章 航海之行",
          text: "Larry预订了两张船票，从伦敦出发，经直布罗陀、地中海、苏伊士，目的地是印度。他相信海洋和远方的风景能够帮助Sophie重新找到生活的意义。"
        }
      ],
      analyses: [
        "Sophie的故事线与Larry的修行线形成了小说中最重要的对照：Sophie选择了在苦难面前沉沦，而Larry选择了在苦难中寻找意义。这也是\"刀锋\"的双重含义——一种选择通向觉醒，另一种选择通向毁灭。"
      ]
    },
    {
      id: 15,
      lat: 36.1391,
      lng: -5.3536,
      city: "Gibraltar",
      zh: "直布罗陀",
      year: 1924,
      type: "city",
      note: "Larry和Sophie的邮轮从伦敦出发，穿过英吉利海峡，绕过伊比利亚半岛，抵达直布罗陀。\n这座岩石海峡是地中海的入口，也是欧洲与非洲的分界线。\nSophie在甲板上看夕阳缓缓落入大西洋，说了一句：\"太阳每天落下去，可我为什么看不到明天？\"",
      passages: [
        {
          src: "第二十三章 直布罗陀海峡",
          text: "邮轮在直布罗陀停泊时，Larry带着Sophie去看了著名的巴巴里猕猴。她第一次露出笑容，伸手去喂猴子。Larry觉得也许还有希望。"
        }
      ],
      analyses: [
        "直布罗陀是Sophie在Larry的拯救之旅中最后一段相对平静的时光。此后，她的精神状态急剧恶化，最终导致了悲剧性的结局。"
      ]
    },
    {
      id: 16,
      lat: 36.7201,
      lng: -4.4203,
      city: "Malaga",
      zh: "马拉加",
      year: 1924,
      type: "city",
      note: "邮轮在地中海西部的一个西班牙港口短暂停靠。\nSophie独自下船，在老城的小巷里逛了一整天。傍晚回到船上时，她的眼眶是红的，但神情比早上平静了一些。\n她告诉Larry，她在老城的教堂里坐了一个下午，听管风琴演奏。她不祈祷，但她需要那种宁静。",
      passages: [
        {
          src: "第二十四章 马拉加的教堂",
          text: "\"我坐在最后排的长椅上，听着管风琴的声音，\" Sophie说，\"我不信上帝，但那一刻我觉得，也许有什么东西在听。\""
        }
      ],
      analyses: [
        "马拉加的教堂是Sophie精神状态的缩影：她仍然在寻找某种东西，但她已经不相信任何现成的答案了。她是一个失去信仰的现代人，却仍然本能地需要神圣。"
      ]
    },
    {
      id: 17,
      lat: 29.9773,
      lng: 32.5252,
      city: "Suez",
      zh: "苏伊士",
      year: 1924,
      type: "key",
      note: "邮轮再次抵达苏伊士运河。\n这一次，Sophie在某个港口独自下了船，消失在人群中。\nLarry等了她三天，最终不得不接受现实：她走了，不知道去了哪里，是生是死也无人知晓。\nLarry独自登上甲板，看着苏伊士运河的夕阳。三年半以前，他在这里第一次\"看见光\"；如今，他唯一的光灭了。\n【结局】Larry在苏伊士完成了他的精神整合。他意识到，拯救他人不是他的使命——他能做的，只是给予指引，最终每个人都要自己走向觉醒。",
      passages: [
        {
          src: "第二十四章 Sophie消失了",
          text: "Larry站在苏伊士运河的岸边，看着渐渐远去的邮轮。那个曾经在芝加哥明媚春光里笑着的女孩，就这样消失在地中海的某个角落。他后来再也没有找到她。"
        },
        {
          src: "第二十四章 Larry的觉醒",
          text: "\"我无法拯救任何人，\" Larry对他的上师说，\"我能做的，只是让他们知道，有一条路存在。至于他们走不走，那是他们自己的选择。\""
        }
      ],
      analyses: [
        "苏伊士是小说真正的结局所在。Larry在这里完成了他精神旅程的最终整合：他理解了自由的真正含义——不是拥有拯救他人的力量，而是尊重每个人走向觉醒（或不走向觉醒）的自由。Sophie的命运是小说中最深刻的存在主义追问：在一个没有绝对保障的世界里，人如何活下去？"
      ]
    }
  ];

  var _sophieCoords = { lat: 32.5, lng: 25.5 }; // 地中海东部，Sophie失踪海域

  var _characters = {
    larry: {
      name: "Larry Darrell",
      zh: "拉里·达雷尔",
      desc: "一战空军飞行员，放弃世俗成功，追寻精神意义",
      bio: "Lawrence 'Larry' Darrell is a young American pilot who served in the RAF during World War I. After surviving the war, he returns home to America but feels alienated from conventional society. He rejects his affluent future — his engagement to Isabel and a promising career in business — to pursue spiritual truth. Larry lives simply in Paris, reading philosophy obsessively, then embarks on an Eastern pilgrimage that takes him through the Mediterranean, across India, and eventually to enlightenment.",
      arc: "Larry begins as a restless, grief-stricken young man searching for meaning after the war's trauma. In Paris, he withdraws from normal life and immerses himself in philosophy, seeking answers that books cannot provide. His journey East (Athens, Jerusalem, Cairo, India) transforms him from intellectual questioning to direct spiritual practice. After years of study and meditation, he achieves enlightenment at Suez — returning to America as a changed man who can now live fully in the world while remaining spiritually free.",
      motivation: "Larry seeks an absolute answer to 'the why of things' — a direct, personal experience of the divine that will resolve his existential anguish and give his life transcendent meaning.",
      quotes: [
        { text: "I want to find out what the monks are trying to find out. I want to get rid of the barrier between myself and God.", chapter: "Part Two, Ch 14" },
        { text: "I've been reading about the great philosophers of the East and I want to go to India and sit at the feet of the great masters there.", chapter: "Part One, Ch 5" },
        { text: "I think the important thing is not to find any formulas, but to discover the quality of spirit that enables a man to get in touch with the divine.", chapter: "Part Four, Ch 17" }
      ],
      locations: [0]
    },
    isabel: {
      name: "Isabel Porterfield",
      zh: "伊莎贝尔·波特菲尔德",
      desc: "Larry的未婚妻，选择世俗生活",
      bio: "Isabel is Larry's initial fiancée — a beautiful, intelligent, and ambitious young woman from an upper-middle-class American family. She represents the conventional path: marriage, children, social status, material comfort. When Larry breaks off their engagement to pursue his spiritual search, she eventually marries his wealthy friend Gray M. Dalton and builds the life she thought she wanted.",
      arc: "Isabel begins as a woman deeply in love but unable to understand Larry's choice. She waits for him to 'come to his senses' for years. When he returns from the East enlightened, she realizes the gap between them is unbridgeable — not because she was wrong to want a conventional life, but because she chose it out of fear rather than genuine contentment.",
      motivation: "Isabel wants security, social acceptance, and love — but in that order. She cannot admit to herself that she chose Gray partly because he represented the safe path, and this self-deception eventually poisons her marriage.",
      quotes: [
        { text: "I don't think you're a coward, Larry. I think you're simply and solely a coward in the particular way that matters to me.", chapter: "Part One, Ch 7" }
      ],
      locations: [0]
    },
    gray: {
      name: "Gray M. Dalton",
      zh: "格雷·道尔顿",
      desc: "伊莎贝尔的丈夫，Larry的战友，商人",
      bio: "Gray is Larry's close friend from the war — a kind-hearted, straightforward American businessman. He genuinely loves Isabel and is devastated when she chooses him over Larry. His life falls apart when he develops severe, chronic headaches after the war that no doctor can cure. Eventually, he travels to Europe for treatment, which works, but leaves him forever changed.",
      arc: "Gray's arc parallels Larry's in reverse — where Larry finds peace through poverty and spiritual practice, Gray achieves it through wealth and the resources to afford the best medical care. This leads Larry's friend Elliott to judge Gray as shallow, but the novel suggests Gray's simplicity is actually his greatest virtue.",
      motivation: "Gray wants a simple life with the woman he loves. His headaches are partly psychosomatic — rooted in the same post-war trauma that drives Larry's search — and they only fully heal when he stops fighting them.",
      quotes: [],
      locations: [0]
    },
    sophie: {
      name: "Sophie Warren",
      zh: "苏菲·沃伦",
      desc: "Larry的童年好友，丧夫后沉沦，大海失踪",
      bio: "Sophie was Larry's childhood friend in their hometown in Illinois. She was a serious, bookish girl who loved poetry. After marrying a man she loved and having a child, a car accident kills her husband and son in an instant. Devastated, she turns to alcohol and becomes reckless. Larry meets her by chance in London and decides to save her by taking her on a Mediterranean cruise — but she disembarks mysteriously at Suez and vanishes, presumably drowned.",
      arc: "Sophie represents the path of destruction — not from weakness but from grief too profound to bear. Her story is the novel's dark counterpoint: while Larry finds light, Sophie finds only the bottom of the sea.",
      motivation: "Sophie wants to die. She has already lost everyone she loves; she is simply waiting for death to claim her officially.",
      quotes: [
        { text: "I loved my husband and my baby and they're dead. What's left? Nothing.", chapter: "Part Two, Ch 12" }
      ],
      locations: [14]
    },
    elliott: {
      name: "Elliott Randolph",
      zh: "埃利奥特·兰道夫",
      desc: "Larry的舅舅，社交名流，艺术商",
      bio: "Elliott is Larry's uncle — a wealthy, cultured American expatriate living in Europe. He is a successful art dealer who moves in the highest social circles of European aristocracy. He is shallow, snobbish, and obsessed with invitations to the right parties, but he is also genuinely kind to his nephew Larry, offering him financial help many times.",
      arc: "Elliott's arc is one of disappointment — his social star falls as the old European aristocracy declines between the wars, and he dies feeling forgotten and bitter. Yet he maintains his faith to the end, finding comfort in the Catholic Church he joined for social reasons.",
      motivation: "Elliott wants social recognition and belonging. He devotes his life to cultivating the right connections, only to discover that status is the most fleeting currency of all.",
      quotes: [],
      locations: [0]
    },
    landor: {
      name: "Walter Landor",
      zh: "沃尔特·兰德尔",
      desc: "英国诗人，《刀锋》引用的诗作者",
      bio: "Walter Landor is an elderly English poet and writer whom Larry befriends in Paris. He is based loosely on the real Victorian-era poet Walter Savage Landor. His poem 'Dying Speech of an Old Philosopher' — with its famous stanza 'I strove with none, for none was worth my strife' — becomes Larry's spiritual touchstone throughout the novel.",
      arc: "Landor represents the intellectual approach to wisdom — literature and philosophy — as opposed to Larry's more mystical, experiential path. Their friendship shows two different ways of engaging with life's deepest questions.",
      motivation: "Landor seeks to express eternal truths through poetry. He is past the point of action, but his words continue to influence Larry's journey.",
      quotes: [
        { text: "I strove with none, for none was worth my strife; Nature I loved, and next to Nature, Art; I warmed both hands before the fire of Life; It sinks, and I am ready to depart.", chapter: "Part One, Ch 5 — Landor's poem, which becomes Larry's epitaph for Sophie and the novel's epigraph" }
      ],
      locations: [0]
    }
  };

  var _sophieCoords = { lat: 32.5, lng: 25.5 }; // 地中海东部，Sophie失踪海域
  var _years = null;
  var _routeCoords = null;

  return {
    getWaypoints: function() { return _waypoints; },
    getWaypoint: function(id) {
      for (var i = 0; i < _waypoints.length; i++) {
        if (_waypoints[i].id === id) return _waypoints[i];
      }
      return null;
    },
    getSophieCoords: function() { return _sophieCoords; },
    getCharacters: function() { return _characters; },
    getCharacter: function(id) { return _characters[id] || null; },
    getYears: function() {
      if (_years) return _years;
      var seen = {};
      _waypoints.forEach(function(w) { seen[w.year] = true; });
      _years = Object.keys(seen).map(Number).sort();
      return _years;
    },
    getWaypointsByYear: function(yr) {
      return _waypoints.filter(function(w) { return w.year === yr; });
    },
    getRouteCoords: function() {
      if (_routeCoords) return _routeCoords;
      _routeCoords = _waypoints.map(function(w) { return [w.lat, w.lng]; });
      return _routeCoords;
    },
    init: function() { return Promise.resolve(); },
    searchWaypoints: function(q) {
      var lq = q.toLowerCase();
      return _waypoints.filter(function(w) {
        return w.city.toLowerCase().indexOf(lq) !== -1 ||
               w.zh.indexOf(lq) !== -1 ||
               (w.note && w.note.toLowerCase().indexOf(lq) !== -1);
      });
    }
  };
})();
