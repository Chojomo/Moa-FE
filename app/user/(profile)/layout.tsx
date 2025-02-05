import { UserInfo, Tap } from '@/components/Page/User'

export default function ProFileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full pt-[10%] flex flex-col overflow-y-scroll">
      <UserInfo />
      <Tap />
      {/* <div cla>d</div> */}
      {/* {children} */}
    </div>
  )
}
