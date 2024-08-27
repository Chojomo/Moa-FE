import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

export default function Image({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 18}
      height={height || 18}
      viewBox={[0, 0, 18, 18]}
      className={className || ''}
    >
      <path
        d="M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2ZM3 14H15L11.25 9L8.25 13L6 10L3 14Z"
        fill={resolvedTheme === 'light' ? '#202020' : '#cbcbcb'}
      />
    </Svg>
  )
}
