import Image from 'next/image'
import { User } from '@/types/user'
import { BASE_PROFILE } from '@/helper/constants'

type ProfileProps = {
  user?: User | null
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return <p>로딩 중</p>
  }

  const {
    userProfileImage: src,
    userNickname: name,
    userIntroduce: dio,
    followingCount: follows,
    followerCount: followers,
    isMyPage,
  } = user

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden bg-background">
        <Image
          src={src || BASE_PROFILE}
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
      {!isMyPage && (
        <div className="flex gap-7 pt-3 text-[0.9rem] text-nonActive-text">
          <p>
            <span className="text-heading-text font-semibold pr-3">{follows}</span> 팔로우
          </p>
          <p>
            <span className="text-heading-text font-semibold pr-3">{followers}</span> 팔로워
          </p>
        </div>
      )}
    </div>
  )
}
