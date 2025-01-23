import Image from 'next/image'
import { getImage } from '@/features/suikaGame'
import { Items } from '@/helper/constants/suikaGame/items'

type HUDProps = {
  score: number
  nextItem: Items
}

export default function HUD({ score, nextItem }: HUDProps) {
  return (
    <div className="max-w-[270px] w-[100%] h-[75px] flex flex-col rounded border-4 border-[#6F4927]">
      {/* <div className="w-full h-1/3 bg-[#FFDCC8] text-[#6F4927]"> */}
      <p className="w-full h-1/3 bg-[#FFDCC8] text-[#6F4927] text-end text-[1.2rem] font-extrabold pr-[10px]">
        Next
      </p>
      {/* </div> */}
      <div className="w-full h-2/3 flex justify-between items-center bg-[#6F4927] pl-[2px] pr-[10px]">
        <p className="text-[2rem] text-[#FFDCC8] font-black pl-[10px]">{score}</p>
        <Image
          src={getImage(nextItem)}
          alt="다음 아이템"
          width={30}
          height={30}
          loading="lazy"
          objectFit="cover"
          draggable="false"
          className="pt-2"
        />
        {/* <div className="flex flex-col justify-center items-center gap-4"> */}
      </div>
    </div>
  )
}
