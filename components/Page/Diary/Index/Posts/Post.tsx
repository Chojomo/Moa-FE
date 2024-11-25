import { Icon } from '@/components/Icon'
import { Diary } from '@/types/diary'
import Image from 'next/image'
import Entry from '@/components/Entry'
import Link from 'next/link'

type PostProps = {
  post: Diary
  index: number
}

export default function Post({ index, post }: PostProps) {
  const { diaryId, diaryAuthorNickname, diaryThumbnail, diaryTitle, diaryContents } = post
  let content = diaryContents.replace(/!\[Image\][^]*?-->/, '')

  if (content.length > 100) {
    content = content.substring(0, 30)
  }

  const addClass = () => {
    if (index % 2 === 0) {
      return 'sm:self-start'
    }

    if (index % 2 === 1) {
      return 'sm:self-end sm:flex-row-reverse'
    }

    return ''
  }

  return (
    <div className={`relative flex-center gap-[45px] animate-fadeIn ${addClass()}`}>
      <div className="relative flex-center group">
        <Entry size="small" />
        <Link href={`/diary/${diaryId}`} className="w-[120px] h-[120px]">
          <Image
            src={diaryThumbnail || '/images/dfsfs.jpeg'}
            alt="post image"
            quality={75}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            draggable="false"
            className="border border-border rounded-lg"
          />
        </Link>
      </div>
      <div
        className={`flex flex-col flex-grow gap-[5px] overflow-hidden ${index % 2 === 0 ? '' : 'sm:items-end'}`}
      >
        <p className="text-[14px] text-main-blue">{diaryAuthorNickname}</p>
        <Link href={`/diary/${diaryId}`}>
          <p className="text-[16px] text-heading-text font-bold mb-[5px]">{diaryTitle}</p>
          <p
            className={`text-[12px] text-body-text overflow-hidden  ${index % 2 === 0 ? '' : 'text-right'} mb-3`}
          >
            {content}
          </p>
        </Link>
        <div className="text-[10px] font-bold flex items-center gap-3 pointer-events-none">
          <div className="flex gap-2">
            <Icon name="Heart" width={15} height={15} />
            <span>3</span>
          </div>
          <div className="flex gap-2">
            <Icon name="Comment" width={17} height={17} />
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
