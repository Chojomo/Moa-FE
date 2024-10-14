'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

export default function Setting() {
  const [aboutText, setAboutText] = useState<string>('')

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        setter(value)
      },
    []
  )

  return (
    <div className="w-full border-t border-border p-[5%] flex-center flex-col">
      <div className="w-full flex gap-5">
        <div className="flex-center flex-col gap-2">
          <Image
            src="/images/pebble/red-pebble2.png"
            alt="소개"
            width={70}
            height={70}
            quality={75}
            loading="lazy"
            draggable="false"
          />
          <p className="font-bold">소개</p>
        </div>
        {/* <Button
          type="button"
          ariaLabel="유저 소개글 수정 버튼"
          className="text-main-blue underline"
        >
          수정
        </Button> */}
        <div className="w-full">
          <textarea
            id="about"
            name="about"
            rows={4}
            className="w-full max-h-[150px] bg-container-bg px-4 pt-3 border-b-2 border-border rounded-md text-[14px] focus:outline-none"
            placeholder="나를 소개해 보세요."
            aria-label="유저 소개글 입력 폼"
            value={aboutText}
            onChange={handleChange(setAboutText)}
          />
          <div>
            <Button type="button" ariaLabel="유저 소개글 취소 버튼">
              취소
            </Button>
            <Button type="button" ariaLabel="유저 소개글 등록 버튼">
              등록
            </Button>
          </div>
        </div>
      </div>
      <div>수신 설정</div>
      <div>회원 탈퇴</div>
    </div>
  )
}
