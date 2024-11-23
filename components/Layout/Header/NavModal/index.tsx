'use client'

import { useEffect } from 'react'
import Modal from 'react-modal'
import IconLink from '../IconLink'

type NavModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function NavModal({ isOpen, handleClose }: NavModalProps) {
  // useEffect(() => {
  //   Modal.setAppElement('#__next')
  // }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="fixed top-[74px] right-[5%] bg-inverse p-[20px] text-background z-30 rounded-lg gap-5"
    >
      <IconLink href="/user/about" iconName="User" hoverColor="text-main-blue">
        <span>마이 페이지</span>
      </IconLink>
      <IconLink href="/diary/post" iconName="Post" hoverColor="text-main-blue">
        <span>새 글 작성</span>
      </IconLink>
      <IconLink href="/diary/post" iconName="Post" hoverColor="text-main-blue">
        <span>설정</span>
      </IconLink>
      <IconLink href="/diary/post" iconName="Post" hoverColor="text-main-blue">
        <span>로그아웃</span>
      </IconLink>
    </Modal>
  )
}
