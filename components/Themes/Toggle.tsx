'use client'

import { useTheme } from 'next-themes'

import { ThemeButton } from '../Button/ThemeButton'
import { Icon } from '../Icon'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  console.log(`resolvedTheme : ${resolvedTheme}`)

  return (
    <ThemeButton
      className="min-w-[55px] nav-item border-nav-border text-icon-normal"
      onClick={() => (resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Icon name="Themes" width={20} height={20} fill="rgb(166,166,166)" />
    </ThemeButton>
  )
}
