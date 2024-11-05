import { Icon } from '@/components/Icon'
import { Diary } from '@/types/diary'
import Image from 'next/image'
import Entry from '@/components/Entry'

type PostProps = {
  post: Diary
  index: number
}

export default function Post({ index, post }: PostProps) {
  const { diaryAuthorNickname, diaryThumbnail, diaryTitle, diaryContents } = post

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
        <Image
          src={diaryThumbnail || '/images/dfsfs.jpeg'}
          alt="post image"
          width={120}
          height={120}
          quality={75}
          loading="lazy"
          draggable="false"
          className="border border-border rounded-lg"
        />
      </div>
      <div className={`flex flex-col flex-1 gap-[5px] ${index % 2 === 0 ? '' : 'sm:items-end'}`}>
        <p className="text-[14px] text-main-blue">{diaryAuthorNickname}</p>
        <p className="text-[16px] text-heading-text font-bold mb-[5px]">{diaryTitle}</p>
        <p className="flex-grow text-[12px] text-body-text mb-[15px]">{diaryContents}</p>
        <div className={`text-[10px] font-bold flex items-center gap-3`}>
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
