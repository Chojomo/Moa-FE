import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type ResetButtonProps = {
  password: string
  handleClick: () => void
  className?: string
}

export default function ResetButton({ password, handleClick, className }: ResetButtonProps) {
  return (
    <Button
      type="button"
      ariaLabel="Cancel email entry"
      onClick={handleClick}
      //   className={`absolute right-[50px] p-[5px] transition-opacity duration-300 ease-in-out ${password ? 'opacity-100' : 'opacity-0'}`}
      className={`p-[5px] transition-opacity duration-300 ease-in-out ${className || ''} ${password ? 'opacity-100' : 'opacity-0'}`}
    >
      <Icon name="Cancel" width={15} height={15} />
    </Button>
  )
}
