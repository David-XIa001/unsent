import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Clock,
  MapPin,
  Dice5,
  UploadCloud,
  Trash2,
  Camera,
  Link2,
} from 'lucide-react';
import type { MoodColor, CreateCapsuleInput } from '../../types/capsule';
import { MOOD_CONFIG } from '../../types/capsule';

interface CreateCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCapsuleInput) => Promise<void>;
  targetCoords: { lng: number; lat: number } | null;
}

const RANDOM_NICKNAMES = [
  '星夜漫游者', '落日信箱', '白日梦旅人', '拾光信徒', '深夜听雨人',
  '山间来风', '橘子海浪', '第404号银河', '时空渡船', '月色沉溺者'
];

const PRESET_PHOTOS = [
  { label: '海边日落', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { label: '霓虹街头', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { label: '静谧森林', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80' },
  { label: '璀璨星空', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80' },
];

// 客户端图片轻量等比压缩（将手机拍摄的数兆大图压缩至 ~100KB，避免爆满存储与卡顿）
async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1000;
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const CreateCapsuleModal: React.FC<CreateCapsuleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  targetCoords,
}) => {
  const [nickname, setNickname] = useState(() => {
    const random = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    return `${random} #${Math.floor(100 + Math.random() * 900)}`;
  });
  const [content, setContent] = useState('');
  const [moodColor, setMoodColor] = useState<MoodColor>('blue');
  const [photoUrl, setPhotoUrl] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isTimeLocked, setIsTimeLocked] = useState(false);
  const [timeLockDuration, setTimeLockDuration] = useState<'1d' | '30d' | '1y'>('30d');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 支持在弹窗内直接 Ctrl+V 粘贴截图
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            setIsCompressing(true);
            try {
              const compressed = await compressImageFile(file);
              setPhotoUrl(compressed);
            } catch (err) {
              console.error('Failed to compress pasted image:', err);
            } finally {
              setIsCompressing(false);
            }
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRandomizeNickname = () => {
    const random = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    setNickname(`${random} #${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImageFile(file);
      setPhotoUrl(compressed);
    } catch (err) {
      console.error('Failed to process image file:', err);
    } finally {
      setIsCompressing(false);
      // 清空 input 保证同名文件可再次触发
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsCompressing(true);
      try {
        const compressed = await compressImageFile(file);
        setPhotoUrl(compressed);
      } catch (err) {
        console.error('Failed to process dropped image:', err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !targetCoords) return;

    setIsSubmitting(true);
    try {
      let unlockAt: string | undefined = undefined;
      if (isTimeLocked) {
        const now = Date.now();
        const durationMap = {
          '1d': 86400000,
          '30d': 86400000 * 30,
          '1y': 86400000 * 365,
        };
        unlockAt = new Date(now + durationMap[timeLockDuration]).toISOString();
      }

      await onSubmit({
        authorNickname: nickname.trim() || '星夜漫游者',
        content: content.trim(),
        moodColor,
        photoUrl: photoUrl.trim() || undefined,
        lng: targetCoords.lng,
        lat: targetCoords.lat,
        locationName: locationName.trim() || undefined,
        unlockAt,
      });

      // 重置表单并关闭
      setContent('');
      setPhotoUrl('');
      setLocationName('');
      setIsTimeLocked(false);
      setShowUrlInput(false);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-space-900 border border-white/10 shadow-2xl">
        {/* 隐藏的真实文件上传控件 */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-serif font-medium text-white tracking-wider">留下一封未寄之信</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* 坐标与地名 */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-space-800/60 border border-white/5 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-mono text-slate-400">
              [{targetCoords?.lng.toFixed(4)}, {targetCoords?.lat.toFixed(4)}]
            </span>
            <input
              type="text"
              placeholder="添加地点名称 (例: 鼓浪屿海边长椅)"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none text-xs ml-2"
            />
          </div>

          {/* 情绪微光选择 */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              挑选这条心事的情绪色调
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(MOOD_CONFIG) as MoodColor[]).map((mood) => {
                const meta = MOOD_CONFIG[mood];
                const isSelected = moodColor === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setMoodColor(mood)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-white/40 bg-white/10 scale-105 shadow-lg'
                        : 'border-white/5 bg-space-800/40 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: meta.colorHex,
                        boxShadow: isSelected ? `0 0 12px ${meta.colorHex}` : 'none'
                      }}
                    />
                    <span className="text-[11px] text-slate-300">{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 昵称 */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              你的漫游代号
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                className="flex-1 px-3.5 py-2 rounded-xl bg-space-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleRandomizeNickname}
                className="p-2 rounded-xl bg-space-800 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="随机换一个昵称"
              >
                <Dice5 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 正文输入 */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                写下那句未能说出口的话
              </label>
              <span className="text-[11px] text-slate-500">{content.length}/500</span>
            </div>
            <textarea
              required
              rows={4}
              maxLength={500}
              placeholder="关于这个路口、那张长椅、或那个再未相见的人..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-space-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* 拍立得照片：全新直选/拖拽/粘贴上传 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                附带一张拍立得照片 (选填)
              </label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
              >
                <Link2 className="w-3 h-3" />
                <span>{showUrlInput ? '切换为文件上传' : '输入外链 / 灵感预设'}</span>
              </button>
            </div>

            {/* 若已选择照片：展示拍立得缩略卡片与删除按钮 */}
            {photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-100 p-2 text-slate-800 flex items-center gap-3">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={photoUrl}
                    alt="Uploaded thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-semibold text-slate-700 truncate">
                    照片已就绪
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    已自动压缩为拍立得轻量相纸格式
                  </div>
                </div>
                <div className="flex items-center gap-1 pr-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] transition-colors"
                    title="更换照片"
                  >
                    更换
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors"
                    title="移除照片"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : showUrlInput ? (
              /* 外链 URL 输入模式 */
              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="输入图片直链 URL..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-space-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-slate-400">
                  <span className="shrink-0 text-slate-500">灵感预设:</span>
                  {PRESET_PHOTOS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setPhotoUrl(preset.url)}
                      className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 shrink-0 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 主流：直接点击/拖拽/粘贴上传 */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
                    : 'border-white/10 bg-space-800/40 hover:bg-space-800 hover:border-white/20'
                }`}
              >
                {isCompressing ? (
                  <div className="flex items-center gap-2 text-xs text-sky-400 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    <span>正在处理并压缩图片...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-2 shadow-inner">
                      <UploadCloud className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="text-xs font-medium text-slate-200">
                      点击选择照片 或 拖拽至此处
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Camera className="w-3 h-3" /> 支持手机相册/拍照
                      </span>
                      <span>·</span>
                      <span>支持截图 Ctrl+V 直接粘贴</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 时空锁设置 */}
          <div className="p-3.5 rounded-2xl bg-space-800/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs font-medium text-white">时空胶囊锁</div>
                  <div className="text-[10px] text-slate-400">未到期前内容被封存，仅向世人展示倒计时</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isTimeLocked}
                onChange={(e) => setIsTimeLocked(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-space-800 border-white/20 cursor-pointer"
              />
            </div>

            {isTimeLocked && (
              <div className="pt-2 flex items-center gap-2 border-t border-white/5">
                <span className="text-xs text-slate-400">封存时长:</span>
                {(['1d', '30d', '1y'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setTimeLockDuration(d)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                      timeLockDuration === d
                        ? 'bg-purple-600 text-white font-medium'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d === '1d' ? '1 天后' : d === '30d' ? '1 个月后' : '1 年后'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-medium shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? '封存中...' : '封存于此'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
