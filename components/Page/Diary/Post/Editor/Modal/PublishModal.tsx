'use client'

import Modal from 'react-modal'
import { useEffect, useState, useRef } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import Image from 'next/image'

type PublishModalProps = {
  isOpen: boolean
  handleClose: () => void
  isPublic: boolean
  setIsPublic: (value: boolean) => void
}

export default function PublishModal({
  isOpen,
  handleClose,
  isPublic,
  setIsPublic,
}: PublishModalProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    Modal.setAppElement('#__next')
  }, [])

  const handleInputClick = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current?.click()
    }
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setThumbnail(file)
      const fileURL = URL.createObjectURL(file)
      setThumbnailPreview(fileURL)
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
          {thumbnailPreview && (
            <Image
              src={thumbnailPreview}
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
            {thumbnailPreview ? '재업로드' : '썸네일 추가하기'}
          </Button>
          {thumbnailPreview && (
            <Button
              type="button"
              ariaLabel="썸네일 이미지 추가 버튼"
              className="p-3 font-semibold text-[13px] text-nonActive-text underline"
              onClick={() => setThumbnailPreview(null)}
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
          //! 함수 연결 필요
        >
          게시하기
        </Button>
      </div>
    </Modal>
  )
}
