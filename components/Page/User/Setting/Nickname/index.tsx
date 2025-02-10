'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Nickname() {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('ichubtou')
  const [tempNickname, setTempNickname] = useState<string>(nickname)

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempNickname(event.target.value)
  }

  const handleCancleClick = () => {
    setNickname(nickname)
    setIsEdit(false)
  }

  const handleSaveClick = () => {
    setNickname(tempNickname)
    setIsEdit(false)
  }

  return (
    <div className="w-full pt-[40px] pb-[20px] flex items-center gap-5 border-b border-border">
      {isEdit ? (
        <>
          <input
            id="nickname"
            type="nickname"
            name="nickname"
            aria-label="닉네임"
            placeholder="닉네임"
            autoComplete="nickname"
            value={tempNickname}
            onChange={handleNicknameChange}
            className="input-reset max-w-[200px] autofull-text rounded border border-[#7f7f7f] dark:border-[#c7c7c7] px-[15px] py-[18px] placeholder:font-light placeholder:text-[0.8rem] autofill:text-black autofill:shadow-none"
          />
          <div className="flex-center gap-5 text-[0.8rem]">
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
              onClick={handleSaveClick}
            >
              변경
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[2rem] text-heading-text font-semibold">{nickname}</p>
          <Button
            type="button"
            ariaLabel="닉네임 수정 아이콘 버튼"
            className=" group p-2"
            onClick={() => setIsEdit(true)}
          >
            <Icon
              name="Edit"
              width={30}
              height={30}
              className="text-[#636363] group-hover:text-[#404040] dark:text-[#b2b2b2] dark:group-hover:text-[#e8e8e8] transition-colors"
            />
          </Button>
        </>
      )}
    </div>
  )
}
