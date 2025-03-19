import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Header() {
  const router = useRouter()

  return (
    <header className="sticky top-0 w-full h-[64px] bg-background flex justify-between items-center pl-[5px] pr-[15px]">
      <div className="flex-center">
        <Button
          type="button"
          ariaLabel="나가기 버튼"
          className="flex-center gap-4 p-4 font-bold text-heading-text text-[18px]"
          onClick={() => router.back()}
        >
          <Icon name="SortOpen" width={12} height={18} />
        </Button>
        <span className="text-[1.3rem] font-bold text-heading-text">채팅</span>
      </div>
      <div className="flex-center gap-[10px]">
        <Button
          type="button"
          ariaLabel="검색 버튼"
          className="flex-center p-2 font-bold text-heading-text text-[18px]"
        >
          <Icon name="Search" width={18} height={18} />
        </Button>
        <Button
          type="button"
          ariaLabel="메뉴 버튼"
          className="flex-center p-2 font-bold text-heading-text text-[18px]"
        >
          <Icon name="Menu" width={18} height={18} />
        </Button>
      </div>
    </header>
  )
}
