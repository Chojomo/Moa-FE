import Pages from '@/components/Page/Diary'
import Arrow from '@/components/Arrow'

export default function Diary() {
  return (
    <div
      id="scroller"
      className="relative bg-background w-[100vw] h-[100vh] overflow-x-hidden scroll-smooth"
    >
      <div className="h-[200vh]">
        {Pages.map(({ name, Component }) => (
          <Component key={name} />
        ))}
        <Arrow />
      </div>
    </div>
  )
}
