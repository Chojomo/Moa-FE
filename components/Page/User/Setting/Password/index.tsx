import { useCallback, useState, FormEvent } from 'react'
import Button from '@/components/Button'
import { PasswordInput, ConfirmPasswordInput } from '@/components/Page/Auth/Input'
import { validateChars, validateLength } from '@/helper/validate'
import { Icon } from '@/components/Icon'

import { changePassword } from '@/lib/api/auth'

export default function Password() {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false)

  const [isValidChars, setIsValidChars] = useState<boolean>(false)
  const [isValidLength, setIsValidLength] = useState<boolean>(false)
  const [isValidNewPassword, setIsValidNewPassword] = useState<boolean>(false)

  const [isPasswordMatched, setIsPasswordMatched] = useState(false)

  const handleCancleClick = () => {
    setIsEdit(false)
    setConfirmPassword('')
    handleResetPassword()
  }
  const handleSaveClick = () => {
    setIsEdit(true)
  }

  // 7Q5AN710

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setCurrentPassword(value)
  }

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const hasValidChars = validateChars(value)
      const hasValidLength = validateLength(value)

      setNewPassword(value)
      setIsValidChars(hasValidChars)
      setIsValidLength(hasValidLength)
      setIsValidNewPassword(hasValidChars && hasValidLength)
      setIsPasswordMatched(value === confirmPassword)
    },
    [confirmPassword]
  )

  const handleResetCurrentPassword = () => {
    setCurrentPassword('')
  }

  const handleResetPassword = () => {
    setNewPassword('')
    setIsValidChars(false)
    setIsValidLength(false)
    setIsValidNewPassword(false)
    setIsPasswordMatched(false)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setConfirmPassword(value)
    setIsPasswordMatched(value === newPassword)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('전송함')
    e.preventDefault()

    if (!newPassword || !currentPassword) {
      // toast.error('유효한 이메일이 아닙니다.')
      return undefined
    }

    try {
      await changePassword(currentPassword, newPassword, confirmPassword)
      // setIsVisible((prev) => !prev)
    } catch (error) {
      console.error(error)
    }
    return undefined
  }

  return (
    <div className="w-full pt-[10px] pb-[30px] border-b flex flex-col justify-center gap-8">
      <div className="flex gap-5">
        <p className="text-[1.5rem] text-heading-text font-semibold">비밀번호 변경</p>
        <div className="flex-center gap-5 text-[0.8rem]">
          {isEdit ? (
            <form className="flex-center gap-5" onSubmit={handleSubmit}>
              <Button
                type="button"
                ariaLabel="닉네임 변경 취소 버튼"
                className="text-white bg-[#d84040] dark:bg-[#bc1f1f] hover:bg-[#cb3b3b] dark:hover:bg-[#cd2525] rounded-md p-2"
                onClick={handleCancleClick}
              >
                취소
              </Button>
              <Button
                type="submit"
                ariaLabel="닉네임 변경 확인 버튼"
                className={`rounded-md p-2 ${newPassword === currentPassword || !isValidNewPassword || !isPasswordMatched ? 'bg-[#d5d5d5] dark:bg-[#333333] cursor-not-allowed' : 'bg-main-blue'}`}
                onClick={handleSaveClick}
                disabled={
                  newPassword === currentPassword && !isValidNewPassword && isPasswordMatched
                }
              >
                변경
              </Button>
            </form>
          ) : (
            <Button
              type="button"
              ariaLabel="닉네임 변경 확인 버튼"
              className="bg-[#d5d5d5] dark:bg-[#333333] hover:bg-[#d0d0d0] dark:hover:bg-[#2d2d2d] rounded-md p-2"
              onClick={() => setIsEdit(true)}
            >
              변경
            </Button>
          )}
        </div>
      </div>
      {isEdit && (
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4 pb-[50px]">
              <p className="text-body-text font-semibold">현재 비밀번호 입력</p>
              <PasswordInput
                id="currentPassword"
                password={currentPassword}
                isVisible={isVisibleCurrentPassword}
                placeholder="현재 비밀번호를 입력해 주세요."
                handleChange={handleChange}
                handleReset={handleResetCurrentPassword}
                handleVisible={() => setIsVisibleCurrentPassword(!isVisibleCurrentPassword)}
              />
            </div>
            <PasswordInput
              id="password"
              password={newPassword}
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
          <div className="flex flex-col gap-2">
            <ConfirmPasswordInput
              confirmPassword={confirmPassword}
              isVisible={isVisibleConfirmPassword}
              isMatched={isPasswordMatched}
              handleChange={handleConfirmPasswordChange}
              handleReset={() => setConfirmPassword('')}
              handleVisible={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
