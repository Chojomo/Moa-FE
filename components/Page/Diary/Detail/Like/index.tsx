'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import usePostLike from '@/hooks/like/usePostLike'
import LikesModal from './LikesModal'

export default function Like({ diaryId }: { diaryId: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { mutateAsync: postLike } = usePostLike()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      await postLike({
        diaryId,
      })
    } catch (error) {
      console.error('게시물 등록 중 오류:', error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 my-[50px]">
      <Button type="button" ariaLabel="좋아요 버튼" className="px-3 py-2" onClick={handleClick}>
        <Icon
          name="Unlike"
          width={20}
          height={20}
          className="text-[#A6A6A6] hover:text-red-500 transition-colors"
        />
      </Button>
      {/* <Icon name="Heart" width={20} height={20} /> */}
      <Button
        type="button"
        ariaLabel="게시물 좋아요 한 유저 리스트"
        className="text-body-text text-[0.8rem]"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        이 포스트를 좋아하는 사람들 &#62;
      </Button>
      <LikesModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </div>
  )
}
