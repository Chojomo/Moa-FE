import Modal from 'react-modal'
import Button from '@/components/Button'

type GameModalProps = {
  isOpen: boolean
  score: number
  handleClose: () => void
  handleRestart: () => void
}

export default function GameModal({ isOpen, score, handleClose, handleRestart }: GameModalProps) {
  // Modal.setAppElement('#__next')

  const handleShare = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    // toast.success('링크가 복사되었습니다.')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="max-w-[400px] w-[90%] md:w-[50%] h-[290px] flex flex-col justify-between items-center bg-background border border-border animate-fade rounded font-mono py-[35px]"
      overlayClassName="modal-overlay-transparent"
    >
      <div className="text-center flex flex-col gap-5">
        <p className="text-[1.1rem]">
          나의 점수 : <span className="text-[1.2rem] text-main-blue font-semibold">{score}</span>
        </p>
        <p className=" text-[1.3rem]">아쉽네요! 다시 도전하시겠어요?</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Button
          type="button"
          ariaLabel="다시 하기 버튼"
          className="w-[80%] py-2 border rounded hover:bg-main-blue"
          onClick={handleRestart}
        >
          다시 도전하기
        </Button>
        <Button
          type="button"
          ariaLabel="공유하기 버튼"
          className=" w-[80%] py-2 border rounded hover:bg-main-blue"
          onClick={handleShare}
        >
          공유하기
        </Button>
      </div>
    </Modal>
  )
}
