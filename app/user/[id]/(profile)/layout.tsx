import { UserInfo, Tap } from '@/components/Page/User'
import { getUser } from '@/lib/api/user'

export default async function ProFileLayout({
  params,
  children,
}: Readonly<{
  params: { id: string }
  children: React.ReactNode
}>) {
  const { data: initialData } = await getUser({ userId: params.id })

  return (
    <div className="w-full h-full pt-[10%] flex flex-col">
      <UserInfo userId={params.id} initialData={initialData} />
      <Tap />
      {children}
    </div>
  )
}
