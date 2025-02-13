export default function Marquee() {
  return (
    <div className="w-[100vw] absolute overflow-hidden">
      <div className="whitespace-nowrap will-change-transform animate-slideLeft text-heading-bg text-[100px] md:text-[200px] font-bold ">
        <span className="inline-block">
          &nbsp;JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN
          US MOA!
        </span>
        <span className="inline-block">
          &nbsp;JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN
          US MOA!
        </span>
        <span className="inline-block">
          &nbsp;JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN US MOA! JOIN
          US MOA!
        </span>
      </div>
    </div>
  )
}
