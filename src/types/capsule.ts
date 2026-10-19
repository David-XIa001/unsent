export type MoodColor = 'blue' | 'purple' | 'orange' | 'green' | 'rose';

export interface MoodMeta {
  label: string;
  colorHex: string;
  bgClass: string;
  textClass: string;
  glowClass: string;
}

export const MOOD_CONFIG: Record<MoodColor, MoodMeta> = {
  blue: {
    label: '思念微光',
    colorHex: '#38bdf8',
    bgClass: 'bg-aurora-blue',
    textClass: 'text-aurora-blue',
    glowClass: 'shadow-[0_0_15px_rgba(56,189,248,0.6)]',
  },
  purple: {
    label: '秘密树洞',
    colorHex: '#c084fc',
    bgClass: 'bg-aurora-purple',
    textClass: 'text-aurora-purple',
    glowClass: 'shadow-[0_0_15px_rgba(192,132,252,0.6)]',
  },
  orange: {
    label: '温暖治愈',
    colorHex: '#fb923c',
    bgClass: 'bg-aurora-orange',
    textClass: 'text-aurora-orange',
    glowClass: 'shadow-[0_0_15px_rgba(251,146,60,0.6)]',
  },
  green: {
    label: '释怀前行',
    colorHex: '#34d399',
    bgClass: 'bg-aurora-green',
    textClass: 'text-aurora-green',
    glowClass: 'shadow-[0_0_15px_rgba(52,211,153,0.6)]',
  },
  rose: {
    label: '心动告白',
    colorHex: '#fb7185',
    bgClass: 'bg-aurora-rose',
    textClass: 'text-aurora-rose',
    glowClass: 'shadow-[0_0_15px_rgba(251,113,133,0.6)]',
  },
};

export interface CapsuleReply {
  id: string;
  capsuleId: string;
  authorNickname: string;
  content: string;
  createdAt: string;
}

export interface Capsule {
  id: string;
  authorNickname: string;
  content: string;
  moodColor: MoodColor;
  photoUrl?: string;
  lng: number;
  lat: number;
  locationName?: string;
  unlockAt: string; // ISO 8601 String
  isLocked: boolean;
  resonancesCount: number;
  createdAt: string;
  replies?: CapsuleReply[];
}

export interface CreateCapsuleInput {
  authorNickname: string;
  content: string;
  moodColor: MoodColor;
  photoUrl?: string;
  lng: number;
  lat: number;
  locationName?: string;
  unlockAt?: string;
}
