import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Code({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 20}
      height={height || 12}
      viewBox={[0, 0, 20, 12]}
      className={className || ''}
    >
      <path
        d="M6 12L0 6L6 0L7.425 1.425L2.825 6.025L7.4 10.6L6 12ZM14 12L12.575 10.575L17.175 5.975L12.6 1.4L14 0L20 6L14 12Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
