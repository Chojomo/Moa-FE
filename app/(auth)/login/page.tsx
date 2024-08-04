'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Page/Auth/Input'
import { Icon } from '@/components/Icon'

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
    <form className="flex-center flex-col">
      <div className="w-[100vw] flex-center flex-col gap-[40px]">
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
      </div>
      <div className="flex-center gap-[20px] my-[50px]">
        <Button type="button" ariaLabel="check button" onClick={() => setIsChecked(!isChecked)}>
          <Icon name="Check" width={25} height={25} fill={isChecked ? '#80B0A2' : '#A6A6A6'} />
        </Button>
        <span className="text-heading-text text-[14px]">로그인 상태 유지하기</span>
      </div>
      <div className="flex-center gap-[50px]">
        <Button type="button" ariaLabel="kakao auth button">
          <Icon name="Kakao" width={60} height={60} />
        </Button>
        <Button type="button" ariaLabel="naver auth button">
          <Icon name="Naver" width={60} height={60} />
        </Button>
        <Button type="button" ariaLabel="google auth button">
          <Icon name="Google" width={60} height={60} />
        </Button>
      </div>
      <Button
        type="submit"
        ariaLabel="submit button"
        className="bg-main-blue mt-[47px] px-[130px] py-[10px] rounded-full font-bold text-[18px] text-[#eeeeeeda]"
      >
        회원가입
      </Button>
    </form>
  )
}
