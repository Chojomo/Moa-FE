// import { Intro } from '@/components/Page/Home'
import Pages from '@/components/Page/Home'
import Next from '@/components/Arrow/Next'

export default function Home() {
  return (
    <div className="relative bg-background w-[100vw] h-[100vh] overflow-x-hidden px-[30px]">
      <div className="h-[200vh]">
        {Pages.map(({ name, Component }) => (
          <div
            key={name}
            className="w-[100%] h-[100vh] lg:flex-center lg:flex-row flex flex-col justify-center items-center lg:gap-[50px]"
          >
            <Component />
          </div>
        ))}
      </div>
      <Next />
    </div>
  )
}
