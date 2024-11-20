import { IconProps } from '@/types'
import { Svg } from './index'

export default function Comment({ className, width, height, fill = '#43D8AA' }: IconProps) {
  return (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox={[0, 0, 24, 24]}
      className={className || ''}
    >
      <path
        d="M12.0025 23C14.4016 22.9995 16.7348 22.2146 18.6465 20.765C20.5581 19.3154 21.9435 17.2805 22.5913 14.9705C23.2392 12.6605 23.1141 10.202 22.2351 7.96971C21.3561 5.7374 19.7713 3.85369 17.7224 2.60562C15.6734 1.35755 13.2726 0.813577 10.8858 1.05659C8.49901 1.2996 6.2571 2.31627 4.50173 3.95167C2.74636 5.58707 1.57379 7.75153 1.1627 10.1152C0.751609 12.4788 1.12455 14.9121 2.22469 17.0441L1.00247 23L6.95836 21.7778C8.46902 22.5588 10.185 23 12.0025 23Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50195 12H6.51418V12.0122H6.50195V12ZM12.002 12H12.0142V12.0122H12.002V12ZM17.502 12H17.5142V12.0122H17.502V12Z"
        stroke={fill}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
