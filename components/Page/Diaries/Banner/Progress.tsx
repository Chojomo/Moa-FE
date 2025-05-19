import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'

type ProgressProps = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  maxStep: number
}

export default function Progress({ step, setStep, maxStep }: ProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setProgress(0)
  }, [step])

  useEffect(() => {
    if (isPaused) return undefined

    const handleProgress = () => {
      if (progress >= 100) {
        setProgress(100)

        setTimeout(() => {
          setStep((prevStep) => (prevStep >= maxStep ? 1 : prevStep + 1))
          setProgress(0)
          setIsPaused(false)
        }, 500)
      } else {
        setProgress((prev) => prev + 1)
      }
    }

    const intervalId = setTimeout(handleProgress, 30)

    return () => clearTimeout(intervalId)
  }, [progress, isPaused, setStep])

  const togglePause = () => setIsPaused((prev) => !prev)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <p className="text-gray-200 text-xs">
          <span className="text-white">{step}</span> / {maxStep}
        </p>
        <Button
          type="button"
          ariaLabel="Toggle progress"
          onClick={togglePause}
          className="bg-gray-600 rounded-full p-1"
        >
          <Icon name={isPaused ? 'Play' : 'Pause'} width={10} height={10} />
        </Button>
      </div>
      <div className="w-full h-0.5 bg-gray-400 relative">
        <div className="absolute top-0 left-0 h-full bg-white" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
