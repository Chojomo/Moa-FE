export type Diary = {
  diaryId: string
  diaryAuthorId: string
  diaryAuthorNickname: string
  diaryThumbnail: string | null
  diaryTitle: string
  diaryContents: string
  diaryPublishedAt: string
  totalLikes: number
}
