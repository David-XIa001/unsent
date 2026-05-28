import React, { useReducer, useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import chains from '../data/chains';
import characters from '../data/characters';
import ITEM_ICONS from '../data/itemIcons';
import { addSurvivalDay, addDeathRecord, getSurvivalDays } from '../store/gameStore';
import {
  createSeedRandom, getTodaySeed, applyHighlights,
  buildNearMiss, buildDyingNarrative, getRiskDisplay,
} from '../utils/gameUtils';
import { vibrate } from '../hooks/useTyping';
import '../styles/game.css';

// ─── 初始状态 ───────────────────────────────────────────────
const INIT_STATE = {
  phase: 'character_select', // 'character_select' | 'playing' | 'outcome' | 'dying' | 'result'
  story: '',
  typedStory: '',
  typingFinished: false,
  choices: [],
  over: false,
  win: false,
  msg: '',
  day: 1,
  saved: 0,
  modeText: '自由探索',
  hp: 3,
  revived: false,
  showOutcome: false,
  outcomeChoice: '',
  outcomeNearMiss: '',
  outcomeGained: [],
  currentItems: [],
  showDying: false,
  dyingNarrative: '',
  dyingChoiceText: '',
  availableCharacters: characters,
  selectedCharIndex: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'PATCH': return { ...state, ...action.payload };
    default: return state;
  }
}

export default function GamePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const patch = useCallback((payload) => dispatch({ type: 'PATCH', payload }), []);

  // ─── 可变引用（不触发重渲染）────────────────────────────────
  const engineRef = useRef({
    mode: 'free',
    directChainId: null,
    chain: null,
    chr: null,
    flags: {},
    currentNodeId: null,
    nextNodeId: null,
    highlightWords: [],
  });

  const typingTimerRef = useRef(null);

  // ─── 初始化游戏 ──────────────────────────────────────────
  useEffect(() => {
    const mode = searchParams.get('mode') || 'free';
    const chainId = searchParams.get('chainId') || null;
    engineRef.current.mode = mode;
    engineRef.current.directChainId = chainId;
    startGame(mode, chainId);
    return () => { if (typingTimerRef.current) clearInterval(typingTimerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startGame(mode, directChainId) {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    engineRef.current.flags = {};

    let chain;
    if (directChainId) {
      chain = chains[directChainId];
    } else {
      let randFn = Math.random;
      if (mode === 'daily') {
        randFn = createSeedRandom(getTodaySeed());
      }
      const tempChr = characters[Math.floor(randFn() * characters.length)];
      const availableChains = tempChr.chains.filter(cid => chains[cid]);
      const chainId = availableChains[Math.floor(randFn() * availableChains.length)];
      chain = chains[chainId];
    }

    if (!chain) {
      patch({ over: true, win: false, msg: '关卡数据加载失败', phase: 'result' });
      return;
    }

    engineRef.current.chain = chain;
    engineRef.current.currentNodeId = chain.startNode;

    patch({
      phase: 'character_select',
      availableCharacters: characters,
      selectedCharIndex: 0,
      over: false,
      win: false,
      showOutcome: false,
      showDying: false,
      hp: 3,
      revived: false,
      modeText: mode === 'daily' ? '今日挑战' : '自由探索',
      day: getSurvivalDays() + 1,
      saved: getSurvivalDays(),
    });
  }

  function selectCharacter(index) {
    patch({ selectedCharIndex: index });
    vibrate('light');
  }

  function confirmCharacter() {
    const chr = state.availableCharacters[state.selectedCharIndex];
    engineRef.current.chr = chr;
    vibrate('medium');
    const intro = chr.description + '。' + engineRef.current.chain.description;
    loadNode(engineRef.current.currentNodeId, intro);
  }

  // ─── 加载节点 ────────────────────────────────────────────
  function loadNode(nodeId, prefixStory) {
    const chain = engineRef.current.chain;
    const node = chain.nodes[nodeId];
    if (!node) { handleWin(); return; }

    const story = prefixStory + node.description;
    const chr = engineRef.current.chr;
    const flags = engineRef.current.flags;

    let highlightWords = [...(node.hints || [])];
    const choices = [];

    for (const ch of node.choices) {
      if (!checkConditions(ch.conditions, flags)) continue;

      let finalRate = ch.deathRate;
      let modifierTriggered = false;

      if (ch.modifiers && ch.modifiers.length > 0) {
        for (const mod of ch.modifiers) {
          highlightWords.push(mod.word);
          if (node.description.includes(mod.word)) {
            finalRate += mod.adj;
            modifierTriggered = true;
          }
        }
      }

      let triggeredTrait = null;
      if (chr && chr.traits && ch.traitModifiers && ch.traitModifiers.length > 0) {
        for (const trait of chr.traits) {
          if (trait.modifiers && trait.modifiers.some(m => ch.traitModifiers.includes(m))) {
            finalRate = finalRate * trait.rate;
            triggeredTrait = trait;
            if (trait.type === 'buff') break;
          }
        }
      }

      finalRate = Math.max(0.01, Math.min(0.99, finalRate));
      const { text: riskText, cls: riskClass } = getRiskDisplay(finalRate);

      let clue = false;
      let clueTip = '';
      if (triggeredTrait) {
        clue = true;
        clueTip = triggeredTrait.type === 'buff'
          ? `✨ 职业特长【${triggeredTrait.name}】生效，生还几率大增！`
          : `⚠️ 职业劣势【${triggeredTrait.name}】触发，危险几率增加！`;
      } else if (modifierTriggered && finalRate !== ch.deathRate) {
        clue = true;
        clueTip = finalRate > ch.deathRate ? '⚠️ 你似乎忽略了某个细节...' : '✓ 你注意到了一条重要线索！';
      }

      choices.push({
        id: ch.id,
        txt: ch.text,
        risk: riskText,
        riskClass,
        rate: finalRate,
        cause: ch.deathCause,
        win: ch.isSuccess || false,
        clue,
        clueTip,
        triggeredTrait,
        _original: ch,
      });
    }

    // 去重高亮词
    const uniqueWords = [...new Set(highlightWords.filter(Boolean))];
    engineRef.current.highlightWords = uniqueWords;
    engineRef.current.currentNodeId = nodeId;

    patch({
      phase: 'playing',
      story,
      typedStory: '',
      typingFinished: false,
      choices,
      over: false,
      win: false,
      msg: '',
      showOutcome: false,
      showDying: false,
      day: getSurvivalDays() + 1,
      saved: getSurvivalDays(),
      currentItems: buildCurrentItems(flags),
    });

    startTyping(story, uniqueWords);
  }

  // ─── 打字机 ──────────────────────────────────────────────
  function startTyping(story, words) {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    let currentLen = 0;
    const totalLen = story.length;
    if (totalLen === 0) {
      patch({ typedStory: '', typingFinished: true });
      return;
    }
    typingTimerRef.current = setInterval(() => {
      currentLen++;
      if (currentLen >= totalLen) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        patch({ typedStory: applyHighlights(story, words), typingFinished: true });
      } else {
        patch({ typedStory: story.substring(0, currentLen) });
      }
    }, 35);
  }

  function skipTyping() {
    if (!state.typingFinished) {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      patch({
        typedStory: applyHighlights(state.story, engineRef.current.highlightWords),
        typingFinished: true,
      });
      vibrate('light');
    }
  }

  // ─── 选项点击 ────────────────────────────────────────────
  function onPick(ch) {
    if (state.over) return;
    if (!state.typingFinished) { skipTyping(); return; }

    if (ch.rate >= 0.5) vibrate('long');
    else vibrate('medium');

    doChoice(ch);
  }

  function doChoice(ch) {
    const originalChoice = ch._original;
    const flags = engineRef.current.flags;

    // 应用 effects
    const gainedItems = [];
    if (originalChoice.effects) {
      for (const [key, val] of Object.entries(originalChoice.effects)) {
        if (val === true && !flags[key] && ITEM_ICONS[key]) {
          gainedItems.push(ITEM_ICONS[key]);
        }
        flags[key] = val;
      }
    }
    engineRef.current.flags = flags;

    // 死亡判定
    if (Math.random() < ch.rate) {
      addDeathRecord(ch.cause);
      const nextHp = state.hp - 1;

      if (nextHp > 0) {
        // 扣血但不死
        const dyingMsg = buildDyingNarrative(ch.txt, ch.cause, nextHp);
        engineRef.current.nextNodeId = originalChoice.nextNode;
        patch({
          hp: nextHp,
          phase: 'dying',
          showDying: true,
          dyingChoiceText: ch.txt,
          dyingNarrative: dyingMsg,
          outcomeGained: gainedItems,
          currentItems: buildCurrentItems(flags),
        });
        vibrate('long');
      } else {
        // 真正死亡
        const realPercentage = Math.round(ch.rate * 100);
        patch({
          hp: 0,
          phase: 'result',
          over: true,
          win: false,
          msg: `你死了...\n\n死因: ${ch.cause}\n\n【生命宣告】你的 3 滴生命值已彻底耗尽！搜救队也无力回天！\n\n【命运解密】最后一击你选择的路线真实暴毙率高达 ${realPercentage}%！`,
          saved: getSurvivalDays(),
        });
        vibrate('long');
      }
      return;
    }

    // ── 存活 ──
    const nextNode = originalChoice.nextNode;
    const isTerminal = !nextNode || !engineRef.current.chain.nodes[nextNode];

    if (ch.win || isTerminal) {
      handleWin();
      return;
    }

    engineRef.current.nextNodeId = nextNode;
    const nearMiss = buildNearMiss(ch.txt, ch.cause, ch.rate, ch.triggeredTrait, engineRef.current.chr?.name);

    patch({
      phase: 'outcome',
      showOutcome: true,
      outcomeChoice: ch.txt,
      outcomeNearMiss: nearMiss,
      outcomeGained: gainedItems,
      currentItems: buildCurrentItems(flags),
    });

    if (ch.triggeredTrait?.type === 'buff') {
      vibrate('medium');
      setTimeout(() => vibrate('medium'), 120);
    } else {
      vibrate('medium');
      setTimeout(() => vibrate('light'), 180);
    }
  }

  function continueGame() {
    const nextNode = engineRef.current.nextNodeId;
    patch({ showOutcome: false, phase: 'playing' });
    if (nextNode && engineRef.current.chain.nodes[nextNode]) {
      loadNode(nextNode, '');
    } else {
      handleWin();
    }
  }

  function continueAfterDying() {
    const nextNode = engineRef.current.nextNodeId;
    patch({ showDying: false, phase: 'playing' });
    if (nextNode && engineRef.current.chain.nodes[nextNode]) {
      loadNode(nextNode, '');
    } else {
      handleWin();
    }
  }

  function handleWin() {
    const newDays = addSurvivalDay();
    patch({
      phase: 'result',
      over: true,
      win: true,
      showOutcome: false,
      saved: newDays,
      msg: `恭喜你成功${engineRef.current.chain.name}！\n\n今天是你存活的第${newDays}天。`,
    });
    vibrate('medium');
    setTimeout(() => vibrate('light'), 150);
    setTimeout(() => vibrate('light'), 300);
  }

  function reviveGame() {
    if (state.revived) return;
    vibrate('medium');
    const story = '🏥 【紧急救援成功】！搜救队友在千钧一发之际赶到，为你注射了强效生化抗毒素（恢复 1 滴生命值）！目前你依然生命垂危，请更加谨慎地做出下一步决断！\n\n';
    patch({ hp: 1, revived: true, over: false, phase: 'playing' });
    loadNode(engineRef.current.currentNodeId, story);
  }

  function restart() {
    startGame(engineRef.current.mode, engineRef.current.directChainId);
  }

  // ─── 工具函数 ────────────────────────────────────────────
  function checkConditions(conditions, flags) {
    if (!conditions || typeof conditions !== 'object') return true;
    const keys = Object.keys(conditions);
    if (keys.length === 0) return true;
    return keys.every(k => flags[k] === conditions[k]);
  }

  function buildCurrentItems(flags) {
    return Object.entries(flags)
      .filter(([k, v]) => v === true && ITEM_ICONS[k])
      .map(([k]) => ITEM_ICONS[k]);
  }

  // ─── 渲染 ────────────────────────────────────────────────
  const { phase, typingFinished, typedStory, choices, currentItems,
    hp, over, win, msg, modeText, day, saved,
    showOutcome, showDying, outcomeChoice, outcomeNearMiss,
    outcomeGained, dyingChoiceText, dyingNarrative,
    availableCharacters, selectedCharIndex, revived } = state;

  return (
    <div className="game-page">
      <div className="game-container">
        {/* 状态栏 */}
        <div className="status-bar">
          <span className="status-text">{modeText} · 第 {day} 天</span>
          {phase !== 'character_select' && (
            <div className="hp-bar">
              {[0, 1, 2].map(i => (
                <span key={i} className="hp-heart">{i < hp ? '💖' : '💔'}</span>
              ))}
            </div>
          )}
        </div>

        {/* 背包栏 */}
        {currentItems.length > 0 && !over && !showOutcome && !showDying && (
          <div className="inventory-bar">
            <span className="inventory-label">🎒 背包</span>
            <div className="inventory-items">
              {currentItems.map((item, i) => (
                <div key={i} className="item-chip">
                  <span className="item-emoji">{item.emoji}</span>
                  <span className="item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 剧情文本区 */}
        {!over && !showOutcome && !showDying && phase === 'playing' && (
          <div className="scene-card" onClick={skipTyping}>
            <div className="scene-content">
              {typingFinished
                ? <div className="story-text" dangerouslySetInnerHTML={{ __html: typedStory }} />
                : <span className="story-text">{typedStory}<span className="cursor-blink">_</span></span>
              }
            </div>
            <span className="scene-hint">
              {typingFinished
                ? '👀 仔细观察剧情中的金黄色高亮线索，做出最优抉择...'
                : '⚡ 轻触任意区域跳过文字动画'}
            </span>
          </div>
        )}

        {/* 选项区 */}
        {!over && !showOutcome && !showDying && phase === 'playing' && choices.length > 0 && (
          <div className={`choices-card ${typingFinished ? 'fade-in' : 'hidden-choices'}`}>
            <span className="choices-title">你的选择</span>
            {choices.map(ch => (
              <div
                key={ch.id}
                className={`choice-item ${ch.riskClass}`}
                onClick={() => onPick(ch)}
              >
                <div className="choice-header">
                  <span className="choice-text">{ch.txt}</span>
                  <span className="choice-risk">{ch.risk}</span>
                </div>
                {ch.clue && <span className="choice-clue">{ch.clueTip}</span>}
              </div>
            ))}
          </div>
        )}

        {/* 存活过渡屏 */}
        {showOutcome && (
          <div className="overlay outcome-overlay">
            <div className="outcome-card">
              <div className="outcome-card-glow" />
              <div className="outcome-header">
                <span className="outcome-icon">💚</span>
                <span className="outcome-title">化险为夷</span>
              </div>
              <div className="outcome-choice-row">
                <span className="outcome-choice-label">你的选择</span>
                <span className="outcome-choice-text">{outcomeChoice}</span>
              </div>
              <div className="outcome-near-miss">
                <span className="outcome-near-miss-text">{outcomeNearMiss}</span>
              </div>
              {outcomeGained.length > 0 && (
                <>
                  <span className="outcome-gained-title">✨ 获得道具</span>
                  <div className="gained-chips">
                    {outcomeGained.map((item, i) => (
                      <div key={i} className="gained-chip">
                        <span className="gained-emoji">{item.emoji}</span>
                        <span className="gained-name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {currentItems.length > 0 && (
                <>
                  <span className="outcome-bag-title">🎒 当前持有</span>
                  <div className="bag-chips">
                    {currentItems.map((item, i) => (
                      <div key={i} className="bag-chip">
                        <span className="bag-chip-emoji">{item.emoji}</span>
                        <span className="bag-chip-name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button className="btn-continue" onClick={continueGame}>继续前行 →</button>
            </div>
          </div>
        )}

        {/* 濒死过渡屏 */}
        {showDying && (
          <div className="overlay dying-overlay">
            <div className="dying-card">
              <div className="dying-card-glow" />
              <div className="outcome-header">
                <span className="dying-icon">⚠️</span>
                <span className="dying-title">死里逃生</span>
              </div>
              <div className="dying-choice-row">
                <span className="dying-choice-label">危险决策</span>
                <span className="dying-choice-text">{dyingChoiceText}</span>
              </div>
              <div className="dying-narrative">
                <span className="dying-narrative-text">{dyingNarrative}</span>
              </div>
              <div className="dying-hp-status">
                <span className="dying-hp-label">当前剩余生命值</span>
                <div className="dying-hp-hearts">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="dying-hp-heart">{i < hp ? '💖' : '💔'}</span>
                  ))}
                </div>
              </div>
              <button className="btn-dying-continue" onClick={continueAfterDying}>捂着伤口前行 →</button>
            </div>
          </div>
        )}

        {/* 结算屏 */}
        {over && (
          <div className={`overlay result-overlay ${win ? 'success-overlay' : 'failure-overlay'}`}>
            <div className={`result-card ${win ? 'success' : 'failure'}`}>
              <div className="result-card-glow" />
              <span className="result-icon">{win ? '🎉' : '💀'}</span>
              <span className="result-title">{win ? '生存成功' : '不幸惨死'}</span>
              <span className="result-message">{msg}</span>
              <div className="result-stats">
                <span className="result-stat">已连续存活：{saved} 天</span>
              </div>
              <div className="result-btns">
                {!win && !revived && (
                  <button className="btn-share-revive" onClick={reviveGame}>
                    🏥 紧急复活（恢复1滴血）
                  </button>
                )}
                <button className="btn btn-primary" onClick={restart}>
                  {win ? '继续挑战' : '重塑命运'}
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  返回营地
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 角色选择面板 */}
        {phase === 'character_select' && (
          <div className="overlay character-select-overlay">
            <div className="char-select-card">
              <div className="char-select-glow" />
              <span className="char-select-title">选择求生职业</span>
              <span className="char-select-subtitle">各职业拥有独特的属性与天赋，深刻影响各项行动生还率。请挑选您的身份：</span>
              <div className="char-list">
                {availableCharacters.map((chr, index) => (
                  <div
                    key={chr.id}
                    className={`char-option-item ${selectedCharIndex === index ? 'active' : ''}`}
                    onClick={() => selectCharacter(index)}
                  >
                    {selectedCharIndex === index && <div className="char-option-card-glow" />}
                    <div className="char-option-header">
                      <div className="char-name-row">
                        <span className="char-option-name">{chr.name}</span>
                        {selectedCharIndex === index && (
                          <span className="char-option-badge">已选定</span>
                        )}
                      </div>
                      <span className="char-option-desc">{chr.description}</span>
                    </div>
                    <div className="char-traits-row">
                      {chr.traits.map(trait => (
                        <div key={trait.name} className={`trait-tag ${trait.type}`}>
                          <span className="trait-icon">{trait.type === 'buff' ? '🟢' : '🔴'}</span>
                          <span className="trait-tag-name">{trait.name}</span>
                          <span className="trait-tag-effect">{trait.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-confirm-char" onClick={confirmCharacter}>
                以该身份步入深渊 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
