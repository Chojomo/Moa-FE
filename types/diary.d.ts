export type Diary = {
  diaryId: string
  diaryAuthorId: string
  diaryAuthorNickname: string
  diaryThumbnail: string | null
  diaryTitle: string
  diaryContents: string
  diaryPublishedAt: string
  likeCount: number
  commentCount: number
}

export type Comment = {
  commentAuthorId: string
  commentContents: string
  commentId: stringå
  createdAt: string
  diaryAuthorNickname: string
  diaryAuthorProfileImage: string
  isCommentOwner: boolean
  isLiked: boolean
  likeCount: number
  replies?: Reply[]
}

export type Reply = {
  createdAt: string
  isLiked: boolean
  isReplyOwner: boolean
  likeCount: number
  replyAuthorId: string
  replyAuthorNickname: string
  replyAuthorProfileImage: string
  replyContents: string
  replyId: string
}

export type Replies = Reply[]
export type Comments = {
  comments: Comment[]
}

export type Post = {
  comment: Comments
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
