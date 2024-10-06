'use client'

import Modal from 'react-modal'
import { useEffect, useRef } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { postThumbnail } from '@/lib/api/diary'

type PublishModalProps = {
  isOpen: boolean
  handleClose: () => void
  isPublic: boolean
  setIsPublic: (value: boolean) => void
  thumbnail: string | null
  setThumbnail: (url: string | null) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function PublishModal({
  isOpen,
  handleClose,
  isPublic,
  setIsPublic,
  thumbnail,
  setThumbnail,
  handleSubmit,
}: PublishModalProps) {
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    Modal.setAppElement('#__next')
  }, [])

  const { mutate } = useMutation({
    mutationFn: postThumbnail,
    onSuccess: (data) => {
      const { thumbnailUrl } = data
      setThumbnail(thumbnailUrl)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('썸네일 업로드 실패:', error.message)
      } else {
        console.error('썸네일 업로드 실패:', error)
      }
    },
  })

  const handleInputClick = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current?.click()
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      mutate(file)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Pubilsh Diary"
      className="modal-content animate-fadeIn bg-modal-bg flex flex-col gap-10"
      overlayClassName="modal-overlay"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold text-heading-text">공개 설정</h3>
        <div className="flex-center gap-5">
          <Button
            type="button"
            ariaLabel="전체 공개 버튼"
            className={`flex-center bg-modal-button px-4 py-3 gap-3 rounded min-w-[130px] font-semibold ${isPublic ? 'border border-main-blue text-main-blue' : 'text-[#AFAFAF] border brder-border'}`}
            onClick={() => setIsPublic(true)}
          >
            <Icon name="Public" width={20} height={20} fill={!isPublic ? '#AFAFAF' : '#2C72DC'} />
            <p>전체 공개</p>
          </Button>
          <Button
            type="button"
            ariaLabel="비공개 버튼"
            className={`flex-center bg-modal-button px-4 py-3 gap-3 rounded min-w-[130px] font-semibold ${!isPublic ? 'border border-main-blue text-main-blue' : 'text-[#AFAFAF] border brder-border'}`}
            onClick={() => setIsPublic(false)}
          >
            <Icon name="Unpublic" width={22} height={22} fill={isPublic ? '#AFAFAF' : '#2C72DC'} />
            비공개
          </Button>
        </div>
      </div>
      <div>
        <div className="relative max-w-[300px] h-[200px] rounded-lg flex-center cursor-pointer bg-modal-input">
          <Button
            type="button"
            ariaLabel="썸네일 이미지 추가 버튼"
            className="w-full h-full flex-center"
            onClick={handleInputClick}
          >
            <Icon name="Image" width={40} height={40} />
          </Button>
          {thumbnail && (
            <Image
              src={thumbnail}
              alt="썸네일 미리보기"
              fill
              className="rounded-lg object-cover"
              sizes="300px"
            />
          )}
        </div>
        <div className="flex-center">
          <Button
            type="button"
            ariaLabel="썸네일 이미지 추가 버튼"
            className="p-3 font-semibold text-[13px] text-nonActive-text underline"
            onClick={handleInputClick}
          >
            {thumbnail ? '재업로드' : '썸네일 추가하기'}
          </Button>
          {thumbnail && (
            <Button
              type="button"
              ariaLabel="썸네일 이미지 추가 버튼"
              className="p-3 font-semibold text-[13px] text-nonActive-text underline"
              onClick={() => setThumbnail(null)}
            >
              제거
            </Button>
          )}
        </div>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="hidden"
          aria-label="썸네일 이미지 파일 업로드"
        />
      </div>
      <div className="flex-center gap-5">
        <Button
          type="button"
          ariaLabel="다이어리 게시 취소 버튼"
          onClick={handleClose}
          className="bg-[#fff] px-4 py-2 rounded-full text-main-blue font-semibold tracking-wider min-w-[95px]"
        >
          취소
        </Button>
        <Button
          type="submit"
          ariaLabel="게시하기 버튼"
          className="bg-main-blue px-4 py-2 rounded-full text-[#fff] font-semibold tracking-wider min-w-[95px]"
          onClick={handleSubmit}
        >
          게시하기
        </Button>
      </div>
    </Modal>
  )
}
