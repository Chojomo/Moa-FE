import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import { User } from '@/types/user'
import { BASE_PROFILE } from '@/helper/constants'
import ListModal from '@/components/UI/Modal/ListModal'

type FollowInfo = {
  userId: string
  userNickname: string
  userProfileImage: string
}

type ProfileProps = {
  user?: User | null
  following: FollowInfo[]
  followers: FollowInfo[]
}

export default function Profile({ user, following, followers }: ProfileProps) {
  const [activeModal, setActiveModal] = useState<'followers' | 'following' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달이 열려 있는지 여부

  if (!user) {
    return <p>로딩 중</p>
  }

  const {
    userProfileImage: src,
    userNickname: name,
    userIntroduce: dio,
    followingCount,
    followerCount,
    isMyPage,
  } = user

  const openModal = (type: 'followers' | 'following') => {
    setActiveModal(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setActiveModal(null)
  }

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
          <Button
            type="button"
            ariaLabel="팔로워 모달 열기 버튼"
            onClick={() => openModal('followers')}
          >
            <span className="text-heading-text font-semibold pr-3">{followerCount}</span> 팔로워
          </Button>
          <Button
            type="button"
            ariaLabel="팔로잉 모달 열기 버튼"
            onClick={() => openModal('following')}
          >
            <span className="text-heading-text font-semibold pr-3">{followingCount}</span> 팔로잉
          </Button>
        </div>
      )}

      <ListModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        list={activeModal === 'followers' ? followers : following}
        title={activeModal === 'followers' ? '팔로워 목록' : '팔로잉 목록'}
      />
    </div>
  )
}
