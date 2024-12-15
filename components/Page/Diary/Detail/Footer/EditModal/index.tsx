'use client'

import Modal from 'react-modal'
import Link from 'next/link'
import Button from '@/components/Button'

type EditModalProps = {
  isOpen: boolean
  handleClose: () => void
  isLogin: boolean
  isDiaryOwner: boolean
  diaryId: string
}

export default function EditModal({
  isOpen,
  handleClose,
  isLogin,
  isDiaryOwner,
  diaryId,
}: EditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Link"
      overlayClassName="modal-overlay"
      className="fixed bottom-[75px] right-[15px] bg-[#434343] dark:bg-[#f5f5f5] w-[75px] text-modal-text text-[0.9rem] z-30 rounded-lg flex flex-center flex-col animate-fadeFast tooltip tooltip-arrow-bottom font-semibold"
    >
      {isLogin && isDiaryOwner && (
        <>
          <Link
            href={`/diary/post/${diaryId}`}
            className="p-2 text-[0.7rem] md:text-[1rem] w-full text-center hover:text-main-blue"
          >
            수정
          </Link>
          <Button
            type="button"
            ariaLabel="삭제 버튼"
            className="text-[0.7rem] md:text-[1rem] p-2 w-full text-center hover:text-main-blue"
          >
            삭제
          </Button>
        </>
      )}
    </Modal>
  )
}
