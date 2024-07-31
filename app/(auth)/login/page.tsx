'use client'

import { useState } from 'react'
import Input from '@/components/Page/Auth/Input'
import Button from '@/components/Button'

export default function Login() {
  const [isChecked, setIsChecked] = useState(false)

  /* input 따로따로 할 건지 고민,,, */
  /* <Input /> */
  /* 체크박스 아이콘으로 변경, submit 함수 추가할것... */

  return (
    <form>
      <label className="flex items-center gap-[20px]">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="rounded-full h-5 w-5 text-blue-600"
        />
        <span className="text-heading-text text-[14px]">로그인 상태 유지하기</span>
      </label>
      <p>auth 아이콘</p>
      <Button
        type="submit"
        ariaLabel="submit button"
        className="bg-main-blue px-[130px] py-[10px] rounded-full font-bold text-[18px]"
      >
        회원가입
      </Button>
    </form>
  )
}
