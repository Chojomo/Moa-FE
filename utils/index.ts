export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const getKRTimestamp = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)
}

export const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/^#+\s?/gm, '')
    .replace(/[*_~`>]+/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/!\[Image\][^]*?-->/, '')
    .trim()
}
