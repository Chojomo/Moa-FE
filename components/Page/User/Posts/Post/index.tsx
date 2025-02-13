import Image from 'next/image'

// 임시 타입
type PostType = {
  index: number
  src: string
  writer: string
  title: string
  description: string
}

type PostProps = {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const { src, title, description } = post
  return (
    <div className="w-[90%] md:max-w-[45%] xl:max-w-[30%] h-[420px] flex flex-col gap-4 group">
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
      <p className="text-[2rem] font-semibold text-[#d5d5d5] dark:text-[#333333] group-hover:text-[#494949] dark:group-hover:text-[#d5d5d5]">
        {title.slice(0, 12)}
      </p>
      <p className="text-[#bebebe] dark:text-[#3a3a3a]">{description.slice(0, 60)}</p>
      <p className="text-[0.8rem] text-[#bebebe] dark:text-[#3a3a3a]">2024.02.25</p>
    </div>
  )
}
