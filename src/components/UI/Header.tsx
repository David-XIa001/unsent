import React from 'react';
import { Sparkles, Feather } from 'lucide-react';
import type { MoodColor } from '../../types/capsule';
import { MOOD_CONFIG } from '../../types/capsule';

interface HeaderProps {
  selectedMood: MoodColor | 'all';
  onSelectMood: (mood: MoodColor | 'all') => void;
  onPlantClick: () => void;
  capsuleCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedMood,
  onSelectMood,
  onPlantClick,
  capsuleCount,
}) => {
  return (
    <header className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
      {/* 品牌 Logo 与状态 */}
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-space-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-serif font-medium tracking-widest text-white">未寄</h1>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 font-mono tracking-wider">
              Unsent
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-slate-300">{capsuleCount} 封未寄之信在此闪烁</span>
          </div>
        </div>
      </div>

      {/* 情绪色彩快速过滤器 */}
      <div className="pointer-events-auto hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-space-900/70 backdrop-blur-md border border-white/10 shadow-xl">
        <button
          onClick={() => onSelectMood('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedMood === 'all'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          全部心绪
        </button>
        {(Object.keys(MOOD_CONFIG) as MoodColor[]).map((mood) => {
          const meta = MOOD_CONFIG[mood];
          const isActive = selectedMood === mood;
          return (
            <button
              key={mood}
              onClick={() => onSelectMood(mood)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all ${
                isActive ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: meta.colorHex }}
              />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* 留下未寄之信快捷按钮 */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onPlantClick}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white font-medium text-xs shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Feather className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:rotate-12 transition-transform duration-300" />
          <span>写一封未寄之信</span>
        </button>
      </div>
    </header>
  );
};
