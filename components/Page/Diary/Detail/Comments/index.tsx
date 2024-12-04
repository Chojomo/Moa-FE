import Comment from './Comment'

type CommentsProps = {
  commentCount: number
}

export default function Comments({ commentCount }: CommentsProps) {
  return (
    <div className="w-full pb-[10%]">
      <p className="text-[16px] font-bold py-[25px]">
        댓글 <span className="text-main-blue">{commentCount}</span>
      </p>
      <Comment />
    </div>
  )
}
