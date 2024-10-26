import Progress from './Progress'

export default function Banner() {
  return (
    <section className="w-full h-[270px] flex-center gap-[10%] bg-banner-bg py-[40px]">
      <div className="max-w-[300px] h-full flex flex-col justify-between">
        <div className="h-[full] flex flex-col">
          <h3 className="text-white text-[24px] font-bold mb-[18px]">인기 게시물</h3>
          <p className="text-[#FFFFFFCC] text-[16px]">현재 최고 인기 있는 게시물을 살펴 보세요</p>
        </div>
        <Progress />
      </div>
      <div className="text-[#FFFFFFCC]">diary post</div>
      {/* <div>arrow</div> */}
    </section>
  )
}
