import { UserInfo, Tap } from '@/components/Page/User'

export default function User() {
  return (
    <div className="w-[100vw] flex items-center flex-col">
      <div className="w-[70%]">
        <UserInfo />
        <Tap />
        <div>내용</div>
      </div>
    </div>
  )
}
