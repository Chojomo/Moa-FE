import Button from '@/components/Button'
import { Footer } from '@/components/Layout'
import SurveyImage from './SurveyImage'

export default function Survey() {
  return (
    <div className="relative w-[100%] h-[100vh] flex-center flex-col text-center">
      <SurveyImage />
      <p className="leading-8 mt-[20px] mb-[40px] text-body-text text-[20px]">
        Welcome!
        <br /> What are you interested in?
      </p>
      <Button
        type="button"
        ariaLabel="start button"
        className="z-10 bg-accent-normal text-[#fff]  font-bold px-[63px] py-[15px] rounded-[50px] shadow-lg transform hover:scale-[1.1] transition-transform duration-200"
      >
        REPLY IT!
      </Button>
      <p className="text-[12px] text-body-text mt-[8px]">Present comments to MOA</p>
      <Footer />
    </div>
  )
}
