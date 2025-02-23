import { Banner, PostButton, Sort } from '@/components/Page/Diaries'

export default function DiaryLayout({
  children,
}: Readonly<{
  params: { sort: string }
  children: React.ReactNode
}>) {
  return (
    <div className="relative w-full h-[100vh] flex flex-col pt-[74px]">
      <Banner />
      <Sort />
      {children}
      <PostButton />
    </div>
  )
}
