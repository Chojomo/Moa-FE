import Toggle from '@/components/UI/Toggle'

export default function Notification() {
  const handleToggle = () => {
    console.log('토글!')
  }

  return (
    <div className="pt-[40px] pb-[20px] border-b flex flex-col justify-center gap-4">
      <div className="flex items-center gap-[30px]">
        <span className="text-[1.5rem] text-heading-text font-semibold">알림 설정</span>
        <Toggle initialState={true} callback={handleToggle} />
      </div>
      <p className="text-nonActive-text text-[0.8rem]">게시물에 대한 댓글 알림을 받습니다.</p>
    </div>
  )
}
