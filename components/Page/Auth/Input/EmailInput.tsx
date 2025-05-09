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
      <Input id="email" type="email" placeholder="이메일" value={email} handleChange={handleChange}>
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
        className={`max-w-[380px] w-[80%] md:w-[50%] relative left-2 bottom-[5px] text-[0.8rem] font-bold text-main-blue ${!email.length || validateEmail(email) ? 'opacity-0 hidden' : 'opacity-100 block'} mt-2`}
      >
        유효하지 않은 이메일 형식입니다.
      </p>
    </>
  )
}
