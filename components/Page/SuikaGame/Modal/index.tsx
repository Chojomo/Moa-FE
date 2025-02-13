import Modal from 'react-modal'
import Button from '@/components/Button'
import { toast } from 'react-toastify'

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
    toast.success('링크가 복사되었습니다.')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="카테고리 모달"
      className="max-w-[400px] w-[90%] md:w-[50%] h-[290px] flex flex-col justify-between items-center bg-[#ffffffeb] animate-fade rounded-3xl font-mono py-[35px]"
      overlayClassName="modal-overlay-transparent"
    >
      <div className="text-center flex flex-col gap-5">
        <p className="text-[1.5rem] font-semibold text-[#6F4927]">{score}</p>
        <p className=" text-[1.3rem] font-semibold">아쉽네요! 다시 도전하시겠어요?</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Button
          type="button"
          ariaLabel="다시 하기 버튼"
          className="w-[80%] py-2 border-2 border-[#6F4927] rounded hover:bg-[#ffdcc84b] font-semibold"
          onClick={handleRestart}
        >
          다시 도전하기
        </Button>
        <Button
          type="button"
          ariaLabel="공유하기 버튼"
          className=" w-[80%] py-2 border-2 border-[#6F4927] rounded hover:bg-[#ffdcc84b] font-semibold"
          onClick={handleShare}
        >
          공유하기
        </Button>
      </div>
    </Modal>
  )
}
