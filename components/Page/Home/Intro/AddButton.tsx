import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function AddButton() {
  return (
    <div className="animate-fade flex-center flex-col gap-[40px]">
      <Button
        type="button"
        ariaLabel="즐겨찾기 추가 버튼"
        className="mt-[10px] flex-center w-[60px] h-[60px] border border-border rounded-full"
      >
        <Icon name="Add" width={24} height={23} />
      </Button>
      <p className="text-[16px] md:text-[18px] font-bold">추가하기</p>
    </div>
  )
}
