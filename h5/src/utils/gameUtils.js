// 确定性线性同余伪随机数生成器 (LCG)
export function createSeedRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280.0;
  };
}

export function getTodaySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export function applyHighlights(story, highlightWords) {
  if (!highlightWords || highlightWords.length === 0) return story;
  let html = story;
  const sorted = [...highlightWords].sort((a, b) => b.length - a.length);
  for (const word of sorted) {
    if (!word) continue;
    const repl = `<span style="color:#ffe66d;font-weight:bold;text-shadow:0 0 10px rgba(255,230,109,0.6);">${word}</span>`;
    html = html.split(word).join(repl);
  }
  return html;
}

export function buildNearMiss(choiceText, deathCause, rate, triggeredTrait, chrName) {
  let nearMissDesc = deathCause
    .replace(/暴毙$/, '').replace(/死亡$/, '').replace(/身亡$/, '')
    .replace(/而死$/, '').replace(/致死$/, '').replace(/而亡$/, '')
    .replace(/惨死$/, '').replace(/死$/, '');

  const riskLevel = rate <= 0.2 ? '小小' : rate <= 0.4 ? '' : rate <= 0.6 ? '相当' : '极大';

  const templates = [
    `你${choiceText}，这背后隐藏着${riskLevel}的风险——险些${nearMissDesc}。但这一次，死神与你擦肩而过。`,
    `心跳加速的一刻过去了。险些${nearMissDesc}的噩运，在最后一秒悄然转身。你，活下来了。`,
    `【化险为夷】${nearMissDesc}的威胁在你身旁一闪而逝。命运今天还没打算收走你。继续谨慎前行吧。`,
  ];

  const idx = rate <= 0.25 ? 0 : rate <= 0.6 ? 1 : 2;
  let result = templates[idx];

  if (triggeredTrait) {
    if (triggeredTrait.type === 'buff') {
      result += `\n\n✨ 【天赋·${triggeredTrait.name}】生效：身为【${chrName}】的你，凭借特有的职业优势轻松化解了此次险境！`;
    } else {
      result += `\n\n⚠️ 【劣势·${triggeredTrait.name}】触发：身为【${chrName}】的你，受限于职业劣势属性，在此次应对中感到异常吃力...`;
    }
  }
  return result;
}

export function buildDyingNarrative(choiceText, deathCause, currentHp) {
  let causeDesc = deathCause
    .replace(/暴毙$/, '').replace(/死亡$/, '').replace(/身亡$/, '')
    .replace(/而死$/, '').replace(/致死$/, '').replace(/而亡$/, '')
    .replace(/惨死$/, '').replace(/死$/, '');

  const templates = [
    `😱 【死里逃生】！你刚才贸然选择【${choiceText}】，结果险些遭受致命危机——差一点就${causeDesc}！幸好你关键时刻拼命自救（扣除 1 滴生命值），在鬼门关前强行抽身！目前仅剩 ${currentHp} 滴生命值，务必小心！`,
    `💥 【身受重伤】！极度凶险的【${causeDesc}】险情瞬间笼罩了你！你虽然凭顽强的肉体意志勉强挺了过来（生命值 -1），但已元气大伤。请捂着伤口，更加谨慎地继续探索！`,
  ];
  return templates[Math.random() < 0.5 ? 0 : 1];
}

export function getRiskDisplay(rate) {
  if (rate <= 0.2) return { text: '🟢 感觉还好...', cls: 'risk-low' };
  if (rate <= 0.4) return { text: '🟡 有些不安...', cls: 'risk-mid' };
  if (rate <= 0.6) return { text: '🟠 心跳加速...', cls: 'risk-high' };
  if (rate <= 0.8) return { text: '🔴 极度危险...', cls: 'risk-extreme' };
  return { text: '💀 必死之路...', cls: 'risk-extreme-shake' };
}

export function extractAllDeathCauses(chains) {
  const causes = [];
  for (const chainKey of Object.keys(chains)) {
    const chain = chains[chainKey];
    if (!chain.nodes) continue;
    for (const nodeKey of Object.keys(chain.nodes)) {
      const node = chain.nodes[nodeKey];
      if (!node.choices) continue;
      for (const ch of node.choices) {
        if (
          ch.deathCause && ch.deathCause.trim() !== '' &&
          !ch.deathCause.includes('成功') &&
          !ch.deathCause.includes('胜利') &&
          !ch.deathCause.includes('通关') &&
          !ch.deathCause.includes('逃脱') &&
          !causes.includes(ch.deathCause)
        ) {
          causes.push(ch.deathCause);
        }
      }
    }
  }
  return causes;
}

export function getCauseComment(cause) {
  if (/触电|高压|电闸|电线|电弧/.test(cause)) return '馆长锐评：看来你是电击疗法的忠实支持者，对雷电之力毫无防备之心。';
  if (/摔死|摔倒|坠|踏空|滑落/.test(cause)) return '馆长锐评：地心引力很强吧？下辈子出门记得看路，要不就去买份重力险。';
  if (/被车|撞|交通事故|电动车/.test(cause)) return '馆长锐评：马路不是你家开的，红绿灯不是氛围灯。答应我，下辈子看好两边再走。';
  if (/咬|犬|蛛|恶霸/.test(cause)) return '馆长锐评：大自然并不想和你交朋友，它们只是在挑剔的胃口面前把你当成了快餐。';
  if (/毒|瓦斯|酸|窒息/.test(cause)) return '馆长锐评：这刺鼻的味道，是科学的芬芳，更是你过于草率吸入的代价。';
  if (/砸|坠落物|天花板|坍塌/.test(cause)) return '馆长锐评：天降正义！下辈子出门，建议随身戴一顶钛合金安全帽。';
  if (/炸|爆/.test(cause)) return '馆长锐评：艺术就是爆炸！而你不仅亲眼见证，还亲自成为了艺术的原料。';
  if (/尖锐|刺穿|割破|玻璃/.test(cause)) return '馆长锐评：尖锐的东西总是很迷人，尤其是在它切开你的动脉的时候。';
  if (/批评|伤心|羞愧/.test(cause)) return '馆长锐评：心灵脆弱的倒霉蛋，死神的镰刀这次甚至没有沾血。';
  return '馆长锐评：死法千奇百怪，而你总是能用优美的姿态精准踩中死神的陷阱。';
}
