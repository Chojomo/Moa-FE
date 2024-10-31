import Banner from '@/components/Page/Diary/Banner'
import Posts from '@/components/Page/Diary/Posts'

export default function Diary() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col pt-[95px]">
      <Banner />
      <Posts />
    </div>
  )
}
