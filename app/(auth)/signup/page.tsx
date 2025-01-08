'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateEmail, validatePassword } from '@/helper/validate'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/api/auth'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import { EmailInput, PasswordInput, ConfirmPasswordInput } from '@/components/Page/Auth/Input'
import SubmitButton from '@/components/Page/Auth/Button/SubmitButton'
import OAuth from '@/components/Page/Auth/OAuth'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [step, setStep] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isPasswordMatched, setIsPasswordMatched] = useState(false)

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false)

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValidEmail(isValid)
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validatePassword(value)

    setPassword(value)
    setIsValidPassword(isValid)
  }, [])

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setConfirmPassword(value)
    setIsPasswordMatched(value === password)
  }

  const mutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log('회원가입 성공:', data)
      router.push('/login')
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('회원가입 실패:', error.message)
      } else {
        console.error('회원가입 실패:', error)
      }
    },
  })

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
  }

  const stepMessage = ['이메일 인증을 진행해 주세요.', '비밀번호를 설정해 주세요.']

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[30px] overflow-y-auto pt-[70px] md:pt-[100px] pb-[50px]">
      <h1 className="text-main-blue text-[1.5rem] font-semibold">회원가입</h1>
      <form
        className="animate-fadeIn w-[100vw] flex-center flex-col gap-[40px]"
        onSubmit={handleSignup}
      >
        <div className="text-[1.2rem] text-center">
          <p className="pb-2">{step + 1} / 2</p>
          <p className="text-[1rem] font-bold">{stepMessage[step]}</p>
        </div>
        {step === 0 && (
          <div className="w-full flex flex-center flex-col gap-2">
            <EmailInput
              email={email}
              handleChange={handleEmailChange}
              handleReset={() => setEmail('')}
            />
            <Button
              type="button"
              ariaLabel="이메일 인증 전송 버튼"
              className={`mt-[20px] relative rounded max-w-[380px] w-[80%] md:w-[50%] flex-center text-[18px] text-[#fff] ${!isValidEmail ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue'} px-[130px] py-[10px]`}
              onClick={() => setStep(1)}
            >
              이메일 인증하기
            </Button>
          </div>
        )}
        {step === 1 && (
          <>
            <div className="w-full flex flex-center flex-col gap-2">
              <PasswordInput
                password={password}
                isVisible={isVisiblePassword}
                handleChange={handlePasswordChange}
                handleReset={() => setPassword('')}
                handleVisible={() => setIsVisiblePassword(!isVisiblePassword)}
              />
              <span className="relative left-3 max-w-[380px] w-[80%] md:w-[50%] flex items-center gap-2 text-[0.8rem]">
                <Icon name="Check2" width={24} height={24} />
                영문 대소문자, 숫자, 특수문자 포함
              </span>
              <span className="relative left-3 max-w-[380px] w-[80%] md:w-[50%] flex items-center gap-2 text-[0.8rem]">
                <Icon name="Check2" width={24} height={24} />
                8자 이상 32자 이하 입력 (공백 제외)
              </span>
            </div>
            <ConfirmPasswordInput
              confirmPassword={confirmPassword}
              isVisible={isVisibleConfirmPassword}
              isMatched={isPasswordMatched}
              handleChange={handleConfirmPasswordChange}
              handleReset={() => setConfirmPassword('')}
              handleVisible={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
            />
            <SubmitButton
              type="회원가입"
              isValidEmail={isValidEmail}
              isValidPassword={isValidPassword}
              isMatched={isPasswordMatched}
            />
          </>
        )}
        <p className="text-[0.9rem]">
          계정이 이미 있으신가요? &nbsp;
          <span className="underline font-bold text-main-blue">로그인</span>
        </p>
        <div className="w-full flex flex-col justify-start items-center gap-[10px]">
          <div className="relative max-w-[380px] w-[80%] md:w-[50%] flex-center mb-3">
            <div className="flex-1 border-t border-[#A6A6A6]" />
            <span className="text-[#A6A6A6] text-[0.9rem] font-normal px-3">간편 회원가입</span>
            <div className="flex-1 border-t border-[#A6A6A6]" />
          </div>
          <OAuth />
        </div>
      </form>
    </div>
  )
}
