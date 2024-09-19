import Image from 'next/image'
import Entry from '@/components/Entry'

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
        return 'relative sm:-rotate-8 top-[100px] left-[0px] sm:top-[40px] sm:left-[100px] animate-resetT sm:animate-resetL'
      case 1:
        return 'z-10'
      case 2:
        return 'relative sm:rotate-8  bottom-[100px] right-[0px] sm:top-[40px] sm:bottom-[0px] animate-resetB sm:right-[100px] sm:animate-resetR'
      default:
        return ''
    }
  }

  return (
    <div className={`flex-center flex-col ${addClass()}`}>
      <div className="group flex-center">
        <Entry size="large" />
        <Image
          src={src || '/images/moon.jpeg'}
          width={0}
          height={0}
          alt={alt || 'popular post image'}
          quality={75}
          sizes="100vw"
          loading="lazy"
          draggable="false"
          className="sm:w-[300px] sm:h-[315px] w-[90px] h-[95px] rounded-lg sm:mb-[20px] mb-[10px] border border-border"
        />
      </div>
      <h3 className="sm:text-[18px] text-[15px] text-heading-text font-bold sm:mb-[13px] mb-[7px]">
        {title}
      </h3>
      <p className="text-[12px] text-body-text">{description}</p>
    </div>
  )
}
