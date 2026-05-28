module.exports = {
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
