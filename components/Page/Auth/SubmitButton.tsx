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
      className={`mt-[47px] px-[130px] py-[10px] rounded-full font-bolㅋd text-[18px] text-[#fff] ${!isValidEmail || !isValidPassword || !isMatched ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue'}`}
      disabled={!isValidEmail && !isValidPassword && isMatched}
    >
      {type}
    </Button>
  )
}
