import {
  Profile,
  Nickname,
  Bio,
  Notification,
  Password,
  DeleteAccount,
} from '@/components/Page/User/Setting'

import { getUser } from '@/lib/api/user'

type SettingProps = {
  params: { id: string }
}

export default async function Setting({ params }: SettingProps) {
  const userId = params.id
  const data = await getUser({ userId })

  return (
    <div className="relative w-full pt-[10%] flex flex-col pb-[5%] gap-[20px]">
      <Profile userId={userId} />
      <Nickname />
      <Bio />
      <Notification />
      <Password />
      <DeleteAccount />
    </div>
  )
}
