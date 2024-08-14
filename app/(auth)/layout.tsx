import Tap from '@/components/Page/Auth/Tap'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-[100vw] h-[100vh] flex-center flex-col pt-[55px]">
      <Tap />
      {children}
    </div>
  )
}
