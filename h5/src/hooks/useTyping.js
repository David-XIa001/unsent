import { useEffect, useRef, useCallback } from 'react';

/**
 * 打字机特效 Hook
 * @param {string} text - 要打出的完整文字
 * @param {Function} onTick - 每次打出一个字时回调 (currentText) => void
 * @param {Function} onFinish - 打字完成回调 (highlightedHtml) => void
 * @param {Function} applyHighlights - 对最终文本做关键词高亮的函数 (text) => html
 * @param {number} speed - 每字间隔毫秒，默认 35
 */
export function useTyping(text, onTick, onFinish, applyHighlights, speed = 35) {
  const timerRef = useRef(null);

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let currentLen = 0;
    const totalLen = text.length;

    if (totalLen === 0) {
      onFinish(applyHighlights ? applyHighlights('') : '');
      return;
    }

    timerRef.current = setInterval(() => {
      currentLen++;
      if (currentLen >= totalLen) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        const htmlStory = applyHighlights ? applyHighlights(text) : text;
        onFinish(htmlStory);
      } else {
        onTick(text.substring(0, currentLen));
      }
    }, speed);
  }, [text, onTick, onFinish, applyHighlights, speed]);

  const skip = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const htmlStory = applyHighlights ? applyHighlights(text) : text;
    onFinish(htmlStory);
  }, [text, onFinish, applyHighlights]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { start, skip };
}

/**
 * 震动封装，替代 wx.vibrateShort / wx.vibrateLong
 */
export function vibrate(type = 'light') {
  if (!navigator.vibrate) return;
  if (type === 'light') navigator.vibrate(15);
  else if (type === 'medium') navigator.vibrate(30);
  else if (type === 'long') navigator.vibrate(500);
}
