import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

export default function Arrow() {
  return (
    <div className="w-full absolute flex-center">
      <Button
        type="button"
        ariaLabel="인기 게시물 이전 버튼"
        className="absolute left-[2%] md:left-[5%] lg:left-[15%] p-5"
      >
        <Icon name="BannerPrev" width={15} height={15} />
      </Button>
      <Button
        type="button"
        ariaLabel="인기 게시물 다음 버튼"
        className="absolute right-[2%] md:right-[5%] lg:right-[15%] p-5"
      >
        <Icon name="BannerNext" width={15} height={15} />
      </Button>
    </div>
  )
}
