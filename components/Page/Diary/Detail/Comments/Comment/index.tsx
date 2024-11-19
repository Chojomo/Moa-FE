'use client'

import Image from 'next/image'
import { Icon } from '@/components/Icon'
import Button from '@/components/Button'

export default function Comment() {
  const handleButtonClick = () => {
    console.log('클릭')
  }

  return (
    <div className="flex flex-col border-b py-[35px]">
      <div className="flex-center gap-[3%]">
        <Image
          src="/images/dfsfs.jpeg"
          alt="user profile"
          width={50}
          height={50}
          quality={75}
          loading="lazy"
          draggable="false"
          objectFit="cover"
          className="w-[60px] h-[60px] rounded-full border border-border"
        />
        <div className="flex-grow flex flex-col gap-[3px]">
          <p className="text-[18px] text-main-blue font-bold">뭐라뤂</p>
          <p className="text-[12px] text-[#999999]">2023.11.10. 18:32</p>
        </div>
        <div className="flex gap-[14px]">
          <Icon name="Unlike" width={20} height={20} />
          <span className="text-[14px] text-[#A6A6A6] font-bold">32</span>
        </div>
      </div>
      <p className="py-[5%] text-body-text">
        저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어 쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!저쩌고 어쩌고? 어쩌고
        저쩌고!저쩌고 어쩌고? 어쩌고 저쩌고!
      </p>
      <Button
        type="button"
        ariaLabel="답글 버튼"
        className="bg-soft-bg rounded-md text-[10px] text-white font-semibold w-[50px] h-[30px] self-end"
        onClick={handleButtonClick}
      >
        답글
      </Button>
    </div>
  )
}
