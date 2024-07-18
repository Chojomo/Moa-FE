// import { Intro } from '@/components/Page/Home'
import Next from '@/components/Arrow/Next'
import Pages from '@/components/Page/Home'

export default function Home() {
  return (
    <div className="bg-background w-[100vw] h-[100vh] px-[30px]">
      <div className="h-[200vh]">
        {Pages.map(({ name, Component }) => (
          <div key={name} className="w-[100%] h-[100vh] flex-center">
            <Component />
          </div>
        ))}
      </div>
      <Next />
    </div>
  )
}
