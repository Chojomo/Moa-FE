import { UserInfo, Tap } from '@/components/Page/User'

export default function ProFileLayout({
  params,
  children,
}: Readonly<{
  params: { id: string }
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full pt-[10%] flex flex-col">
      <UserInfo userId={params.id} />
      <Tap />
      {children}
    </div>
  )
}
