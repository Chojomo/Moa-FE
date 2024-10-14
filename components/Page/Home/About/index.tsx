import { Footer } from '@/components/Layout'
import Left from './Left'
import Right from './Right'

export default function About() {
  return (
    <div className="relative w-[100%] h-[100vh] flex-center flex-col text-center">
      <div className="flex-center flex-col md:flex-row relative w-[90%] h-[75%] bg-container-bg rounded-2xl overflow-hidden md:gap-[50px]">
        <Left />
        <Right />
      </div>
      <Footer />
    </div>
  )
}
