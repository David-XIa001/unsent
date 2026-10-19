import React, { useState, useEffect } from 'react';
import { X, Heart, Send, Lock, Clock, Sparkles, MapPin, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Capsule } from '../../types/capsule';
import { MOOD_CONFIG } from '../../types/capsule';

interface ViewCapsuleModalProps {
  capsule: Capsule | null;
  onClose: () => void;
  onResonate: (id: string) => Promise<void>;
  onAddReply: (capsuleId: string, content: string) => Promise<void>;
  onOpenSharePoster: () => void;
}

export const ViewCapsuleModal: React.FC<ViewCapsuleModalProps> = ({
  capsule,
  onClose,
  onResonate,
  onAddReply,
  onOpenSharePoster,
}) => {
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  // 倒计时计算逻辑
  useEffect(() => {
    if (!capsule || !capsule.isLocked) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const diff = new Date(capsule.unlockAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ d, h, m, s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [capsule]);

  if (!capsule) return null;

  const moodMeta = MOOD_CONFIG[capsule.moodColor];

  const handleHeartClick = () => {
    // 触发烟花彩带彩屑
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: [moodMeta.colorHex, '#f43f5e', '#ffffff'],
    });
    onResonate(capsule.id);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSendingReply(true);
    try {
      await onAddReply(capsule.id, replyText.trim());
      setReplyText('');
    } finally {
      setIsSendingReply(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-space-900 border border-white/10 shadow-2xl flex flex-col max-h-[85vh]">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: moodMeta.colorHex,
                boxShadow: `0 0 10px ${moodMeta.colorHex}`,
              }}
            />
            <span className="text-xs font-medium text-slate-300">
              {moodMeta.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSharePoster}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] border border-white/10 transition-colors"
              title="生成小红书/朋友圈拍立得海报"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>分享海报</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 内容主体 */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* 时空锁定状态 */}
          {capsule.isLocked ? (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-900/60 to-indigo-900/60 border border-purple-500/30 flex items-center justify-center shadow-2xl shadow-purple-900/50">
                <Lock className="w-8 h-8 text-purple-300 animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300" />
              </div>

              <div>
                <h3 className="text-base font-serif font-medium text-white tracking-wide">
                  这是一封留在未来拆封的信
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  发信人：{capsule.authorNickname}
                </p>
              </div>

              {/* 倒计时晶体面板 */}
              {timeLeft && (
                <div className="p-4 rounded-2xl bg-space-800/80 border border-purple-500/20 max-w-xs mx-auto">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-purple-300 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>距离拆封开启还需等待</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-space-900/90 rounded-xl p-2 border border-white/5">
                      <div className="text-lg font-bold text-white font-mono">{timeLeft.d}</div>
                      <div className="text-[10px] text-slate-400">天</div>
                    </div>
                    <div className="bg-space-900/90 rounded-xl p-2 border border-white/5">
                      <div className="text-lg font-bold text-white font-mono">{timeLeft.h}</div>
                      <div className="text-[10px] text-slate-400">时</div>
                    </div>
                    <div className="bg-space-900/90 rounded-xl p-2 border border-white/5">
                      <div className="text-lg font-bold text-white font-mono">{timeLeft.m}</div>
                      <div className="text-[10px] text-slate-400">分</div>
                    </div>
                    <div className="bg-space-900/90 rounded-xl p-2 border border-white/5">
                      <div className="text-lg font-bold text-white font-mono">{timeLeft.s}</div>
                      <div className="text-[10px] text-slate-400">秒</div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-500 italic">
                “时间未至，字迹封存于此。你可以为它点亮微光，守护它的开启。”
              </p>
            </div>
          ) : (
            /* 解锁正常阅读状态：拍立得图文 */
            <div className="space-y-4">
              {/* 拍立得照片卡片 */}
              {capsule.photoUrl && (
                <div className="bg-slate-100 p-2.5 pb-4 rounded-2xl shadow-xl rotate-[-0.8deg] hover:rotate-0 transition-transform duration-300">
                  <div className="overflow-hidden rounded-xl bg-slate-900 aspect-[4/3]">
                    <img
                      src={capsule.photoUrl}
                      alt="Capsule Memory"
                      className="w-full h-full object-cover transition-opacity duration-700 opacity-95 hover:opacity-100"
                    />
                  </div>
                  <div className="mt-2 px-1 flex items-center justify-between text-slate-600 text-[11px]">
                    <span className="font-serif italic font-medium">{capsule.locationName || '某处的记忆'}</span>
                    <span className="font-mono text-[10px]">{new Date(capsule.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              {/* 正文 */}
              <div className="p-4 rounded-2xl bg-space-800/50 border border-white/5">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-medium text-slate-200">{capsule.authorNickname}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{capsule.locationName || '未知坐标'}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap select-text font-light">
                  {capsule.content}
                </p>
              </div>

              {/* 纸飞机回信列表 */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <Send className="w-3 h-3" />
                  <span>路人的温暖回信 ({capsule.replies?.length || 0})</span>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {(!capsule.replies || capsule.replies.length === 0) ? (
                    <div className="text-center py-3 text-xs text-slate-500 italic">
                      还没有人留下纸飞机，写下第一句温暖的话吧...
                    </div>
                  ) : (
                    capsule.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-2.5 rounded-xl bg-space-800/40 border border-white/5 text-xs text-slate-200"
                      >
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-medium text-slate-300">{reply.authorNickname}</span>
                          <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-300">{reply.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部操作区 */}
        <div className="p-4 border-t border-white/10 bg-space-950/80 space-y-3">
          {/* 点亮微光共鸣 */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleHeartClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>点亮微光 ({capsule.resonancesCount})</span>
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              坐标: {capsule.lng.toFixed(2)}, {capsule.lat.toFixed(2)}
            </span>
          </div>

          {/* 投递纸飞机回信表单 (仅解锁状态可用) */}
          {!capsule.isLocked && (
            <form onSubmit={handleReplySubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="留下一句鼓励或共鸣..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                maxLength={100}
                className="flex-1 px-3 py-1.5 rounded-xl bg-space-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={isSendingReply || !replyText.trim()}
                className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>投递</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
