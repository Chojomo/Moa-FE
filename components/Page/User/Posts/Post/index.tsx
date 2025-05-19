import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/Icon'
import { formatDate } from '@/helper/formatDate'
import { stripMarkdown } from '@/utils'

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
    diaryContents,
    diaryPublishedAt,
    commentCount,
    likeCount,
  } = post

  const content = stripMarkdown(diaryContents.replace(/!\[Image\][^]*?-->/, ''))

  return (
    <Link
      href={`/diary/${diaryId}`}
      className="w-full flex justify-between gap-4 pt-[10px] pb-[20px] group cursor-pointer border-b border-border"
    >
      <div className="flex flex-col flex-1">
        <p className="text-[1.5rem] font-semibold text-[##212529] dark:text-[#ececec] group-hover:text-[#494949] dark:group-hover:text-[#d5d5d5]">
          {title.slice(0, 12)}
        </p>
        <p className="pl-[5px] pt-[10px] flex-1 text-[#495057] dark:text-[#acacac]">
          {content.slice(0, 30)}
        </p>
        <div className="flex items-center gap-[10px] py-[10px] text-[0.8rem] text-[#bebebe] dark:text-[#595959]">
          <p>{formatDate(diaryPublishedAt)}</p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#a4a4a4]" />
          <p>{commentCount}개의 댓글</p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#a4a4a4]" />
          <Icon name="Heart" width={15} height={20} />
          <p>{likeCount}</p>
        </div>
      </div>
      {src && (
        <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg border border-[#eeeeee] dark:border-[#242424]">
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
    </Link>
  )
}
