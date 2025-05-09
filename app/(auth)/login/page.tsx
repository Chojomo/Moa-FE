'use client'

import { useState, useCallback, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { validateEmail, validatePassword } from '@/helper/validate'
import { login } from '@/lib/api/auth'
import { useAuthStore } from '@/store/useAuth'
import { EmailInput, PasswordInput } from '@/components/Page/Auth/Input'

import OAuth from '@/components/Page/Auth/OAuth'
import SubmitButton from '@/components/Page/Auth/Button/SubmitButton'
import KeepSignedInCheckbox from '@/components/Page/Auth/Checkbox'

export default function Login() {
  const router = useRouter()
  const { login: setLogin } = useAuthStore()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

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

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      setLogin()
      router.back()
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('회원가입 실패:', error.message)
      } else {
        console.error('회원가입 실패:', error)
      }
    },
  })

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <form className="animate-fadeIn w-[100vw] flex-center flex-col" onSubmit={handleLogin}>
      <EmailInput email={email} handleChange={handleEmailChange} handleReset={() => setEmail('')} />
      <PasswordInput
        id="password"
        password={password}
        isVisible={isVisiblePassword}
        handleChange={handlePasswordChange}
        handleReset={() => setPassword('')}
        handleVisible={() => setIsVisiblePassword(!isVisiblePassword)}
      />
      <KeepSignedInCheckbox isChecked={isChecked} handleClick={() => setIsChecked(!isChecked)} />
      <OAuth />
      <SubmitButton type="로그인" isValidEmail={isValidEmail} isValidPassword={isValidPassword} />
      {/* <Button
        type="button"
        ariaLabel="비밀번호 찾기 버튼"
        className="text-body-text text-[0.9rem] mt-5 hover:underline"
        onClick={() => setIsModalOpen(true)}
      >
        비밀번호 찾기
      </Button> */}
    </form>
  )
}
