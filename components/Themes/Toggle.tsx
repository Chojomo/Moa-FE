'use client'

import { useTheme } from 'next-themes'

import { ThemeButton } from '../Button/ThemeButton'
import { Icon } from '../Icon'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <ThemeButton
      className="px-[14px] py-[5px]"
      onClick={() => (resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Icon name="Themes" width={20} height={20} fill="rgb(166,166,166)" />
    </ThemeButton>
  )
}
