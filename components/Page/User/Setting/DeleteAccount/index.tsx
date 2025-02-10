import Button from '@/components/Button'
import { PasswordInput } from '@/components/Page/Auth/Input'

import { useState } from 'react'

export default function DeleteAccount() {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleCancleClick = () => {
    setIsEdit(false)
  }
  const handleSaveClick = () => {
    setIsEdit(true)
  }

  return (
    <div className="w-full pt-[10px] pb-[40px] flex flex-col justify-center gap-4">
      <div className="flex gap-5">
        <p className="text-[1.5rem] text-heading-text font-semibold">회원 탈퇴</p>
        <Button
          type="button"
          ariaLabel="닉네임 변경 확인 버튼"
          className="bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md p-2 text-[0.8rem]"
          onClick={() => setIsEdit(true)}
        >
          탈퇴
        </Button>
      </div>
      <p className="text-nonActive-text text-[0.8rem]">
        유효한 이메일로 가입 시, 해당 이메일을 통해 비밀번호를 변경할 수 있습니다.
      </p>
    </div>
  )
}
