import { getDiarys } from '@/lib/api/diary'
import { Banner, Posts, PostButton } from '@/components/Page/Diary'

export default async function Diary() {
  const data = await getDiarys({ pageParam: 0, sortType: 'viewCounts' })
  const posts = data?.data?.diaryPreviewList

  return (
    <div className="relative w-[100vw] h-[100vh] flex flex-col pt-[95px]">
      <Banner posts={posts} />
      <Posts />
      <PostButton />
    </div>
  )
}
