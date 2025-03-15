'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import DeleteAccountModal from './Modal'

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="w-full pt-[10px] pb-[40px] flex flex-col justify-center gap-4">
      <div className="flex gap-5">
        <p className="text-[1.5rem] text-heading-text font-semibold">회원 탈퇴</p>
        <Button
          type="button"
          ariaLabel="닉네임 변경 확인 버튼"
          className="bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md p-2 text-[0.8rem]"
          onClick={() => setIsModalOpen(true)}
        >
          탈퇴
        </Button>
      </div>
      <p className="text-nonActive-text text-[0.8rem]">
        회원 탈퇴 시, 작성했던 글과 댓글은 유지되며, 수정 및 삭제할 수 없습니다.
      </p>
      <DeleteAccountModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </div>
  )
}
