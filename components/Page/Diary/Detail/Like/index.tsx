'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { Icon } from '@/components/Icon'

import { getLikes } from '@/lib/api/like'
import Button from '@/components/Button'
import usePostLike from '@/hooks/like/usePostLike'
import LikesModal from './LikesModal'

type LikeProps = {
  diaryId: string
  isLike: boolean
  setIsLike: Dispatch<SetStateAction<boolean>>
  isLogin: boolean
  handleToast: (message: string) => void
}

export default function Like({ diaryId, isLike, setIsLike, isLogin, handleToast }: LikeProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [likedUsers, setLikedUsers] = useState<[]>([])
  const { mutateAsync: postLike } = usePostLike()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!isLogin) {
      handleToast('로그인 후 이용하실 수 있습니다.')
      return
    }

    try {
      await postLike({
        diaryId,
      })
      setIsLike((prev) => !prev)
    } catch (error) {
      console.error('게시물 등록 중 오류:', error)
    }
  }

  const handleLikesClick = async () => {
    const { data } = await getLikes({ diaryId })
    setLikedUsers(data.likedUsers)
    setIsModalOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 my-[50px]">
      <Button type="button" ariaLabel="좋아요 버튼" className="px-3 py-2" onClick={handleClick}>
        {isLike ? (
          <Icon name="Heart" width={20} height={20} />
        ) : (
          <Icon
            name="Unlike"
            width={20}
            height={20}
            className="text-[#A6A6A6] hover:text-red-500 transition-colors"
          />
        )}
      </Button>

      <Button
        type="button"
        ariaLabel="게시물 좋아요 한 유저 리스트"
        className="text-body-text text-[0.8rem]"
        onClick={handleLikesClick}
      >
        이 포스트를 좋아하는 사람들 &#62;
      </Button>
      <LikesModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        likedUsers={likedUsers}
      />
    </div>
  )
}
