import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import chains from '../data/chains';
import { getDeathRecords, resetAll } from '../store/gameStore';
import { extractAllDeathCauses, getCauseComment } from '../utils/gameUtils';
import '../styles/museum.css';

export default function MuseumPage() {
  const navigate = useNavigate();
  const [museumData, setMuseumData] = useState({
    totalCauses: 0,
    unlockedCauses: 0,
    percentage: 0,
    causesList: [],
    totalDeaths: 0,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadMuseumData();
  }, []);

  function loadMuseumData() {
    const allCauses = extractAllDeathCauses(chains);
    const userRecords = getDeathRecords();

    const recordMap = {};
    let totalDeaths = 0;
    for (const r of userRecords) {
      recordMap[r.cause] = r.count;
      totalDeaths += r.count;
    }

    let unlockedCount = 0;
    const list = allCauses.map(cause => {
      const unlocked = Object.prototype.hasOwnProperty.call(recordMap, cause);
      if (unlocked) unlockedCount++;
      return {
        cause,
        unlocked,
        count: unlocked ? recordMap[cause] : 0,
        comment: getCauseComment(cause),
      };
    });

    list.sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      return b.count - a.count;
    });

    setMuseumData({
      totalCauses: allCauses.length,
      unlockedCauses: unlockedCount,
      percentage: allCauses.length > 0 ? Math.round((unlockedCount / allCauses.length) * 100) : 0,
      causesList: list,
      totalDeaths,
    });
  }

  function handleReset() {
    resetAll();
    loadMuseumData();
    setShowConfirm(false);
  }

  const { totalCauses, unlockedCauses, percentage, causesList, totalDeaths } = museumData;

  return (
    <div className="page museum-page">
      {/* 头部 */}
      <header className="museum-header">
        <h1 className="museum-title">💀 死亡纪念馆</h1>
        <p className="museum-subtitle">记录你在命运交叉口踩过的所有深坑</p>
      </header>

      {/* 总览数据面板 */}
      <div className="museum-stats-panel">
        <div className="progress-circle">
          <span className="percentage-val">{percentage}%</span>
          <span className="percentage-lbl">死亡达成率</span>
        </div>
        <div className="summary-stats">
          <div className="stat-row">
            <span className="stat-lbl">全收集死因：</span>
            <span className="stat-val text-warning">{unlockedCauses} / {totalCauses}</span>
          </div>
          <div className="stat-row">
            <span className="stat-lbl">总死亡次数：</span>
            <span className="stat-val text-danger">{totalDeaths} 次</span>
          </div>
          <div className="stat-tip">死法收集得越多，说明你探索得越深...</div>
        </div>
      </div>

      {/* 图鉴列表 */}
      <div className="list-section">
        <span className="section-title">🕯️ 已解锁的命运图鉴</span>
        <div className="cause-grid">
          {causesList.map((item, i) => (
            <div key={i} className={`cause-card ${item.unlocked ? 'unlocked-card' : 'locked-card'}`}>
              {item.unlocked ? (
                <>
                  <div className="card-header">
                    <span className="card-badge text-danger">☠️ 已达成 {item.count} 次</span>
                    <div className="card-icon">💀</div>
                  </div>
                  <div className="card-body">
                    <span className="card-cause">{item.cause}</span>
                    <span className="card-comment">{item.comment}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-header">
                    <span className="card-badge text-muted">🔒 未解锁</span>
                    <div className="card-icon locked-icon">?</div>
                  </div>
                  <div className="card-body">
                    <span className="card-cause locked-cause">？？？？？？？？</span>
                    <span className="card-comment locked-comment">此致命支路尚未被你触发。在自由探索中选择更大胆、更危险的方向去解开它吧。</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="museum-actions">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>返回营地</button>
        <button className="btn btn-reset" onClick={() => setShowConfirm(true)}>⚠️ 重塑记忆</button>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="overlay museum-confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3 className="confirm-title">重塑记忆</h3>
            <p className="confirm-msg">这将清空所有解锁的死亡图鉴和天数记录，死神将遗忘你的一切，确定继续吗？</p>
            <div className="confirm-btns">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>取消</button>
              <button className="btn btn-danger" onClick={handleReset}>确定重塑</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
