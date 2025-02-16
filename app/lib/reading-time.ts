export function getReadingTime(text: string): number {
  const wordsPerMinute = 100;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
} 