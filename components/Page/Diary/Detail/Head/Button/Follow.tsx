'use client'

import Button from '@/components/Button'

export default function FollowButton() {
  const handleButtonClick = () => {
    console.log('클릭')
  }
  return (
    <Button
      type="button"
      ariaLabel="follow button"
      className="bg-soft-bg px-[13px] md:px-[15px] py-[7px] rounded-md text-[10px] md:text-[13px] text-white font-semibold mr-3 shadow-button hover:bg-[#2D2D2D]"
      onClick={handleButtonClick}
    >
      팔로우
    </Button>
  )
}
