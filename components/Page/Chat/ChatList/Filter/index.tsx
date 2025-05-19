import Button from '@/components/Button'

export default function Filter() {
  return (
    <div className="flex items-center gap-[15px]">
      <Button
        type="button"
        ariaLabel="전체 채팅방 필터 버튼"
        className="flex-center bg-[#2d2d2d] dark:bg-[#2f2f2f] px-3 py-2 font-bold text-white text-[0.8rem] rounded-full"
      >
        전체
      </Button>
      <Button
        type="button"
        ariaLabel="안 읽은 채팅방 필터 버튼"
        className="flex-center bg-[#474747] dark:bg-[#5f5f5f] px-3 py-2 font-bold text-white text-[0.8rem] rounded-full"
      >
        안 읽은 채팅방
      </Button>
    </div>
  )
}
