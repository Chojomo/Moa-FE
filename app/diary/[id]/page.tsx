import { Head } from '@/components/Page/Diary/Detail'

type Params = {
  id: string
}

export default function DiaryDetail({ params }: { params: Params }) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col pt-[95px] overflow-auto">
      <Head />
      <div className="bg-amber-900">본문</div>
      <div className="bg-violet-800">댓글입력</div>
      <div className="bg-fuchsia-400">댓글목록</div>
      <div className="bg-orange-500">하단 고정</div>
      {/* <p>{params.id}</p> */}
    </div>
  )
}
