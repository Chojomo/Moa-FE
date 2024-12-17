import Image from 'next/image'

type LikedUserProps = {
  username: string
  imgSrc: string
}

export default function LikedUser({ username, imgSrc }: LikedUserProps) {
  return (
    <div className="flex items-center gap-5 animate-fadeIn">
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
    </div>
  )
}
