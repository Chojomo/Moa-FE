import Image from 'next/image'

type Post = {
  index: number
  src: string | null
  alt: string | null
  title: string
  description: string
}

type PopularCardProps = {
  post: Post
}

export default function PopularCard({ post }: PopularCardProps) {
  const { index, src, alt, title, description } = post

  const addClass = () => {
    switch (index) {
      case 0:
        return 'relative -rotate-8 top-[40px] left-[100px] animate-resetL'
      case 1:
        return 'z-10'
      case 2:
        return 'relative rotate-8 top-[40px] right-[100px] animate-resetR'
      default:
        return ''
    }
  }

  return (
    <div className={`flex-center flex-col ${addClass()}`}>
      <Image
        src={src || '/images/moon.jpeg'}
        width={0}
        height={0}
        alt={alt || 'popular post image'}
        sizes="100vw"
        className="md:w-[200px] md:h-[215px] w-[90px] h-[95px] rounded-lg md:mb-[20px] mb-[10px] border border-border"
      />
      <h3 className="md:text-[18px] text-[15px] text-heading-text md:mb-[13px] mb-[7px]">
        {title}
      </h3>
      <p className="text-[12px] text-body-text">{description}</p>
    </div>
  )
}
