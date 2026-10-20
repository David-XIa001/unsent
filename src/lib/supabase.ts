import { createClient } from '@supabase/supabase-js';
import type { Capsule, CapsuleReply, CreateCapsuleInput } from '../types/capsule';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 本地离线预置心事数据，保证在无 Supabase 凭证时也能开箱即用体验
const INITIAL_MOCK_CAPSULES: Capsule[] = [
  {
    id: 'mock-1',
    authorNickname: '深夜信使 #109',
    content: '在西湖断桥边吹着晚风，想起五年前在这里拍毕业照的我们。大家都奔赴各自的人生了，希望远方的你一切安好。',
    moodColor: 'blue',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    lng: 120.1500,
    lat: 30.2580,
    locationName: '杭州 · 西湖断桥',
    unlockAt: new Date(Date.now() - 3600000).toISOString(),
    isLocked: false,
    resonancesCount: 42,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    replies: [
      {
        id: 'reply-1',
        capsuleId: 'mock-1',
        authorNickname: '路过的拾光者',
        content: '愿各自安好，在顶峰相见。',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      }
    ]
  },
  {
    id: 'mock-2',
    authorNickname: '时空旅人',
    content: '【这是一封寄往 2027 年的信】不知道那时的我，有没有去冰岛看极光，有没有成为更自由的人。',
    moodColor: 'purple',
    lng: 121.4998,
    lat: 31.2397,
    locationName: '上海 · 外滩观景台',
    unlockAt: new Date(Date.now() + 86400000 * 365).toISOString(), // 1年后解锁
    isLocked: true,
    resonancesCount: 128,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    authorNickname: '小桔灯',
    content: '今天收到了心仪 Offer，在街角吃了一碗热腾腾的拉面，突然觉得过去半年的焦虑都释然了。加油！',
    moodColor: 'orange',
    lng: 116.4074,
    lat: 39.9042,
    locationName: '北京 · 前门大街',
    unlockAt: new Date(Date.now() - 7200000).toISOString(),
    isLocked: false,
    resonancesCount: 89,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mock-4',
    authorNickname: '橘子海',
    content: '第一次在海边看日落，橘红色的晚霞染透了整片天空，听着海浪，所有的烦恼都被带走了。',
    moodColor: 'rose',
    photoUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    lng: 109.5119,
    lat: 18.2528,
    locationName: '三亚 · 亚龙湾',
    unlockAt: new Date(Date.now() - 10000).toISOString(),
    isLocked: false,
    resonancesCount: 65,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'mock-5',
    authorNickname: '林间微风',
    content: '终于把压抑了很久的事情说了出来，原谅别人也是放过自己。向前走，不要回头。',
    moodColor: 'green',
    lng: 104.0668,
    lat: 30.5728,
    locationName: '成都 · 锦里',
    unlockAt: new Date(Date.now() - 10000).toISOString(),
    isLocked: false,
    resonancesCount: 37,
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  }
];

const LOCAL_STORAGE_KEY = 'geocapsule_local_items_v1';

function getLocalData(): Capsule[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_CAPSULES));
      return INITIAL_MOCK_CAPSULES;
    }
    const items: Capsule[] = JSON.parse(raw);
    const now = new Date().getTime();
    return items.map((item) => ({
      ...item,
      isLocked: new Date(item.unlockAt).getTime() > now,
    }));
  } catch {
    return INITIAL_MOCK_CAPSULES;
  }
}

function saveLocalData(items: Capsule[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// 统一数据 API (支持 Supabase 与本地缓存透明降级)
export async function fetchCapsules(): Promise<Capsule[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('capsules')
      .select('*, replies:capsule_replies(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, fallback to local storage:', error.message);
      return getLocalData();
    }

    // 首次数据库为空时，自动播种初始未寄之信
    if (data && data.length === 0) {
      try {
        const seedRows = INITIAL_MOCK_CAPSULES.map((item) => ({
          author_nickname: item.authorNickname,
          content: item.content,
          mood_color: item.moodColor,
          photo_url: item.photoUrl,
          lng: item.lng,
          lat: item.lat,
          location_name: item.locationName,
          unlock_at: item.unlockAt,
          resonances_count: item.resonancesCount,
        }));
        await supabase.from('capsules').insert(seedRows);
      } catch (err) {
        console.warn('Failed to seed initial capsules:', err);
      }
      return INITIAL_MOCK_CAPSULES;
    }

    const now = new Date().getTime();
    return (data || []).map((row) => ({
      id: row.id,
      authorNickname: row.author_nickname,
      content: row.content,
      moodColor: row.mood_color,
      photoUrl: row.photo_url,
      lng: row.lng,
      lat: row.lat,
      locationName: row.location_name,
      unlockAt: row.unlock_at,
      isLocked: new Date(row.unlock_at).getTime() > now,
      resonancesCount: row.resonances_count ?? 0,
      createdAt: row.created_at,
      replies: row.replies || [],
    }));
  }

  return getLocalData();
}

export async function addCapsule(input: CreateCapsuleInput): Promise<Capsule> {
  const unlockDate = input.unlockAt ? new Date(input.unlockAt) : new Date();
  const isLocked = unlockDate.getTime() > Date.now();

  const newCapsule: Capsule = {
    id: `capsule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    authorNickname: input.authorNickname || '星夜漫游者',
    content: input.content,
    moodColor: input.moodColor,
    photoUrl: input.photoUrl,
    lng: input.lng,
    lat: input.lat,
    locationName: input.locationName,
    unlockAt: unlockDate.toISOString(),
    isLocked,
    resonancesCount: 0,
    createdAt: new Date().toISOString(),
    replies: [],
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('capsules').insert([
      {
        author_nickname: newCapsule.authorNickname,
        content: newCapsule.content,
        mood_color: newCapsule.moodColor,
        photo_url: newCapsule.photoUrl,
        lng: newCapsule.lng,
        lat: newCapsule.lat,
        location_name: newCapsule.locationName,
        unlock_at: newCapsule.unlockAt,
      }
    ]).select().single();

    if (!error && data) {
      return {
        ...newCapsule,
        id: data.id,
      };
    }
  }

  // 写入本地存储
  const current = getLocalData();
  const updated = [newCapsule, ...current];
  saveLocalData(updated);
  return newCapsule;
}

export async function toggleResonance(capsuleId: string): Promise<number> {
  const current = getLocalData();
  let updatedCount = 0;
  const updated = current.map((c) => {
    if (c.id === capsuleId) {
      updatedCount = c.resonancesCount + 1;
      return { ...c, resonancesCount: updatedCount };
    }
    return c;
  });
  saveLocalData(updated);

  if (isSupabaseConfigured && supabase) {
    await supabase.rpc('increment_resonance', { target_capsule_id: capsuleId });
  }

  return updatedCount;
}

export async function addReply(capsuleId: string, authorNickname: string, content: string): Promise<CapsuleReply> {
  const newReply: CapsuleReply = {
    id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    capsuleId,
    authorNickname: authorNickname || '拾光者',
    content,
    createdAt: new Date().toISOString(),
  };

  const current = getLocalData();
  const updated = current.map((c) => {
    if (c.id === capsuleId) {
      return { ...c, replies: [...(c.replies || []), newReply] };
    }
    return c;
  });
  saveLocalData(updated);

  if (isSupabaseConfigured && supabase) {
    await supabase.from('capsule_replies').insert([
      {
        capsule_id: capsuleId,
        author_nickname: newReply.authorNickname,
        content: newReply.content,
      }
    ]);
  }

  return newReply;
}
