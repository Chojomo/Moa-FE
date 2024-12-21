'use client'

// import { useState, useCallback } from 'react'
import Modal from 'react-modal'
// import { validateEmail } from '@/helper/validate'
// import Button from '@/components/Button'

type LoginModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function LoginModal({ isOpen, handleClose }: LoginModalProps) {
  // const [email, setEmail] = useState<string>('')
  // const [isValidEmail, setIsValidEmail] = useState<boolean>(false)

  // const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target
  //   const isValid = validateEmail(value)

  //   setEmail(value)
  //   setIsValidEmail(isValid)
  // }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="absolute top-2/5 bg-[#434343] dark:bg-[#f5f5f5] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-col justify-center items-center animate-fadeFast font-semibold px-[30px] py-[40px]"
      overlayClassName="backdrop-blur-sm modal-overlay-transparent"
    >
      <p>로그인 모달달</p>
    </Modal>
  )
}
