import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type NavButtonProps = {
  iconName: string
  iconWidth: number
  iconHeight: number
  onClick?: () => void
}

function NavButton({ iconName, iconWidth, iconHeight, onClick }: NavButtonProps) {
  return (
    <li>
      <Button type="button" ariaLabel={`${iconName} button`} className="nav-li" onClick={onClick}>
        <Icon name={iconName} width={iconWidth} height={iconHeight} />
      </Button>
    </li>
  )
}

export default NavButton
