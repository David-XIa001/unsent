const STORAGE_KEY = 'game_admin_data'

const defaultData = {
  characters: [
    { id: 'student', name: '小学生', description: '你今年10岁，是一名活泼的小学生。', chains: ['go_to_school', 'go_to_playground', 'escape_room'] },
    { id: 'worker', name: '上班族', description: '你今年28岁，是一家公司的普通职员。', chains: ['go_to_work', 'go_to_dinner'] },
    { id: 'elder', name: '退休老人', description: '你今年65岁，已经退休在家颐养天年。', chains: ['go_to_market', 'go_to_hospital'] },
    { id: 'rider', name: '外卖骑手', description: '你今年22岁，是一名风雨无阻的外卖骑手。', chains: ['deliver_food', 'deliver_in_rain'] },
    { id: 'highschooler', name: '高中生', description: '你今年17岁，正在读高二，课业繁重。', chains: ['go_to_exam', 'go_to_library'] },
    { id: 'nurse', name: '护士', description: '你今年25岁，是医院急诊科的护士。', chains: ['night_shift', 'handle_emergency'] },
    { id: 'housewife', name: '家庭主妇', description: '你今年35岁，是两个孩子的母亲，全职在家。', chains: ['cook_dinner', 'pick_up_kids'] },
    { id: 'driver', name: '网约车司机', description: '你今年32岁，靠跑网约车养家糊口。', chains: ['pick_passenger', 'night_drive'] }
  ],
  chains: {
    "escape_room": {
      "id": "escape_room",
      "name": "深渊实验室：逃出生天",
      "characterId": "student",
      "description": "你在一个阴冷、散发着刺鼻化学药水味的废弃生化实验室中苏醒。四周大门紧闭，你必须依靠智慧搜集线索、破解机关，活过今天并逃离此地！",
      "startNode": "lobby",
      "flags": [],
      "nodes": {
        "lobby": {
          "description": "你缓缓睁开双眼，发现自己躺在一个幽暗空旷的大堂中。空气中弥漫着危险的静谧。前方有左侧一扇斑驳的木门，右侧一扇锈迹斑斑的防爆铁门，旁边还有一个落满灰尘的前台大理石接待处。",
          "hints": ["左侧木门", "右侧铁门", "前台桌"],
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
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 100,
            "y": 350
          }
        },
        "computer_room": {
          "description": "这是一间布满蜘蛛网的旧电脑室。正中央一台绿荧荧的古董大型主机显示屏在无声闪烁，旁边是凌乱的服务器机柜和通风管道。另一侧有一扇厚重的电子安全门紧闭着。",
          "hints": ["破解电脑", "通风管道", "电子门"],
          "choices": [
            {
              "id": "comp_c1",
              "text": "尝试在终端上输入代码破译安保密码",
              "deathRate": 0.1,
              "deathCause": "键盘内部发生高压电弧短路，不幸触电身亡",
              "nextNode": "server_room",
              "isSuccess": false,
              "conditions": {},
              "effects": { "know_code": true },
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 400,
            "y": 150
          }
        },
        "lab_room": {
          "description": "实验室里布满散落的危险试剂与破碎培养皿。空气中泛着蓝色的荧光，角落的防毒面具柜锁着，试剂架倾倒在一样挡住了通往旧电脑室的暗门。",
          "hints": ["搜索面具", "推开试剂架", "退回大堂"],
          "choices": [
            {
              "id": "lab_c1",
              "text": "搜索玻璃柜，尝试寻找防毒面具",
              "deathRate": 0.05,
              "deathCause": "柜中的试剂瓶破裂，吸入致命生化毒气窒息而死",
              "nextNode": "lab_deep",
              "isSuccess": false,
              "conditions": {},
              "effects": { "has_gasmask": true },
              "modifiers": []
            },
            {
              "id": "lab_c2",
              "text": "使使劲推开倾倒的试剂架，前往电脑室暗门",
              "deathRate": 0.1,
              "deathCause": "试剂架上的浓硫酸倾洒而下，全身大面积烧伤惨死",
              "nextNode": "computer_room",
              "isSuccess": false,
              "conditions": {},
              "effects": {},
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 400,
            "y": 350
          }
        },
        "reception": {
          "description": "前台接待处的大理石台面上有一具早已干枯的警卫尸体，他手里紧紧攥着什么。前台抽屉是半开的，一旁的墙壁贴着北翼走廊指示图，往下则是通往地下安全通道的铁门。",
          "hints": ["翻找抽屉", "调查警卫", "地下安全通道", "北翼走廊"],
          "choices": [
            {
              "id": "rec_c1",
              "text": "仔细翻找接待前台半开的抽屉",
              "deathRate": 0.05,
              "deathCause": "触发了抽屉下的防御毒针机关，当场暴毙",
              "nextNode": "lobby",
              "isSuccess": false,
              "conditions": {},
              "effects": { "has_key": true },
              "modifiers": []
            },
            {
              "id": "rec_c2",
              "text": "利用【警备密码】解锁警卫身旁的机密安保箱",
              "deathRate": 0.05,
              "deathCause": "安保箱自毁炸弹起爆，粉身碎骨",
              "nextNode": "corridor_a",
              "isSuccess": false,
              "conditions": { "know_code": true },
              "effects": { "has_gun": true },
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 400,
            "y": 550
          }
        },
        "lab_deep": {
          "description": "这是化学实验室最深处的废墟，强烈的紫外线消毒灯依然惨白地亮着。破损的生化舱里隐约有一件橙色的重型铅服，而地板上有一个强酸排放管道，正咕嘟咕嘟冒着黄绿色的泡泡。",
          "hints": ["调查生化舱", "强酸管道", "返回实验室"],
          "choices": [
            {
              "id": "deep_c1",
              "text": "冒险打开生化舱，搜集橙色防护服",
              "deathRate": 0.15,
              "deathCause": "生化舱气压爆表炸裂，被高压玻璃碎片穿心而死",
              "nextNode": "lab_room",
              "isSuccess": false,
              "conditions": {},
              "effects": { "has_suit": true },
              "modifiers": []
            },
            {
              "id": "deep_c2",
              "text": "硬着头皮，钻入满是黄绿色泡泡的强酸排放管道",
              "deathRate": 0.8,
              "deathCause": "酸液迅速融化了双腿，倒在管道里窒息身亡",
              "nextNode": "acid_pipe",
              "isSuccess": false,
              "conditions": {},
              "effects": {},
              "modifiers": []
            }
          ],
          "position": {
            "x": 700,
            "y": 250
          }
        },
        "acid_pipe": {
          "description": "管道里强酸横流，刺鼻的气气味让人头晕目眩。不过如果你身穿【防护服】，这些酸液似乎无法穿透这层厚重的涂层。前方管道出口连通着通风机管道。",
          "hints": ["依靠防护服强行通过", "返回深处"],
          "choices": [
            {
              "id": "acid_c1",
              "text": "依靠【防护服】的安全保护，大步爬向通风管道出口",
              "deathRate": 0.05,
              "deathCause": "防护服在强酸中破损漏气，被酸液烫死",
              "nextNode": "ventilation",
              "isSuccess": false,
              "conditions": { "has_suit": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": 250
          }
        },
        "corridor_a": {
          "description": "这是一条漫长无际的北翼走廊，破损的白炽灯疯狂闪烁。左手边是一间已经废弃的员工食堂，走廊尽头是一扇高压输电警示标志高悬的配电室大门，右侧则是安保室。",
          "hints": ["员工食堂", "高压配电室", "返回前台"],
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
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 700,
            "y": 450
          }
        },
        "canteen": {
          "description": "尘封的食堂里桌椅横七竖八地倒在地上。突然，几只变异的丧尸恶犬从阴暗的吧台后窜了出来，凶狠地盯着你！吧台侧面则是后厨通道和通风管道口。",
          "hints": ["对抗恶犬", "逃向通风口", "返回走廊"],
          "choices": [
            {
              "id": "cant_c1",
              "text": "使用【脉冲枪】将恶犬瞬间击倒并消灭",
              "deathRate": 0.05,
              "deathCause": "枪支后坐力过大，震倒撞到尖锐桌角惨死",
              "nextNode": "kitchen",
              "isSuccess": false,
              "conditions": { "has_gun": true },
              "effects": { "has_food": true },
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": 450
          }
        },
        "kitchen": {
          "description": "后厨里布满厚重的油垢和霉菌。你顺便在保鲜柜里搜寻到了几罐高能食物，在灶台上还发现了一盘未开封的备用黄铜电缆线。角落里是简易餐梯的竖井悬崖。",
          "hints": ["备用电缆", "餐梯竖井", "返回食堂"],
          "choices": [
            {
              "id": "kit_c1",
              "text": "将备用黄铜电缆线装入背包，以备不时之需",
              "deathRate": 0.05,
              "deathCause": "吸入了灶台下泄漏的致命瓦斯，中毒而亡",
              "nextNode": "canteen",
              "isSuccess": false,
              "conditions": {},
              "effects": { "has_cables": true },
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1300,
            "y": 350
          }
        },
        "ventilation": {
          "description": "通风管道管道内极度狭窄、阴暗潮湿。这里犹如一个巨大的迷宫。微风从一个方向吹来，似乎能听到服务器风扇的轰鸣；而另一侧飘来恶臭；还有一根极为狭窄的铁管不知通往何处。",
          "hints": ["轰鸣方向", "恶臭方向", "狭窄铁管"],
          "choices": [
            {
              "id": "vent_c1",
              "text": "沿着有微风和风扇轰鸣的方向爬过去",
              "deathRate": 0.05,
              "deathCause": "衣服被风扇卷入，被绞杀而死",
              "nextNode": "server_room",
              "isSuccess": false,
              "conditions": {},
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 700,
            "y": 50
          }
        },
        "vent_deadend": {
          "description": "这里彻底是一条死胡同！四周是冰冷的铁壁，连翻身都困难至极。更糟糕的是，一只巨大的变异食人蛛从上方爬了下来，封锁了退路！",
          "hints": ["对抗食人蛛", "退回通风管"],
          "choices": [
            {
              "id": "dead_c1",
              "text": "在管道中窒息闭眼，放弃挣扎等待命运",
              "deathRate": 1.0,
              "deathCause": "被变异毒蛛注入神经毒素，身体融化沦为毒蛛的孵化器",
              "nextNode": "",
              "isSuccess": false,
              "conditions": {},
              "effects": {},
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": -50
          }
        },
        "server_room": {
          "description": "这是庞大的数据机房，林立着巨型黑色机柜。然而没有供电，机柜一片漆黑。如果【基地通电】恢复，中央控制台的蓝色荧光盘就会亮起，允许读取这里的核心机密数据。前面通往电梯大厅。",
          "hints": ["拷贝数据", "前往电梯厅", "爬回通风道"],
          "choices": [
            {
              "id": "serv_c1",
              "text": "在通电的主机控制台上插盘，拷贝核心机密数据",
              "deathRate": 0.05,
              "deathCause": "电脑突然高压爆炸，被横飞的电容芯片击穿眼球致死",
              "nextNode": "elevator_hall",
              "isSuccess": false,
              "conditions": { "generator_on": true },
              "effects": { "has_data": true },
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": 150
          }
        },
        "power_room": {
          "description": "配电室内火花四溅。巨型的备用发电机组因连接电缆烧毁而彻底停摆，整栋大楼的主闸无力下垂。空气中满是焦糊味和致命的高压火花跳跃。",
          "hints": ["使用电缆修复", "强行拉闸", "返回走廊"],
          "choices": [
            {
              "id": "pow_c1",
              "text": "利用【备用电线】重新连接烧毁的配电柜并拉合电闸",
              "deathRate": 0.05,
              "deathCause": "合闸时强光闪烁引发尘爆，在大火中丧生",
              "nextNode": "corridor_a",
              "isSuccess": false,
              "conditions": { "has_cables": true },
              "effects": { "generator_on": true },
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": 550
          }
        },
        "guard_room": {
          "description": "这里是安保监控室，大屏幕墙反射着幽幽的死寂。一个沉重厚实的合金保险柜立在墙边。如果用【铜钥匙】可以将其撬开，说不定能找到电梯授权磁卡！",
          "hints": ["开启保险柜", "返回北翼走廊"],
          "choices": [
            {
              "id": "guar_c1",
              "text": "用【铜钥匙】插入合金保险柜锁孔并旋转将其开启",
              "deathRate": 0.05,
              "deathCause": "保险柜里封存的微型防盗集束地雷引爆自毁",
              "nextNode": "corridor_a",
              "isSuccess": false,
              "conditions": { "has_key": true },
              "effects": { "has_card": true },
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1000,
            "y": 650
          }
        },
        "stairs": {
          "description": "应急安全楼梯盘旋向下。然而，由于空气循环系统损坏，这里被高浓度的剧毒黄绿色瓦斯气体彻底笼罩！如果没有【防毒面具】，强行下去无异于自寻死路。下层楼梯连接着地下B1层。",
          "hints": ["使用面具下楼", "强行冲过毒气", "退回前台"],
          "choices": [
            {
              "id": "stai_c1",
              "text": "佩戴【防毒面具】气定神闲地迈步走下楼梯",
              "deathRate": 0.05,
              "deathCause": "面具滤毒盒突然过期失效，吸入瓦斯窒息而死",
              "nextNode": "underground_b1",
              "isSuccess": false,
              "conditions": { "has_gasmask": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 700,
            "y": 650
          }
        },
        "elevator_hall": {
          "description": "电梯大厅富丽堂皇却毫无生机。那部能够直达地下B2层绝密区的重型电梯正冷冰冰地立着。你需要【基地通电】且拥有【安保磁卡】才能刷卡启动它。否则你只能走防火门进入安全通道。",
          "hints": ["乘坐电梯", "防火门"],
          "choices": [
            {
              "id": "elev_c1",
              "text": "使用【安保磁卡】刷开已经【通电】的重型电梯，直达地下B2层",
              "deathRate": 0.05,
              "deathCause": "电梯轿厢在下降时遭遇钢缆突然崩断，坠毁砸死",
              "nextNode": "underground_b2",
              "isSuccess": false,
              "conditions": { "generator_on": true, "has_card": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1300,
            "y": 150
          }
        },
        "underground_b1": {
          "description": "你来到了地下B1层走廊。闪烁的红色警报灯把四周染成血红。几只高大的基地重型机械警备巡逻机器人正在前面扫射，激光弹道纵横！后面则是安全通道和中央主枢纽。",
          "hints": ["击毁机器人", "强行潜行逃离", "回安全通道"],
          "choices": [
            {
              "id": "b1_c1",
              "text": "手握【脉冲枪】连续开火射击，瞬间瘫痪警备机器人",
              "deathRate": 0.05,
              "deathCause": "击毁时机器人发生核动力电池爆炸，同归于尽",
              "nextNode": "central_hub",
              "isSuccess": false,
              "conditions": { "has_gun": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1300,
            "y": 550
          }
        },
        "underground_b2": {
          "description": "地下B2层是绝对禁区，周围钢板墙反射着合金的光泽。前面是一道泛着死光的红色激光防御网，只有刷【安保磁卡】才能暂时关闭它通行前往中央枢纽。否则会触发激光切割！",
          "hints": ["刷卡关闭激光", "强行闯激光网", "回电梯厅"],
          "choices": [
            {
              "id": "b2_c1",
              "text": "在读卡器上刷入【安保磁卡】安全关闭激光通道",
              "deathRate": 0.05,
              "deathCause": "刷卡后引发系统反制机制，高压电弧贯穿身体而死",
              "nextNode": "central_hub",
              "isSuccess": false,
              "conditions": { "has_card": true },
              "effects": {},
              "modifiers": []
            },
            {
              "id": "b2_c2",
              "text": "心存侥幸，尝试在错综的激光网里翻滚过去",
              "deathRate": 0.95,
              "deathCause": "激光网瞬间收缩，整个人被切割成无数肉块惨死",
              "nextNode": "central_hub",
              "isSuccess": false,
              "conditions": {},
              "effects": {},
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1600,
            "y": 150
          }
        },
        "central_hub": {
          "description": "这里是地下的综合控制中枢，四通八达。东侧是一扇印着骷髅辐射标志的强辐射研究室气密门；西侧是最终的基地控制中心大门；南侧的通道指向应急避难逃生舱区。",
          "hints": ["强辐射研究室", "基地主控制室", "应急逃生舱"],
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
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1600,
            "y": 550
          }
        },
        "radiation_lab": {
          "description": "强辐射室内绿光刺眼，警报轰鸣。正前方的废液反应池里，一张金黄色的黄金主卡正随着有毒波浪起伏。这里的致命辐射剂量能在几秒内融化人体的免疫系统！如果没有【防护服】，这里就是单向墓地。",
          "hints": ["穿防护服打捞", "赤身跃入废液池", "退回中央枢纽"],
          "choices": [
            {
              "id": "rad_c1",
              "text": "穿着厚重的【防护服】跳入辐射废液中，打捞【黄金主卡】",
              "deathRate": 0.05,
              "deathCause": "防护服在废液中融化漏水，全身基因崩溃致死",
              "nextNode": "central_hub",
              "isSuccess": false,
              "conditions": { "has_suit": true },
              "effects": { "key_card_gold": true },
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1900,
            "y": 350
          }
        },
        "control_room": {
          "description": "这里是基地的控制中枢，海量的电子仪表盘令人眼花缭乱。基地的核心主控制台高高矗立，上面有一个插槽。你需要【黄金主卡】才能解锁主系统进行安全管理！如果用普通磁卡强行破解会触发安保自毁！",
          "hints": ["插入黄金主卡", "插入普通安保磁卡", "返回中央枢纽"],
          "choices": [
            {
              "id": "ctrl_c1",
              "text": "将打捞出来的【黄金主卡】稳稳插入主控制台插槽",
              "deathRate": 0.05,
              "deathCause": "插槽突发超强高压静电击中太阳穴暴毙",
              "nextNode": "system_control",
              "isSuccess": false,
              "conditions": { "key_card_gold": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1900,
            "y": 550
          }
        },
        "system_control": {
          "description": "控制台屏幕亮起！你已经拥有了基地的最高权限。你的面前有两个选项：选项一，关闭基地防爆安全大门大锁，通过大门安然离去；选项二，启动基地聚变反应堆自爆程序毁灭生化病毒（需要拷贝了核心机密数据作为证据逃离或牺牲自己）。",
          "hints": ["开启主大门", "启动基地自爆"],
          "choices": [
            {
              "id": "sys_c1",
              "text": "执行【开启基地主大门】指令，全面降下防御壁垒",
              "deathRate": 0.0,
              "deathCause": "主闸全面开启，通往胜利之路！",
              "nextNode": "victory_gate",
              "isSuccess": false,
              "conditions": {},
              "effects": { "gate_opened": true },
              "modifiers": []
            },
            {
              "id": "sys_c2",
              "text": "【英雄之路】如果持有【机密数据】，选择锁死基地，启动同归于尽的基地核聚变自爆程序！",
              "deathRate": 0.0,
              "deathCause": "你锁死了基地的升降井，带走核心机密数据，含笑启动了反应堆超载程序。烈火瞬间淹没了一切，你拯救了世界！",
              "nextNode": "",
              "isSuccess": true,
              "conditions": { "has_data": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 2200,
            "y": 550
          }
        },
        "victory_gate": {
          "description": "你站在基地最外围的重型防护主防爆大门前。随着令人牙酸的液压开门声，十余米高、几米厚的巨大合金门正缓缓向两侧退去。耀眼而灿烂的第一缕晨曦照在你的脸上。恭喜你赢得了这场终极逃生！",
          "hints": ["大步跨出大门"],
          "choices": [
            {
              "id": "vic_c1",
              "text": "迎着太阳迈开坚定的步伐，完美逃离这个噩梦基地！",
              "deathRate": 0.0,
              "deathCause": "完美逃脱！你不仅安然无恙，还彻底揭开了基地的重重阴谋！",
              "nextNode": "",
              "isSuccess": true,
              "conditions": { "gate_opened": true },
              "effects": {},
              "modifiers": []
            }
          ],
          "position": {
            "x": 2500,
            "y": 550
          }
        },
        "escape_capsule": {
          "description": "这里是基地地下的逃生舱发射架，一排亮白色的单人应急避难逃生舱安详地悬挂在铁轨上。逃生舱的供电正常，只有拥有【安保磁卡】作为钥匙的最高权限，才能开启安全门舱进行超高速弹射逃离！",
          "hints": ["刷卡发射逃生舱", "返回主枢纽"],
          "choices": [
            {
              "id": "cap_c1",
              "text": "使用【安保磁卡】解锁发射指令并躺入逃生舱，强行发射！",
              "deathRate": 0.0,
              "deathCause": "成功逃生！伴随着一声巨大的推进器轰鸣，你被弹射到了地表安全地带！",
              "nextNode": "",
              "isSuccess": true,
              "conditions": { "has_card": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1900,
            "y": 750
          }
        },
        "canteen_lift": {
          "description": "餐梯井漆黑一片，呼呼狂风从下方吹上来。餐梯井的滑轮钢索破旧不堪。由于餐梯坠落，你只能依靠简易滑绳往下爬到地下B1层走廊。如果没有在食堂获得【高能食物】补充体能，在狂风中徒手下滑简直是自寻死路。",
          "hints": ["滑行索降", "爬回后厨"],
          "choices": [
            {
              "id": "lift_c1",
              "text": "在吃饱【高能食物】体能充沛的前提下，紧抓钢索一路索降到地下B1层",
              "deathRate": 0.15,
              "deathCause": "下滑太快导致双手被摩擦起火脱手，坠入深渊摔死",
              "nextNode": "underground_b1",
              "isSuccess": false,
              "conditions": { "has_food": true },
              "effects": {},
              "modifiers": []
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
              "modifiers": []
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
              "modifiers": []
            }
          ],
          "position": {
            "x": 1600,
            "y": 350
          }
        }
      }
    },
    "go_to_school": {
      "id": "go_to_school",
      "name": "去上学",
      "characterId": "student",
      "description": "今天是周一，你需要按时去上学。",
      "startNode": "home",
      "flags": [],
      "nodes": {
        "home": {
          "description": "你正在家里，窗外阳光明媚。",
          "hints": ["洗漱", "赖床"],
          "choices": [
            { "id": "c1", "text": "快速起床，洗漱后立刻出门", "deathRate": 0.3, "deathCause": "起床太急，不小心摔倒撞到了头", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "c2", "text": "慢慢起床，仔细洗漱后出门", "deathRate": 0.5, "deathCause": "出门太晚，在路上被车撞到", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "c3", "text": "赖床5分钟", "deathRate": 0.2, "deathCause": "赖床太久，迟到被老师批评后羞愧而死", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        },
        "street": {
          "description": "你来到了繁忙的街道上，车水马龙。",
          "hints": ["人行道", "横穿", "红绿灯"],
          "choices": [
            { "id": "s1", "text": "走人行道过马路", "deathRate": 0.4, "deathCause": "人行道上有一块松动的地砖，踩上去摔倒", "nextNode": "school", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "s2", "text": "直接横穿马路", "deathRate": 0.2, "deathCause": "横穿马路时被一辆电动车撞倒", "nextNode": "school", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "s3", "text": "等红绿灯再过马路", "deathRate": 0.5, "deathCause": "红绿灯处发生斗殴事件，被误伤", "nextNode": "school", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        },
        "school": {
          "description": "你终于到达了学校门口。",
          "hints": [],
          "choices": [
            { "id": "s4", "text": "直接走进学校", "deathRate": 0.1, "deathCause": "成功到达学校！", "nextNode": "", "isSuccess": true, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        }
      }
    },
    "go_to_work": {
      "id": "go_to_work",
      "name": "去上班",
      "characterId": "worker",
      "description": "周一的早晨，你需要赶去上班。",
      "startNode": "home",
      "flags": [],
      "nodes": {
        "home": {
          "description": "你正在家里，窗外阳光明媚。",
          "hints": ["早餐"],
          "choices": [
            { "id": "w1", "text": "起床后直接出门，路上买早餐", "deathRate": 0.3, "deathCause": "早餐太烫，被噎死", "nextNode": "subway", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "w2", "text": "在家吃完早餐再出门", "deathRate": 0.4, "deathCause": "出门太晚，赶地铁时被人群挤倒受伤", "nextNode": "subway", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "w3", "text": "不吃早餐，直接去公司", "deathRate": 0.25, "deathCause": "低血糖晕倒，头部撞击地面", "nextNode": "subway", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        },
        "subway": {
          "description": "地铁站里人来人往，略显拥挤。",
          "hints": ["挤地铁", "出租车"],
          "choices": [
            { "id": "w4", "text": "挤上拥挤的地铁", "deathRate": 0.35, "deathCause": "被人群挤到车门处，被夹伤", "nextNode": "office", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "w5", "text": "等下一班地铁", "deathRate": 0.45, "deathCause": "等车时被掉落的广告牌砸中", "nextNode": "office", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "w6", "text": "改坐出租车去公司", "deathRate": 0.2, "deathCause": "出租车发生交通事故", "nextNode": "office", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        },
        "office": {
          "description": "你走进了熟悉的办公室。",
          "hints": [],
          "choices": [
            { "id": "w7", "text": "走进办公室开始工作", "deathRate": 0.1, "deathCause": "成功到达公司！", "nextNode": "", "isSuccess": true, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        }
      }
    },
    "go_to_market": {
      "id": "go_to_market",
      "name": "去买菜",
      "characterId": "elder",
      "description": "家里没菜了，你需要去菜市场买菜。",
      "startNode": "home",
      "flags": [],
      "nodes": {
        "home": {
          "description": "你正在家里，窗外阳光明媚。",
          "hints": ["早操"],
          "choices": [
            { "id": "e1", "text": "慢慢起床，做个早操再出门", "deathRate": 0.2, "deathCause": "做操时闪到腰，摔倒受伤", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "e2", "text": "直接出门去菜市场", "deathRate": 0.35, "deathCause": "出门太急，被门槛绊倒", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "e3", "text": "先喝杯茶，休息一下再出门", "deathRate": 0.4, "deathCause": "喝茶太久，菜市场收摊了，伤心而死", "nextNode": "street", "isSuccess": false, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        },
        "street": {
          "description": "你来到了繁忙的街道上，车水马龙。",
          "hints": ["斑马线", "让路人扶", "公交车"],
          "choices": [
            { "id": "e4", "text": "走斑马线过马路", "deathRate": 0.45, "deathCause": "斑马线上被自行车撞倒", "nextNode": "", "isSuccess": true, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "e5", "text": "让路人扶着过马路", "deathRate": 0.3, "deathCause": "扶你的路人是坏人，被抢走了钱包后气死", "nextNode": "", "isSuccess": true, "conditions": {}, "effects": {}, "modifiers": [] },
            { "id": "e6", "text": "坐公交车去菜市场", "deathRate": 0.25, "deathCause": "公交车上被小偷盯上，心脏病发作", "nextNode": "", "isSuccess": true, "conditions": {}, "effects": {}, "modifiers": [] }
          ]
        }
      }
    }
  }
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      
      // 智能热补丁合并逻辑：若检测到 localStorage 中缓存缺失 escape_room 或者版本陈旧，自动静默合并入缓存中，免去用户手动点击拉取
      if (data.chains) {
        // 如果旧版数据节点少于 10 个，说明是旧密室，静默升级
        const curEscape = data.chains.escape_room;
        if (!curEscape || !curEscape.nodes || Object.keys(curEscape.nodes).length < 10) {
          data.chains.escape_room = defaultData.chains.escape_room;
          const student = data.characters?.find(c => c.id === 'student');
          if (student && !student.chains.includes('escape_room')) {
            student.chains.push('escape_room');
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      }
      
      return { characters: data.characters || [], chains: data.chains || {} }
    }
  } catch (e) { console.error('loadData error', e) }
  return { characters: [], chains: {} }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) { console.error('saveData error', e) }
}

export function initDataIfEmpty() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    saveData(defaultData)
  } else {
    // 强制执行一次数据升级检查，保障已存在的旧浏览器草稿自动迁移至25节点大型深渊实验室版本
    try {
      const data = JSON.parse(existing)
      if (data.chains) {
        const curEscape = data.chains.escape_room;
        if (!curEscape || !curEscape.nodes || Object.keys(curEscape.nodes).length < 10) {
          data.chains.escape_room = defaultData.chains.escape_room;
          const student = data.characters?.find(c => c.id === 'student');
          if (student && !student.chains.includes('escape_room')) {
            student.chains.push('escape_room');
          }
          saveData(data)
        }
      }
    } catch(e) {}
  }
}

export async function fetchLocalData() {
  try {
    const res = await fetch('/api/load')
    const json = await res.json()
    if (json.success) {
      return json.data
    }
  } catch (e) {
    console.error('fetchLocalData error', e)
  }
  return null
}

export async function saveLocalData(data) {
  try {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characters: data.characters, chains: data.chains })
    })
    const json = await res.json()
    return json.success
  } catch (e) {
    console.error('saveLocalData error', e)
    return false
  }
}
