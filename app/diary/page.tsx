import { Banner, Posts, PostButton } from '@/components/Page/Diary'

export default async function Diary() {
  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[74px]">
      <Banner />
      <Posts />
      <PostButton />
    </div>
  )
}
