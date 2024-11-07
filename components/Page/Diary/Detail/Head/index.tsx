import Image from 'next/image'

export default function Head() {
  return (
    <div className="bg-red-300">
      <h1 className="text-[32px] text-heading-text font-bold mb-[35px]">
        아침 출근길,,, 그리고 회사에서
      </h1>
      <div className="">
        {/* <Image /> */}
        <div>
          <p>닉네임</p>
          <p>날짜</p>
        </div>
        <div>팔로우</div>
      </div>
    </div>
  )
}
