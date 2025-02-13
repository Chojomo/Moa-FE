type CommentType = {
  index: number
  comment: string
  diary: string
  date: string
}

type CommentProps = {
  comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
  const { comment: commentText, diary, date } = comment

  return (
    <div className="w-full flex flex-col justify-center items-start gap-3 pb-[30px] border-b border-border">
      <p className="text-[1.2rem] font-semibold text-heading-text">{commentText}</p>
      <div className="flex-center gap-3 text-[0.7rem] text-[#9e9e9e] dark:text-[#5b5b5b]">
        <div className="border border-[#eeeeee] dark:border-[#242424] px-[5px] py-[2px] rounded-sm">
          <p>원문</p>
        </div>
        <p className="underline">{diary}</p>
        <div className="w-[3px] h-[3px] rounded-full bg-[#a4a4a4]" />
        <p>{date}</p>
      </div>
    </div>
  )
}
