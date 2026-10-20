import React, { useEffect, useRef } from 'react';
import {
  Map as MapLibreMap,
  NavigationControl,
  AttributionControl,
  Marker,
  type StyleSpecification,
  type MapMouseEvent,
} from 'maplibre-gl';
import type { Capsule, MoodColor } from '../../types/capsule';
import { MOOD_CONFIG } from '../../types/capsule';

interface MapViewProps {
  capsules: Capsule[];
  selectedMood: MoodColor | 'all';
  onSelectCapsule: (capsule: Capsule) => void;
  onMapClickCoord: (coords: { lng: number; lat: number }) => void;
  isPlantingMode: boolean;
  focusTarget?: { lng: number; lat: number; zoom?: number } | null;
  highlightedCapsuleId?: string | null;
}

// 采用无需 API Key 的高质量深色极夜底图 (ESRI World Dark Gray)
const DARK_MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'esri-dark': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    },
    'esri-labels': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'esri-dark-base',
      type: 'raster',
      source: 'esri-dark',
      minzoom: 0,
      maxzoom: 16,
    },
    {
      id: 'esri-dark-labels',
      type: 'raster',
      source: 'esri-labels',
      minzoom: 0,
      maxzoom: 16,
    },
  ],
};

export const MapView: React.FC<MapViewProps> = ({
  capsules,
  selectedMood,
  onSelectCapsule,
  onMapClickCoord,
  isPlantingMode,
  focusTarget,
  highlightedCapsuleId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // 监听外部聚焦目标，实现像流星一样的平滑飞行动画
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focusTarget) return;

    map.flyTo({
      center: [focusTarget.lng, focusTarget.lat],
      zoom: focusTarget.zoom ?? 10,
      speed: 1.5,
      curve: 1.4,
      essential: true,
    });
  }, [focusTarget]);

  // 初始化地图
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: DARK_MAP_STYLE,
      center: [116.4, 34.0], // 中国宏观中心视口
      zoom: 3.8,
      minZoom: 2,
      maxZoom: 16,
      attributionControl: false, // 禁用默认长条大白框
    });

    // 接入合法合规但极致隐蔽的折叠圆圈 ⓘ
    map.addControl(
      new AttributionControl({
        compact: true,
      }),
      'bottom-right'
    );

    map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');

    map.on('click', (e: MapMouseEvent) => {
      onMapClickCoord({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 更新心事光点 Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 清除旧的 markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // 过滤心情
    const filtered = selectedMood === 'all'
      ? capsules
      : capsules.filter((c) => c.moodColor === selectedMood);

    filtered.forEach((capsule) => {
      const meta = MOOD_CONFIG[capsule.moodColor];

      // 创建自定义微光 HTML Marker
      const el = document.createElement('div');
      el.className = 'aurora-marker group';
      el.style.color = meta.colorHex;

      // 内部脉冲动画
      const wave = document.createElement('div');
      wave.className = 'aurora-marker-wave';

      const core = document.createElement('div');
      core.className = 'aurora-marker-core';
      core.style.backgroundColor = meta.colorHex;

      // 气泡提示
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute -top-8 px-2 py-1 rounded-lg bg-space-900/90 text-white text-[11px] whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg';
      tooltip.textContent = `${capsule.isLocked ? '⏳ [时空锁] ' : ''}${capsule.authorNickname}: ${capsule.locationName || '某处心事'}`;

      // 新封存成功的微光粒子，附加一次高亮绽放光环
      if (highlightedCapsuleId === capsule.id) {
        const pingRing = document.createElement('div');
        pingRing.className = 'absolute -inset-3 rounded-full border-2 border-white/80 animate-ping pointer-events-none';
        el.appendChild(pingRing);
      }

      el.appendChild(wave);
      el.appendChild(core);
      el.appendChild(tooltip);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectCapsule(capsule);
        map.flyTo({ center: [capsule.lng, capsule.lat], zoom: Math.max(map.getZoom(), 8), speed: 1.2 });
      });

      const marker = new Marker({ element: el })
        .setLngLat([capsule.lng, capsule.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [capsules, selectedMood, onSelectCapsule, highlightedCapsuleId]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className={`w-full h-full ${isPlantingMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
      />

      {/* 埋下心事模式提示条 */}
      {isPlantingMode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-2xl bg-sky-500/90 text-white text-xs font-medium backdrop-blur-md shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✨ 请在地图上点击你想留下心事的任意位置</span>
        </div>
      )}
    </div>
  );
};
