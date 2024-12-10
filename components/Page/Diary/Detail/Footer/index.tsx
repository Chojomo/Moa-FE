'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import usePostLike from '@/hooks/like/usePostLike'
import { isTouchDevice } from '@/utils'

type FooterProps = {
  diaryId: string
  isLike: boolean
  setIsLike: Dispatch<SetStateAction<boolean>>
  handleToast: (message: string) => void
  handleClick: () => void
}

export default function Footer({
  diaryId,
  isLike,
  setIsLike,
  handleToast,
  handleClick,
}: FooterProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const { mutateAsync: postLike } = usePostLike()

  const buttons = [
    {
      name: isLike ? 'Heart' : 'Unlike',
      label: '좋아요 버튼',
      addClass: 'flex items-center gap-3 text-[#A6A6A6] hover:text-red-500 transition-colors',
      width: 22,
      heignt: 22,
      onCLick: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
          await postLike({
            diaryId,
          })
          setIsLike((prev) => !prev)
        } catch (error) {
          console.error('게시물 등록 중 오류:', error)
        }
      },
      children: <span className="text-[#A6A6A6]">32</span>,
    },
    {
      name: 'Comment',
      label: '댓글 버튼',
      addClass: 'flex items-center gap-3 text-[#A6A6A6] hover:text-[#43D8AA] transition-colors',
      width: 21,
      heignt: 21,
      onCLick: handleClick,
      children: <span className="text-[#A6A6A6]">32</span>,
    },
    {
      name: 'Bookmark',
      label: '북마크 버튼',
      addClass: 'text-[#A6A6A6] hover:text-[#43D8AA] transition-colors',
      width: 20,
      heignt: 20,
      onCLick: () => {
        setIsBookmarked((prev) => !prev)
      },
    },
    {
      name: 'Share',
      label: '공유 버튼',
      addClass: 'text-[#A6A6A6] hover:text-main-blue transition-colors',
      width: 18,
      heignt: 18,
      onCLick: async () => {
        const url = window.location.href
        await navigator.clipboard.writeText(url)
        handleToast('링크가 복사되었습니다.')

        console.log(isTouchDevice())
      },
    },
    {
      name: 'Kebab',
      label: '공유 버튼',
      addClass: 'px-2 py-2 text-[#A6A6A6] hover:text-[#FFFFFF] transition-colors',
      width: 4,
      heignt: 16,
      onCLick: () => {
        console.log('Kebab')
      },
    },
  ]

  return (
    <footer className="fixed left-0 bottom-0 w-full h-[60px] bg-soft-bg backdrop-blur-sm flex items-center justify-between px-[20px]">
      <Button type="button" ariaLabel="뒤로가기 버튼" className="px-3 py-1">
        <Icon name="Back" width={20} height={20} />
      </Button>
      <div className="relative flex items-center gap-[30px]">
        {buttons.map((button) => (
          <Button
            key={button.name}
            type="button"
            ariaLabel={button.label}
            className={`${button.addClass ? button.addClass : ''}`}
            onClick={button.onCLick}
          >
            <Icon name={button.name} width={button.width} height={button.heignt} />
            {button.children}
          </Button>
        ))}
      </div>
    </footer>
  )
}
