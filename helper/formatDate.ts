export function formatDate(date: string): string {
  const [year, month, day] = date.split('T')[0].split('-')
  return `${year}년 ${Number(month)}월 ${Number(day)}일`
}
