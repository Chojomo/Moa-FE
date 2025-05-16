import { Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type ArrowProps = {
  setStep: Dispatch<SetStateAction<number>>
}

export default function Arrow({ setStep }: ArrowProps) {
  const handlePrevClick = () => {
    setStep((prev) => (prev === 1 ? 4 : prev - 1))
  }
  const handleNextClick = () => {
    setStep((prev) => (prev === 4 ? 1 : prev + 1))
  }

  return (
    <div className="w-full absolute flex-center">
      <Button
        type="button"
        ariaLabel="인기 게시물 이전 버튼"
        className="absolute banner-arrow-left p-5 transform transition-transform duration-300 ease-in-out hover:scale-150 active:scale-150"
        onClick={handlePrevClick}
      >
        <Icon name="BannerPrev" width={15} height={15} />
      </Button>
      <Button
        type="button"
        ariaLabel="인기 게시물 다음 버튼"
        className="absolute banner-arrow-right p-5 transform transition-transform duration-300 ease-in-out hover:scale-150 active:scale-150"
        onClick={handleNextClick}
      >
        <Icon name="BannerNext" width={15} height={15} />
      </Button>
    </div>
  )
}
