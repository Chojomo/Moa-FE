'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { isTouchDevice } from '@/utils'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import EditModal from './EditModal'

type FooterProps = {
  isLogin: boolean
  diaryId: string
  likeCount: number
  setLikeCount: Dispatch<SetStateAction<number>>
  isLike: boolean
  setIsLike: Dispatch<SetStateAction<boolean>>
  handleLikeClick: () => void
  handleCommentClick: () => void
  isDiaryOwner: boolean
}

type FooterButton = {
  name: string
  label: string
  addClass: string
  width: number
  height: number
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void | (() => void)
  children?: React.ReactNode
}

type Buttons = FooterButton[]

export default function Footer({
  isLogin,
  diaryId,
  likeCount,
  setLikeCount,
  isLike,
  setIsLike,
  handleLikeClick,
  handleCommentClick,
  isDiaryOwner,
}: FooterProps) {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const buttons: Buttons = [
    {
      name: isLike ? 'Heart' : 'Unlike',
      label: '좋아요 버튼',
      addClass: 'flex items-center gap-3 text-[#A6A6A6] hover:text-red-500 transition-colors',
      width: 22,
      height: 22,
      onClick: handleLikeClick,
      children: <span className="text-[#A6A6A6]">{likeCount}</span>,
    },
    {
      name: 'Comment',
      label: '댓글 버튼',
      addClass: 'flex items-center gap-3 text-[#A6A6A6] hover:text-[#43D8AA] transition-colors',
      width: 21,
      height: 21,
      onClick: handleCommentClick,
      children: <span className="text-[#A6A6A6]">32</span>,
    },
    {
      name: 'Share',
      label: '공유 버튼',
      addClass: 'text-[#A6A6A6] hover:text-main-blue transition-colors',
      width: 18,
      height: 18,
      onClick: async () => {
        const url = window.location.href
        await navigator.clipboard.writeText(url)
        toast.success('링크가 복사되었습니다.')

        console.log(isTouchDevice())
      },
    },
  ]

  if (isLogin) {
    buttons.push({
      name: 'Bookmark',
      label: '북마크 버튼',
      addClass: 'text-[#A6A6A6] hover:text-[#43D8AA] transition-colors',
      width: 20,
      height: 20,
      onClick: () => {
        setIsBookmarked((prev) => !prev)
      },
    })

    if (isDiaryOwner) {
      buttons.push({
        name: 'Kebab',
        label: '공유 버튼',
        addClass: 'px-2 py-2 text-[#A6A6A6] hover:text-[#FFFFFF] transition-colors',
        width: 4,
        height: 16,
        onClick: () => setModalIsOpen(true),
      })
    }
  }

  return (
    <footer className="fixed left-0 bottom-0 w-full h-[60px] bg-soft-bg backdrop-blur-sm flex items-center justify-between px-[20px]">
      <Button
        type="button"
        ariaLabel="뒤로가기 버튼"
        className="px-3 py-1"
        onClick={() => router.back()}
      >
        <Icon name="Back" width={20} height={20} />
      </Button>
      <div className="flex items-center gap-[30px]">
        {buttons.map((button) => (
          <Button
            key={button.name}
            type="button"
            ariaLabel={button.label}
            className={`${button.addClass ? button.addClass : ''}`}
            onClick={button.onClick}
          >
            <Icon name={button.name} width={button.width} height={button.height} />
            {button.children ? button.children : null}
          </Button>
        ))}
        <EditModal
          isOpen={modalIsOpen}
          handleClose={() => setModalIsOpen(false)}
          isLogin={isLogin}
          isDiaryOwner={isDiaryOwner}
          diaryId={diaryId}
        />
      </div>
    </footer>
  )
}
