import { UserInfo, Tap } from '@/components/Page/User'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-[100vw] flex items-center flex-col">
      <div className="w-[70%]">
        <UserInfo />
        <Tap />
        {children}
      </div>
    </div>
  )
}
