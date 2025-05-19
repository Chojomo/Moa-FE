import { UserInfo, Tap } from '@/components/Page/User'
import { getUser, getUserFollow } from '@/lib/api/user'

export default async function ProFileLayout({
  params,
  children,
}: Readonly<{
  params: { id: string }
  children: React.ReactNode
}>) {
  const { data: userInitialData } = await getUser({ userId: params.id })
  const { data: following } = await getUserFollow({ userId: params.id, type: 'following' })
  const { data: followers } = await getUserFollow({ userId: params.id, type: 'follower' })

  return (
    <div className="w-full h-full pt-[10%] flex flex-col">
      <UserInfo
        userId={params.id}
        userInitialData={userInitialData}
        following={following}
        followers={followers}
      />
      <Tap />
      {children}
    </div>
  )
}
