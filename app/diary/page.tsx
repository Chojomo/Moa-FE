import { Banner, Posts, PostButton } from '@/components/Page/Diary'

export default function Diary() {
  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[95px]">
      <Banner />
      <Posts />
      <PostButton />
    </div>
  )
}
