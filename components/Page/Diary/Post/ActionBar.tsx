import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type ActionBarProps = {
  handleSave: () => void
}

export default function ActionBar({ handleSave }: ActionBarProps) {
  const router = useRouter()

  return (
    <div className="h-[10%] flex items-center justify-between px-[20px]">
      <Button
        type="button"
        ariaLabel="나가기 버튼"
        className="flex-center gap-4 p-4 font-bold text-heading-text text-[18px]"
        onClick={() => router.back()}
      >
        <Icon name="SortOpen" width={8} height={14} />
        나가기
      </Button>
      <div className="mr-4">
        <Button
          type="button"
          ariaLabel="임시저장 버튼"
          className="text-main-blue text-[16px] font-bold p-3 tracking-wider mr-5"
          onClick={handleSave}
        >
          임시저장
        </Button>
        <Button
          type="submit"
          ariaLabel="게시하기 버튼"
          className="text-[#fff] font-semibold text-[15px] px-[20px] bg-main-blue rounded-full p-2"
        >
          작성 완료
        </Button>
      </div>
    </div>
  )
}
