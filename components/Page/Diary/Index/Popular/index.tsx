'use client'

import Image from 'next/image'
import { Icon } from '@/components/Icon'
import { Diary } from '@/types/diary'

type PopularPostProps = {
  post: Diary
}

export default function PopularPost({ post }: PopularPostProps) {
  const {
    diaryAuthorNickname,
    diaryContents,
    diaryPublishedAt,
    diaryThumbnail,
    diaryTitle,
    totalLikes,
  } = post

  console.log(post)

  let content = diaryContents.replace(/!\[Image\][^]*?-->/, '')

  if (content.length > 100) {
    content = content.substring(0, 30)
  }

  return (
    <div className="relative w-[250px] h-[200px] rounded-[10px] overflow-hidden">
      <div className="w-[250px] h-[200]">
        <Image
          src={diaryThumbnail || '/images/ewtq.jpeg'}
          alt="popular post"
          quality={75}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="absolute left-0 bottom-0 w-full h-[70%] hover:h-[100%] transition-height duration-500 ease-in-out bg-[#00000099] flex flex-col text-white pt-[13px] pb-[9px] px-[13px] animate-fadeSlow">
        <div className="flex-grow flex flex-col">
          <p className="text-[14px] font-bold mb-[7px]">{diaryTitle}</p>
          <p className="text-[12px] text-[#FFFFFFB3] mb-[18px] flex-grow">{content}</p>
          <p className="self-end text-[8px] mb-[5px]">{diaryPublishedAt}</p>
        </div>
        <div className="flex justify-between">
          <div className="text-[10px] font-bold flex items-center gap-3">
            <div className="flex gap-2">
              <Icon name="Heart" width={15} height={15} />
              <span>{totalLikes}</span>
            </div>
            <div className="flex gap-2">
              <Icon name="Comment" width={17} height={17} className="text-[#43D8AA]" />
              <span>2</span>
            </div>
          </div>
          <span className="text-[15px] font-bold text-main-blue text-shadow">
            {diaryAuthorNickname}
          </span>
        </div>
      </div>
    </div>
  )
}
