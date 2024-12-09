import { Comment as PostComment } from '@/types/diary'
import Comment from './Comment'

type CommentsProps = {
  isLogin: boolean
  commentCount: number
  comments: PostComment[]
}

export default function Comments({ isLogin, commentCount, comments }: CommentsProps) {
  return (
    <div className="w-full pb-[10%]">
      <p className="text-[16px] font-bold py-[25px]">
        댓글 <span className="text-main-blue">{commentCount}</span>
      </p>
      {comments.map((c) => (
        <Comment key={c.commentId} isLogin={isLogin} comment={c} />
      ))}
    </div>
  )
}
