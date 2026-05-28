import wildernessLive from './wilderness_live';

const escapeRoom = {
  "id": "escape_room",
  "name": "深渊实验室：逃出生天",
  "characterId": "student",
  "description": "你在一个阴冷、散发着刺鼻化学药水味的废弃生化实验室中苏醒。四周大门紧闭，你必须依靠智慧搜集线索、破解机关，活过今天并逃离此地！",
  "startNode": "lobby",
  "flags": [],
  "nodes": {
    "lobby": {
      "description": "你缓缓睁开双眼，发现自己躺在一个幽暗空旷的大堂中。空气中弥漫着危险的静谧。前方有左侧一扇斑驳的木门，右侧一扇锈迹斑斑的防爆铁门，旁边还有一个落满灰尘的前台大理石接待处。",
      "hints": [
        "左侧木门",
        "右侧铁门",
        "前台桌"
      ],
      "choices": [
        {
          "id": "lobby_c1",
          "text": "推开左侧的斑驳木门，进入旧电脑室",
          "deathRate": 0.05,
          "deathCause": "木门上的铁钉松动脱落，砸中头部暴毙",
          "nextNode": "computer_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "lobby_c2",
          "text": "强行撬开右侧的防爆铁门，进入化学实验室",
          "deathRate": 0.08,
          "deathCause": "铁门把手上缠绕着裸露的高压电线，瞬间触电身亡",
          "nextNode": "lab_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "lobby_c3",
          "text": "小心走向一旁的前台接待处搜寻线索",
          "deathRate": 0.05,
          "deathCause": "脚下踩空绊倒在碎玻璃堆上，割破大动脉失血而死",
          "nextNode": "reception",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ],
      "position": {
        "x": 100,
        "y": 350
      }
    },
    "computer_room": {
      "description": "这是一间布满蜘蛛网的旧电脑室。正中央一台绿荧荧的古董大型主机显示屏在无声闪烁，旁边是凌乱的服务器机柜 and 通风管道。另一侧有一扇厚重的电子安全门紧闭着。",
      "hints": [
        "破解电脑",
        "通风管道",
        "电子门"
      ],
      "choices": [
        {
          "id": "comp_c1",
          "text": "尝试在终端上输入代码破译安保密码",
          "deathRate": 0.1,
          "deathCause": "键盘内部发生高压电弧短路，不幸触电身亡",
          "nextNode": "server_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "know_code": true
          },
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "comp_c2",
          "text": "暴力拆下生锈的通风管道挡板并钻入其中",
          "deathRate": 0.15,
          "deathCause": "拆卸时通风管道突然断裂崩塌，被沉重的铁架砸死",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "comp_c3",
          "text": "放弃这里，退回到幽暗的大堂",
          "deathRate": 0.05,
          "deathCause": "大堂门框彻底坍塌，被坠落的巨石砸中",
          "nextNode": "lobby",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 400,
        "y": 150
      }
    },
    "lab_room": {
      "description": "实验室里布满散落的危险试剂与破碎培养皿。空气中泛着蓝色的荧光，角落的防毒面具柜锁着，试剂架倾倒在一旁挡住了通往旧电脑室的暗门。",
      "hints": [
        "搜索面具",
        "推开试剂架",
        "退回大堂"
      ],
      "choices": [
        {
          "id": "lab_c1",
          "text": "搜索玻璃柜，尝试寻找防毒面具",
          "deathRate": 0.05,
          "deathCause": "柜中的试剂瓶破裂，吸入致命生化毒气窒息而死",
          "nextNode": "lab_deep",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_gasmask": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "lab_c2",
          "text": "使劲推开倾倒的试剂架，前往电脑室暗门",
          "deathRate": 0.1,
          "deathCause": "试剂架上的浓硫酸倾洒而下，全身大面积烧伤惨死",
          "nextNode": "computer_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "lab_c3",
          "text": "退回幽暗的大堂",
          "deathRate": 0.05,
          "deathCause": "撤退时绊倒在实验桌上，锐利的玻璃试管刺穿喉咙",
          "nextNode": "lobby",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 400,
        "y": 350
      }
    },
    "reception": {
      "description": "前台接待处的大理石台面上有一具早已干枯的警卫尸体，他手里紧紧攥着什么。前台抽屉是半开的，一旁的墙壁贴着北翼走廊指示图，往下则是通往地下安全通道的铁门。",
      "hints": [
        "翻找抽屉",
        "调查警卫",
        "地下安全通道",
        "北翼走廊"
      ],
      "choices": [
        {
          "id": "rec_c1",
          "text": "仔细翻找接待前台半开的抽屉",
          "deathRate": 0.05,
          "deathCause": "触发了抽屉下的防御毒针机关，当场暴毙",
          "nextNode": "lobby",
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
          "id": "rec_c2",
          "text": "利用【警备密码】解锁警卫身旁的机密安保箱",
          "deathRate": 0.05,
          "deathCause": "安保箱自毁炸弹起爆，粉身碎骨",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {
            "know_code": true
          },
          "effects": {
            "has_gun": true
          },
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "rec_c3",
          "text": "直接推开铁门，进入应急安全通道下楼",
          "deathRate": 0.05,
          "deathCause": "台阶布满滑腻青苔，一脚踩空摔断颈椎死亡",
          "nextNode": "stairs",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 400,
        "y": 550
      }
    },
    "lab_deep": {
      "description": "这是化学实验室最深处的废墟，强烈的紫外线消毒灯依然惨白地亮着。破损的生化舱里隐约有一件橙色的重型铅服，而地板上有一个强酸排放管道，正咕嘟咕嘟冒着黄绿色的泡泡。",
      "hints": [
        "调查生化舱",
        "强酸管道",
        "返回实验室"
      ],
      "choices": [
        {
          "id": "deep_c1",
          "text": "冒险打开生化舱，搜集橙色防护服",
          "deathRate": 0.15,
          "deathCause": "生化舱气压爆表炸裂，被高压玻璃碎片穿心而死",
          "nextNode": "lab_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_suit": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "deep_c2",
          "text": "硬着头皮，钻入满是黄绿色泡泡的强酸排放管道",
          "deathRate": 0.8,
          "deathCause": "强酸腐蚀了全身衣物与骨骼，痛苦化为一滩血水",
          "nextNode": "acid_pipe",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        }
      ],
      "position": {
        "x": 700,
        "y": 250
      }
    },
    "acid_pipe": {
      "description": "管道里强酸横流，刺鼻的气味让人头晕目眩。不过如果你身穿【防护服】，这些酸液似乎无法穿透这层厚重的涂层。前方管道出口连通着通风机管道。",
      "hints": [
        "依靠防护服强行通过",
        "返回深处"
      ],
      "choices": [
        {
          "id": "acid_c1",
          "text": "依靠【防护服】的安全保护，大步爬向通风管道出口",
          "deathRate": 0.05,
          "deathCause": "防护服在强酸中破损漏气，被酸液烫死",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {
            "has_suit": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "acid_c2",
          "text": "没有防护服，赤身在酸液中继续前行",
          "deathRate": 0.95,
          "deathCause": "酸液迅速融化了双腿，倒在管道里窒息身亡",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "acid_c3",
          "text": "狼狈爬回实验室深处",
          "deathRate": 0.1,
          "deathCause": "回爬时体力耗尽吸入过多酸气暴毙",
          "nextNode": "lab_deep",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": 250
      }
    },
    "corridor_a": {
      "description": "这是一条漫长无际的北翼走廊，破损的白炽灯疯狂闪烁。左手边是一间已经废弃的员工食堂，走廊尽头是一扇高压输电警示标志高悬的配电室大门，右侧则是安保室。",
      "hints": [
        "员工食堂",
        "高压配电室",
        "返回前台"
      ],
      "choices": [
        {
          "id": "corr_c1",
          "text": "推开摇晃的塑料门，进入员工食堂",
          "deathRate": 0.05,
          "deathCause": "食堂门顶上的重型监控摄像头砸下，颅骨碎裂而死",
          "nextNode": "canteen",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "corr_c2",
          "text": "前往走廊尽头的高压配电室",
          "deathRate": 0.1,
          "deathCause": "配电室门前高压漏电，瞬间化为一具焦炭",
          "nextNode": "power_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "corr_c3",
          "text": "掉头回到前台接待处",
          "deathRate": 0.05,
          "deathCause": "黑暗中不慎踩中生锈的铁钉，破伤风感染暴毙",
          "nextNode": "reception",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 700,
        "y": 450
      }
    },
    "canteen": {
      "description": "尘封的食堂里桌椅横七竖八地倒在地上。突然，几只变异的丧尸恶犬从阴暗的吧台后窜了出来，凶狠地盯着你！吧台侧面则是后厨通道和通风管道口。",
      "hints": [
        "对抗恶犬",
        "逃向通风口",
        "返回走廊"
      ],
      "choices": [
        {
          "id": "cant_c1",
          "text": "使用【脉冲枪】将恶犬瞬间击倒并消灭",
          "deathRate": 0.05,
          "deathCause": "枪支后坐力过大，震倒撞到尖锐桌角惨死",
          "nextNode": "kitchen",
          "isSuccess": false,
          "conditions": {
            "has_gun": true
          },
          "effects": {
            "has_food": true
          },
          "modifiers": [],
          "traitModifiers": [
            "combat"
          ]
        },
        {
          "id": "cant_c2",
          "text": "赤手空拳与变异恶犬进行生死搏斗",
          "deathRate": 0.8,
          "deathCause": "被凶残的丧尸犬咬穿喉咙，沦为其腹中之物",
          "nextNode": "kitchen",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat",
            "strength"
          ]
        },
        {
          "id": "cant_c3",
          "text": "在恶犬扑来的一瞬间，翻身跃入通风管道口",
          "deathRate": 0.15,
          "deathCause": "动作不够利落，被恶犬咬断后跟失血致死",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": 450
      }
    },
    "kitchen": {
      "description": "后厨里布满厚重的油垢和霉菌。你顺便在保鲜柜里搜寻到了几罐高能食物，在灶台上还发现了一盘未开封的备用黄铜电缆线。角落里是简易餐梯的竖井悬崖。",
      "hints": [
        "备用电缆",
        "餐梯竖井",
        "返回食堂"
      ],
      "choices": [
        {
          "id": "kit_c1",
          "text": "将备用黄铜电缆线装入背包，以备不时之需",
          "deathRate": 0.05,
          "deathCause": "吸入了灶台下泄漏的致命瓦斯，中毒而亡",
          "nextNode": "canteen",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_cables": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "kit_c2",
          "text": "走向一旁的餐梯竖井，观察其结构",
          "deathRate": 0.1,
          "deathCause": "脚底油污太滑，失足直接滑坠万丈深渊摔死",
          "nextNode": "canteen_lift",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        }
      ],
      "position": {
        "x": 1300,
        "y": 350
      }
    },
    "ventilation": {
      "description": "通风管道管道内极度狭窄、阴暗潮湿。这里犹如一个巨大的迷宫。微风从一个方向吹来，似乎能听到服务器风扇的轰鸣；而另一侧飘来恶臭；还有一根极为狭窄的铁管不知通往何处。",
      "hints": [
        "轰鸣方向",
        "恶臭方向",
        "狭窄铁管"
      ],
      "choices": [
        {
          "id": "vent_c1",
          "text": "沿着有微风 and 风扇轰鸣的方向爬过去",
          "deathRate": 0.05,
          "deathCause": "衣服被风扇卷入，被绞杀而死",
          "nextNode": "server_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "vent_c2",
          "text": "循着恶臭气味方向前行，寻找安保监控室",
          "deathRate": 0.1,
          "deathCause": "被藏匿在恶臭处的变异毒蜈蚣咬伤，剧毒暴毙",
          "nextNode": "guard_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "vent_c3",
          "text": "强行挤进另一侧极其逼仄扭曲的铁管中",
          "deathRate": 0.2,
          "deathCause": "卡在铁管死角中，无法进退，三天后窒息干涸而死",
          "nextNode": "vent_deadend",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 700,
        "y": 50
      }
    },
    "vent_deadend": {
      "description": "这里彻底是一条死胡同！四周是冰冷的铁壁，连翻身都困难至极。更糟糕的是，一只巨大的变异食人蛛从上方爬了下来，封锁了退路！",
      "hints": [
        "对抗食人蛛",
        "退回通风管"
      ],
      "choices": [
        {
          "id": "dead_c1",
          "text": "在管道中窒息闭眼，放弃挣扎等待命运",
          "deathRate": 1,
          "deathCause": "被变异毒蛛注入神经毒素，身体融化沦为毒蛛的孵化器",
          "nextNode": "",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "dead_c2",
          "text": "拼死往回挪动，试图退回通风管道主干道",
          "deathRate": 0.4,
          "deathCause": "回爬速度太慢，被毒蛛追上咬死在管道中央",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": -50
      }
    },
    "server_room": {
      "description": "这是庞大的数据机房，林立着巨型黑色机柜。然而没有供电，机柜一片漆黑。如果【基地通电】恢复，中央控制台的蓝色荧光盘就会亮起，允许读取这里的核心机密数据。前面通往电梯大厅。",
      "hints": [
        "拷贝数据",
        "前往电梯厅",
        "爬回通风道"
      ],
      "choices": [
        {
          "id": "serv_c1",
          "text": "在通电的主机控制台上插盘，拷贝核心机密数据",
          "deathRate": 0.05,
          "deathCause": "电脑突然高压爆炸，被横飞的电容芯片击穿眼球致死",
          "nextNode": "elevator_hall",
          "isSuccess": false,
          "conditions": {
            "generator_on": true
          },
          "effects": {
            "has_data": true
          },
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "serv_c2",
          "text": "推开防火双开门，直接前往电梯大厅",
          "deathRate": 0.05,
          "deathCause": "防火门外的天花板吊顶突然砸落砸碎颈椎",
          "nextNode": "elevator_hall",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "serv_c3",
          "text": "原路钻回冰冷的通风管道",
          "deathRate": 0.05,
          "deathCause": "回撤时头朝下栽落，扭断脖子身亡",
          "nextNode": "ventilation",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": 150
      }
    },
    "power_room": {
      "description": "配电室内火花四溅。巨型的备用发电机组因连接电缆烧毁而彻底停摆，整栋大楼的主闸无力下垂。空气中满是焦糊味和致命的高压火花跳跃。",
      "hints": [
        "使用电缆修复",
        "强行拉闸",
        "返回走廊"
      ],
      "choices": [
        {
          "id": "pow_c1",
          "text": "利用【备用电线】重新连接烧毁的配电柜并拉合电闸",
          "deathRate": 0.05,
          "deathCause": "合闸时强光闪烁引发尘爆，在大火中丧生",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {
            "has_cables": true
          },
          "effects": {
            "generator_on": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "pow_c2",
          "text": "不顾危险，直接赤手拉闸尝试强行送电",
          "deathRate": 0.9,
          "deathCause": "数万伏特超高压电流流经心脏，全身瞬间碳化死亡",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "pow_c3",
          "text": "退出配电室，返回北翼走廊",
          "deathRate": 0.05,
          "deathCause": "门槛处漏电水洼导电，触电身亡",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": 534
      }
    },
    "guard_room": {
      "description": "这里是安保监控室，大屏幕墙反射着幽幽的死寂。一个沉重厚实的合金保险柜立在墙边。如果用【铜钥匙】可以将其撬开，说不定能找到电梯授权磁卡！",
      "hints": [
        "开启保险柜",
        "返回北翼走廊"
      ],
      "choices": [
        {
          "id": "guar_c1",
          "text": "用【铜钥匙】插入合金保险柜锁孔并旋转将其开启",
          "deathRate": 0.05,
          "deathCause": "保险柜里封存的微型防盗集束地雷引爆自毁",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {
            "has_key": true
          },
          "effects": {
            "has_card": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "guar_c2",
          "text": "离开监控室，从正门回到北翼走廊",
          "deathRate": 0.05,
          "deathCause": "监控室电子门突发锁死事故，窒息死亡",
          "nextNode": "corridor_a",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1000,
        "y": 650
      }
    },
    "stairs": {
      "description": "应急安全楼梯盘旋向下。然而，由于空气循环系统损坏，这里被高浓度的剧毒黄绿色瓦斯气体彻底笼罩！如果没有【防毒面具】，强行下去无异于自寻死路。下层楼梯连接着地下B1层。",
      "hints": [
        "使用面具下楼",
        "强行冲过毒气",
        "退回前台"
      ],
      "choices": [
        {
          "id": "stai_c1",
          "text": "佩戴【防毒面具】气定神闲地迈步走下楼梯",
          "deathRate": 0.05,
          "deathCause": "面具滤毒盒突然过期失效，吸入瓦斯窒息而死",
          "nextNode": "underground_b1",
          "isSuccess": false,
          "conditions": {
            "has_gasmask": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "stai_c2",
          "text": "屏住呼吸，直接强行赤裸冲过重重黄绿色毒气",
          "deathRate": 0.9,
          "deathCause": "毒气经皮肤与呼吸道瞬间摧毁肺泡，痛苦地大口咳血暴毙",
          "nextNode": "underground_b1",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "stai_c3",
          "text": "掉头爬回前台接待处",
          "deathRate": 0.05,
          "deathCause": "台阶太陡，一脚踏空滚落下去摔断脖子",
          "nextNode": "reception",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 700,
        "y": 650
      }
    },
    "elevator_hall": {
      "description": "电梯大厅富丽堂皇却毫无生机。那部能够直达地下B2层绝密区的重型电梯正冷冰冰地立着。你需要【基地通电】且拥有【安保磁卡】才能刷卡启动它。否则你只能走防火门进入安全通道。",
      "hints": [
        "乘坐电梯",
        "防火门"
      ],
      "choices": [
        {
          "id": "elev_c1",
          "text": "使用【安保磁卡】刷开已经【通电】的重型电梯，直达地下B2层",
          "deathRate": 0.05,
          "deathCause": "电梯轿厢在下降时遭遇钢缆突然崩断，坠毁砸死",
          "nextNode": "underground_b2",
          "isSuccess": false,
          "conditions": {
            "generator_on": true,
            "has_card": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "elev_c2",
          "text": "强行扒开漆黑的电梯门，试图顺着电梯井下去",
          "deathRate": 0.85,
          "deathCause": "双手抓握不牢，直直坠落至电梯井最底层摔成泥",
          "nextNode": "stairs",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength",
            "agility"
          ]
        },
        {
          "id": "elev_c3",
          "text": "推开防火通道门，走向应急安全通道",
          "deathRate": 0.05,
          "deathCause": "防火门后挂着电线，不幸触电身亡",
          "nextNode": "stairs",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1300,
        "y": 150
      }
    },
    "underground_b1": {
      "description": "你来到了地下B1层走廊。闪烁的红色警报灯把四周染成血红。几只高大的基地重型机械警备巡逻机器人正在前面扫射，激光弹道纵横！后面则是安全通道和中央主枢纽。",
      "hints": [
        "击毁机器人",
        "强行潜行逃离",
        "回安全通道"
      ],
      "choices": [
        {
          "id": "b1_c1",
          "text": "手握【脉冲枪】连续开火射击，瞬间瘫痪警备机器人",
          "deathRate": 0.05,
          "deathCause": "击毁时机器人发生核动力电池爆炸，同归于尽",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {
            "has_gun": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat"
          ]
        },
        {
          "id": "b1_c2",
          "text": "赤手空拳，试图寻找机器人视野盲区潜伏强行通过",
          "deathRate": 0.75,
          "deathCause": "被红外扫描瞬间锁定，被重机枪扫射成筛子",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        },
        {
          "id": "b1_c3",
          "text": "退回应急安全通道",
          "deathRate": 0.05,
          "deathCause": "楼梯转角钢筋刺穿心脏",
          "nextNode": "stairs",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1300,
        "y": 550
      }
    },
    "underground_b2": {
      "description": "地下B2层是绝对禁区，周围钢板墙反射着合金的光泽。前面是一道泛着死光的红色激光防御网，只有刷【安保磁卡】才能暂时关闭它通行前往中央枢纽。否则会触发激光切割！",
      "hints": [
        "刷卡关闭激光",
        "强行闯激光网",
        "回电梯厅"
      ],
      "choices": [
        {
          "id": "b2_c1",
          "text": "在读卡器上刷入【安保磁卡】安全关闭激光通道",
          "deathRate": 0.05,
          "deathCause": "刷卡后引发系统反制机制，高压电弧贯穿身体而死",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {
            "has_card": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "hacking"
          ]
        },
        {
          "id": "b2_c2",
          "text": "心存侥幸，俯身强行尝试在错综的激光网里翻滚过去",
          "deathRate": 0.95,
          "deathCause": "激光网瞬间收缩，整个人被切割成无数肉块惨死",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        },
        {
          "id": "b2_c3",
          "text": "退回电梯厅",
          "deathRate": 0.05,
          "deathCause": "电梯井跌落杂物砸死",
          "nextNode": "elevator_hall",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1600,
        "y": 150
      }
    },
    "central_hub": {
      "description": "这里是地下的综合控制中枢，四通八达。东侧是一扇印着骷髅辐射标志的强辐射研究室气密门；西侧是最终的基地控制中心大门；南侧的通道指向应急避难逃生舱区。",
      "hints": [
        "强辐射研究室",
        "基地主控制室",
        "应急逃生舱"
      ],
      "choices": [
        {
          "id": "hub_c1",
          "text": "推开辐射气密门，前往强辐射研究室",
          "deathRate": 0.1,
          "deathCause": "气密门合拢时将你死死夹住，挤压致死",
          "nextNode": "radiation_lab",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "hub_c2",
          "text": "前往西侧的基地核心主控制室大门",
          "deathRate": 0.05,
          "deathCause": "主控制室门前的安全防护地板突然电解翻转摔死",
          "nextNode": "control_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "hub_c3",
          "text": "前往南侧通道的避难逃生舱发射区",
          "deathRate": 0.05,
          "deathCause": "通道顶棚消防水管爆裂砸下致死",
          "nextNode": "escape_capsule",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1600,
        "y": 550
      }
    },
    "radiation_lab": {
      "description": "强辐射室内绿光刺眼，警报轰鸣。正前方的废液反应池里，一张金黄色的黄金主卡正随着有毒波浪起伏。这里的致命辐射剂量能在几秒内融化人体的免疫系统！如果没有【防护服】，这里就是单向墓地。",
      "hints": [
        "穿防护服打捞",
        "赤身跃入废液池",
        "退回中央枢纽"
      ],
      "choices": [
        {
          "id": "rad_c1",
          "text": "穿着厚重的【防护服】跳入辐射废液中，打捞【黄金主卡】",
          "deathRate": 0.05,
          "deathCause": "防护服在废液中融化漏水，全身基因崩溃致死",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {
            "has_suit": true
          },
          "effects": {
            "key_card_gold": true
          },
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "rad_c2",
          "text": "没有防护服，直接赤条条地跳入绿荧荧的辐射废液池",
          "deathRate": 0.95,
          "deathCause": "全身骨髓与细胞核在超高辐射下瞬间崩解坏死，数秒内融化死亡",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "rad_c3",
          "text": "放弃黄金主卡，仓皇退回到中央枢纽",
          "deathRate": 0.05,
          "deathCause": "辐射门故障锁死，被关在此处脱水身亡",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1900,
        "y": 350
      }
    },
    "control_room": {
      "description": "这里是基地的控制中枢，海量的电子仪表盘令人眼花缭乱。基地的核心主控制台高高矗立，上面有一个插槽。你需要【黄金主卡】才能解锁主系统进行安全管理！如果用普通磁卡强行破解会触发安保自毁！",
      "hints": [
        "插入黄金主卡",
        "插入普通安保磁卡",
        "返回中央枢纽"
      ],
      "choices": [
        {
          "id": "ctrl_c1",
          "text": "将打捞出来的【黄金主卡】稳稳插入主控制台插槽",
          "deathRate": 0.05,
          "deathCause": "插槽突发超强高压静电击中太阳穴暴毙",
          "nextNode": "system_control",
          "isSuccess": false,
          "conditions": {
            "key_card_gold": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "ctrl_c2",
          "text": "心存侥幸，尝试插入普通【安保磁卡】强行激活系统",
          "deathRate": 0.85,
          "deathCause": "系统判定越权操作，触发主控室天花板的激光扫射，被切成两半",
          "nextNode": "system_control",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "hacking",
            "intelligence"
          ]
        },
        {
          "id": "ctrl_c3",
          "text": "退出控制室，返回中央枢纽",
          "deathRate": 0.05,
          "deathCause": "门框掉落铁板砸死",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1900,
        "y": 550
      }
    },
    "system_control": {
      "description": "控制台屏幕亮起！你已经拥有了基地的最高权限。你的面前有两个选项：选项一，关闭基地防爆安全大门大锁，通过大门安然离去；选项二，启动基地聚变反应堆自爆程序毁灭生化病毒（需要拷贝了核心机密数据作为证据逃离或牺牲自己）。",
      "hints": [
        "开启主大门",
        "启动基地自爆"
      ],
      "choices": [
        {
          "id": "sys_c1",
          "text": "执行【开启基地主大门】指令，全面降下防御壁垒",
          "deathRate": 0,
          "deathCause": "主闸全面开启，通往胜利之路！",
          "nextNode": "victory_gate",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "gate_opened": true
          },
          "modifiers": [],
          "traitModifiers": []
        },
        {
          "id": "sys_c2",
          "text": "【英雄之路】如果持有【机密数据】，选择锁死基地，启动同归于尽的基地核聚变自爆程序！",
          "deathRate": 0,
          "deathCause": "你锁死了基地的升降井，带走核心机密数据，含笑启动了反应堆超载程序。烈火瞬间淹没了一切，你拯救了世界！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {
            "has_data": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "sys_c3",
          "text": "返回核心主控制室大门",
          "deathRate": 0.05,
          "deathCause": "自毁机关短路爆炸死亡",
          "nextNode": "control_room",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 2200,
        "y": 550
      }
    },
    "victory_gate": {
      "description": "你站在基地最外围的重型防护主防爆大门前。随着令人牙酸的液压开门声，十余米高、几米厚的巨大合金门正缓缓向两侧退去。耀眼而灿烂的第一缕晨曦照在你的脸上。恭喜你赢ened这场终极逃生！",
      "hints": [
        "大步跨出大门"
      ],
      "choices": [
        {
          "id": "vic_c1",
          "text": "迎着太阳迈开坚定的步伐，完美逃离这个噩梦基地！",
          "deathRate": 0,
          "deathCause": "完美逃脱！你不仅安然无恙，还彻底揭开了基地的重重阴谋！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {
            "gate_opened": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": []
        }
      ],
      "position": {
        "x": 2500,
        "y": 550
      }
    },
    "escape_capsule": {
      "description": "这里是基地地下的逃生舱发射架，一排亮白色的单人应急避难逃生舱安详地悬挂在铁轨上。逃生舱的供电正常，只有拥有【安保磁卡】作为钥匙的最高权限，才能开启安全门舱进行超高速弹射逃离！",
      "hints": [
        "刷卡发射逃生舱",
        "返回主枢纽"
      ],
      "choices": [
        {
          "id": "cap_c1",
          "text": "使用【安保磁卡】解锁发射指令并躺入逃生舱，强行发射！",
          "deathRate": 0,
          "deathCause": "成功逃生！伴随着一声巨大的推进器轰鸣，你被弹射到了地表安全地带！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {
            "has_card": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "cap_c2",
          "text": "原路狼狈退回地下综合控制中枢",
          "deathRate": 0.05,
          "deathCause": "撤退时绊倒踩入高电压水潭触电身亡",
          "nextNode": "central_hub",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1900,
        "y": 750
      }
    },
    "canteen_lift": {
      "description": "餐梯井漆黑一片，呼呼狂风从下方吹上来。餐梯井的滑轮钢索破旧不堪。由于餐梯坠落，你只能依靠简易滑绳往下爬到地下B1层走廊。如果没有在食堂获得【高能食物】补充体能，在狂风中徒手下滑简直是自寻死路。",
      "hints": [
        "滑行索降",
        "爬回后厨"
      ],
      "choices": [
        {
          "id": "lift_c1",
          "text": "在吃饱【高能食物】体能充沛的前提下，紧抓钢索一路索降到地下B1层",
          "deathRate": 0.15,
          "deathCause": "下滑太快导致双手被摩擦起火脱手，坠入深渊摔死",
          "nextNode": "underground_b1",
          "isSuccess": false,
          "conditions": {
            "has_food": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength",
            "agility"
          ]
        },
        {
          "id": "lift_c2",
          "text": "体能不足（无食物状态），徒手抓着滑润的钢索往下爬去",
          "deathRate": 0.8,
          "deathCause": "爬到一半体力彻底不支，双手一松，大叫着摔落至井底化为一摊血泥",
          "nextNode": "underground_b1",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "lift_c3",
          "text": "放弃冒险，原路爬回后厨灶台",
          "deathRate": 0.05,
          "deathCause": "灶台二次瓦斯爆炸，被火光吞噬",
          "nextNode": "kitchen",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        }
      ],
      "position": {
        "x": 1600,
        "y": 350
      }
    }
  }
};

const zombieOffice = {
  "id": "zombie_office",
  "name": "丧尸危机：逃出写字楼",
  "characterId": "worker",
  "description": "周五下午5:59，就在你收拾东西狂喜下班的一瞬间，公司大楼突然被红灯与警报锁死——生化丧尸病毒全面爆发，整栋写字楼已成死域！你被困在24楼，唯有利用求生智慧与大楼地形，搜寻物资、突破重围，活过今天并成功降落到地面逃生！",
  "startNode": "office_24f",
  "flags": [],
  "nodes": {
    "office_24f": {
      "description": "24楼大办公区里警报红灯狂闪，满地是散落的A4纸与凌乱的办公桌，门外传来若有若无的低吼。前方有散发着微弱绿光的消防应急楼梯门，右侧则是那部平铺直叙的观光玻璃电梯大门，而前台茶水间里似乎能找到些有用的东西。",
      "hints": [
        "消防楼梯",
        "观光电梯",
        "茶水间"
      ],
      "choices": [
        {
          "id": "zo_24f_c1",
          "text": "仔细搜寻茶水间前台与HR的办公桌",
          "deathRate": 0,
          "deathCause": "搜寻安全",
          "nextNode": "office_24f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_scissors": true,
            "has_coffee": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "zo_24f_c2",
          "text": "推开消防安全通道的防火门，沿走廊楼梯狂奔下楼",
          "deathRate": 0.05,
          "deathCause": "大门背后的天花板突然坠落一块水泥板，砸碎头颅暴毙",
          "nextNode": "stairs_20f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "zo_24f_c3",
          "text": "使用【多功能剪刀】强行剪开并短路玻璃电梯的感应闸门并踏入",
          "deathRate": 0.5,
          "deathCause": "剪线时引发高压短路，被瞬时强电流流经心脏电击而亡",
          "nextNode": "elevator_16f",
          "isSuccess": false,
          "conditions": {
            "has_scissors": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        }
      ]
    },
    "stairs_20f": {
      "description": "你顺着斑驳的台阶狂奔到20楼，楼梯拐角处突然窜出几只浑身腐烂、眼冒绿光的变异丧尸恶犬！它们发出凶狠的撕咬咆哮，把通往20楼食堂大门的路死死封住！",
      "hints": [
        "肉搏恶犬",
        "强效咖啡",
        "退回大堂"
      ],
      "choices": [
        {
          "id": "zo_20s_c1",
          "text": "赤手空拳，大叫着去与丧尸恶犬进行殊死搏斗",
          "deathRate": 0.75,
          "deathCause": "被丧尸犬疯狂撕咬啃食喉咙，全身失血惨死在台阶上",
          "nextNode": "canteen_20f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat",
            "strength"
          ]
        },
        {
          "id": "zo_20s_c2",
          "text": "一口喝下【HR的强效咖啡】获得极限速度，以跑酷身手强行闪避并晃过恶犬",
          "deathRate": 0.1,
          "deathCause": "咖啡高能兴奋导致心率过载骤停猝死",
          "nextNode": "canteen_20f",
          "isSuccess": false,
          "conditions": {
            "has_coffee": true
          },
          "effects": {
            "has_coffee": false
          },
          "modifiers": [],
          "traitModifiers": [
            "speed"
          ]
        },
        {
          "id": "zo_20s_c3",
          "text": "狼狈万分地转过身，一溜烟往上退回24楼大办公区",
          "deathRate": 0.05,
          "deathCause": "慌乱中踩空滚下楼梯摔碎颈椎暴毙",
          "nextNode": "office_24f",
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
    "elevator_16f": {
      "description": "电梯轿厢剧烈晃动，哐当一声卡死在16楼电梯井中央，四面钢壁冰冷，周围伸手不见五指。好在前方的轿底安全逃生盖板可以撬开，似乎能顺着断裂的电梯钢索滑下去；另一侧则可以用多功能剪刀撬开外层防火门。",
      "hints": [
        "沿缆索速降",
        "撬防火门"
      ],
      "choices": [
        {
          "id": "zo_16e_c1",
          "text": "推开盖板，抓住钢丝绳缆索向下滑行速降",
          "deathRate": 0.35,
          "deathCause": "滑行速度太快，双手摩擦着火脱手滑落深渊，摔成肉泥",
          "nextNode": "server_room_12f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "strength"
          ]
        },
        {
          "id": "zo_16e_c2",
          "text": "利用【多功能剪刀】插进防火门缝隙，借力撬开电梯防火门",
          "deathRate": 0.15,
          "deathCause": "用力撬门时剪刀突然折断弹飞，正中颈动脉割喉而死",
          "nextNode": "stairs_20f",
          "isSuccess": false,
          "conditions": {
            "has_scissors": true
          },
          "effects": {
            "has_scissors": false
          },
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        }
      ]
    },
    "canteen_20f": {
      "description": "这里是尘封的员工食堂。曾经热闹的后厨散落着厚重的油垢与打翻的面盆，一具被啃噬过半的厨师尸体横在路中央。角落是运输剩菜剩饭的简易餐梯井，而冰箱电磁门上似乎亮着绿灯。",
      "hints": [
        "餐梯井",
        "搜索后厨"
      ],
      "choices": [
        {
          "id": "zo_20c_c1",
          "text": "爬入极度狭窄漆黑的餐梯竖井，尝试顺着滑轮钢丝降落",
          "deathRate": 0.15,
          "deathCause": "下滑时滑轮突然卡死崩溃，钢索崩断削去头颅致死",
          "nextNode": "stairs_15f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "strength"
          ]
        },
        {
          "id": "zo_20c_c2",
          "text": "仔细搜索后厨不锈钢保鲜冰箱的残骸",
          "deathRate": 0.05,
          "deathCause": "冰箱内部发生氟利昂泄露，吸入过多高浓度化学气体窒息而死",
          "nextNode": "stairs_15f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_gasmask": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },
    "stairs_15f": {
      "description": "15楼的消防通道彻底塌陷，数根手粗的高压主配电电缆横在路中央疯狂爆裂，高闪的火花在漆黑的走廊里狂闪。如果没有特殊的剪线工具，强行跨过高压裸露电线无异于自寻死路。",
      "hints": [
        "跨越电缆",
        "退回食堂"
      ],
      "choices": [
        {
          "id": "zo_15s_c1",
          "text": "硬着头皮，寻找电火花间隙直接大步翻跨过去",
          "deathRate": 0.7,
          "deathCause": "高压电弧将身体吸住，瞬间通电碳化，化为一焦炭",
          "nextNode": "server_room_12f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "zo_15s_c2",
          "text": "利用带橡胶套绝缘的【多功能剪刀】快速剪断并排绝高压线",
          "deathRate": 0.1,
          "deathCause": "剪线引发电路强尘爆，面部大面积烧伤惨死",
          "nextNode": "server_room_12f",
          "isSuccess": false,
          "conditions": {
            "has_scissors": true
          },
          "effects": {
            "has_scissors": false
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "zo_15s_c3",
          "text": "狼狈爬回20楼员工食堂",
          "deathRate": 0.05,
          "deathCause": "上爬时楼梯栏杆突然崩塌，滑落摔死",
          "nextNode": "canteen_20f",
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
    "server_room_12f": {
      "description": "12楼是全大楼的核心数据机房，大量的服务器柜发出死寂的无声轰鸣。然而空气循环系统突发漏气事故，高强度的黄绿色致命毒气正在机房里剧烈弥漫。如果没有过滤保护，强行呼吸将在十秒内窒息身亡。",
      "hints": [
        "强穿毒气",
        "拷贝终端"
      ],
      "choices": [
        {
          "id": "zo_12r_c1",
          "text": "佩戴上【简易防毒面具】，强行快步走过毒气弥漫的机柜通道",
          "deathRate": 0.05,
          "deathCause": "防毒面具滤毒室突然松脱漏气，吸入致命氯气而亡",
          "nextNode": "power_10f",
          "isSuccess": false,
          "conditions": {
            "has_gasmask": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "zo_12r_c2",
          "text": "直接屏住呼吸强穿毒气",
          "deathRate": 0.8,
          "deathCause": "吸入剧毒瓦斯，肺泡剧烈溶解出血，大口咳血暴毙",
          "nextNode": "power_10f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "constitution"
          ]
        },
        {
          "id": "zo_12r_c3",
          "text": "在未泄露的终端电脑前快速插盘，拷贝大楼的底层监控数据",
          "deathRate": 0.15,
          "deathCause": "终端电脑强电短路引起高频爆炸，横飞的碎片击穿面部死掉",
          "nextNode": "power_10f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "know_code": true
          },
          "modifiers": [],
          "traitModifiers": [
            "hacking"
          ]
        }
      ]
    },
    "power_10f": {
      "description": "你狼狈逃到10楼配电中心。整栋大楼的主供电闸低垂着，大楼电梯与监控全废。如果强行拉闸送电可以恢复一楼大堂展台和车库大闸的电力，但会引发巨大的短路电弧。一旁还有个锁着的安保值班抽屉。",
      "hints": [
        "合闸送电",
        "值班室抽屉"
      ],
      "choices": [
        {
          "id": "zo_10p_c1",
          "text": "硬着头皮，双手抓着橡胶电闸拉杆强行往上推以恢复电力",
          "deathRate": 0.6,
          "deathCause": "送电引发万伏强电压电闪，全身经受雷击融化惨死",
          "nextNode": "lobby_9f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "generator_on": true
          },
          "modifiers": [],
          "traitModifiers": [
            "courage"
          ]
        },
        {
          "id": "zo_10p_c2",
          "text": "利用身上的铁制长锁撬开保安队长的密码抽屉",
          "deathRate": 0.1,
          "deathCause": "抽屉底部藏着微型高强捕兽夹，一碰触发直接夹碎手腕感染暴毙",
          "nextNode": "lobby_9f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_baton": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        }
      ]
    },
    "lobby_9f": {
      "description": "这是9楼的综合高端展厅大厅，奢华的白色大理石地面布满鲜血。展台中央赫然立着一辆限量版流光金色保时捷911跑车！然而大批低吼的丧尸正漫无目的地在车旁环伺游荡。董事长办公室大门紧锁在另一侧。",
      "hints": [
        "董事长室",
        "3F楼梯",
        "潜行越尸群"
      ],
      "choices": [
        {
          "id": "zo_9l_c1",
          "text": "潜入董事长办公室，在隐藏门前输入机房拷贝得到的【监控密码】",
          "deathRate": 0.05,
          "deathCause": "董事长办公室的防盗激光枪发生误击将你刺穿",
          "nextNode": "lobby_9f",
          "isSuccess": false,
          "conditions": {
            "know_code": true
          },
          "effects": {
            "has_key_gold": true,
            "has_cash": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "zo_9l_c2",
          "text": "翻过光滑的前台展柜，往侧面3F应急医务室通道溜过去",
          "deathRate": 0.1,
          "deathCause": "展柜边缘松动砸塌，将胸椎砸烂断裂而死",
          "nextNode": "infirmary_3f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility"
          ]
        },
        {
          "id": "zo_9l_c3",
          "text": "心存侥幸，俯身利用盲区极其缓慢地潜行越过密集尸群",
          "deathRate": 0.45,
          "deathCause": "潜行时踢翻了保洁水桶，瞬间引来全部丧尸啃食沦为白骨",
          "nextNode": "garage_b1",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "agility",
            "speed"
          ]
        }
      ]
    },
    "infirmary_3f": {
      "description": "3楼是写字楼的简易医务室，空气中满是苏打水与腐烂的气味。药剂柜倾倒一地，里面似乎还封存着一瓶闪烁着莹莹蓝光的【生化抑制剂】，旁边桌上还散落着强效注射液。",
      "hints": [
        "搜索药剂",
        "直接下楼"
      ],
      "choices": [
        {
          "id": "zo_3i_c1",
          "text": "仔细搜索残缺的医用冰柜药架",
          "deathRate": 0.2,
          "deathCause": "柜中的密封有毒针管意外弹出刺中瞳孔，剧毒针剂流入颅内暴毙",
          "nextNode": "guard_room_1f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_adrenaline": true,
            "has_suppressor": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "zo_3i_c2",
          "text": "放弃搜索，直接推开防火安全通道下一楼",
          "deathRate": 0.1,
          "deathCause": "楼道门把手带有破伤风烈性病毒，刺破手掌感染暴毙",
          "nextNode": "guard_room_1f",
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
    "guard_room_1f": {
      "description": "来到了1楼写字楼的门卫保安值班室。桌上大屏幕显示着全楼的惨烈状态。挂在保安队长钥匙扣上的那张厚重的黑色权限卡非常显眼，那是解开地下车库重型路障的钥匙！",
      "hints": [
        "偷队长黑卡",
        "拉门硬闯"
      ],
      "choices": [
        {
          "id": "zo_1g_c1",
          "text": "伸手在队长早已高度变异的无头尸骸腰间打捞【安保室黑卡】",
          "deathRate": 0.1,
          "deathCause": "队长的无头残肢突然神经反射式擒抱掐死喉咙窒息而死",
          "nextNode": "lobby_1f",
          "isSuccess": false,
          "conditions": {},
          "effects": {
            "has_card_guard": true
          },
          "modifiers": [],
          "traitModifiers": [
            "intelligence"
          ]
        },
        {
          "id": "zo_1g_c2",
          "text": "不顾一切，直接一脚飞踹拉开大厅安保应急防爆大门",
          "deathRate": 0.25,
          "deathCause": "门顶的报警自爆阀引爆，炸成灰烬",
          "nextNode": "lobby_1f",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "speed"
          ]
        }
      ]
    },
    "garage_b1": {
      "description": "这是地下一层的庞大停车场，空无一人，红色信号灯狂闪。出口处有一道几米宽、完全闭锁的智能地磁防爆栏杆挡住去路，旁边还有一位高达两米、穿着重装防暴服的巨大丧尸安保保镖正疯狂撕扯着轮胎！",
      "hints": [
        "肉搏保安",
        "重型装甲车",
        "管道爬大堂"
      ],
      "choices": [
        {
          "id": "zo_b1_c1",
          "text": "握紧手中的【防暴电甩棍】，高高跃起劈向重装丧尸保镖的头部",
          "deathRate": 0.15,
          "deathCause": "用力过猛撞碎玻璃车窗，扎破大动脉惨死",
          "nextNode": "victory_run",
          "isSuccess": false,
          "conditions": {
            "has_baton": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat",
            "strength"
          ]
        },
        {
          "id": "zo_b1_c2",
          "text": "在【电力恢复】的状态下，刷【安保室黑卡】升起栏杆并启动智能越野装甲车撞墙闯关",
          "deathRate": 0.05,
          "deathCause": "装甲车刹车失灵一头扎入配电箱高压炸死",
          "nextNode": "victory_armor",
          "isSuccess": false,
          "conditions": {
            "generator_on": true,
            "has_card_guard": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": []
        },
        {
          "id": "zo_b1_c3",
          "text": "赤手空拳，大吼着与高达两米的变异重装保镖进行肉体肉搏对抗",
          "deathRate": 0.85,
          "deathCause": "被两米高丧尸保镖单手像抓玩具一样撕裂成两截啃食而死",
          "nextNode": "victory_run",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "combat",
            "strength"
          ]
        },
        {
          "id": "zo_b1_c4",
          "text": "爬入墙角污水排放铁管，狼狈钻向上方一楼大堂",
          "deathRate": 0.1,
          "deathCause": "管中的电风扇发电机短路旋转被卷入切碎身亡",
          "nextNode": "lobby_1f",
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
    "lobby_1f": {
      "description": "你终于来到了一楼写字楼富丽堂皇却满地死寂的大堂！十余米高、几米厚的防爆钢化旋转大门死死锁闭，门外漫天的丧尸正贴着玻璃狂吼。如果大楼通电，你就能用【保时捷车钥匙】启动展台上的跑车撞门！否则你只能强行破门！",
      "hints": [
        "跑车大逃亡",
        "强闯旋转门",
        "使用钞能力"
      ],
      "choices": [
        {
          "id": "zo_1f_c1",
          "text": "用【保时捷车钥匙】开启已经【电力恢复】的限量保时捷，油门拉满完美大撞门！",
          "deathRate": 0,
          "deathCause": "保时捷引擎咆哮，完美大撞门逃出生天！",
          "nextNode": "victory_car",
          "isSuccess": false,
          "conditions": {
            "has_key_gold": true,
            "generator_on": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": []
        },
        {
          "id": "zo_1f_c2",
          "text": "用沉重的消防推车撞向防爆钢门，在大门碎裂的一瞬间徒步强冲丧尸群",
          "deathRate": 0.5,
          "deathCause": "刚迈出大门就被丧尸群一拥而上，啃食致死",
          "nextNode": "victory_run",
          "isSuccess": false,
          "conditions": {},
          "effects": {},
          "modifiers": [],
          "traitModifiers": [
            "strength"
          ]
        },
        {
          "id": "zo_1f_c3",
          "text": "使用【生化抑制剂】强行注射进冲过来的变异巨型丧尸颈部以中和自保",
          "deathRate": 0.05,
          "deathCause": "生化液起作用慢了半秒被捏死",
          "nextNode": "victory_run",
          "isSuccess": false,
          "conditions": {
            "has_suppressor": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": []
        },
        {
          "id": "zo_1f_c4",
          "text": "【沙雕结局】掏出偷来的【董事长私房钱】几十捆现金，用力朝丧尸群砸去！",
          "deathRate": 0.05,
          "deathCause": "丧尸不爱钱将你啃死",
          "nextNode": "victory_boss",
          "isSuccess": false,
          "conditions": {
            "has_cash": true
          },
          "effects": {},
          "modifiers": [],
          "traitModifiers": []
        }
      ]
    },
    "victory_car": {
      "description": "随着流光金色的限量跑车发出震天引擎怒吼，车胎原地摩擦出刺耳的焦糊白烟！下一秒你如一颗金色流星瞬间撕碎防爆玻璃大门飞驰而出，把身后无数嘶吼的尸群在大火与第一缕阳光中抛在天边！恭喜你赢得了这场写字楼终极逃亡！",
      "hints": [
        "狂踩油门"
      ],
      "choices": [
        {
          "id": "zo_vc_c1",
          "text": "迎着太阳踩死油门，完美逃脱生化噩梦写字楼！",
          "deathRate": 0,
          "deathCause": "完美逃脱！你开着限量保时捷，揭露了写字楼的生化阴谋！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {},
          "effects": {},
          "modifiers": []
        }
      ]
    },
    "victory_run": {
      "description": "你手握防暴甩棍在血雨中疯狂搏杀杀出了一条血路，在最后一刻飞身跃出大楼，跌撞在地面安全的隔离地带上。你虽然浑身是伤，但大口呼吸着外面新鲜甜美的空气，你活过了今天！",
      "hints": [
        "大口呼吸"
      ],
      "choices": [
        {
          "id": "zo_vr_c1",
          "text": "含着眼泪躺在安全地带，热血通关！",
          "deathRate": 0,
          "deathCause": "热血通关！你凭借顽强不屈的意志，徒步逃出生天！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {},
          "effects": {},
          "modifiers": []
        }
      ]
    },
    "victory_armor": {
      "description": "伴随着重型防弹越野装甲车发出的液压升降轰鸣，巨大的地磁阻路钢板徐徐收拢。你猛踩地板油将发动机逼迫到红线，装甲越野战车直接腾空飞越过车库的断层，瞬间把无数的变异尸群在轮下碾碎为血雨！",
      "hints": [
        "绝地战车逃生"
      ],
      "choices": [
        {
          "id": "zo_va_c1",
          "text": "驾驶重型装甲车，安全飞驰逃离写字楼！",
          "deathRate": 0,
          "deathCause": "成功通关！你驾驶极速重装越野装甲，碾碎一切危机逃生！",
          "nextNode": "",
          "isSuccess": true,
          "conditions": {},
          "effects": {},
          "modifiers": []
        }
      ]
    },
    "victory_boss": {
      "description": "【史诗级沙雕彩蛋通关】！砸在董事长丧尸脸上的那一捆捆美钞瞬间激发了他变异大脑深处的最后一丝资本家本能！他双眼发红但极其标准地接住钱，对周围尸群摆摆手喝退。紧接着他将董事长任命书塞给你。你成了写字楼的新总裁，并让丧尸员工继续 996！",
      "hints": [
        "继续996工作"
      ],
      "choices": [
        {
          "id": "zo_vb_c1",
          "text": "坐在总裁皮椅上，微笑着继续给丧尸开早会！",
          "deathRate": 0,
          "deathCause": "奇葩胜利！你用绝顶钞能力征服了丧尸世界，买下写字楼当董事长！",
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

export default {
  escape_room: escapeRoom,
  zombie_office: zombieOffice,
  wilderness_live: wildernessLive,
};
