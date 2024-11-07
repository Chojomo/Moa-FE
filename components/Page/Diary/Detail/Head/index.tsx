import Image from 'next/image'
import { FollowButton } from './Button'

export default function Head() {
  return (
    <div className="flex flex-col pb-[30px] border-b">
      <h1 className="text-[24px] md:text-[32px] text-heading-text font-bold mb-[35px]">
        아침 출근길,,, 그리고 회사에서
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <Image
            src="/images/dfsfs.jpeg"
            alt="user profile"
            width={60}
            height={60}
            quality={75}
            loading="lazy"
            draggable="false"
            objectFit="cover"
            className="rounded-full border border-border"
          />
          <div>
            <p className="text-main-blue text-[16px] md:text-[19px] font-semibold mb-[5px]">
              ichubtou
            </p>
            <p className="text-[11px] md:text-[13px]">2023.11.10 </p>
          </div>
        </div>
        <FollowButton />
      </div>
    </div>
  )
}
