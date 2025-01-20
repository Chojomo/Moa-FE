import Modal from 'react-modal'
import Button from '@/components/Button'

type GameModalProps = {
  isOpen: boolean
  handleClose: () => void
  handleRestart: () => void
}

export default function GameModal({ isOpen, handleClose, handleRestart }: GameModalProps) {
  // Modal.setAppElement('#__next')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      overlayClassName="modal-overlay-transparent"
    >
      <Button type="button" ariaLabel="다시 하기 버튼" onClick={handleRestart}>
        다시 하기
      </Button>
      <Button type="button" ariaLabel="첫 화면으로 돌아가기 버튼">
        첫 화면을 돌아가기
      </Button>
      <Button type="button" ariaLabel="공유하기 버튼">
        공유하기
      </Button>
    </Modal>
  )
}
