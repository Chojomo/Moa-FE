import { IconProps } from '@/types'
import { Svg } from './index'

export default function Naver({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 82}
      height={height || 82}
      viewBox={[0, 0, 82, 82]}
      className={className || ''}
    >
      <g filter="url(#filter0_d_570_2673)">
        <circle cx="41" cy="41" r="40" fill="#5AC367" />
      </g>
      <path
        d="M46.3413 42.0562L35.22 26H26V56H35.6575V39.945L46.78 56H56V26H46.3413V42.0562Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_570_2673"
          x="0"
          y="0"
          width="82"
          height="82"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_570_2673" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_570_2673"
            result="shape"
          />
        </filter>
      </defs>
    </Svg>
  )
}
