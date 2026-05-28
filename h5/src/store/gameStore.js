const STORAGE_KEY = 'survive_today_game_data';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        survivalDays: typeof data.survivalDays === 'number' ? data.survivalDays : 0,
        deathRecords: Array.isArray(data.deathRecords) ? data.deathRecords : [],
      };
    }
  } catch (e) {
    // ignore
  }
  return { survivalDays: 0, deathRecords: [] };
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function getSurvivalDays() {
  return load().survivalDays;
}

export function getDeathRecords() {
  return load().deathRecords;
}

export function addSurvivalDay() {
  const data = load();
  data.survivalDays++;
  save(data);
  return data.survivalDays;
}

export function addDeathRecord(cause) {
  const data = load();
  const rec = data.deathRecords.find(r => r.cause === cause);
  if (rec) {
    rec.count++;
  } else {
    data.deathRecords.push({ cause, count: 1 });
  }
  save(data);
}

export function resetAll() {
  save({ survivalDays: 0, deathRecords: [] });
}
