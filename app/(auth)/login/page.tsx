'use client'

import { useState, useCallback } from 'react'
import Button from '@/components/Button'
import OAuth from '@/components/Page/Auth/OAuth'
import { validateEmail, validatePassword } from '@/helper/validate'

import EmailInput from '@/components/Page/Auth/EmailInput'
import PasswordInput from '@/components/Page/Auth/PasswordInput'
import KeepSignedInCheckbox from '@/components/Page/Auth/KeepSignedInCheckbox'
import SubmitButton from '@/components/Page/Auth/SubmitButton'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
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
    setIsVisiblePassword(isValid)
  }, [])

  return (
    <form className="w-[100vw] flex-center flex-col">
      <EmailInput email={email} handleChange={handleEmailChange} handleReset={() => setEmail('')} />
      <PasswordInput
        password={password}
        isVisible={isVisiblePassword}
        handleChange={handlePasswordChange}
        handleReset={() => setPassword('')}
        handleVisible={() => setIsVisiblePassword(!isVisiblePassword)}
      />
      <KeepSignedInCheckbox isChecked={isChecked} handleClick={() => setIsChecked(!isChecked)} />
      <OAuth />
      <SubmitButton type="로그인" isValidEmail={isValidEmail} isValidPassword={isVisiblePassword} />
      {/* 아이디, 비밀번호 찾기 */}
    </form>
  )
}
