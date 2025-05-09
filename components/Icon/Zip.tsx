import { IconProps } from '@/types'
import { Svg } from './index'

export default function Zip({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 20}
      height={height || 16}
      viewBox={[0, 0, 20, 16]}
      className={className || ''}
    >
      <path
        d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H8L10 2H18C18.55 2 19.021 2.196 19.413 2.588C19.805 2.98 20.0007 3.45067 20 4V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2Z"
        fill="currentColor"
      />
    </Svg>
  )
}
