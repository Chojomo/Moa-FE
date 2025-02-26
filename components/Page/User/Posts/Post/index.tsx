import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/Icon'
import { formatDate } from '@/helper/formatDate'

// 임시 타입
type PostType = {
  commentCount: number
  diaryContents: string
  diaryId: string
  diaryPublishedAt: string
  diaryThumbnail: null | string
  diaryTitle: string
  likeCount: number
}

type PostProps = {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const {
    diaryId,
    diaryThumbnail: src,
    diaryTitle: title,
    diaryContents: content,
    diaryPublishedAt,
    commentCount,
    likeCount,
  } = post

  return (
    <Link
      href={`/diary/${diaryId}`}
      className={`w-[90%] md:max-w-[45%] xl:max-w-[30%] ${src ? 'h-[420px]' : ''} flex flex-col gap-4 group cursor-pointer`}
    >
      {src && (
        <div className="relative w-full h-[60%] rounded-lg overflow-hidden border border-[#eeeeee] dark:border-[#242424]">
          <Image
            src={src}
            alt="게시물 썸네일"
            quality={75}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            draggable="false"
          />
        </div>
      )}
      <div className="pl-[5px] flex flex-col flex-1 ">
        <p className="text-[2rem] font-semibold text-heading-text dark:text-[#333333] group-hover:text-[#494949] dark:group-hover:text-[#d5d5d5]">
          {title.slice(0, 12)}
        </p>
        <p className="pl-[5px] pt-[10px] h-[40%] flex-1 text-[#495057] dark:text-[#3a3a3a]">
          {content.slice(0, 60)}
        </p>
        <div className="flex items-center gap-[10px] py-[10px] text-[0.8rem] text-[#bebebe] dark:text-[#3a3a3a]">
          <p>{formatDate(diaryPublishedAt)}</p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#a4a4a4]" />
          <p>{commentCount}개의 댓글</p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#a4a4a4]" />
          <Icon name="Heart" width={15} height={20} />
          <p>{likeCount}</p>
        </div>
      </div>
    </Link>
  )
}
