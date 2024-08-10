import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function OAuth() {
  return (
    <div className="flex-center gap-[50px] mt-[10px]">
      <Button type="button" ariaLabel="kakao auth button">
        <Icon name="Kakao" width={60} height={60} />
      </Button>
      <Button type="button" ariaLabel="naver auth button">
        <Icon name="Naver" width={60} height={60} />
      </Button>
      <Button type="button" ariaLabel="google auth button">
        <Icon name="Google" width={60} height={60} />
      </Button>
    </div>
  )
}
