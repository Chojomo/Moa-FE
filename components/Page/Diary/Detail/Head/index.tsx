import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/diary'

import Button from '@/components/Button'
import { FollowButton } from './Button'

type HeadProps = {
  post: Post
  isLogin: boolean
}

export default function Head({ post, isLogin }: HeadProps) {
  const {
    diaryId,
    diaryTitle: title,
    diaryAuthorProfileImage: profile,
    diaryPublishedAt: publishedAt,
    isDiaryOwner,
  } = post

  return (
    <div className="w-full flex flex-col pb-[30px] border-b">
      <h1 className="w-full break-words text-[24px] md:text-[32px] text-heading-text font-bold mb-[35px]">
        {title}
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <Image
            src={profile}
            alt="user profile"
            width={55}
            height={55}
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
            <p className="text-[11px] md:text-[13px]">{publishedAt.split('T')[0]}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          {isLogin && isDiaryOwner && (
            <>
              <Link
                href={`/diary/post/${diaryId}`}
                className="p-2 text-[0.8rem] md:text-[1rem] hover:text-[#000000] dark:hover:text-[#f5f5f5]"
              >
                수정
              </Link>
              <Button
                type="button"
                ariaLabel="삭제 버튼"
                className="mr-1 md:mr-3 p-2 text-[0.8rem] md:text-[1rem] hover:text-[#000000] dark:hover:text-[#f5f5f5]"
              >
                삭제
              </Button>
            </>
          )}
          {isLogin && !isDiaryOwner && <FollowButton />}
        </div>
      </div>
    </div>
  )
}
