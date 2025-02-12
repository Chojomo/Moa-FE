import { Comment as PostComment, Reply } from '@/types/diary'
import Comment from './Comment'

type CommentsProps = {
  isLogin: boolean
  diaryId: string
  comments: PostComment[] | null
  handleAddReply: (commentId: string, newReply: Reply) => void
  handleDeleteComment: (commentId: string, isReply?: boolean) => void
  commentCount: number
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

export default function Comments({
  isLogin,
  diaryId,
  comments,
  handleAddReply,
  handleDeleteComment,
  commentCount,
  setCommentCount,
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
          handleAddReply={handleAddReply}
          handleDeleteComment={handleDeleteComment}
          setCommentCount={setCommentCount}
        />
      ))}
    </div>
  )
}
