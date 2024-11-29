'use client'

import Modal from 'react-modal'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import LikedUser from './LikedUser'

type LikesModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function LikesModal({ isOpen, handleClose }: LikesModalProps) {
  Modal.setAppElement('#__next')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="좋아요 리스트 모달"
      className="relative modal-content animate-fadeIn bg-modal-bg w-[75%] h-[50%] max-w-[350px] max-h-[450px] px-[50px] py-[45px] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-col gap-[10px] font-semibold"
      overlayClassName="modal-overlay"
    >
      <Button
        type="button"
        ariaLabel="모달 닫기 버튼"
        className="absolute top-2 right-2 p-2 self-end"
        onClick={handleClose}
      >
        <Icon name="Cancel" width={20} height={20} />
      </Button>
      <p className="text-heading-text text-[1.1rem] self-center pb-5">
        이 포스트에 공감하고 있어요!
      </p>
      <div className="flex flex-col gap-[25px] overflow-y-auto scrollbar-none">
        <LikedUser />
      </div>
    </Modal>
  )
}
