import Banner from '@/components/Page/Diary/Banner'
import Posts from '@/components/Page/Diary/Posts'
import PostButton from '@/components/Page/Diary/PostButton'

export default function Diary() {
  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[95px]">
      <Banner />
      <Posts />
      <PostButton />
    </div>
  )
}
