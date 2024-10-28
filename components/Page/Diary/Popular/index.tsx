import Image from 'next/image'
import { Icon } from '@/components/Icon'

export default function PopularPost() {
  return (
    <div className="relative w-[230px] h-[200px] rounded-[10px] overflow-hidden">
      <Image
        src="/images/ewtq.jpeg"
        alt="popular post"
        width={230}
        height={200}
        quality={75}
        loading="lazy"
        draggable="false"
        objectFit="cover"
      />
      <div className="absolute left-0 bottom-0 w-full h-[70%] bg-[#00000099] flex flex-col text-white pt-[13px] pb-[9px] px-[13px]">
        <div className="flex-grow flex flex-col">
          <p className="text-[14px] font-bold mb-[7px]">핫도그 언제 마지막으로...</p>
          <p className="text-[12px] text-[#FFFFFFB3] mb-[18px] flex-grow">
            망망곰곰엉덩일흔드러바흔들흔들
          </p>
          <p className="self-end text-[8px] mb-[5px]">2024.02.25</p>
        </div>
        <div className="flex justify-between">
          <div className="text-[10px] font-bold flex items-center gap-3">
            <div className="flex gap-2">
              <Icon name="Heart" width={15} height={15} />
              <span>3</span>
            </div>
            <div className="flex gap-2">
              <Icon name="Comment" width={17} height={17} />
              <span>2</span>
            </div>
          </div>
          <span className="text-[15px] font-bold text-main-blue text-shadow">ichubtou</span>
        </div>
      </div>
    </div>
  )
}
