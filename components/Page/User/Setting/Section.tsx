import Image from 'next/image'

type SectionProps = {
  title: string
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
}

export default function Section({ title, imageSrc, imageAlt, children }: SectionProps) {
  return (
    <section className="w-full p-[5%] border-t border-border flex gap-[50px] mb-[30px]">
      <div className="flex flex-col items-center gap-5">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={70}
          height={70}
          quality={75}
          loading="lazy"
          draggable="false"
        />
        <p className="font-bold text-heading-text text-[15px]">{title}</p>
      </div>
      <div className="w-full">{children}</div>
    </section>
  )
}
