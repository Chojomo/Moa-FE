import { Head, Content, CommentPost, Comments } from '@/components/Page/Diary/Detail'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[100px] md:pt-[140px] overflow-auto px-[5%] md:px-[20%] pb-[60px]">
      <Head />
      <Content />
      <CommentPost />
      <Comments />
      <div className="fixed left-0 bottom-0 w-full h-[60px] bg-orange-500">하단 고정</div>
      {/* <p>{params.id}</p> */}
    </div>
  )
}
