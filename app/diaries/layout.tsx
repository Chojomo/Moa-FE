import { Banner, PostButton, Sort } from '@/components/Page/Diaries'
import { getDiarys } from '@/lib/api/diary'

export default async function DiaryLayout({
  children,
}: Readonly<{
  params: { sort: string }
  children: React.ReactNode
}>) {
  const { data } = await getDiarys({ pageParam: 0, sortType: 'viewCount' })
  const posts = data?.diaryPreviewList

  return (
    <div className="relative w-full h-[100vh] flex flex-col pt-[74px]">
      <Banner posts={posts} />
      <Sort />
      {children}
      <PostButton />
    </div>
  )
}
