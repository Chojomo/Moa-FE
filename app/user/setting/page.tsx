'use client'

import {
  Profile,
  Nickname,
  Bio,
  Notification,
  Password,
  DeleteAccount,
} from '@/components/Page/User/Setting'

export default function Setting() {
  return (
    <div className="relative w-full pt-[10%] flex flex-col pb-[5%] gap-[20px]">
      <Profile />
      <Nickname />
      <Bio />
      <Notification />
      <Password />
      <DeleteAccount />
    </div>
  )
}
