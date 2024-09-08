import Image from 'next/image'

type FavoriteProps = {
  src: string
  name: string
}

export default function Favorite({ src, name }: FavoriteProps) {
  return (
    <div className="z-10 animate-fade flex-center flex-col gap-[40px] group">
      <Image
        src={src}
        alt={`${name} icon image`}
        width={90}
        height={77}
        quality={75}
        loading="lazy"
        draggable="false"
        className="transition-transform duration-300 ease-in-out group-hover:animate-customBounce"
      />
      <p className="text-[18px] font-bold cursor-default">{name}</p>
    </div>
  )
}
