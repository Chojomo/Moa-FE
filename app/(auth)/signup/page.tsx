'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateEmail, validatePassword } from '@/helper/validate'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/api/auth'

import { EmailInput, PasswordInput, ConfirmPasswordInput } from '@/components/Page/Auth/Input'
import SubmitButton from '@/components/Page/Auth/Button/SubmitButton'
import OAuth from '@/components/Page/Auth/OAuth'

export default function Signup() {
  const router = useRouter()
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

  return (
    <div className="w-full h-full pt-[30%] md:pt-[20%] flex flex-col justify-start items-center gap-[40px]">
      <h1 className="text-main-blue text-[1.5rem] font-semibold">회원가입</h1>
      <form className="animate-fadeIn w-[100vw] flex-center flex-col" onSubmit={handleSignup}>
        <EmailInput
          email={email}
          handleChange={handleEmailChange}
          handleReset={() => setEmail('')}
        />
        <PasswordInput
          password={password}
          isVisible={isVisiblePassword}
          handleChange={handlePasswordChange}
          handleReset={() => setPassword('')}
          handleVisible={() => setIsVisiblePassword(!isVisiblePassword)}
        />
        <ConfirmPasswordInput
          confirmPassword={confirmPassword}
          isVisible={isVisibleConfirmPassword}
          isMatched={isPasswordMatched}
          handleChange={handleConfirmPasswordChange}
          handleReset={() => setConfirmPassword('')}
          handleVisible={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
        />
        <OAuth />
        <SubmitButton
          type="회원가입"
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          isMatched={isPasswordMatched}
        />
      </form>
    </div>
  )
}
