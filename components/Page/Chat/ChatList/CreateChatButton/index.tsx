import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function CreateChatButton() {
  return (
    <Button
      type="button"
      ariaLabel="나가기 버튼"
      className="flex-center flex-col gap-[10px] text-heading-text"
    >
      <Icon name="CreateChat" width={18} height={18} />
      <p className="text-heading-text text-[0.9rem]">새로운 대화 시작하기</p>
    </Button>
  )
}
