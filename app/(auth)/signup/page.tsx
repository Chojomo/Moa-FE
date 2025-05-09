'use client'

import { useState, useCallback, FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppStore } from '@/store/useApp'
import { useRouter } from 'next/navigation'

import { signup, getCheckEmail } from '@/lib/api/auth'
import { validateEmail, validateChars, validateLength } from '@/helper/validate'

import { Icon } from '@/components/Icon'

import Button from '@/components/Button'
import OAuth from '@/components/Page/Auth/OAuth'
import SubmitButton from '@/components/Page/Auth/Button/SubmitButton'
import { EmailInput, PasswordInput, ConfirmPasswordInput } from '@/components/Page/Auth/Input'
import { isTouchDevice } from '@/utils'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Signup() {
  const router = useRouter()
  const { loginModalOpen } = useAppStore()
  const [step, setStep] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isValidChars, setIsValidChars] = useState<boolean>(false)
  const [isValidLength, setIsValidLength] = useState<boolean>(false)
  const [isPasswordMatched, setIsPasswordMatched] = useState(false)

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false)

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValidEmail(isValid)
  }, [])

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const hasValidChars = validateChars(value)
      const hasValidLength = validateLength(value)

      setPassword(value)
      setIsValidChars(hasValidChars)
      setIsValidLength(hasValidLength)
      setIsValidPassword(hasValidChars && hasValidLength)
      setIsPasswordMatched(value === confirmPassword)
    },
    [confirmPassword]
  )

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    console.log(value)
    setConfirmPassword(value)
    setIsPasswordMatched(value === password)
  }

  const mutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log('회원가입 성공:', data)
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
    router.push('/')
    loginModalOpen()
  }

  const handleResetPassword = () => {
    setPassword('')
    setIsValidChars(false)
    setIsValidLength(false)
    setIsValidPassword(false)
    setIsPasswordMatched(false)
  }

  const handleConfirmEmail = async () => {
    const res = await getCheckEmail(email)

    // 이메일 중복하는 경우
    if (!res.ok) {
      toast.error(res.message)
    } else {
      setStep(1)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[30px] overflow-y-auto pt-[70px] md:pt-[100px] pb-[50px]">
      <ToastContainer
        position={`${isTouchDevice() ? 'top-right' : 'top-right'}`}
        autoClose={3000}
        hideProgressBar={false}
        style={{
          top: 74,
        }}
      />
      <h1 className="text-main-blue text-[1.5rem] font-semibold">회원가입</h1>
      <form
        className="animate-fadeIn w-[100vw] flex-center flex-col gap-[40px]"
        onSubmit={handleSignup}
      >
        <div className="text-[1.2rem] text-center">
          <p className="pb-2">{step + 1} / 2</p>
          <p className="text-[1rem] font-bold whitespace-pre-wrap">
            {step === 0 ? (
              <>
                유효한 이메일 주소를 입력해 주세요. <br /> 비밀번호 찾기 시, 해당 이메일 주소로
                <br className="inline sm:hidden" /> 임시 비밀번호가 발급됩니다. <br /> 사용 중인
                이메일 주소를 입력해 주세요.
              </>
            ) : (
              '비밀번호를 설정해 주세요.'
            )}
          </p>
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
              className={`mt-[20px] relative rounded max-w-[380px] w-[80%] md:w-[50%] flex-center text-[1.1rem] text-[#fff] ${!isValidEmail ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue'} py-[10px]`}
              onClick={handleConfirmEmail}
            >
              비밀번호 설정하기
            </Button>
            <p className="text-[0.8rem] text-body-text text-center">
              활성화되지 않거나 사용하지 않는 이메일을 입력 시, <br />
              비밀번호를 복구할 수 없습니다.
            </p>
          </div>
        )}
        {step === 1 && (
          <>
            <div className="w-full flex flex-center flex-col gap-2">
              <PasswordInput
                id="password"
                password={password}
                isVisible={isVisiblePassword}
                handleChange={handlePasswordChange}
                handleReset={handleResetPassword}
                handleVisible={() => setIsVisiblePassword(!isVisiblePassword)}
              />
              <span
                className={`relative left-3 max-w-[380px] w-[80%] md:w-[50%] flex items-center gap-2 text-[0.8rem] ${isValidChars ? 'text-green-500' : 'text-body-text'}`}
              >
                <Icon name="Check2" width={24} height={24} />
                영문 대소문자, 숫자, 특수문자 포함
              </span>
              <span
                className={`relative left-3 max-w-[380px] w-[80%] md:w-[50%] flex items-center gap-2 text-[0.8rem] ${isValidLength ? 'text-green-500' : 'text-body-text'}`}
              >
                <Icon name="Check2" width={24} height={24} />
                8자 이상 20자 이하 입력 (공백 제외)
              </span>
            </div>
            <ConfirmPasswordInput
              confirmPassword={confirmPassword}
              isVisible={isVisibleConfirmPassword}
              isMatched={isPasswordMatched}
              handleChange={handleConfirmPasswordChange}
              handleReset={() => setConfirmPassword('')}
              handleVisible={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
              isSignup
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
          <Button
            type="button"
            ariaLabel="로그인으로 이동 버튼"
            className="underline font-bold text-main-blue"
            onClick={loginModalOpen}
          >
            로그인
          </Button>
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
