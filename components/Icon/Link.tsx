import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Link({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 20}
      height={height || 10}
      viewBox={[0, 0, 20, 10]}
      className={className || ''}
    >
      <path
        d="M15 0H12C11.45 0 11 0.45 11 1C11 1.55 11.45 2 12 2H15C16.65 2 18 3.35 18 5C18 6.65 16.65 8 15 8H12C11.45 8 11 8.45 11 9C11 9.55 11.45 10 12 10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM6 5C6 5.55 6.45 6 7 6H13C13.55 6 14 5.55 14 5C14 4.45 13.55 4 13 4H7C6.45 4 6 4.45 6 5ZM8 8H5C3.35 8 2 6.65 2 5C2 3.35 3.35 2 5 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H8C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
