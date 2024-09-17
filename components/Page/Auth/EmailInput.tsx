import { validateEmail } from '@/helper/validate'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import Input from './Input'

type EmailInputProps = {
  email: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleReset: () => void
}

export default function EmailInput({ email, handleChange, handleReset }: EmailInputProps) {
  return (
    <>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        handleChange={handleChange}
      >
        <Button
          type="button"
          ariaLabel="Cancel email entry"
          onClick={handleReset}
          className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${email ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Cancel" width={15} height={15} />
        </Button>
      </Input>
      <p
        className={`relative bottom-[20px] right-[90px] text-[12px] font-bold text-main-blue ${!email.length || validateEmail(email) ? 'opacity-0' : 'opacity-100'}`}
      >
        유효하지 않은 이메일입니다.
      </p>
    </>
  )
}
