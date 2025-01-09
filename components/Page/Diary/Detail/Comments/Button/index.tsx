import Button from '@/components/Button'

type CommentButtonProps = {
  type: 'edit' | 'cancel'
  text: string
  handleClick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>)
    | (() => void)
}

export default function CommentButton({ type, text, handleClick }: CommentButtonProps) {
  return (
    <Button
      type="button"
      ariaLabel={`${type} 버튼`}
      className={`${type === 'edit' ? 'bg-soft-bg hover:bg-[#2D2D2D] w-[70px]' : 'bg-main-blue hover:bg-[#1666DE] w-[60px]'} rounded-md text-[0.7rem] text-white font-semibold h-[30px] self-end shadow-button hover:bg-[#2D2D2D]`}
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}
