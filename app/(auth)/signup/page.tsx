'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateEmail, validatePassword } from '@/helper/validate'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/api/auth'

import EmailInput from '@/components/Page/Auth/EmailInput'
import PasswordInput from '@/components/Page/Auth/PasswordInput'
import ConfirmPasswordInput from '@/components/Page/Auth/ConfirmPasswordInput'
import SubmitButton from '@/components/Page/Auth/SubmitButton'
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
    <form className="w-[100vw] flex-center flex-col" onSubmit={handleSignup}>
      <EmailInput email={email} handleChange={handleEmailChange} handleReset={() => setEmail('')} />
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
      {/* 아이디, 비밀번호 찾기 */}
    </form>
  )
}
