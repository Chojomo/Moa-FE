import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Quote({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 18}
      height={height || 18}
      viewBox={[0, 0, 18, 18]}
      className={className || ''}
    >
      <path
        d="M9 10H12L14 6V0H8V6H11M1 10H4L6 6V0H0V6H3L1 10Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
