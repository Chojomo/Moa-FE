'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

import {
  Profile,
  Nickname,
  Bio,
  Notification,
  Password,
  DeleteAccount,
} from '@/components/Page/User/Setting'

export default function Setting() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<null | string>(null)
  // const [aboutText, setAboutText] = useState<string>('')

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        setter(value)
      },
    []
  )

  return (
    <div className="relative w-full pt-[5%] flex flex-col pb-[5%] gap-[20px]">
      <Profile />
      <Nickname />
      <Bio />
      <Notification />
      <Password />
      <DeleteAccount />
    </div>
  )
}
