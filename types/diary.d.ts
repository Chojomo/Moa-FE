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

export type Comment = {
  commentAuthorId: string
  commentContents: string
  commentId: string
  createdAt: string
  diaryAuthorNickname: string
  diaryAuthorProfileImage: string
  isCommentOwner: boolean
  isLiked: boolean
  likeCount: number
  replies?: Comment[]
}

export type Replies = Comment[]

export type Post = {
  comments: Comment[]
  commentCount: number
  diaryAuthorId: string
  diaryAuthorNickname: string
  diaryAuthorProfileImage: string
  diaryContents: string
  diaryId: string
  diaryPublishedAt: string
  diaryThumbnail: string
  diaryTitle: string
  isDiaryOwner: boolean
  isDiaryPublic: boolean
  isLiked: boolean
  likeCount: number
  viewCount: number
}
