import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Italic({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 14}
      height={height || 16}
      viewBox={[0, 0, 14, 16]}
      className={className || ''}
    >
      <path
        d="M14 3V0H4V3H6.868L4.012 13H0V16H10V13H7.132L9.988 3H14Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
