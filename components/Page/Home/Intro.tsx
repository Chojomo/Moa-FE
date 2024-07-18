import Image from 'next/image'
import { shapes } from '@/helper/constants/shapes'

export default function Intro() {
  return (
    <>
      <div className="flex whitespace-nowrap animate-marquee">
        <p className="text-heading-bg text-[200px] font-bold">
          JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA!&nbsp;
        </p>
        <p className="text-heading-bg text-[200px] font-bold">
          JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA!&nbsp;
        </p>
      </div>
      <div className="w-[100%] h-[100%] absolute">
        {shapes.left.map((shape) => (
          <Image
            key={shape.src}
            className="w-[15%] animate-float"
            width={0}
            height={0}
            src={shape.src}
            alt={shape.alt}
            sizes="100vw"
          />
        ))}
      </div>
      <div className="w-[100%] h-[100vh] absolute">
        {shapes.right.map((shape) => (
          <Image
            key={shape.src}
            className="w-[15%] animate-float"
            width={0}
            height={0}
            src={shape.src}
            alt={shape.alt}
            sizes="100vw"
          />
        ))}
      </div>
    </>
  )
}
