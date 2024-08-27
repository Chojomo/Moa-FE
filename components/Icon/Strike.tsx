import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Strike({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 18}
      height={height || 15}
      viewBox={[0, 0, 18, 15]}
      className={className || ''}
    >
      <path
        d="M7 15H11V12H7V15ZM2 0V3H7V6H11V3H16V0H2ZM0 10H18V8H0V10Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
