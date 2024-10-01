'use client'

import Modal from 'react-modal'
import { useEffect } from 'react'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'
import LinkInput from './LinkInput'

type LinkModalProps = {
  isOpen: boolean
  handleClose: () => void
  textValue: string
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  linkValue: string
  handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddClick: () => void
}

export default function LinkModal({
  isOpen,
  handleClose,
  textValue,
  handleTextChange,
  linkValue,
  handleLinkChange,
  handleAddClick,
}: LinkModalProps) {
  useEffect(() => {
    Modal.setAppElement('#__next')
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Link"
      className="modal-content animate-fadeIn bg-modal-bg pl-[25px] pr-[100px] py-[20px] rounded-lg s"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-[18px] font-bold mb-5">링크 등록</h2>
      <Button
        type="button"
        className="absolute top-4 right-3 p-2"
        onClick={handleClose}
        ariaLabel="모달 취소"
      >
        <Icon name="Cancel" width={22} height={22} />
      </Button>
      <form>
        <div className="flex flex-col gap-5">
          <LinkInput
            value={textValue}
            handleChange={handleTextChange}
            placeholder="링크 텍스트를 입력하세요"
          />
          <LinkInput
            value={linkValue}
            handleChange={handleLinkChange}
            placeholder="URL을 입력하세요"
          />
          <Button
            type="submit"
            className="absolute bottom-5 right-5 rounded-full bg-main-blue px-3 py-1 text-[13px] font-semibold text-[#fff] hover:bg-[#2f58d4]"
            onClick={handleAddClick}
            ariaLabel="링크 추가"
          >
            확인
          </Button>
        </div>
      </form>
    </Modal>
  )
}
