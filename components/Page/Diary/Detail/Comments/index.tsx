import Comment from './Comment'

export default function Comments() {
  return (
    <div className="w-full pb-[10%]">
      <p className="text-[16px] font-bold py-[25px]">
        댓글 <span className="text-main-blue">7</span>
      </p>
      <Comment />
    </div>
  )
}
