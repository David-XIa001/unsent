# 🌲 荒野大求生：百万粉丝巅峰直播——关卡剧情拓扑图与策划指南

为了方便您分析、查看和维护该新剧本的网状探索关系，我们特为您绘制了本份拓扑图与通关指南。

---

## 🗺️ 关卡核心拓扑流程图 (Mermaid)

您可以使用 Markdown 渲染工具或 Mermaid 渲染插件直接预览以下精彩的流向图：

```mermaid
graph TD
    %% 阶段1：入口与整活
    START[🎥 信号启动: start_live] -->|左: 喊麦冲林| FOREST[🌲 针叶林: dense_forest]
    START -->|右: 故作玄秘| SWAMP[🌫️ 迷雾沼泽: misty_swamp]
    START -->|中: 激情冰桶| CREEK[🌊 溪流山谷: creek_valley]

    %% 阶段2-A：森林支线
    FOREST -->|捅蜂窝| WASP_NEST[🐝 蜂群狂袭: wasp_nest]
    FOREST -->|追脚印| TRACKS[🐾 巨大爪印: strange_tracks]
    FOREST -->|采蘑菇| MUSHROOM[🍄 艳丽彩菌: weird_mushroom]

    WASP_NEST -->|徒手吃蜜| HONEY_WIN[🍯 提取野蜜: wasp_honey]
    WASP_NEST -->|捞蜜避险| MUSHROOM

    HONEY_WIN -->|探访黑洞| BEAR_EXT[💀 黑熊洞口: bear_cave_exterior]
    HONEY_WIN -->|林地露营| TENT[⛺ 简易避难帐篷: tent_setup]

    TRACKS -->|挑开灌木| BEAR_EXT
    TRACKS -->|沿坡下撤| CABIN_EXT[🏠 巡林木屋外部: cabin_exterior]

    MUSHROOM -->|吃一口红伞伞| HALLU[🌀 致幻发作: mushroom_hallucination]
    MUSHROOM -->|吃自热火锅| CABIN_EXT

    HALLU -->|飞升猴戏| TENT
    HALLU -->|退守木屋| CABIN_EXT

    %% 阶段2-B：沼泽支线
    SWAMP -->|自拍杆排雷| SWAMP_TRAP[🩹 捕兽夹边缘: swamp_trap]
    SWAMP -->|暴力跳泥潭| SWAMP_ISLAND[🛶 倾覆巡林船: swamp_island]

    SWAMP_TRAP -->|泥潭抢捞| SWAMP_ISLAND
    SWAMP_TRAP -->|大喊110| MUD_SINK[🆘 湿身泥泞: mud_sink]

    MUD_SINK -->|爬高脚梯| CABIN_EXT
    MUD_SINK -->|走泥泞路| TENT

    SWAMP_ISLAND -->|硬撬锁宝箱| BOAT_EXPLORE[🎒 猎刀防熊喷雾: boat_explore]
    SWAMP_ISLAND -->|搜集绝缘电缆| MUD_SINK

    BOAT_EXPLORE -->|猎刀开路| CABIN_EXT
    BOAT_EXPLORE -->|摸索石壁| BEAR_EXT

    %% 阶段2-C：山谷支线
    CREEK -->|徒手摸鲶鱼| CREEK_FISH[🐟 单手锁喉: creek_fishing]
    CREEK -->|登信号顶| GHOST_MYSTERY[🛸 神秘信号山: ghost_mystery]

    CREEK_FISH -->|狂野角力| CATFISH[🤩 神级鲶鱼: giant_catfish]
    CREEK_FISH -->|认怂撒手| COLD_CHALLENGE[🥶 极寒挑战: cold_challenge]

    CATFISH -->|负重跑木屋| CABIN_EXT
    CATFISH -->|林地避寒| TENT

    COLD_CHALLENGE -->|直冲木屋| CABIN_EXT
    COLD_CHALLENGE -->|枯叶裹身| TENT

    %% 阶段3：深夜惊魂与避难
    %% 巡林木屋支线
    CABIN_EXT -->|猎刀割锁链| CABIN_INT[📻 温暖客厅: cabin_interior]
    CABIN_EXT -->|修复发电机| CABIN_GEN[⚡ 柴油配电机房: cabin_generator]
    CABIN_EXT -->|肉搏撞门| CABIN_INT

    CABIN_GEN -->|重连铜电缆| CABIN_INT
    CABIN_GEN -->|翻窗跳入| CABIN_INT

    CABIN_INT -->|调频收音机| RADIO_TALK[📡 规律电磁波: radio_talking]
    CABIN_INT -->|躺沙发带货| DAWN[🌅 破晓曙光: survival_dawn]

    RADIO_TALK -->|登神秘信号山| GHOST_MYSTERY
    RADIO_TALK -->|死守到天亮| DAWN

    %% 熊洞支线
    BEAR_EXT -->|闪光灯探路| BEAR_INT[🐻 黑熊熟睡中: bear_cave_interior]
    BEAR_EXT -->|捡巨骨速溜| TENT

    BEAR_INT -->|富贵摸熊屁股| BEAR_MASSAGE[🙀 奇迹按摩大师: bear_massaging]
    BEAR_INT -->|偷摘野果撤退| TENT

    BEAR_MASSAGE -->|背风搭帐篷| TENT
    BEAR_MASSAGE -->|樟树洞生火| DAWN

    %% 帐篷狼群支线
    TENT -->|抛出野生蜂蜜/野果引诱| DAWN
    TENT -->|使用猎刀防熊喷雾反击| DAWN
    TENT -->|赤手冲锋| HIGH_TREE[🌲 逃命松树顶: high_tree]

    HIGH_TREE -->|大唱学猫叫| DAWN
    HIGH_TREE -->|将腿捆树苦熬| DAWN

    %% 信号塔极限支线
    GHOST_MYSTERY -->|肉身闯控制舱| BASE_INT[🛸 信号发射基座: base_interior]
    GHOST_MYSTERY -->|紧急撤退| TENT

    BASE_INT -->|强撑开播到百万| DAWN

    %% 阶段4：破晓结算与大结局
    DAWN -->|直升机撤退| END_PROMO[📈 巅峰结算盘点: live_promotion]
    END_PROMO -->|触发条件: 达成百万在线| WIN_GOLD[🏆 巅峰大胜利: 千万合同签约, 身价过亿!]
    END_PROMO -->|普通活过| WIN_NORMAL[🎉 普通大胜利: 成功签约带货, 财富自由!]
```

---

## 🎒 关键道具与状态线索映射表

我们在不修改核心引擎的前提下，完美复用了原本的 `ITEM_ICONS` / `effects` 标志系统：

| 游戏内标识 (effects) | 包装概念 | 对应功能说明 |
| :--- | :--- | :--- |
| `has_food` | **野生蜂蜜 / 烤鲶鱼 / 野果** | 可在 `tent_setup` 中扔出，用来将野狼群引开，免于死亡/扣血直接迎接入晓。 |
| `has_key` | **生存猎刀 / 登山扣 / 防熊喷雾** | 可用于直接割断巡林木屋的链条锁，或者在狼群围攻时用于安全防身。 |
| `has_cables` | **高压绝缘铜电缆线** | 在发电机房中不可或缺的道具，能让你顺利修复柴油机，恢复木屋供电。 |
| `generator_on` | **发电机成功送电** | 触发古董收音机指示灯变绿，开启调频破译【走近科学】外星人基座隐藏任务线。 |
| `has_million_fans`| **百万粉丝在线成就** | 最终完美通关结局的钥匙，在基座里完成最终带货直播前触发。 |

---

## 🏆 通关成就与爆笑社死退赛档案

在黑瞎子岭中，您可以体验到极具现代黑色幽默的十多种花式淘汰（退赛）档案，它们会被自动记录在**死亡纪念馆**中供玩家收集：

1. **【大社死：幻觉大跳猴戏】**
   * *达成方式*：在 `weird_mushroom` 节点吃下彩菌，在致幻状态下在直播间疯狂整活和松鼠结拜，直播间因“传播封建迷信”遭平台永久封禁。
2. **【悲催淘汰：香肠大嘴】**
   * *达成方式*：在 `wasp_nest` 节点尝试徒手大口吃野生蜂蜜，喉头严重水肿，当场窒息被医护直升机拉走退赛。
3. **【硬碰硬淘汰：被熊一巴掌拍断腰】**
   * *达成方式*：在 `bear_cave_interior` 中为了 50 个火箭强行去摸巨熊的屁股，直接被暴怒的黑瞎子一招神熊摆尾拍出十米。
4. **【巅峰大胜利：签约千万合同】**
   * *解锁条件*：顺着收音机线索攀登信号山，成功通电修复基座，读完考察日记，顶住电磁干扰直播到天亮。
