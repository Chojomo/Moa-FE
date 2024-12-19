import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type KeepSignedInCheckboxProps = {
  isChecked: boolean
  handleClick: () => void
}

export default function KeepSignedInCheckbox({
  isChecked,
  handleClick,
}: KeepSignedInCheckboxProps) {
  return (
    <div className="flex-center gap-[20px] mt-[10px] mb-[40px]">
      <Button type="button" ariaLabel="check button" onClick={handleClick}>
        <Icon name="Check" width={25} height={25} fill={isChecked ? '#2C72DC' : '#A6A6A6'} />
      </Button>
      <span className="text-heading-text text-[14px]">로그인 상태 유지하기</span>
    </div>
  )
}
