import { useState, useEffect, useCallback } from 'react';
import { Compass } from 'lucide-react';
import { Header } from './components/UI/Header';
import { MapView } from './components/Map/MapView';
import { CreateCapsuleModal } from './components/Capsule/CreateCapsuleModal';
import { ViewCapsuleModal } from './components/Capsule/ViewCapsuleModal';
import { SharePosterModal } from './components/Capsule/SharePosterModal';
import type { Capsule, MoodColor, CreateCapsuleInput } from './types/capsule';
import {
  fetchCapsules,
  addCapsule,
  toggleResonance,
  addReply,
} from './lib/supabase';

export function App() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodColor | 'all'>('all');
  const [viewingCapsule, setViewingCapsule] = useState<Capsule | null>(null);
  const [isSharePosterOpen, setIsSharePosterOpen] = useState(false);
  const [isPlantingMode, setIsPlantingMode] = useState(false);
  const [createCoords, setCreateCoords] = useState<{ lng: number; lat: number } | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [focusTarget, setFocusTarget] = useState<{ lng: number; lat: number; zoom?: number } | null>(null);

  // 初始化加载数据
  const loadData = useCallback(async () => {
    const list = await fetchCapsules();
    setCapsules(list);

    // 解析 URL 参数实现深链接直达 (Deep Linking, e.g. ?capsule=mock-1)
    const urlParams = new URLSearchParams(window.location.search);
    const targetCapsuleId = urlParams.get('capsule');
    if (targetCapsuleId) {
      const target = list.find((c) => c.id === targetCapsuleId);
      if (target) {
        setViewingCapsule(target);
        setFocusTarget({ lng: target.lng, lat: target.lat, zoom: 11 });
      }
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 点击“埋下心事”按钮
  const handleStartPlanting = () => {
    setIsPlantingMode(true);
  };

  // 点击地图某个坐标
  const handleMapClickCoord = (coords: { lng: number; lat: number }) => {
    setCreateCoords(coords);
    setIsCreateOpen(true);
    setIsPlantingMode(false);
  };

  // 随机漫游 (任意门)
  const handleRandomRoam = () => {
    if (capsules.length === 0) return;
    const candidates = viewingCapsule
      ? capsules.filter((c) => c.id !== viewingCapsule.id)
      : capsules;
    const pool = candidates.length > 0 ? candidates : capsules;
    const randomOne = pool[Math.floor(Math.random() * pool.length)];

    setFocusTarget({ lng: randomOne.lng, lat: randomOne.lat, zoom: 10 });
    // 延迟少许呼出弹窗，让用户先欣赏飞行镜头
    setTimeout(() => {
      setViewingCapsule(randomOne);
    }, 800);
  };

  // 提交新建心事
  const handleCreateSubmit = async (input: CreateCapsuleInput) => {
    const created = await addCapsule(input);
    setCapsules((prev) => [created, ...prev]);
    setIsCreateOpen(false);
    // 镜头对准并聚焦打开刚创建的胶囊
    setFocusTarget({ lng: created.lng, lat: created.lat, zoom: 11 });
    setViewingCapsule(created);
  };

  // 点亮微光
  const handleResonate = async (id: string) => {
    const newCount = await toggleResonance(id);
    setCapsules((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resonancesCount: newCount } : c))
    );
    if (viewingCapsule && viewingCapsule.id === id) {
      setViewingCapsule((prev) => (prev ? { ...prev, resonancesCount: newCount } : null));
    }
  };

  // 留下纸飞机回信
  const handleAddReply = async (capsuleId: string, content: string) => {
    const reply = await addReply(capsuleId, '深夜漫游者', content);
    setCapsules((prev) =>
      prev.map((c) => {
        if (c.id === capsuleId) {
          return { ...c, replies: [...(c.replies || []), reply] };
        }
        return c;
      })
    );
    if (viewingCapsule && viewingCapsule.id === capsuleId) {
      setViewingCapsule((prev) =>
        prev ? { ...prev, replies: [...(prev.replies || []), reply] } : null
      );
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-space-950">
      {/* 顶部导航与状态 */}
      <Header
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
        onPlantClick={handleStartPlanting}
        capsuleCount={capsules.length}
      />

      {/* 地图核心视口 */}
      <MapView
        capsules={capsules}
        selectedMood={selectedMood}
        onSelectCapsule={(capsule) => {
          setViewingCapsule(capsule);
          setFocusTarget({ lng: capsule.lng, lat: capsule.lat, zoom: 10 });
        }}
        onMapClickCoord={handleMapClickCoord}
        isPlantingMode={isPlantingMode}
        focusTarget={focusTarget}
      />

      {/* 屏幕左下角：🎲 随机漂流 (任意门) 悬浮按钮 */}
      <div className="absolute bottom-6 left-6 z-20">
        <button
          onClick={handleRandomRoam}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-space-900/80 hover:bg-space-800 text-white font-medium text-xs border border-white/10 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          title="去看看地球某个角落的心事"
        >
          <Compass className="w-4 h-4 text-purple-400 group-hover:rotate-90 transition-transform duration-500" />
          <span>🎲 漫步地表 (任意门)</span>
        </button>
      </div>

      {/* 埋下心事弹窗 */}
      <CreateCapsuleModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        targetCoords={createCoords}
      />

      {/* 查看/拾取心事弹窗 */}
      <ViewCapsuleModal
        capsule={viewingCapsule}
        onClose={() => setViewingCapsule(null)}
        onResonate={handleResonate}
        onAddReply={handleAddReply}
        onOpenSharePoster={() => setIsSharePosterOpen(true)}
      />

      {/* 拍立得海报分享弹窗 */}
      <SharePosterModal
        isOpen={isSharePosterOpen}
        capsule={viewingCapsule}
        onClose={() => setIsSharePosterOpen(false)}
      />
    </div>
  );
}

export default App;
