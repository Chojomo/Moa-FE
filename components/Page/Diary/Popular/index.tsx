import Image from 'next/image'

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
      <div className="absolute left-0 bottom-0 w-full h-[70%] bg-[#00000099]">
        <p>타이틀</p>
        <p>설명</p>
        <p>날짜</p>
        <div>
          <div>아이콘</div>
          <span>작성자</span>
        </div>
      </div>
    </div>
  )
}
