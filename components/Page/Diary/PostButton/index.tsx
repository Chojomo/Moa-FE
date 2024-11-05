import Link from 'next/link'
import { Icon } from '@/components/Icon'

export default function PostButton() {
  return (
    <Link
      href="/diary/post"
      className="fixed bottom-0 right-0 m-5 md:m-8 bg-main-blue pl-[15px] pr-[14px] pt-[13px] pb-[15px] rounded-2xl"
    >
      <Icon name="PostButton" width={23} height={23} />
    </Link>
  )
}
