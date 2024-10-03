'use client'

import Modal from 'react-modal'
import { useEffect, useState, useRef } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

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

  // 인풋 필드를 클릭했을 때 파일 선택 창 열기
  const handleInputClick = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current?.click()
    }
  }

  // 썸네일 파일 변경 핸들러
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setThumbnail(file)
      // 이미지 미리보기 URL 생성
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
            className={`flex-center bg-[#fff] px-4 py-3 gap-3 rounded min-w-[130px] font-semibold ${isPublic ? 'border border-main-blue text-main-blue' : 'text-[#AFAFAF]'}`}
            onClick={() => setIsPublic(true)}
          >
            <Icon name="Public" width={20} height={20} fill={!isPublic ? '#AFAFAF' : '#2C72DC'} />
            <p>전체 공개</p>
          </Button>
          <Button
            type="button"
            ariaLabel="비공개 버튼"
            className={`flex-center bg-[#fff] px-4 py-3 gap-3 rounded min-w-[130px] font-semibold ${!isPublic ? 'border border-main-blue text-main-blue' : 'text-[#AFAFAF]'}`}
            onClick={() => setIsPublic(false)}
          >
            <Icon name="Unpublic" width={22} height={22} fill={isPublic ? '#AFAFAF' : '#2C72DC'} />
            비공개
          </Button>
        </div>
      </div>
      <div
        className="w-full max-w-[300px] h-[200px] border-2 border-dashed border-gray-400 rounded-lg flex-center cursor-pointer"
        onClick={handleInputClick}
        style={{
          backgroundImage: thumbnailPreview ? `url(${thumbnailPreview})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <input
        ref={thumbnailInputRef}
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        className="hidden"
        aria-label="썸네일 이미지 파일 업로드"
      />
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
          type="button"
          ariaLabel="게시하기 버튼"
          className="bg-main-blue px-4 py-2 rounded-full text-[#fff] font-semibold tracking-wider min-w-[95px]"
        >
          게시하기
        </Button>
      </div>
    </Modal>
  )
}
