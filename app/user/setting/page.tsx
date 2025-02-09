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

  // const sections = [
  //   {
  //     title: '소개',
  //     src: '/images/pebble/red-pebble2.png',
  //     alt: '소개',
  //     children: (
  //       <>
  //         <textarea
  //           id="about"
  //           name="about"
  //           rows={4}
  //           className="w-full h-[200px] bg-container-bg p-5 rounded-md text-[14px] focus:outline-none resize-none"
  //           placeholder="등록된 소개글이 없습니다."
  //           aria-label="유저 소개글 입력 폼"
  //           value={aboutText}
  //           onChange={handleChange(setAboutText)}
  //         />
  //         <div className="w-full flex gap-4 justify-end mt-3">
  //           <Button
  //             type="button"
  //             ariaLabel="유저 소개글 취소 버튼"
  //             className="px-3 py-2 bg-btn-red text-white rounded-full text-[12px] font-semibold"
  //           >
  //             취소
  //           </Button>
  //           <Button
  //             type="button"
  //             ariaLabel="유저 소개글 등록 버튼"
  //             className="px-3 py-2 bg-nav-bg text-white rounded-full text-[12px] font-semibold"
  //           >
  //             등록
  //           </Button>
  //         </div>
  //       </>
  //     ),
  //   },
  //   {
  //     title: '수신 설정',
  //     src: '/images/pebble/blue-pebble2.png',
  //     alt: '수신 설정',
  //     children: (
  //       <div className="flex items-center gap-4">
  //         <span className="text-[14px] font-semibold">댓글 알림</span>
  //         <Toggle initialState={false} callback={handleToggle} />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: '회원 탈퇴',
  //     src: '/images/pebble/mint-pebble.png',
  //     alt: '회원 탈퇴',
  //     children: (
  //       <>
  //         <Button
  //           type="button"
  //           ariaLabel="유저 소개글 취소 버튼"
  //           className="max-w-[90px] px-5 py-2 bg-btn-red text-white rounded-full text-[12px] font-semibold mt-2 mb-4"
  //         >
  //           회원 탈퇴
  //         </Button>
  //         <p className="text-[12px] text-body-text mb-[50px]">
  //           회원 탈퇴 시 작성하신 다이어리 포스트 및 댓글, 좋아요가 모두 삭제되며 복구되지 않습니다.
  //         </p>
  //       </>
  //     ),
  //   },
  // ]

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
