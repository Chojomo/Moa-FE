import { UserInfo, Tap } from '@/components/Page/User'

export default function ProFileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full pt-[10%]">
      <UserInfo />
      {/* {children} */}
    </div>
  )
}
