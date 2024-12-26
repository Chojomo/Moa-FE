import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type VisibilityButtonProps = {
  password: string
  isVisible: boolean
  handleClick: () => void
  className?: string
}

export default function VisibilityButton({
  password,
  isVisible,
  handleClick,
  className,
}: VisibilityButtonProps) {
  return (
    <Button
      type="button"
      ariaLabel="Toggle password visibility"
      onClick={handleClick}
      className={`absolute right-[15px] p-[5px] transition-opacity duration-300 ease-in-out ${className || ''} ${password ? 'opacity-100' : 'opacity-0'}`}
    >
      <Icon name={isVisible ? 'EyeOn' : 'EyeOff'} width={20} height={20} />
    </Button>
  )
}
