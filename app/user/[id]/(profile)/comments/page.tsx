import { Comment } from '@/components/Page/User/Comments'
import { COMMENTS } from '@/helper/constants/comments'

type CommentType = {
  index: number
  comment: string
  diary: string
  date: string
}

export default function Comments() {
  return (
    <div
      className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[5%] pb-[10%] 
      "
    >
      {COMMENTS.map((comment: CommentType) => (
        <Comment key={comment.index} comment={comment} />
      ))}
    </div>
  )
}
