import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import Input from './Input'

type ConfirmPasswordInputProps = {
  confirmPassword: string
  isVisible: boolean
  isMatched: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleReset: () => void
  handleVisible: () => void
}

export default function ConfirmPasswordInput({
  confirmPassword,
  isVisible,
  isMatched,
  handleChange,
  handleReset,
  handleVisible,
}: ConfirmPasswordInputProps) {
  return (
    <>
      <Input
        id="confirm-password"
        type={isVisible ? 'text' : 'password'}
        placeholder="비밀번호를 입력해 주세요"
        value={confirmPassword}
        handleChange={handleChange}
      >
        <Button
          type="button"
          ariaLabel="Cancel email entry"
          onClick={handleReset}
          className={`absolute right-[50px] p-[5px] transition-opacity duration-300 ease-in-out ${confirmPassword ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Cancel" width={15} height={15} />
        </Button>
        <Button
          type="button"
          ariaLabel="Toggle password visibility"
          onClick={handleVisible}
          className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${confirmPassword ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name={isVisible ? 'EyeOn' : 'EyeOff'} width={23} height={23} />
        </Button>
      </Input>
      <span
        className={`relative bottom-[20px] right-[85px] flex items-center gap-2 text-[12px] font-bold text-[#D44444] ${!confirmPassword.length || isMatched ? 'opacity-0 hidden' : 'opacity-100 block'}`}
      >
        <Icon name="Cancel2" width={24} height={24} /> 비밀번호가 일치하지 않습니다.
      </span>
    </>
  )
}
