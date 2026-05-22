const scenes = [
  {
    id: 'home',
    name: '家里',
    description: '你正在家里，窗外阳光明媚。'
  },
  {
    id: 'street',
    name: '街道',
    description: '你来到了繁忙的街道上，车水马龙。'
  },
  {
    id: 'school',
    name: '学校',
    description: '你终于到达了学校门口。'
  },
  {
    id: 'subway',
    name: '地铁站',
    description: '地铁站里人来人往，略显拥挤。'
  },
  {
    id: 'office',
    name: '办公室',
    description: '你走进了熟悉的办公室。'
  }
]

const characters = [
  {
    id: 'student',
    name: '小学生',
    description: '你今年10岁，是一名小学生。'
  },
  {
    id: 'worker',
    name: '上班族',
    description: '你今年28岁，是一名普通上班族。'
  },
  {
    id: 'elder',
    name: '退休老人',
    description: '你今年65岁，已经退休在家。'
  }
]

const tasks = [
  {
    id: 'go_to_school',
    name: '去上学',
    description: '今天是周一，你需要按时去上学。',
    validCharacters: ['student'],
    scenes: ['home', 'street', 'school']
  },
  {
    id: 'go_to_work',
    name: '去上班',
    description: '周一的早晨，你需要赶去上班。',
    validCharacters: ['worker'],
    scenes: ['home', 'subway', 'office']
  },
  {
    id: 'go_to_market',
    name: '去买菜',
    description: '家里没菜了，你需要去菜市场买菜。',
    validCharacters: ['elder'],
    scenes: ['home', 'street']
  }
]

const choices = {
  home: {
    student: [
      {
        id: 'c1',
        text: '快速起床，洗漱后立刻出门',
        deathRate: 0.3,
        deathCause: '起床太急，不小心摔倒撞到了头',
        nextScene: 'street'
      },
      {
        id: 'c2',
        text: '慢慢起床，仔细洗漱后出门',
        deathRate: 0.5,
        deathCause: '出门太晚，在路上被车撞到',
        nextScene: 'street'
      },
      {
        id: 'c3',
        text: '赖床5分钟',
        deathRate: 0.2,
        deathCause: '赖床太久，迟到被老师批评后羞愧而死',
        nextScene: 'street'
      }
    ],
    worker: [
      {
        id: 'w1',
        text: '起床后直接出门，路上买早餐',
        deathRate: 0.3,
        deathCause: '早餐太烫，被噎死',
        nextScene: 'subway'
      },
      {
        id: 'w2',
        text: '在家吃完早餐再出门',
        deathRate: 0.4,
        deathCause: '出门太晚，赶地铁时被人群挤倒受伤',
        nextScene: 'subway'
      },
      {
        id: 'w3',
        text: '不吃早餐，直接去公司',
        deathRate: 0.25,
        deathCause: '低血糖晕倒，头部撞击地面',
        nextScene: 'subway'
      }
    ],
    elder: [
      {
        id: 'e1',
        text: '慢慢起床，做个早操再出门',
        deathRate: 0.2,
        deathCause: '做操时闪到腰，摔倒受伤',
        nextScene: 'street'
      },
      {
        id: 'e2',
        text: '直接出门去菜市场',
        deathRate: 0.35,
        deathCause: '出门太急，被门槛绊倒',
        nextScene: 'street'
      },
      {
        id: 'e3',
        text: '先喝杯茶，休息一下再出门',
        deathRate: 0.4,
        deathCause: '喝茶太久，菜市场收摊了，伤心而死',
        nextScene: 'street'
      }
    ]
  },
  street: {
    student: [
      {
        id: 's1',
        text: '走人行道过马路',
        deathRate: 0.4,
        deathCause: '人行道上有一块松动的地砖，踩上去摔倒',
        nextScene: 'school'
      },
      {
        id: 's2',
        text: '直接横穿马路',
        deathRate: 0.2,
        deathCause: '横穿马路时被一辆电动车撞倒',
        nextScene: 'school'
      },
      {
        id: 's3',
        text: '等红绿灯再过马路',
        deathRate: 0.5,
        deathCause: '红绿灯处发生斗殴事件，被误伤',
        nextScene: 'school'
      }
    ],
    elder: [
      {
        id: 'e4',
        text: '走斑马线过马路',
        deathRate: 0.45,
        deathCause: '斑马线上被自行车撞倒',
        nextScene: null,
        isSuccess: true
      },
      {
        id: 'e5',
        text: '让路人扶着过马路',
        deathRate: 0.3,
        deathCause: '扶你的路人是坏人，被抢走了钱包后气死',
        nextScene: null,
        isSuccess: true
      },
      {
        id: 'e6',
        text: '坐公交车去菜市场',
        deathRate: 0.25,
        deathCause: '公交车上被小偷盯上，心脏病发作',
        nextScene: null,
        isSuccess: true
      }
    ]
  },
  subway: {
    worker: [
      {
        id: 'w4',
        text: '挤上拥挤的地铁',
        deathRate: 0.35,
        deathCause: '被人群挤到车门处，被夹伤',
        nextScene: 'office'
      },
      {
        id: 'w5',
        text: '等下一班地铁',
        deathRate: 0.45,
        deathCause: '等车时被掉落的广告牌砸中',
        nextScene: 'office'
      },
      {
        id: 'w6',
        text: '改坐出租车去公司',
        deathRate: 0.2,
        deathCause: '出租车发生交通事故',
        nextScene: 'office'
      }
    ]
  },
  school: {
    student: [
      {
        id: 's4',
        text: '直接走进学校',
        deathRate: 0.1,
        deathCause: '成功到达学校！',
        nextScene: null,
        isSuccess: true
      }
    ]
  },
  office: {
    worker: [
      {
        id: 'w7',
        text: '走进办公室开始工作',
        deathRate: 0.1,
        deathCause: '成功到达公司！',
        nextScene: null,
        isSuccess: true
      }
    ]
  }
}

module.exports = {
  scenes,
  characters,
  tasks,
  choices
}