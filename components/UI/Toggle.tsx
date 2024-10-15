import { useState } from 'react'
import Button from '../Button'

type ToggleProps = {
  initialState?: boolean
  callback: () => void
}

export default function Toggle({ initialState = false, callback }: ToggleProps) {
  const [isToggled, setIsToggled] = useState(initialState)

  const handleToggle = () => {
    setIsToggled((prev) => !prev)

    if (!isToggled) {
      callback()
    }
  }

  return (
    <Button
      type="button"
      ariaLabel="토글 버튼"
      className={`w-[75px] h-[35px] rounded-full flex items-center p-2 cursor-pointer ${isToggled ? 'bg-main-blue' : 'bg-toggle-bg'}`}
      onClick={handleToggle}
    >
      <div
        className={`w-[25px] h-[25px] rounded-full bg-white transition-transform duration-300 ${
          isToggled ? 'transform translate-x-[35px]' : ''
        }`}
      />
    </Button>
  )
}
