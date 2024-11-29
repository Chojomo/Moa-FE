import Image from 'next/image'

export default function LikedUser() {
  return (
    <div className="flex items-center gap-5">
      <Image
        src="/images/dfsfs.jpeg"
        alt="user profile"
        width={45}
        height={45}
        quality={75}
        loading="lazy"
        draggable="false"
        objectFit="cover"
        className="w-[45px] h-[45px] rounded-full border border-border"
      />
      <p className="text-[1rem] text-body-text">ichubtou</p>
    </div>
  )
}
