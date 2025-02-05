import Image from 'next/image'

export default function About() {
  return (
    <div className="w-full flex-center flex-col flex-grow p-10 gap-3 animate-fadeIn">
      <Image
        src="/images/pebble/mint-pebble.png"
        alt="mint-pebble image"
        width={70}
        height={77}
        quality={75}
        loading="lazy"
        draggable="false"
      />
      <p className="text-body-text">소개글이 비어있어요!</p>
    </div>
  )
}
