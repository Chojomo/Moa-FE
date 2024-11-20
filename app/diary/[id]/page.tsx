import { Head, Content, CommentPost, Comments, Footer } from '@/components/Page/Diary/Detail'

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
      <Footer />
      {/* <p>{params.id}</p> */}
    </div>
  )
}
