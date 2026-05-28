import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSurvivalDays } from '../store/gameStore';
import '../styles/index.css';

export default function IndexPage() {
  const navigate = useNavigate();
  const [survivalDays, setSurvivalDays] = useState(0);

  useEffect(() => {
    setSurvivalDays(getSurvivalDays());
  }, []);

  return (
    <div className="page index-page">
      {/* 标题区 */}
      <header className="index-header">
        <h1 className="index-title">活过今天</h1>
        <p className="index-subtitle">在这个充满危险的世界里，你能活过今天吗？</p>
      </header>

      {/* 存活天数卡片 */}
      <div className="stats-card">
        <span className="stat-value">{survivalDays}</span>
        <span className="stat-label">已连续存活 (天)</span>
      </div>

      {/* 精品关卡标签 */}
      <div className="featured-label">
        <span className="featured-label-text">🔥 精品特选关卡 (大制作)</span>
      </div>

      {/* 深渊实验室 */}
      <div
        className="featured-card featured-lab"
        onClick={() => navigate('/game?chainId=escape_room')}
        role="button"
        tabIndex={0}
      >
        <div className="featured-card-bg featured-card-bg-lab" />
        <div className="featured-card-content">
          <div className="featured-meta">
            <span className="featured-tag tag-lab">🧪 密室逃脱</span>
            <span className="featured-diff diff-lab">⚡ 高难度</span>
          </div>
          <p className="featured-title">深渊实验室：逃出生天</p>
          <p className="featured-desc">你在阴冷的废弃生化实验室中苏醒，四周大门紧闭。搜集线索、破解机关，找到唯一的生路！</p>
          <div className="featured-stats">
            <span className="featured-stat-item">🗺️ 25+ 节点</span>
            <span className="featured-stat-item">🔑 10种道具</span>
            <span className="featured-stat-item">🏆 3条结局</span>
          </div>
          <div className="featured-btn featured-btn-lab">
            <span className="featured-btn-text">立刻挑战 →</span>
          </div>
        </div>
      </div>

      {/* 丧尸写字楼 */}
      <div
        className="featured-card featured-zombie"
        onClick={() => navigate('/game?chainId=zombie_office')}
        role="button"
        tabIndex={0}
      >
        <div className="featured-card-bg featured-card-bg-zombie" />
        <div className="featured-card-content">
          <div className="featured-meta">
            <span className="featured-tag tag-zombie">🧟 末日逃生</span>
            <span className="featured-diff diff-zombie">⚡ 超硬核</span>
          </div>
          <p className="featured-title">丧尸危机：逃出写字楼</p>
          <p className="featured-desc">下班前夕，公司大楼被丧尸沦陷！突破24层死线，收集神装与装甲车，开启完美大逃亡！</p>
          <div className="featured-stats">
            <span className="featured-stat-item">🗺️ 20个节点</span>
            <span className="featured-stat-item">🎒 10种道具</span>
            <span className="featured-stat-item">🏆 4条结局</span>
          </div>
          <div className="featured-btn featured-btn-zombie">
            <span className="featured-btn-text">冲破重围 →</span>
          </div>
        </div>
      </div>

      {/* 荒野大求生 */}
      <div
        className="featured-card featured-anchor"
        onClick={() => navigate('/game?chainId=wilderness_live')}
        role="button"
        tabIndex={0}
      >
        <div className="featured-card-bg featured-card-bg-anchor" />
        <div className="featured-card-content">
          <div className="featured-meta">
            <span className="featured-tag tag-anchor">🌲 户外求生</span>
            <span className="featured-diff diff-anchor">⚡ 娱乐整活</span>
          </div>
          <p className="featured-title">荒野大求生：百万粉丝巅峰直播</p>
          <p className="featured-desc">深夜探访神秘的黑瞎子岭！你要面对大黄蜂、野生黑熊和饥饿狼群，疯狂整活爆引人气，挑战百万顶流大胜利！</p>
          <div className="featured-stats">
            <span className="featured-stat-item">🗺️ 35+ 节点</span>
            <span className="featured-stat-item">🎒 6种硬核线索</span>
            <span className="featured-stat-item">🏆 10+ 奇葩出局结局</span>
          </div>
          <div className="featured-btn featured-btn-anchor">
            <span className="featured-btn-text">开启直播 →</span>
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div className="divider-row">
        <div className="divider-line" />
        <span className="divider-text">或选择其他模式</span>
        <div className="divider-line" />
      </div>

      {/* 模式按钮 */}
      <div className="btn-container">
        <button
          id="btn-daily"
          className="btn btn-primary btn-glow"
          onClick={() => navigate('/game?mode=daily')}
        >
          📅 今日生存挑战
        </button>
        <button
          id="btn-free"
          className="btn btn-secondary"
          style={{ marginBottom: 12 }}
          onClick={() => navigate('/game?mode=free')}
        >
          🎲 自由随机探索
        </button>
        <button
          id="btn-museum"
          className="btn btn-museum"
          onClick={() => navigate('/museum')}
        >
          💀 死亡纪念馆
        </button>
      </div>
    </div>
  );
}
