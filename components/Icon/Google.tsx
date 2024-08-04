import { IconProps } from '@/types'
import { Svg } from './index'

export default function Google({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 82}
      height={height || 82}
      viewBox={[0, 0, 82, 82]}
      className={className || ''}
    >
      <g filter="url(#filter0_d_570_2676)">
        <circle cx="41" cy="41" r="40" fill="white" />
      </g>
      <path
        d="M60.611 37.083H59V37H41V45H52.303C50.654 49.657 46.223 53 41 53C34.373 53 29 47.627 29 41C29 34.373 34.373 29 41 29C44.059 29 46.842 30.154 48.961 32.039L54.618 26.382C51.046 23.053 46.268 21 41 21C29.955 21 21 29.955 21 41C21 52.045 29.955 61 41 61C52.045 61 61 52.045 61 41C61 39.659 60.862 38.35 60.611 37.083Z"
        fill="#FFC107"
      />
      <path
        d="M23.3062 31.691L29.8772 36.51C31.6552 32.108 35.9612 29 41.0002 29C44.0592 29 46.8422 30.154 48.9612 32.039L54.6182 26.382C51.0462 23.053 46.2682 21 41.0002 21C33.3182 21 26.6562 25.337 23.3062 31.691Z"
        fill="#FF3D00"
      />
      <path
        d="M40.9998 60.9997C46.1658 60.9997 50.8598 59.0227 54.4088 55.8077L48.2188 50.5697C46.1434 52.1481 43.6073 53.0018 40.9998 52.9997C35.7978 52.9997 31.3808 49.6827 29.7168 45.0537L23.1948 50.0787C26.5048 56.5557 33.2268 60.9997 40.9998 60.9997Z"
        fill="#4CAF50"
      />
      <path
        d="M60.611 37.083H59V37H41V45H52.303C51.5142 47.2164 50.0934 49.1532 48.216 50.571L48.219 50.569L54.409 55.807C53.971 56.205 61 51 61 41C61 39.659 60.862 38.35 60.611 37.083Z"
        fill="#1976D2"
      />
      <defs>
        <filter
          id="filter0_d_570_2676"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_570_2676" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_570_2676"
            result="shape"
          />
        </filter>
      </defs>
    </Svg>
  )
}
