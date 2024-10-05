import { UserInfo } from '@/components/Page/User'

export default function User() {
  return (
    <div className="w-[100vw] flex items-center flex-col">
      <UserInfo />
      <div>탭</div>
      <div>내용</div>
    </div>
  )
}
