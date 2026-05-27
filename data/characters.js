module.exports = [
  {
    "id": "student",
    "name": "小学生",
    "description": "你今年10岁，是一名活泼的小学生。",
    "traits": [
      {
        "name": "敏捷身手",
        "description": "速度与敏捷判定死亡率 -50%",
        "type": "buff",
        "modifiers": ["agility", "speed"],
        "rate": 0.5
      },
      {
        "name": "体能孱弱",
        "description": "力量与肉搏判定死亡率 +30%",
        "type": "debuff",
        "modifiers": ["strength", "combat"],
        "rate": 1.3
      }
    ],
    "chains": [
      "escape_room",
      "go_to_school",
      "go_to_playground"
    ]
  },
  {
    "id": "worker",
    "name": "上班族",
    "description": "你今年28岁，是一家公司的普通职员。",
    "traits": [
      {
        "name": "钢铁体魄",
        "description": "力量与肉搏判定死亡率 -50%",
        "type": "buff",
        "modifiers": ["strength", "combat"],
        "rate": 0.5
      },
      {
        "name": "粗手粗脚",
        "description": "电子密码与微操破译死亡率 +20%",
        "type": "debuff",
        "modifiers": ["hacking", "intelligence"],
        "rate": 1.2
      }
    ],
    "chains": [
      "escape_room",
      "go_to_work",
      "go_to_dinner"
    ]
  },
  {
    "id": "elder",
    "name": "退休老人",
    "description": "你今年65岁，已经退休在家颐养天年。",
    "traits": [
      {
        "name": "阅历丰富",
        "description": "危机防备与直觉判定死亡率 -40%",
        "type": "buff",
        "modifiers": ["intelligence", "courage"],
        "rate": 0.6
      },
      {
        "name": "行动迟缓",
        "description": "速度与避险逃跑死亡率 +50%",
        "type": "debuff",
        "modifiers": ["agility", "speed"],
        "rate": 1.5
      }
    ],
    "chains": [
      "escape_room",
      "go_to_market",
      "go_to_hospital"
    ]
  },
  {
    "id": "rider",
    "name": "外卖骑手",
    "description": "你今年22岁，是一名风雨无阻的外卖骑手。",
    "traits": [
      {
        "name": "神行无影",
        "description": "敏捷与速度逃避死亡率 -60%",
        "type": "buff",
        "modifiers": ["agility", "speed"],
        "rate": 0.4
      },
      {
        "name": "不擅脑力",
        "description": "智力与电脑解密判定死亡率 +30%",
        "type": "debuff",
        "modifiers": ["hacking", "intelligence"],
        "rate": 1.3
      }
    ],
    "chains": [
      "escape_room",
      "deliver_food",
      "deliver_in_rain"
    ]
  },
  {
    "id": "highschooler",
    "name": "高中生",
    "description": "你今年17岁，正在读高二，课业繁重。",
    "traits": [
      {
        "name": "学霸智商",
        "description": "解密与逻辑破译死亡率 -50%",
        "type": "buff",
        "modifiers": ["intelligence", "hacking"],
        "rate": 0.5
      },
      {
        "name": "缺乏体质",
        "description": "毒气与辐射体质判定死亡率 +30%",
        "type": "debuff",
        "modifiers": ["constitution"],
        "rate": 1.3
      }
    ],
    "chains": [
      "escape_room",
      "go_to_exam",
      "go_to_library"
    ]
  },
  {
    "id": "nurse",
    "name": "护士",
    "description": "你今年25岁，是医院急诊科的护士。",
    "traits": [
      {
        "name": "百毒不侵",
        "description": "毒素与辐射等体质抗性死亡率 -50%",
        "type": "buff",
        "modifiers": ["constitution"],
        "rate": 0.5
      },
      {
        "name": "胆小恐慌",
        "description": "直面恐怖与强行拉闸死亡率 +30%",
        "type": "debuff",
        "modifiers": ["courage"],
        "rate": 1.3
      }
    ],
    "chains": [
      "escape_room",
      "night_shift",
      "handle_emergency"
    ]
  },
  {
    "id": "housewife",
    "name": "家庭主妇",
    "description": "你今年35岁，是两个孩子的母亲，全职在家。",
    "traits": [
      {
        "name": "心灵手巧",
        "description": "观察解密与精细闪避死亡率 -40%",
        "type": "buff",
        "modifiers": ["intelligence", "agility"],
        "rate": 0.6
      },
      {
        "name": "力量一般",
        "description": "力量与重体力劳动死亡率 +30%",
        "type": "debuff",
        "modifiers": ["strength"],
        "rate": 1.3
      }
    ],
    "chains": [
      "escape_room",
      "cook_dinner",
      "pick_up_kids"
    ]
  },
  {
    "id": "driver",
    "name": "网约车司机",
    "description": "你今年32岁，靠跑网约车养家糊口。",
    "traits": [
      {
        "name": "沉着冷静",
        "description": "直面险境与大心脏拉闸死亡率 -40%",
        "type": "buff",
        "modifiers": ["courage", "intelligence"],
        "rate": 0.6
      },
      {
        "name": "常年久坐",
        "description": "敏捷与力量下滑死亡率 +20%",
        "type": "debuff",
        "modifiers": ["agility", "strength"],
        "rate": 1.2
      }
    ],
    "chains": [
      "escape_room",
      "pick_passenger",
      "night_drive"
    ]
  }
]
