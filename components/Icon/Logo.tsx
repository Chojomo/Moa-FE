'use client'

import { useTheme } from 'next-themes'
import { IconProps } from '@/types'
import { Svg } from './index'

function Light() {
  return (
    <>
      <path
        d="M50 35.3553V25.059C50 15.8116 38.7848 11.2152 32.2459 17.7541C28.2098 21.7902 21.6483 21.7936 17.6257 17.744C11.1404 11.2152 0 15.8079 0 25.0103V35.4044C0 43.4653 6.53469 50 14.5956 50H35.3553C43.4434 50 50 43.4434 50 35.3553Z"
        fill="url(#paint0_linear_327_618)"
      />
      <circle cx="14.8829" cy="39.1302" r="2.50836" fill="#1D1D1F" fillOpacity="0.9" />
      <g filter="url(#filter0_d_327_618)">
        <circle
          cx="35.1172"
          cy="39.1302"
          r="2.50836"
          fill="#1D1D1F"
          fillOpacity="0.9"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_327_618"
          x="28.6089"
          y="36.6218"
          width="13.0166"
          height="13.0166"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_327_618" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_327_618"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_327_618"
          x1="25"
          y1="0"
          x2="25"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#C5C5C5" />
        </linearGradient>
      </defs>
    </>
  )
}

function Dark() {
  return (
    <>
      <path
        d="M50 35.3553V25.059C50 15.8116 38.7848 11.2152 32.2459 17.7541C28.2098 21.7902 21.6483 21.7936 17.6257 17.744C11.1404 11.2152 0 15.8079 0 25.0103V35.4044C0 43.4653 6.53469 50 14.5956 50H35.3553C43.4434 50 50 43.4434 50 35.3553Z"
        fill="url(#paint0_linear_327_614)"
      />
      <circle cx="14.8828" cy="39.1302" r="2.50836" fill="black" fillOpacity="0.9" />
      <g filter="url(#filter0_d_327_614)">
        <circle
          cx="35.1171"
          cy="39.1302"
          r="2.50836"
          fill="black"
          fillOpacity="0.9"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_327_614"
          x="28.6088"
          y="36.6218"
          width="13.0167"
          height="13.0166"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_327_614" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_327_614"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_327_614"
          x1="25"
          y1="0"
          x2="25"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.94" />
          <stop offset="1" stopColor="#C5C5C5" />
        </linearGradient>
      </defs>
    </>
  )
}

export default function Logo({ className, width, height }: IconProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Svg
      width={width || 35}
      height={height || 35}
      viewBox={[0, 0, 50, 50]}
      className={className || ''}
    >
      {resolvedTheme === 'light' ? <Light /> : <Dark />}
    </Svg>
  )
}
