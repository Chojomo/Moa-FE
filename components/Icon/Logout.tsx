import { IconProps } from '@/types'
import { Svg } from './index'

export default function Logout({ className, width, height, fill = '#A6A6A6' }: IconProps) {
  return (
    <Svg
      width={width || 18}
      height={height || 18}
      viewBox={[0, 0, 18, 18]}
      className={className || ''}
    >
      <path
        d="M2 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H8C8.55 18 9 17.55 9 17C9 16.45 8.55 16 8 16H2V2Z"
        fill={fill}
      />
      <path
        d="M17.65 8.65053L14.86 5.86053C14.7905 5.78908 14.7012 5.74001 14.6036 5.7196C14.506 5.69918 14.4045 5.70836 14.3121 5.74594C14.2198 5.78353 14.1408 5.84782 14.0851 5.93058C14.0295 6.01334 13.9999 6.11082 14 6.21053V8.00053H7C6.45 8.00053 6 8.45053 6 9.00053C6 9.55053 6.45 10.0005 7 10.0005H14V11.7905C14 12.2405 14.54 12.4605 14.85 12.1405L17.64 9.35053C17.84 9.16053 17.84 8.84053 17.65 8.65053Z"
        fill={fill}
      />
    </Svg>
  )
}
