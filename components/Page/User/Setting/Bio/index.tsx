'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Bio() {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [bio, setBio] = useState<string>('안녕하세요. 반갑습니다.')
  const [tempBio, setTempBio] = useState<string>(bio)

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempBio(event.target.value)
  }

  const handleCancleClick = () => {
    setBio(bio)
    setIsEdit(false)
  }

  const handleSaveClick = () => {
    setBio(tempBio)
    setIsEdit(false)
  }

  return (
    <div className="w-full pt-[10px] pb-[30px] flex flex-col justify-center border-b border-border">
      <div className="flex items-center gap-5 pb-[20px]">
        <p className="text-[1.5rem] text-heading-text font-semibold">소개글 변경</p>
        {isEdit ? (
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
        ) : (
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
        )}
      </div>
      <div>
        {isEdit ? (
          <textarea
            id="about"
            name="about"
            rows={4}
            className="w-full h-[200px] bg-container-bg p-5 rounded-md text-[14px] focus:outline-none resize-none"
            placeholder="등록된 소개글이 없습니다."
            aria-label="유저 소개글 입력 폼"
            value={tempBio}
            onChange={handleBioChange}
          />
        ) : (
          <p className="text-nonActive-text">{bio}</p>
        )}
      </div>
    </div>
  )
}
