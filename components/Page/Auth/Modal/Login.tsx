'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Modal from 'react-modal'
import { Icon } from '@/components/Icon'
import { validateEmail, validatePassword } from '@/helper/validate'
import Button from '@/components/Button'
import { ResetButton, VisibilityButton } from '../Button'
import OAuth from '../OAuth'

type LoginModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function LoginModal({ isOpen, handleClose }: LoginModalProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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

  const handleReset = () => {
    setEmail('')
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
        onSubmit={() => console.log('로그인 요청')}
      >
        <div className="flex items-center gap-[10px] mb-8">
          <Icon name="Logo" width={35} height={35} className="mb-[10px]" />
          <p className="text-[18px] text- font-bold">Moa</p>
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <div className="relative w-full">
            <input
              id="login"
              type="login"
              aria-label="이메일"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              className="input-reset w-full rounded border border-[#7f7f7f] dark:border-[#c7c7c7] px-[15px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem]"
            />
          </div>
          <div className="relative w-full h-[60px]">
            <input
              id="password"
              type={isVisiblePassword ? 'text' : 'password'}
              aria-label="비밀번호"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              className="input-reset w-full rounded border border-[#7f7f7f] dark:border-[#c7c7c7] pl-[15px] pr-[68px] py-[18px] flex-1 placeholder:font-light placeholder:text-[0.8rem]"
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
            className="bg-main-blue py-4 w-full max-h-[60px] rounded text-white"
          >
            로그인
          </Button>
          <Link
            href="/signin/find/password"
            className="relative bottom-2 font-normal text-[0.8rem] text-[#A6A6A6] underline"
          >
            비밀번호 찾기
          </Link>
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
