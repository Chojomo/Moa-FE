'use client'

import Button from '@/components/Button'
import usePostFollow from '@/hooks/follow/useFollow'

type FollowButtonProps = {
  diaryAuthorId: string
}

export default function FollowButton({ diaryAuthorId }: FollowButtonProps) {
  const { mutateAsync: postFollow } = usePostFollow()

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      await postFollow(diaryAuthorId)
    } catch (error) {
      console.error('팔로우 중 오류:', error)
    }
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
