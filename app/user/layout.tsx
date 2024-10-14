import { UserInfo, Tap } from '@/components/Page/User'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <div className="w-[70%] h-full flex flex-col">
        <UserInfo />
        <Tap />
        {children}
      </div>
    </div>
  )
}
