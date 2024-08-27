import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Bold({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 13}
      height={height || 15}
      viewBox={[0, 0, 13, 15]}
      className={className || ''}
    >
      <path
        d="M11.061 7.22C11.6659 6.44198 11.9961 5.48551 12 4.5C12 2.019 9.981 0 7.5 0H0V15H8C10.481 15 12.5 12.981 12.5 10.5C12.4987 9.8837 12.3702 9.27431 12.1226 8.70993C11.875 8.14556 11.5136 7.63834 11.061 7.22ZM7.5 3C8.327 3 9 3.673 9 4.5C9 5.327 8.327 6 7.5 6H3V3H7.5ZM8 12H3V9H8C8.827 9 9.5 9.673 9.5 10.5C9.5 11.327 8.827 12 8 12Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
