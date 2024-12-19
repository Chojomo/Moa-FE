'use client'

import { useState, useCallback } from 'react'
import Modal from 'react-modal'
import { validateEmail } from '@/helper/validate'
import Button from '@/components/Button'

type EmailSentModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export function EmailSentModal({ isOpen, handleClose }: EmailSentModalProps) {
  const [email, setEmail] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValidEmail(isValid)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="absolute top-2/5 bg-[#434343] dark:bg-[#f5f5f5] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-col justify-center items-center animate-fadeFast font-semibold px-[30px] py-[40px]"
      overlayClassName="modal-overlay-transparent"
    >
      <p className="text-center mb-[30px] text-[0.9rem]">
        가입 시 등록한 <br /> 이메일을 입력해 주세요.
      </p>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력해 주세요"
        className="w-full border border-[#6f6f6f] dark:border-[#dbdbdb] rounded-md inline-block focus:outline-none px-[20px] py-[18px] flex-1 bg-transparent"
        value={email}
        onChange={handleEmailChange}
      />
      {email && !isValidEmail && (
        <p className="self-start text-[0.7rem] mt-1 ml-2 font-normal text-red-500">
          유효하지 않은 이메일입니다.
        </p>
      )}
      <Button
        type="button"
        ariaLabel="임시 비밀번호 전송 버튼"
        className={`justify-self-end px-4 py-2 rounded-full text-white font-semibold mt-10 text-[0.8rem] ${isValidEmail ? 'bg-main-blue' : 'bg-gray-400'}`}
        disabled={!isValidEmail}
      >
        임시 비밀번호 발송
      </Button>
    </Modal>
  )
}
