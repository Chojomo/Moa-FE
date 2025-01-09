'use client'

import { useState, useCallback, FormEvent } from 'react'
import Link from 'next/link'
import Modal from 'react-modal'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuth'

import { login } from '@/lib/api/auth'
import { validateEmail, validatePassword } from '@/helper/validate'

import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import OAuth from '../OAuth'
import { ResetButton, VisibilityButton } from '../Button'

type LoginModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function LoginModal({ isOpen, handleClose }: LoginModalProps) {
  const router = useRouter()
  const { login: setLogin } = useAuthStore()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

  Modal.setAppElement('#__next')

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValidEmail(isValid)
    console.log(isValid)
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validatePassword(value)

    setPassword(value)
    setIsValidPassword(isValid)

    console.log(isValid)
  }, [])

  const handleReset = () => {
    setEmail('')
  }

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      const { href } = window.location

      if (/sign(in|up)/.test(href)) {
        router.push('/')
      }

      setLogin()
      setEmail('')
      setPassword('')
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('로그인 실패:', error.message)
      } else {
        console.error('로그인 실패:', error)
      }
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate()
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="absolute top-2/5 bg-[#434343] dark:bg-[#f5f5f5] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-col justify-center items-center animate-fadeFast font-semibold px-[30px] py-[40px]"
      overlayClassName="backdrop-blur-sm modal-overlay-transparent"
    >
      <Button
        type="button"
        ariaLabel="로그인 모달 닫기 버튼"
        className="absolute top-5 right-4"
        onClick={handleClose}
      >
        <Icon name="Cancel" width={20} height={20} />
      </Button>
      <form
        className="w-[98%] flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className="flex items-center gap-[10px] mb-8">
          <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
          <p className="text-[18px] text- font-bold">Moa</p>
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <div className="relative w-full">
            <input
              id="email"
              type="email"
              name="email"
              aria-label="이메일"
              placeholder="이메일"
              autoComplete="username"
              value={email}
              onChange={handleEmailChange}
              className="input-reset w-full autofull-text rounded border border-[#7f7f7f] dark:border-[#c7c7c7] px-[15px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem] autofill:text-black autofill:shadow-none"
            />
          </div>
          <div className="relative w-full h-[60px]">
            <input
              id="password"
              type={isVisiblePassword ? 'text' : 'password'}
              aria-label="비밀번호"
              placeholder="비밀번호"
              value={password}
              name="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              className="input-reset w-full autofull-text rounded border border-[#7f7f7f] dark:border-[#c7c7c7] pl-[15px] pr-[68px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem]"
            />
            <ResetButton
              password={password}
              handleClick={() => setPassword('')}
              className="absolute top-[18px] right-[40px] text-[#A6A6A6]"
            />
            <VisibilityButton
              password={password}
              isVisible={isVisiblePassword}
              handleClick={() => setIsVisiblePassword((prev) => !prev)}
              className="absolute top-[15px] right-[8px] text-[#A6A6A6]"
            />
          </div>
          <Button
            type="submit"
            ariaLabel="로그인 버튼"
            disabled={!isValidEmail && !isValidPassword}
            className={`text-[1.1rem] py-4 w-full max-h-[60px] rounded text-white ${!isValidEmail || !isValidPassword ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue'}`}
          >
            로그인
          </Button>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="font-normal text-[0.8rem] text-[#A6A6A6] underline"
              onClick={handleClose}
            >
              회원가입
            </Link>
            <div className="h-[12px] border-r border-[#A6A6A6]" />
            <Link
              href="/signin/find/password"
              className="font-normal text-[0.8rem] text-[#A6A6A6] underline"
              onClick={handleClose}
            >
              비밀번호 찾기
            </Link>
          </div>
          <div className="w-full flex-center mt-5 mb-3">
            <div className="flex-1 border-t border-[#A6A6A6]" />
            <span className="text-[#A6A6A6] text-[0.9rem] font-normal px-3">간편 로그인</span>
            <div className="flex-1 border-t border-[#A6A6A6]" />
          </div>
        </div>
        <OAuth />
      </form>
    </Modal>
  )
}
