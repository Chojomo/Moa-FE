// import { Intro } from '@/components/Page/Home'
import Pages from '@/components/Page/Home'
import Next from '@/components/Arrow/Next'

export default function Home() {
  return (
    <div className="relative bg-background w-[100vw] h-[100vh] overflow-x-hidden">
      <div className="h-[200vh]">
        {Pages.map(({ name, Component }) => (
          <Component key={name} />
        ))}
      </div>
      <Next />
    </div>
  )
}
