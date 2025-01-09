'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateEmail } from '@/helper/validate'
import Button from '@/components/Button'
import useFindPassword from '@/hooks/auth/useFindPassword'

import { isTouchDevice } from '@/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EmailInput } from '@/components/Page/Auth/Input'

export default function FindPassword() {
  const [email, setEmail] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const { mutateAsync: findPassword } = useFindPassword()

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const isValid = validateEmail(value)

    setEmail(value)
    setIsValidEmail(isValid)
  }, [])

  // 임시로 Post 요청 연결
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('전송함')
    e.preventDefault()

    if (!email || !isValidEmail) {
      toast.error('유효한 이메일이 아닙니다.')
      return
    }

    try {
      await findPassword(email)
      setIsVisible((prev) => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full h-full flex-center px-[5%]">
      <ToastContainer
        position={`${isTouchDevice() ? 'top-right' : 'top-right'}`}
        autoClose={3000}
        hideProgressBar={false}
        style={{
          top: 74,
        }}
      />
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
        <h1 className="text-main-blue font-semibold text-[1.3rem] mb-10">비밀번호 찾기</h1>
        <p className="text-[1.1rem] text-body-text text-center mb-[20px]">
          가입한 이메일을 입력해 주세요. <br />
          이메일을 통해 비밀번호 변경 링크가 전송됩니다.
        </p>
        <div className="w-full flex flex-center flex-col gap-2">
          <EmailInput
            email={email}
            handleChange={handleEmailChange}
            handleReset={() => setEmail('')}
          />
        </div>
        <Button
          type="submit"
          ariaLabel="임시 비밀번호 받기 버튼"
          className="bg-main-blue max-w-[380px] w-[80%] md:w-[50%] py-[20px] rounded font-semibold mb-[10px] text-[1.1rem] mt-[40px]"
        >
          임시 비밀번호 발송
        </Button>
        {isVisible && (
          <p className="text-[0.8rem] text-body-text text-center">
            임시 비밀번호가 전송 되었습니다. <br />
            다시 로그인 해 주세요.
          </p>
        )}
      </form>
    </div>
  )
}
