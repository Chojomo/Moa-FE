import Image from 'next/image'

type User = {
  profile: string
  nickName: string
  dio: string
  follows: number
  followers: number
}

type ProfileProps = {
  user: User
}

export default function Profile({ user }: ProfileProps) {
  const { profile: src, nickName: name, dio, follows, followers } = user
  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden bg-background">
        <Image
          src={src}
          alt="유저 프로필 사진"
          quality={75}
          layout="fill"
          objectFit="contain"
          loading="lazy"
          draggable="false"
        />
      </div>
      <p className="text-heading-text text-[2.5rem] font-serif font-semibold">{name}</p>
      <p>{dio}</p>
      <div className="flex gap-7 pt-3 text-[0.9rem] text-nonActive-text">
        <p>
          <span className="text-heading-text font-semibold pr-3">{follows}</span> 팔로우
        </p>
        <p>
          <span className="text-heading-text font-semibold pr-3">{followers}</span> 팔로워
        </p>
      </div>
    </div>
  )
}
