import Modal from 'react-modal'
import Button from '@/components/Button'

type DeleteAccountModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function DeleteAccountModal({ isOpen, handleClose }: DeleteAccountModalProps) {
  Modal.setAppElement('#__next')

  const handleClick = () => {}

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="modal-content animate-fadeIn bg-modal-bg flex flex-col items-center gap-5 p-[30px] border border-border"
      overlayClassName="modal-overlay-transparent"
    >
      <Button
        type="button"
        ariaLabel="회원 탈퇴 버튼"
        className="max-w-[200px] bg-main-blue text-white px-4 py-2 rounded-full font-semibold"
        onClick={handleClick}
      >
        탈퇴하기
      </Button>
      <p className="text-nonActive-text text-[0.8rem] text-center">
        회원 탈퇴 시, 작성했던 글과 댓글은 유지되며, <br />
        수정 및 삭제할 수 없습니다.
      </p>
    </Modal>
  )
}
