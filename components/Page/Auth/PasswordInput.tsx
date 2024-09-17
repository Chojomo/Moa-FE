import { validatePassword } from '@/helper/validate'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import Input from './Input'

type PasswordInputProps = {
  password: string
  isVisible: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleReset: () => void
  handleVisible: () => void
}

export default function PasswordInput({
  password,
  isVisible,
  handleChange,
  handleReset,
  handleVisible,
}: PasswordInputProps) {
  return (
    <>
      <Input
        label="비밀번호"
        type={isVisible ? 'text' : 'password'}
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        handleChange={handleChange}
      >
        <Button
          type="button"
          ariaLabel="Cancel email entry"
          onClick={handleReset}
          className={`absolute right-[50px] p-[5px] transition-opacity duration-300 ease-in-out ${password ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Cancel" width={15} height={15} />
        </Button>
        <Button
          type="button"
          ariaLabel="Toggle password visibility"
          onClick={handleVisible}
          className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${password ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name={isVisible ? 'EyeOn' : 'EyeOff'} width={23} height={23} />
        </Button>
      </Input>
      <p
        className={`relative bottom-[20px] left-[5px] text-[12px] font-bold text-main-blue ${!password.length || validatePassword(password) ? 'opacity-0' : 'opacity-100'}`}
      >
        영어 대소문자, 숫자, 특수문자를 포함한 8글자 이상을 입력해 주세요.
      </p>
    </>
  )
}
