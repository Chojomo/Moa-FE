import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'
import { FollowButton } from './Button'

type HeadProps = {
  diaryId?: string
  title: string
}

export default function Head({ diaryId, title }: HeadProps) {
  return (
    <div className="w-full flex flex-col pb-[30px] border-b">
      <h1 className="w-full break-words text-[24px] md:text-[32px] text-heading-text font-bold mb-[35px]">
        {title}
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <Image
            src="/images/dfsfs.jpeg"
            alt="user profile"
            width={60}
            height={60}
            quality={75}
            loading="lazy"
            draggable="false"
            objectFit="cover"
            className="rounded-full border border-border"
          />
          <div>
            <p className="text-main-blue text-[16px] md:text-[19px] font-semibold mb-[5px]">
              ichubtou
            </p>
            <p className="text-[11px] md:text-[13px]">2023.11.10 </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/diary/post/${diaryId}`} className="p-2">
            수정
          </Link>
          <Button type="button" ariaLabel="삭제 버튼" className="mr-3 p-2">
            삭제
          </Button>
          <FollowButton />
        </div>
      </div>
    </div>
  )
}
