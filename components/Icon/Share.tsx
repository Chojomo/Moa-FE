import { IconProps } from '@/types'
import { Svg } from './index'

export default function Share({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 22}
      height={height || 22}
      viewBox={[0, 0, 22, 22]}
      className={className || ''}
    >
      <path
        d="M13 2H20V9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 13.7368V18.5C20 19.3285 19.3285 20 18.5 20H3.5C2.67158 20 2 19.3285 2 18.5V3.5C2 2.67158 2.67158 2 3.5 2H8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8984 10.1L19.5484 2.44995"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
