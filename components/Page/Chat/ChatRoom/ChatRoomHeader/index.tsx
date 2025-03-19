import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import { BASE_PROFILE } from '@/helper/constants'

export default function ChatRoomHeader() {
  const router = useRouter()

  return (
    <header className="sticky top-0 w-[100%] h-[64px] bg-background flex justify-between items-center pl-[5px] pr-[15px]">
      <div className="flex-center">
        <Button
          type="button"
          ariaLabel="나가기 버튼"
          className="flex-center gap-4 p-4 font-bold text-heading-text text-[18px]"
          onClick={() => router.back()}
        >
          <Icon name="SortOpen" width={12} height={18} />
        </Button>
        <div className="flex-center gap-[10px]">
          <Image
            src={BASE_PROFILE}
            alt="user profile"
            width={40}
            height={40}
            quality={75}
            loading="lazy"
            draggable="false"
            objectFit="cover"
            className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full"
          />
          <span className="text-[1rem] sm:text-[1.3rem] font-bold text-heading-text">
            망그러진두부
          </span>
        </div>
      </div>
      <Button
        type="button"
        ariaLabel="메뉴 버튼"
        className="flex-center p-2 font-bold text-heading-text text-[18px]"
      >
        <Icon name="Menu" width={18} height={18} />
      </Button>
    </header>
  )
}
