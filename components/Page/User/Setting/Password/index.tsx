import Button from '@/components/Button'
import { PasswordInput } from '@/components/Page/Auth/Input'

import { useState } from 'react'

export default function Password() {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleCancleClick = () => {
    setIsEdit(false)
  }
  const handleSaveClick = () => {
    setIsEdit(true)
  }

  return (
    <div className="w-full pt-[10px] pb-[30px] border-b flex flex-col justify-center gap-4">
      <div className="flex gap-5">
        <p className="text-[1.5rem] text-heading-text font-semibold">비밀번호 변경</p>
        <div className="flex-center gap-5 text-[0.8rem]">
          {isEdit ? (
            <>
              <form className="flex-center gap-5">
                <Button
                  type="button"
                  ariaLabel="닉네임 변경 취소 버튼"
                  className="text-white bg-[#d84040] dark:bg-[#bc1f1f] hover:bg-[#cb3b3b] dark:hover:bg-[#cd2525] rounded-md p-2"
                  onClick={handleCancleClick}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  ariaLabel="닉네임 변경 확인 버튼"
                  className="bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md p-2"
                  // onClick={handleSaveClick}
                >
                  변경
                </Button>
              </form>
            </>
          ) : (
            <Button
              type="button"
              ariaLabel="닉네임 변경 확인 버튼"
              className="bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md p-2"
              onClick={() => setIsEdit(true)}
            >
              변경
            </Button>
          )}
        </div>
      </div>
      <p className="text-nonActive-text text-[0.8rem]">
        유효한 이메일로 가입 시, 해당 이메일을 통해 비밀번호를 변경할 수 있습니다.
      </p>
    </div>
  )
}
