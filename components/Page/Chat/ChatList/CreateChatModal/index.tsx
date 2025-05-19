'use client'

import Modal from 'react-modal'
import { Icon } from '@/components/Icon'

import Button from '@/components/Button'
import ListItem from './ListItem'

type Item = {
  userId: string
  userNickname: string
  userProfileImage: string
}

type LikesModalProps = {
  isOpen: boolean
  handleClose: () => void
  list: Item[]
  title: string
}

export default function ListModal({ isOpen, handleClose, list, title }: LikesModalProps) {
  Modal.setAppElement('#__next')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="좋아요 리스트 모달"
      className="relative modal-content animate-fadeIn bg-modal-bg w-[75%] h-[50%] max-w-[350px] max-h-[450px] px-[50px] py-[45px] text-modal-text text-[0.9rem] z-40 rounded-lg flex flex-col gap-[10px] font-semibold"
      overlayClassName="modal-overlay z-40"
    >
      <Button
        type="button"
        ariaLabel="모달 닫기 버튼"
        className="absolute top-2 right-2 p-2 self-end"
        onClick={handleClose}
      >
        <Icon name="Cancel" width={20} height={20} />
      </Button>
      <p className="text-heading-text text-[1.1rem] self-center pb-5">{title}</p>
      <div className="flex flex-col gap-[25px] overflow-y-auto scrollbar-none">
        {list?.map(({ userId, userNickname, userProfileImage }) => (
          <ListItem
            key={userId}
            userId={userId}
            username={userNickname}
            imgSrc={userProfileImage}
          />
        ))}
      </div>
    </Modal>
  )
}
