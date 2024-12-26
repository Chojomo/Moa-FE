'use client'

import { useState, useCallback } from 'react'
import { validateEmail } from '@/helper/validate'
import Button from '@/components/Button'

export default function FindPassword() {
  const [email, setEmail] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValid(isValid)
  }, [])

  const handleSubmit = () => {
    console.log('ㅈㅈ')
  }

  return (
    <div className="w-full h-full flex-center px-[5%]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
        <h1 className="text-main-blue font-semibold text-[1.3rem] mb-10">비밀번호 찾기</h1>
        <p className="text-[1rem] text-body-text text-center">
          가입한 이메일을 입력해 주세요. <br />
          이메일을 통해 비밀번호 변경 링크가 전송됩니다.
        </p>
        <input
          type="email"
          id="email"
          aria-label="이메일 입력 폼"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
          className="min-w-[300px] input-reset rounded border border-[#7f7f7f] dark:border-[#c7c7c7] px-[15px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem] my-[20px] mb-[20px]"
        />
        <Button
          type="submit"
          ariaLabel="임시 비밀번호 받기 버튼"
          className="bg-main-blue min-w-[300px] px-[20%] py-[20px] rounded"
        >
          임시 비밀번호 발송
        </Button>
      </form>
    </div>
  )
}
