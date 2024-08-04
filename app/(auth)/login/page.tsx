'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Page/Auth/Input'

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  return (
    <form className="w-[100vw] flex-center flex-col">
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={emailValue}
        changeHandler={changeEmailHandler}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={passwordValue}
        changeHandler={changePasswordHandler}
      />
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
        className="bg-main-blue px-[130px] py-[10px] rounded-full font-bold text-[18px] text-[#eeeeeeda]"
      >
        회원가입
      </Button>
      <p>아이디 찾기</p>
      <p>비밀번호 찾기</p>
    </form>
  )
}
