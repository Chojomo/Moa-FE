import { Comment as PostComment } from '@/types/diary'
import Comment from './Comment'

type CommentsProps = {
  isLogin: boolean
  diaryId: string
  commentCount: number
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
  comments: PostComment[] | null
}

export default function Comments({
  isLogin,
  diaryId,
  commentCount,
  setCommentCount,
  comments,
}: CommentsProps) {
  return (
    <div className="w-full pb-[10%]">
      <p className="text-[16px] font-bold py-[25px]">
        댓글 <span className="text-main-blue">{commentCount}</span>
      </p>
      {comments?.map((c) => (
        <Comment
          key={c.commentId}
          isLogin={isLogin}
          diaryId={diaryId}
          comment={c}
          setCommentCount={setCommentCount}
        />
      ))}
    </div>
  )
}
