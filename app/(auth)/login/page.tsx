'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Page/Auth/Input'
import { Icon } from '@/components/Icon'
import { validateEmail, validatePassword } from '@/helper/validate'

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmailValue(value)
    setIsValidEmail(isValid)
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
      >
        <Button
          type="button"
          ariaLabel="Cancel email entry"
          onClick={() => setEmailValue('')}
          className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${emailValue ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Cancel" width={15} height={15} />
        </Button>
      </Input>
      <p
        className={`relative bottom-[20px] right-[90px] text-[12px] font-bold text-accent ${!emailValue.length || validateEmail(emailValue) ? 'opacity-0' : 'opacity-100'}`}
      >
        유효하지 않은 이메일입니다.
      </p>
      <Input
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호를 입력해 주세요"
        value={passwordValue}
        changeHandler={changePasswordHandler}
      >
        <Button
          type="button"
          ariaLabel="Cancel email entry"
          onClick={() => setPasswordValue('')}
          className={`absolute right-[50px] p-[5px] transition-opacity duration-300 ease-in-out ${passwordValue ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Cancel" width={15} height={15} />
        </Button>
        <Button
          type="button"
          ariaLabel="Toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${passwordValue ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name={showPassword ? 'EyeOn' : 'EyeOff'} width={23} height={23} />
        </Button>
      </Input>
      <p
        className={`relative bottom-[20px] left-[5px] text-[12px] font-bold text-accent ${!passwordValue.length || validatePassword(passwordValue) ? 'opacity-0' : 'opacity-100'}`}
      >
        영어 대소문자, 숫자, 특수문자를 포함한 8글자 이상을 입력해 주세요.
      </p>
      <div className="flex-center gap-[20px] mt-[30px]">
        <Button type="button" ariaLabel="check button" onClick={() => setIsChecked(!isChecked)}>
          <Icon name="Check" width={25} height={25} fill={isChecked ? '#80B0A2' : '#A6A6A6'} />
        </Button>
        <span className="text-heading-text text-[14px]">로그인 상태 유지하기</span>
      </div>
      <div className="flex-center gap-[50px] mt-[50px]">
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
        className="bg-main-blue mt-[47px] px-[130px] py-[10px] rounded-full font-bold text-[18px] text-[#fff]"
      >
        로그인
      </Button>
      {/* 아이디, 비밀번호 찾기 */}
    </form>
  )
}
