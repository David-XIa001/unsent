const wildernessLive = {
  "id": "wilderness_live",
  "name": "荒野大求生：百万粉丝巅峰直播",
  "characterId": "anchor",
  "description": "你深夜带着一部手机、一个自拍杆和粉丝赠送的“奇葩新手大礼包”踏入神秘的黑瞎子岭。你的目标是：活过今晚，并疯狂整活让人气突破百万大关！",
  "startNode": "start_live",
  "flags": [],
  "nodes": {
    "start_live": {
      "description": "🎥 【直播间开启】！你站在黑瞎子岭的入口。手机屏幕里的弹幕已经开始刷屏：'主播真去作死啊？'、'今晚不拉肚子刷火箭！'。前方有三条路：左边是幽深的茂密森林，右边是散发着腐烂气味的迷雾沼泽，中间是水声轰鸣的溪流山谷。你必须做出首发选择，并大喊一声开场词！",
      "hints": [
        "茂密森林",
        "迷雾沼泽",
        "溪流山谷"
      ],
      "choices": [
        {
          "id": "wl_start_c1",
          "text": "大喊'家人们把保护打在公屏上！'，一头扎进左边的茂密针叶林",
          "deathRate": 0.35,
          "deathCause": "大喊大叫引发了树上隐藏的野黄蜂群的警戒，被蛰得满头包，因严重过敏导致直播间封禁并强制送医（社死淘汰）",
          "nextNode": "dense_forest",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_loud": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_start_c2",
          "text": "故作神秘地对镜头低语：'前面有脏东西...'，静悄悄摸进右边的迷雾沼泽",
          "deathRate": 0.35,
          "deathCause": "沼泽地里全是毒瘴气，你由于没有注意脚下，一脚踩入深层污泥，把手机也掉进泥潭，直播间瞬间黑屏，宣布停播（社死淘汰）",
          "nextNode": "misty_swamp",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_stealth": true
          },
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_start_c3",
          "text": "大吼'给大哥来一段冰桶挑战！'，直接冲向轰鸣的溪流山谷",
          "deathRate": 0.4,
          "deathCause": "夜晚溪水温度极低，你一脚踩滑跌入深水潭，冻得全身抽筋，不得不求助后勤人员打捞退赛（搞笑淘汰）",
          "nextNode": "creek_valley",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_wet": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage",
            "agility"
          ]
        }
      ]
    },

    "dense_forest": {
      "description": "🌲 针叶林里古树参天，猫头鹰的叫声令人毛骨悚然。你的直播人气来到了 5 万！突然，弹幕里有人说：'卧槽，主播你后面的树枝上挂着一个大马蜂窝！'、'捅了马蜂窝我刷十个跑车！'。你定睛一看，前方树干上确实挂着一个直径半米的黑色马蜂窝，而在马蜂窝的另一侧，隐约有一些巨大的奇怪爪印。警告：野蜂有毒，且攻击性极强！",
      "hints": [
        "马蜂窝",
        "奇怪爪印"
      ],
      "choices": [
        {
          "id": "wl_forest_c1",
          "text": "为了十个跑车！抄起自拍杆狠狠捅向马蜂窝！",
          "deathRate": 0.75,
          "deathCause": "野黄蜂极其凶猛，你被追着叮咬了 100 多下，脸当场肿成了猪头，直播画面惨不忍睹，被平台以'自残猎奇'为由永封直播间，彻底社死出局",
          "nextNode": "wasp_nest",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_forest_c2",
          "text": "镜头对准巨大的爪印：'家人们，这绝对是野兽的痕迹！'，顺着痕迹探索",
          "deathRate": 0.35,
          "deathCause": "爪印是刚刚冬眠醒来的大黑熊留下的，由于你太专注看爪印，一头撞在了正站在树后的黑熊怀里，被熊掌一巴掌拍得不省人事送去急救（出局）",
          "nextNode": "strange_tracks",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "track_found": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "wl_forest_c3",
          "text": "在树林下避开危险，寻找一些看起来色彩鲜艳的野生蘑菇",
          "deathRate": 0.38,
          "deathCause": "采摘时被隐藏在灌木丛中的毒蝎子蛰中，中毒倒地，不得不打电话叫救护车（出局）",
          "nextNode": "weird_mushroom",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "wasp_nest": {
      "description": "🐝 马蜂嗡嗡乱飞！弹幕一片爆笑：'主播的脸肿得像个发面馒头！'、'神级表情包诞生！'。虽然被蛰了，但由于画面极度鬼畜，你的人气瞬间飙升到 20 万！你狼狈地在一棵空心古树洞里躲避，惊喜地发现树洞底部有许多野生的成熟蜂蜜，正散发着浓郁的香气。你背包里的自热食品刚好可以用得上。警告：野蜂毒素尚在体内，徒手吃极度危险！",
      "hints": [
        "野生蜂蜜"
      ],
      "choices": [
        {
          "id": "wl_wasp_c1",
          "text": "现场给大家表演一个'徒手吃野生蜂蜜'，展现硬汉本色！",
          "deathRate": 0.85,
          "deathCause": "蜂蜜里残留了剧毒的野黄蜂蜂毒，吃完后嘴唇肿成香肠，喉头水肿无法呼吸，当场昏迷被拉走急救（淘汰）",
          "nextNode": "wasp_honey",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_wasp_c2",
          "text": "用自拍杆将蜜脾挑出来放入包中，退回到安全的古树下",
          "deathRate": 0.35,
          "deathCause": "古树突然断裂砸落，你连同蜜脾一起被压在树干下动弹不得（淘汰）",
          "nextNode": "weird_mushroom",
          "isSuccess": false,
          "conditions": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "wasp_honey": {
      "description": "🍯 获得野生蜂蜜！你肿着脸对着镜头大喊：'家人们，什么叫硬汉？这就是！'。粉丝疯狂刷屏，打赏不断。此时夜已经深了，森林深处飘来一阵白雾，远处的山壁上似乎隐约有一个深邃的黑洞，另一边则是低洼的林间空地。弹幕开始刷屏让你寻找晚上睡觉的避难所。",
      "hints": [
        "黑洞",
        "低洼空地"
      ],
      "choices": [
        {
          "id": "wl_honey_c1",
          "text": "举起自拍杆，壮着胆子探访山壁上的黑洞",
          "deathRate": 0.45,
          "deathCause": "黑洞是一处废弃多年的非法采矿井，洞口木板腐烂，你一脚踩空坠入深渊（出局）",
          "nextNode": "bear_cave_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_honey_c2",
          "text": "前往低洼空地，用枯木和塑料薄膜搭建简易帐篷",
          "deathRate": 0.35,
          "deathCause": "低洼地深夜山洪暴发，你被湍急的泥石流直接卷走流放到山脚下（淘汰）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "strange_tracks": {
      "description": "🐾 你顺着巨型爪印深入针叶林最黑暗的角落。弹幕都在刷：'这绝对是熊！'、'主播快跑！'。在你的前方，不仅爪印越来越新鲜，甚至空气中还弥漫着一股浓烈的动物腥骚味。前方的灌木丛中隐约传来粗重的呼吸声，而侧方的斜坡下面似乎立着一间古怪的废弃巡林木屋。警告：不可正面挑衅未知巨兽！",
      "hints": [
        "灌木丛",
        "巡林木屋"
      ],
      "choices": [
        {
          "id": "wl_tracks_c1",
          "text": "用自拍杆拨开灌木丛，想要拍一下野兽的真面目整大活！",
          "deathRate": 0.85,
          "deathCause": "你拨开灌木丛，一双巨大的血红色眼睛死死盯着你。一只暴怒的成年黑熊扑了出来，你虽然跑得快，但被熊一脚踹下山崖摔断双脚，直播彻底翻车（淘汰）",
          "nextNode": "bear_cave_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_tracks_c2",
          "text": "好汉不吃眼前亏，悄悄退回，沿着斜坡跑向废弃的巡林木屋避难",
          "deathRate": 0.35,
          "deathCause": "斜坡布满了捕兽夹，你不小心踩中铁夹，痛得大喊大叫被黑熊发现一锅端（出局）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "weird_mushroom": {
      "description": "🍄 在一棵腐烂的倒木旁，生长着一簇五彩斑斓的巨型蘑菇。弹幕起哄道：'主播，这可是好东西，吃一口我给你刷大火箭！'、'吃菌子，躺床板，红伞伞白杆杆！'。你虽然感觉常识告诉你这玩意有毒，但人气卡在 8 万上不去，你极度需要一波超级打赏！警告：这极大概率是致命毒菇！",
      "hints": [
        "红白毒菌"
      ],
      "choices": [
        {
          "id": "wl_mush_c1",
          "text": "大喊'家人们，拼了！'，现场咬了一口色彩最艳丽的红伞伞！",
          "deathRate": 0.9,
          "deathCause": "致命大毒菇！你仅仅吃了一口便开始在直播间疯狂跳舞，对着大树大喊'神仙姐姐带我飞'。平台以'涉嫌毒品及自残行为'强行掐断直播，你也被送去洗胃三天三夜（大社死淘汰）",
          "nextNode": "mushroom_hallucination",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_hallucinations": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_mush_c2",
          "text": "义正严辞拒绝：'主播是正能量，绝对不作死！'，掏出背包里的自热火锅吃",
          "deathRate": 0.35,
          "deathCause": "你的自热火锅加热包突然发生高压爆炸，滚烫的辣汤直接溅满双眼，痛苦难忍宣告退赛（淘汰）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "mushroom_hallucination": {
      "description": "🌀 【幻觉大发作】！你虽然扣了血但保住了小命。此时你满脑子都是七彩小人在跳迪斯科，你甚至对着镜头打出了一套极其标准的降魔伏虎拳，还和树洞里的松鼠结拜成了异姓兄弟。直播间观众笑疯了，疯狂给你刷'鬼畜巨星'。在神志不清中，你摇摇晃晃地沿着前方一条小路继续前行，不知不觉来到了一处开阔林区。警告：当前神志不清，在高处极度危险！",
      "hints": [
        "摇晃行进"
      ],
      "choices": [
        {
          "id": "wl_hallu_c1",
          "text": "借着致幻药效大喊'我乃大圣下凡！'，冲上高坡",
          "deathRate": 0.75,
          "deathCause": "你大叫大嚷从悬崖上高高跃起试图'飞升'，摔断了肋骨，直升机把你强行拖走（退赛出局）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_hallu_c2",
          "text": "感觉冷风一吹，稍微清醒了一些，扶着树木退向一座巡林木屋",
          "deathRate": 0.35,
          "deathCause": "木屋门前有深坑陷阱，你直接一头栽入，昏迷过去（出局）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_hallu_c3",
          "text": "【网状穿插】在幻觉中大声胡言乱语，顺着潺潺流水声一路摸索过去（前往溪流山谷）",
          "deathRate": 0.35,
          "deathCause": "在幻觉中以为小溪是温泉，直接躺在水底睡着，体温过低被搜救带走（淘汰）",
          "nextNode": "creek_valley",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_wet": true
          },
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "misty_swamp": {
      "description": "🌫️ 迷雾沼泽中能见度不足三米，死寂中充满了刺鼻的沼气。你的人气为 6 万。弹幕警告说：'沼泽里有地雷和捕兽夹，主播长点心吧！'。突然，脚下传来金属的清脆声响，低头一看，你的一只脚正悬在一枚生锈的捕兽夹上方！而在右侧雾气较薄的地方，隐约露出了一艘倾覆在烂泥中的废弃巡林船。警告：盲目移动必死无疑！",
      "hints": [
        "捕兽夹",
        "巡林船"
      ],
      "choices": [
        {
          "id": "wl_swamp_c1",
          "text": "冷静下来，用手中的自拍杆尝试将捕兽夹的触发铁弹簧挑开",
          "deathRate": 0.38,
          "deathCause": "捕兽夹内部弹簧紧绷力极强，自拍杆当场断裂，捕兽夹狠狠咬中了你的脚踝，骨折痛晕在泥潭中，被迫呼叫救援退赛（出局）",
          "nextNode": "swamp_trap",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence",
            "agility"
          ]
        },
        {
          "id": "wl_swamp_c2",
          "text": "大步跳开金属危险区，强行冲向废弃的巡林船躲避",
          "deathRate": 0.5,
          "deathCause": "跳落点是个无底泥潭，你当场陷进去只剩一个自拍杆露在外面（淘汰）",
          "nextNode": "swamp_island",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_cables": true
          },
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "swamp_trap": {
      "description": "🩹 捕兽夹擦边合拢！好在你有惊无险地躲开了，但腿部受了轻伤。直播间粉丝看直了眼：'主播反应真的神！'。人气疯狂飙升！此时，你的自拍杆在慌乱中掉在了前方的深层稀泥潭中，正一点点往下陷。如果自拍杆沉下去，你今晚的百万直播计划就彻底泡汤了！警告：深陷稀泥，盲目抢救极易陷落！",
      "hints": [
        "打捞自拍杆"
      ],
      "choices": [
        {
          "id": "wl_trap_c1",
          "text": "拼死趴在烂泥上，探出身子去抢救自拍杆和手机",
          "deathRate": 0.65,
          "deathCause": "稀泥潭突然塌陷发生泥石流，把你整个人拖入沼泽深渊吞没，惨被淘汰",
          "nextNode": "swamp_island",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_trap_c2",
          "text": "大声求救：'家人们，快帮我打 110！我陷入稀泥了！'，放弃捞自拍杆",
          "deathRate": 0.35,
          "deathCause": "由于失去了拍摄手机，直播自动断流，平台扣罚你严重违规且失去了热度（社死退赛）",
          "nextNode": "mud_sink",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_trap_c3",
          "text": "【网状穿穿】在浓重大雾中彻底丧失方向，连滚带爬摸回了茂密的针叶林深处（退回森林）",
          "deathRate": 0.35,
          "deathCause": "在大雾中撞在一棵枯木上，头部遭受重创当场倒地（出局）",
          "nextNode": "dense_forest",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "mud_sink": {
      "description": "🆘 你放弃了自拍杆，挣扎着爬到了沼泽边缘的一块干燥的高地上。虽然全身湿透狼狈不堪，但你成功保住了直播手机，只是镜头糊满了泥。弹幕狂刷：'主播真惨！'。在你前面，有一间看起来早就荒废的高脚巡林人木屋，屋顶的烟囱似乎泛着古怪的荧光。而在另一侧是一条延伸出沼泽的泥泞小路。",
      "hints": [
        "高脚木屋",
        "泥泞小路"
      ],
      "choices": [
        {
          "id": "wl_sink_c1",
          "text": "扶着泥泞，一瘸一拐地爬上高脚木屋的木梯",
          "deathRate": 0.35,
          "deathCause": "木梯多年前已腐朽不堪，你刚爬两步就一脚踩空，直挺挺仰面摔落扭断了脊椎（出局）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_sink_c2",
          "text": "沿着泥泞的小路连滚带爬，跑向相对开阔的林区",
          "deathRate": 0.4,
          "deathCause": "小路上有猎人埋下的竹刺陷阱，你一脚踩中，被锋利的竹刃刺穿脚掌（出局）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "swamp_island": {
      "description": "🛶 你来到了倾覆的巡林船旁边。这条废弃的小船里灌满了污泥，但船尾的铁箱子是闭合的，上面的锁已经生锈。弹幕纷纷刷：'主播赶紧撬锁开宝箱！'。你用旁边的枯木枝尝试当撬棍。同时你注意到，小木船的螺旋桨叶片上缠绕着几根质量极好的高压绝缘铜电缆线。警告：锈箱可能隐匿剧毒野生蛛蝎！",
      "hints": [
        "铁箱子",
        "铜电缆线"
      ],
      "choices": [
        {
          "id": "wl_island_c1",
          "text": "使键撬开生锈的铁箱子，寻找值钱的宝贝！",
          "deathRate": 0.45,
          "deathCause": "箱子里窝着一只高毒性的黑寡妇蜘蛛，当场咬伤了你的大拇指，剧毒迅速蔓延半身被迫退赛（出局）",
          "nextNode": "boat_explore",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_key": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "wl_island_c2",
          "text": "费力解开螺旋桨上的高压铜电缆线装入包中",
          "deathRate": 0.35,
          "deathCause": "小船突然发生翻滚重心失衡，将你的头部狠狠压在水底稀泥中无法呼吸（出局）",
          "nextNode": "mud_sink",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_cables": true
          },
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        }
      ]
    },

    "boat_explore": {
      "description": "🎒 成功撬开铁箱！里面并没有黄金，但有一把保存完好的野外生存猎刀（获得道具 `has_key`）和一瓶防熊喷雾。有了这些硬核装备，你底气大增，甚至对着镜头开始挥舞猎刀展示刀法。粉丝狂刷'666'。你现在已经深入了黑瞎子岭的核心地带，前方出现了一座神秘的巨石山壁，而在林海中露出了一座废弃木屋的屋顶。",
      "hints": [
        "神秘山壁",
        "废弃木屋"
      ],
      "choices": [
        {
          "id": "wl_boat_c1",
          "text": "挥舞猎刀开路，前往废弃木屋寻找庇护",
          "deathRate": 0.35,
          "deathCause": "木屋门后隐藏着狂犬野狗，你开门时被直接咬中脖子失血而亡（淘汰）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_boat_c2",
          "text": "走向神秘的巨石山壁，看看有没有避风的岩洞",
          "deathRate": 0.38,
          "deathCause": "巨石发生深夜塌方，一块百吨重石滚落，将你和手机砸成纸片（出局）",
          "nextNode": "bear_cave_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "creek_valley": {
      "description": "🌊 溪流山谷中流水湍急，巨大的浪花拍打在布满青苔的岩石上。空气中飘散着冷冽的水汽。你的人气为 7 万。弹幕大喊：'主播看左边！水里有一条半米长的金色大鲶鱼！'、'徒手抓鱼我给主播刷火箭！'。水潭极深，底下乱石遍布，水流湍急。另一侧是一条通往高山崖顶的陡峭羊肠小道。警告：在深水湍流中摸鱼极度致命！",
      "hints": [
        "抓大鲶鱼",
        "羊肠小道"
      ],
      "choices": [
        {
          "id": "wl_creek_c1",
          "text": "为了大火箭！脱掉鞋袜，小心翼翼摸入水潭尝试徒手抓大鲶鱼",
          "deathRate": 0.6,
          "deathCause": "水底岩石布满滑腻的青苔，你一脚踩空滑入水流中央的激流暗涌中，被冲入乱石堆撞碎了肋骨（出局）",
          "nextNode": "creek_fishing",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_creek_c2",
          "text": "沿着陡峭的羊肠小道往山顶的高耸信号发射塔方向爬去",
          "deathRate": 0.35,
          "deathCause": "山路陡峭，中途突发强烈的泥石流，你连同设备一起被泥石流冲到了山沟里（淘汰）",
          "nextNode": "ghost_mystery",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        }
      ]
    },

    "creek_fishing": {
      "description": "🐟 有惊无险！你的一只手在水下猛地合拢，竟然真的小概率掐住了大鲶鱼！弹幕瞬间炸锅：'卧槽主播太神了！'。人气瞬间突破 15 万大关！但鲶鱼力量极大，疯狂在水中摆尾挣扎，你的身体已经失去平衡，整个人往深水区滑去！警告：死不撒手会导致身体失衡！",
      "hints": [
        "稳住重心"
      ],
      "choices": [
        {
          "id": "wl_fish_c1",
          "text": "死不撒手！双腿紧紧夹住河底的岩石，借力把大鲶鱼往岸边拖！",
          "deathRate": 0.75,
          "deathCause": "鲶鱼尾巴狠狠扇中你的下巴，你一吃痛整个人向后翻入深水漩涡中窒息（淘汰）",
          "nextNode": "giant_catfish",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "wl_fish_c2",
          "text": "在失去平衡的瞬间主动放手，退回浅滩大喊'鲶鱼成精了！'整活",
          "deathRate": 0.35,
          "deathCause": "放手时被鲶鱼尖锐的鱼刺刺伤手掌大动脉，血流不止痛倒在河滩上（淘汰）",
          "nextNode": "cold_challenge",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "giant_catfish": {
      "description": "🤩 【神级抓鱼现场】！你成功将那条狂野的巨型鲶鱼摔在了河滩乱石上！它足足有 1 米长，你肿着脸（之前被马蜂蛰的）和鲶鱼并排躺在一起拍了张合照。人气爆棚来到 25 万！观众疯狂打赏。此时夜风呼啸，气温骤降，你全身湿透瑟瑟发抖。弹幕纷纷让你赶紧退回山崖旁边的废弃巡林木屋，不然要被冻僵了！",
      "hints": [
        "废弃木屋"
      ],
      "choices": [
        {
          "id": "wl_cat_c1",
          "text": "把巨型鲶鱼装入包中，抱着发抖的自拍杆赶紧跑向废弃木屋",
          "deathRate": 0.35,
          "deathCause": "木屋周围布满致命防盗电网，你全身湿透触电，瞬间化为焦炭（淘汰）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "speed"
          ]
        },
        {
          "id": "wl_cat_c2",
          "text": "在河滩上找一些枯枝，尝试用背包里的放大镜和生火",
          "deathRate": 0.38,
          "deathCause": "河滩枯木里其实混有高浓度的易爆天然气喷口，火星瞬间引爆发生大火把你吞噬（淘汰）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "cold_challenge": {
      "description": "🥶 虽然鲶鱼跑了，但你夸张的落水表情和'鲶鱼成精'的惨叫让弹幕疯狂刷屏！人气稳在 12 万。此时夜里温度到了零下，你全身衣服湿透，大风一吹，你冷得牙齿咯咯打战。弹幕纷纷说：'主播别硬挺了，要冻出人命了！'。前方有一条指向【高脚避难木屋】的标志牌，而另一侧通向大树林里。",
      "hints": [
        "高脚避难木屋"
      ],
      "choices": [
        {
          "id": "wl_cold_c1",
          "text": "顾不得太多，顶着冷风全速跑向高脚避难木屋",
          "deathRate": 0.35,
          "deathCause": "在冷风中跑步导致严重失温突发心脏骤停死亡（淘汰）",
          "nextNode": "cabin_exterior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "speed"
          ]
        },
        {
          "id": "wl_cold_c2",
          "text": "在大树林里用干枯的松针和树叶紧紧裹住身体保暖",
          "deathRate": 0.38,
          "deathCause": "松针堆里隐藏着野熊的陷阱，你一脚踏空跌落万丈深坑折颈死亡（出局）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "cabin_exterior": {
      "description": "🏠 你来到了废弃巡林木屋的门口。这座木屋用粗壮圆木搭建，高出地面一米，看起来非常扎实。但门上缠着锁链。如果你有【生存猎刀】（`has_key`），可以直接把铁链挑开；或者如果你拥有【绝缘铜电缆线】（`has_cables`），可以尝试顺着电线看看屋后的发电机房。警告：暴力撞门在此坚固木屋下几近自残！",
      "hints": [
        "破旧木门",
        "发电机房"
      ],
      "choices": [
        {
          "id": "wl_cab_c1",
          "text": "使用在巡林船里获得的【野外生存猎刀】（`has_key`）狠狠砍断铁链，破门而入！",
          "deathRate": 0.22,
          "deathCause": "铁链的反弹力极大，猎刀刀片突然折断横飞出去，刺穿了你的喉咙（淘汰）",
          "nextNode": "cabin_interior",
          "isSuccess": false,
          "conditions": {
            "has_key": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "wl_cab_c2",
          "text": "顺着外露电线绕到木屋背后，调查那一间被长满铁锈的发电机房",
          "deathRate": 0.35,
          "deathCause": "机房门顶有一块重达百斤的备用铁质飞轮松动砸落，正中头部砸碎颅骨（出局）",
          "nextNode": "cabin_generator",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "wl_cab_c3",
          "text": "没有钥匙工具，强行用肩膀暴力撞击大门！",
          "deathRate": 0.99,
          "deathCause": "强硬的厚圆木门纹丝不动，反作用力把你直接震碎了肩膀骨头，当场痛得休克过去，被直升机拉走退赛（大社死淘汰）",
          "nextNode": "cabin_interior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        }
      ]
    },

    "cabin_generator": {
      "description": "⚡ 机房里立着一台柴油发电机组。柴油机是满油的，但关键的配电柜连接线已经被老鼠咬得稀烂。如果你手头有【绝缘铜电缆线】（`has_cables`），就可以完美重连电路，把大楼/木屋的电恢复，开启高清夜视直播！这能极大地轰动直播间！",
      "hints": [
        "修复发电机"
      ],
      "choices": [
        {
          "id": "wl_gen_c1",
          "text": "利用手里的【绝缘铜电缆线】（`has_cables`）连接配电柜，重新启动发电机！",
          "deathRate": 0.22,
          "deathCause": "发电机内部发生剧烈高压短路火花，引发了泄露的柴油爆燃，你瞬间在大火中退赛（出局）",
          "nextNode": "cabin_interior",
          "isSuccess": false,
          "conditions": {
            "has_cables": true
          },
          "effects": {
            "generator_on": true
          },
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "wl_gen_c2",
          "text": "没有工具，放弃发电，直接翻窗跳入木屋内部",
          "deathRate": 0.35,
          "deathCause": "窗玻璃破损，你跳窗时动脉被破碎的大玻璃划破，大出血救治不及（淘汰）",
          "nextNode": "cabin_interior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "cabin_interior": {
      "description": "📻 木屋内暖和了许多。这里陈列着腐烂的标本箱、布满灰尘的破旧沙发。突然，角落里一台三十年前的古董收音机在【发电机通电】的状态下亮起了绿色的指示灯，并传出了刺耳的'沙沙'电流声。如果收音机发出电磁干扰，也许这里隐藏着黑瞎子岭的诡异怪谈秘密！",
      "hints": [
        "古董收音机",
        "搜寻客厅"
      ],
      "choices": [
        {
          "id": "wl_interior_c1",
          "text": "走过去扭动收音机旋钮，试图调解频段获取怪谈秘密！",
          "deathRate": 0.35,
          "deathCause": "收音机高压电容突然在通电下发生大爆炸，电路板零件刺入眉心（淘汰）",
          "nextNode": "radio_talking",
          "isSuccess": false,
          "conditions": {
            "generator_on": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "wl_interior_c2",
          "text": "坐在发霉的沙发上闭眼休息，向直播间家人们带带货聊聊天",
          "deathRate": 0.38,
          "deathCause": "沙发下面窝着一窝剧毒的野生变异山壁毒蛇，在你坐下瞬间咬穿了你的臀部动脉，救援人员来时你已全身黑化（淘汰）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        }
      ]
    },

    "radio_talking": {
      "description": "📡 收音机里传出一个冰冷古怪的男声，反复广播着一串经纬度坐标。弹幕一瞬间全都刷：'卧槽，规则怪谈！'、'走近科学深夜版！'。你的人气直接暴涨到了 40 万！这时候，窗外突兀地亮起了一道淡蓝色的光束，直插云霄。那似乎是山顶上的巨型信号发射塔传来的光线。",
      "hints": [
        "信号发射塔"
      ],
      "choices": [
        {
          "id": "wl_radio_c1",
          "text": "为了超级大流量！举起直播手机出门，直奔山顶的神秘信号塔！",
          "deathRate": 0.35,
          "deathCause": "在山路上不慎跌落无底猎人陷阱，摔入十米深坑折断颈椎（淘汰）",
          "nextNode": "ghost_mystery",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_radio_c2",
          "text": "太诡异了，坚决不出门！就在木屋里一直死守到天亮！",
          "deathRate": 0.38,
          "deathCause": "木屋因年代久远突发屋顶严重塌崩，你被沉重的房梁当场压扁（出局）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "bear_cave_exterior": {
      "description": "💀 你来到了巨石下方。赫然发现这里有一座高达两米的幽暗岩洞。洞口堆满了一些已经风干的动物白骨，令人头皮发麻。弹幕全部刷屏：'熊洞！'、'主播快跑！'。在洞口内部，隐约传来粗重的、犹如打雷般的沉闷呼噜声。你的人气来到了 18 万！警告：擅自闪光照熊几近必死！",
      "hints": [
        "黑熊洞"
      ],
      "choices": [
        {
          "id": "wl_bear_ext_c1",
          "text": "将手机摄像头伸进岩洞探路，开启闪光灯，探寻熊洞内部！",
          "deathRate": 0.7,
          "deathCause": "闪光灯的刺眼强光瞬间刺醒了冬眠中的暴怒黑熊！黑熊咆哮着一掌拍碎了摄像头，连带把你打飞数米，全身多处骨折大出血身亡（惨烈淘汰）",
          "nextNode": "bear_cave_interior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_bear_ext_c2",
          "text": "在洞口捡起一块巨型动物骨头假装在考古，然后迅速沿斜坡离开",
          "deathRate": 0.35,
          "deathCause": "斜坡石土松动，发生深夜山体滑坡，你直接连人带石跌落万丈深渊摔成肉泥（出局）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_key": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        }
      ]
    },

    "bear_cave_interior": {
      "description": "🐻 卧槽！岩洞深处趴着一只长达两米、重达半吨的巨型黑瞎子！它双眼闭合正在熟睡。弹幕彻底炸了，火箭跑车疯狂刷屏：'主播，去摸摸熊屁股我给你刷 50 个火箭！'。你手抖得自拍杆疯狂颤抖，人气直接飙升到了 35 万！警告：空手去摸熟睡的巨熊屁股无异于自杀！",
      "hints": [
        "熊屁股"
      ],
      "choices": [
        {
          "id": "wl_bear_int_c1",
          "text": "富贵险中求！极度轻手轻脚走过去，快速伸手摸一下熊屁股！",
          "deathRate": 0.99,
          "deathCause": "黑熊的臀部神经极其敏感！你刚碰触到它，它就猛地一招神熊甩尾，巨大的熊掌把你的直播手机连同右手臂拍成粉碎性骨折，在全网几十万观众的见证下直接被黑熊撕咬物理消灭（淘汰）",
          "nextNode": "bear_massaging",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "courage"
          ]
        },
        {
          "id": "wl_bear_int_c2",
          "text": "坚决不摸屁股，悄悄捞起几枚黑熊旁边散落的野果装入背包，极其缓慢地倒退出来",
          "deathRate": 0.35,
          "deathCause": "倒退时脚底踩中了极易爆响的干燥枯叶，黑熊瞬间惊醒咆哮一声把你一屁股坐扁（出局）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "bear_massaging": {
      "description": "🙀 奇迹！黑熊只是在梦中抖了抖屁股，翻了个身继续呼呼大睡！你整个人瘫在地上吓得出了一身暴汗，人气狂飙到 48 万！弹幕狂刷：'主播真战神！'。你拖着发软的腿连滚带爬逃离了岩洞，在一片密林边缘瘫软下来，必须尽快搭建临时帐篷度过这致命的寒夜。",
      "hints": [
        "临时帐篷"
      ],
      "choices": [
        {
          "id": "wl_massage_c1",
          "text": "用背包里的塑料膜和大树枝，在密林旁找个背风处搭好帐篷",
          "deathRate": 0.35,
          "deathCause": "树枝突然折断压倒，被粗重的大树干死死压断了颈部骨头（淘汰）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "wl_massage_c2",
          "text": "直接靠在一棵巨大的老樟树洞里，生火烤火直到天亮",
          "deathRate": 0.35,
          "deathCause": "火堆温度过高引燃了整个空心樟树，你被大火直接困在樟树洞中被烤焦（出局）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "tent_setup": {
      "description": "⛺ 夜深了。你在寒风中好不容易搭好了简易的塑料帐篷。然而，森林深处突然传来了一长串刺耳狼嚎！不多时，帐篷外黑影闪烁，幽绿色的眼睛在黑暗中亮起——你被一群野狼包围了！狼群流着口水，正一点点缩小包围圈。如果你包里有【食物/野生蜂蜜】（`has_food`）或有【生存猎刀/防熊喷雾】（`has_key`）可以规避；否则赤手反击将必死无疑！",
      "hints": [
        "狼群逼近"
      ],
      "choices": [
        {
          "id": "wl_tent_c1",
          "text": "扔出包里美味的【野生蜂蜜/食物】（`has_food`），用来当诱饵引开野狼！",
          "deathRate": 0.22,
          "deathCause": "野狼为了抢夺食物引发混战，把你踩在脚底下活活压死（淘汰）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {
            "has_food": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "wl_tent_c2",
          "text": "手握【生存猎刀/防熊喷雾】（`has_key`）对狼群狠狠挥舞喷洒，大吼大叫威慑！",
          "deathRate": 0.22,
          "deathCause": "防熊喷雾逆风喷洒，辣气吹入你自己的眼睛，你痛苦闭眼时被饿狼一拥上（淘汰）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {
            "has_key": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage",
            "combat"
          ]
        },
        {
          "id": "wl_tent_c3",
          "text": "赤手空拳，大吼'我今晚要生吃野狼！'冲出帐篷迎战！",
          "deathRate": 0.99,
          "deathCause": "没有武器防护，在饿狼团队战面前你如同一块脆弱的肥肉，被三只大狼死死按在地上疯狂撕咬，在直播间永封的黑屏中凄惨出局（淘汰）",
          "nextNode": "high_tree",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat",
            "strength"
          ]
        }
      ]
    },

    "high_tree": {
      "description": "🌲 奇迹般地！你在狼牙擦着你的屁股合拢的最后一瞬间，手忙脚乱地爬上了一棵高耸的红松大树！底下的狼群疯狂地刨着树皮。人气瞬间狂飙到 42 万！狂风暴吹，你在冰冷的树枝上瑟瑟发抖，必须坚持到天亮。警告：在冰冷的高空扭动动作极度容易折断树枝跌落！",
      "hints": [
        "高松树"
      ],
      "choices": [
        {
          "id": "wl_tree_c1",
          "text": "对着底下的狼群 and 直播手机大声激情演唱一首《学猫叫》整绝世大活！",
          "deathRate": 0.8,
          "deathCause": "在10米高空的细树枝上疯狂扭屁股唱歌，树枝突然咔嚓一声发生严重折断，你以自由落体脸部着地摔断了脖子，连同设备一起被狼群踩踏（淘汰）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "wl_tree_c2",
          "text": "死死抱住树干，将双腿用电缆线死死绑在树上，闭眼苦撑到日出",
          "deathRate": 0.35,
          "deathCause": "夜晚寒流太强，由于你死死绑着无法活动，被活活冻僵成了冰雕（出局）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },

    "ghost_mystery": {
      "description": "🛸 你根据收音机里获得的绝密指示，攀登到了黑瞎子岭最顶峰的信号塔下方。这里一片死寂，巨型的发射机组在深夜散发着蓝莹莹的高压电磁光圈。警告：电磁控制舱充满强高压静电，无心防备必死！",
      "hints": [
        "控制核心舱"
      ],
      "choices": [
        {
          "id": "wl_ghost_c1",
          "text": "举着手机，在淡蓝色光圈中大摇大摆迈步走入核心控制舱",
          "deathRate": 0.99,
          "deathCause": "核心控制舱充满了极高密度的超高压高空静电释放，你在进入的瞬间全身被数万安培的电弧闪击，当场汽化为一片青烟（淘汰）",
          "nextNode": "base_interior",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage",
            "hacking"
          ]
        },
        {
          "id": "wl_ghost_c2",
          "text": "感觉磁场太强浑身发麻，赶紧退下信号山，返回丛林边缘",
          "deathRate": 0.35,
          "deathCause": "撤退时不慎在峭壁踩空，坠下悬崖（淘汰）",
          "nextNode": "tent_setup",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ]
    },

    "base_interior": {
      "description": "📡 【震撼大发现】！控制舱内是一座老旧但布满复杂芯片的科幻基地，巨大的主板指示灯跳动，中间还存放着一份绝密的日记。原来这并非灵异怪谈，而是一座地磁信号基站！你当场直播高清阅读。在线人数瞬间突破 100 万人！",
      "hints": [
        "科学考察日记"
      ],
      "choices": [
        {
          "id": "wl_base_c1",
          "text": "拿着绝密日记，趁热打铁对直播手机大声宣布：'今晚人气不破百万不下播！'",
          "deathRate": 0.35,
          "deathCause": "基地内部的备用大型变压器突发超载大火，大火将出口封锁，吸入过多毒烟窒息（淘汰）",
          "nextNode": "survival_dawn",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_million_fans": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        }
      ]
    },

    "survival_dawn": {
      "description": "🌅 【曙光初现】！朝霞渐渐染红了黑瞎子岭的天空。清晨的第一缕阳光穿透林海，山脚下传来了搜救直升机的隆隆轰鸣声。你的身体极度疲惫，嗓子早已嘶哑。但在你的面前，摆着最后的抉择。你是老老实实下播上直升机，还是要在全网粉丝面前表演最后一波逆天的疯狂带货整活？！",
      "hints": [
        "终极大整活",
        "撤退下播"
      ],
      "choices": [
        {
          "id": "wl_dawn_c1",
          "text": "【理性退场】对着镜头深深鞠躬：'感谢老铁们今晚的支持，主播下播了！'，走向下山的搜救直升机",
          "deathRate": 0,
          "deathCause": "",
          "nextNode": "live_promotion",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": []
        },
        {
          "id": "wl_dawn_c2",
          "text": "【终极赌博】大吼：'家人们，天亮了，我要给你们现场表演一个徒手爬直升机机翼单手倒立带货！'，直接在螺旋桨的暴风中冲锋！",
          "deathRate": 0.7,
          "deathCause": "螺旋桨强大的下旋风暴直接把你整个人吹飞坠落山崖，手机摔得粉碎，直播间永封（搞笑社死出局）",
          "nextNode": "live_promotion",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_gamble_win": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage",
            "agility"
          ]
        }
      ]
    },

    "live_promotion": {
      "description": "📈 【巅峰直播终极解密】！你躺在搜救直升机的担架上。平台递来了保底的千万合同。到了最激动的财富结算时刻：如果你之前在信号基地拿到了科考绝密资料（`has_million_fans`）或者在刚才玩了命赌赢了直升机大整活（`has_gamble_win`），你就有资本去争取金牌神话！但你也可以选择安稳签约，或者，你是否敢于撕毁合同，强行全网连线PK赌上所有职业生涯？！",
      "hints": [
        "巅峰签约",
        "安稳签约",
        "撕毁合同强行PK"
      ],
      "choices": [
        {
          "id": "wl_promo_c1",
          "text": "【超级金牌带货主播】你的人气破百万或逆天赌赢，挺起胸膛签约千万级超级商业合同！",
          "deathRate": 0,
          "deathCause": "奇葩大胜利！你今晚的直播录像火遍全网，被各大媒体奉为荒野战神，身价过亿，完美退役！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {
            "has_million_fans": true
          },
          "effects": {},
          "modifiers": []
        },
        {
          "id": "wl_promo_c1_gamble",
          "text": "【超级金牌带货主播】依靠螺旋桨倒立大整活的硬核赌命胜利，加冕全网第一硬汉主播！",
          "deathRate": 0,
          "deathCause": "奇葩大胜利！你用生命证明了什么叫终极带货！千万合同主动送上门，全网粉丝为你疯狂，身价破亿！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {
            "has_gamble_win": true
          },
          "effects": {},
          "modifiers": []
        },
        {
          "id": "wl_promo_c2",
          "text": "【二线精品户外主播】虽然没有顶流，但你今晚经历了蜂蛰熊拍，抗揍形象深入人心，踏实签约保底合同！",
          "deathRate": 0,
          "deathCause": "普通大胜利！你拿到了一份踏实的保底合同，靠着吃苦耐劳的形象收获了百万粉丝，成功买房买车！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {},
          "effects": {},
          "modifiers": []
        },
        {
          "id": "wl_promo_c3_gamble",
          "text": "【终极豪赌】撕毁保底合同！大喊'我命由我不由天！'，直接在直升机上强行开启PK连线，叫板全网第一流量巨星！",
          "deathRate": 0.65,
          "deathCause": "由于当众撕毁合同并涉嫌恶意挑衅，被全网网民抵制并遭平台彻底封号，直接被封禁退赛，沦为全网笑柄（大社死淘汰）",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {},
          "effects": {},
          "modifiers": []
        }
      ]
    }
  }
};

export default wildernessLive;
