import Button from '@/components/Button'

type SubmitButtonProps = {
  type: '로그인' | '회원가입'
  isValidEmail: boolean
  isValidPassword: boolean
  isMatched?: boolean
}

export default function SubmitButton({
  type,
  isValidEmail,
  isValidPassword,
  isMatched = true,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      ariaLabel="submit button"
      className={`mt-[20px] relative rounded max-w-[380px] w-[80%] md:w-[50%] flex-center text-[1.1rem] text-[#fff] ${!isValidEmail || !isValidPassword || !isMatched ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue'} px-[130px] py-[10px]`}
      disabled={!isValidEmail && !isValidPassword && isMatched}
    >
      {type}
    </Button>
  )
}
