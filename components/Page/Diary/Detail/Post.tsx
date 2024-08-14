import Image from 'next/image'

type PostItem = {
  index: number
  src: string
  writer: string
  title: string
  description: string
}

type PostProps = {
  post: PostItem
}

export default function Post({ post }: PostProps) {
  const { index, src, writer, title, description } = post

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
    <div className={`flex-center gap-[45px] ${addClass()}`}>
      <Image
        src={src}
        alt="post image"
        width={100}
        height={100}
        className="border border-border rounded-lg"
      />
      <div className={`flex flex-col flex-1 gap-[5px] ${index % 2 === 0 ? '' : 'sm:items-end'}`}>
        <p className="text-[16px] text-accent">{writer}</p>
        <p className="text-[16px] text-heading-text font-bold">{title}</p>
        <p className="text-[12px] text-body-text">{description}</p>
      </div>
    </div>
  )
}
