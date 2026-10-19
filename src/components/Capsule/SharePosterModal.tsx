import React, { useRef, useState } from 'react';
import { X, Download, Share2, Check, Sparkles, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import type { Capsule } from '../../types/capsule';
import { MOOD_CONFIG } from '../../types/capsule';

interface SharePosterModalProps {
  isOpen: boolean;
  capsule: Capsule | null;
  onClose: () => void;
}

export const SharePosterModal: React.FC<SharePosterModalProps> = ({
  isOpen,
  capsule,
  onClose,
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !capsule) return null;

  const moodMeta = MOOD_CONFIG[capsule.moodColor];
  const shareUrl = `${window.location.origin}${window.location.pathname}?capsule=${capsule.id}`;

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 高清导出
      });
      const link = document.createElement('a');
      link.download = `Unsent-${capsule.id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export poster:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-space-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs font-medium text-white">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>未寄之信 · 拍立得海报</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 海报预览区域 (可截屏导出) */}
        <div className="p-4 overflow-y-auto flex justify-center bg-black/40">
          <div
            ref={posterRef}
            className="w-[320px] bg-slate-100 text-slate-800 p-4 pb-6 rounded-2xl shadow-2xl space-y-3.5 font-sans select-none"
            style={{
              backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* 照片或情绪光晕 Banner */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shadow-inner">
              {capsule.photoUrl ? (
                <img
                  src={capsule.photoUrl}
                  alt="Capsule Memory"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white"
                  style={{
                    background: `linear-gradient(135deg, ${moodMeta.colorHex}22 0%, #090d16 100%)`,
                  }}
                >
                  <span
                    className="w-12 h-12 rounded-full mb-2 animate-pulse"
                    style={{
                      backgroundColor: moodMeta.colorHex,
                      boxShadow: `0 0 25px ${moodMeta.colorHex}`,
                    }}
                  />
                  <span className="text-xs font-medium tracking-wider text-slate-300">
                    未寄 · {moodMeta.label}
                  </span>
                </div>
              )}

              {/* 经纬度印章水印 */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-white/90 font-mono">
                {capsule.lng.toFixed(3)}°E, {capsule.lat.toFixed(3)}°N
              </div>
            </div>

            {/* 心事正文 / 时空封印提示 */}
            <div className="px-1 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-200 pb-1.5">
                <span className="font-medium text-slate-700">{capsule.authorNickname}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {capsule.locationName || '未知坐标'}
                </span>
              </div>

              {capsule.isLocked ? (
                <div className="p-3 rounded-xl bg-purple-50 text-purple-900 text-xs italic text-center space-y-1">
                  <div className="font-semibold">⏳ 这是一封寄往未来的信</div>
                  <div className="text-[10px] text-purple-600">到期时间：{new Date(capsule.unlockAt).toLocaleDateString()}</div>
                </div>
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-6 font-serif whitespace-pre-wrap">
                  {capsule.content}
                </p>
              )}
            </div>

            {/* 底部二维码与品牌归属 */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-[12px] font-serif font-bold tracking-widest text-slate-900 flex items-center gap-1.5">
                  <span>未寄</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-white font-mono tracking-wider">Unsent</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  扫码重返此处的未寄之信
                </div>
                <div className="text-[9px] text-slate-400 font-mono">
                  {new Date(capsule.createdAt).toLocaleDateString()} 封存
                </div>
              </div>

              {/* 专属直达二维码 */}
              <div className="p-1 rounded-lg bg-white shadow-sm border border-slate-200 shrink-0">
                <QRCodeSVG
                  value={shareUrl}
                  size={52}
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="p-4 border-t border-white/10 bg-space-950 flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{isCopied ? '链接已复制' : '复制直达链接'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-medium shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? '生成海报中...' : '保存拍立得海报'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
