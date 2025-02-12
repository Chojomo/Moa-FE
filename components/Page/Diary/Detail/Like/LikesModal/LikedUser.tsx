import Link from 'next/link'
import Image from 'next/image'

type LikedUserProps = {
  userId: string
  username: string
  imgSrc: string
}

export default function LikedUser({ userId, username, imgSrc }: LikedUserProps) {
  return (
    <Link href={`/user/${userId}/posts`} className="flex items-center gap-5 animate-fadeIn">
      <Image
        src={imgSrc}
        alt="user profile"
        width={45}
        height={45}
        quality={75}
        loading="lazy"
        draggable="false"
        objectFit="cover"
        className="w-[45px] h-[45px] rounded-full border border-border"
      />
      <p className="text-[1rem] text-body-text">{username}</p>
    </Link>
  )
}
