import Image from 'next/image'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'

type User = {
  profile: string
  nickName: string
  follows: number
  followers: number
}

type ProfileProps = {
  user: User
}

export default function Profile({ user }: ProfileProps) {
  const { profile: src, nickName: name, follows, followers } = user
  return (
    <div className="w-full flex-center gap-[5%] mt-[15%] mb-[10%]">
      <div className="relative w-[90px] h-[90px] rounded-full border border-border overflow-hidden">
        <Image
          src={src}
          alt="유저 프로필 사진"
          layout="fill"
          objectFit="contain"
          quality={75}
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="flex-grow flex flex-col gap-5">
        <p className="font-semibold text-[20px] text-main-blue">{name}</p>
        <div className="flex gap-20">
          <p className="font-bold">
            팔로우 <span className="ml-3">{follows}</span>
          </p>
          <p className="font-bold">
            팔로워 <span className="ml-3">{followers}</span>
          </p>
        </div>
      </div>
      {/* 팔로우 돼 있으면 Unfollow로 연결 */}
      <Button type="button" ariaLabel="팔로우 추가 버튼" className="">
        <Icon name="Follow" width={30} height={30} />
      </Button>
    </div>
  )
}
