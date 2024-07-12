'use client'

import { useTheme } from 'next-themes'

import { ThemeButton } from '../UI/ThemeButton'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  console.log(`resolvedTheme : ${resolvedTheme}`)

  return (
    <ThemeButton
      size="icon"
      variant="outline"
      className="fixed bottom-4 left-4 z-10"
      onClick={() => (resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <button type="button">sszzz</button>
    </ThemeButton>
  )
}
