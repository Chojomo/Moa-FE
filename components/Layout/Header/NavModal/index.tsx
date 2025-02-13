'use client'

import { useAuthStore } from '@/store/useAuth'
import { useCallback } from 'react'
import Modal from 'react-modal'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import IconLink from '../IconLink'

type NavModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function NavModal({ isOpen, handleClose }: NavModalProps) {
  const { logout } = useAuthStore()

  const handleLogout = useCallback(() => {
    logout()
    handleClose()
  }, [logout, handleClose])

  Modal.setAppElement('#__next')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="fixed top-[74px] right-[5%] bg-[#434343] dark:bg-[#f5f5f5] px-[20px] py-[15px] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-col gap-[10px] animate-fadeFast tooltip tooltip-arrow-top font-semibold"
      overlayClassName="modal-overlay-transparent"
    >
      <IconLink
        href="/user/posts"
        iconName="User"
        iconColor="modal-text"
        hoverColor="background"
        iconSize={17}
        handleClick={handleClose}
      >
        <span>마이 페이지</span>
      </IconLink>
      <IconLink
        href="/diary/post"
        iconName="Post"
        iconColor="modal-text"
        hoverColor="background"
        iconSize={20}
        handleClick={handleClose}
      >
        <span>새 글 작성</span>
      </IconLink>
      <IconLink
        href="/user/setting"
        iconName="Setting"
        iconColor="modal-text"
        hoverColor="background"
        iconSize={17}
        handleClick={handleClose}
      >
        <span>설정</span>
      </IconLink>
      <Button
        type="button"
        ariaLabel="로그아웃 버튼"
        onClick={handleLogout}
        className="flex gap-[20px] group p-2"
      >
        <Icon name="Logout" width={17} height={17} className="text-modal-text" />
        <span>로그아웃</span>
      </Button>
    </Modal>
  )
}
