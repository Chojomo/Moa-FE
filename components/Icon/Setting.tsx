import { IconProps } from '@/types'
import { Svg } from './index'

export default function Setting({ className, width, height }: IconProps) {
  return (
    <Svg
      width={width || 30}
      height={height || 31}
      viewBox={[0, 0, 30, 31]}
      className={className || ''}
    >
      <path
        d="M27.5489 16.2778C27.3041 15.9992 27.1691 15.641 27.1691 15.2701C27.1691 14.8993 27.3041 14.5411 27.5489 14.2624L29.5032 12.0638C29.7185 11.8236 29.8522 11.5214 29.8852 11.2004C29.9181 10.8795 29.8485 10.5564 29.6864 10.2775L26.6328 4.99473C26.4723 4.71612 26.228 4.49528 25.9346 4.36368C25.6413 4.23209 25.3139 4.19645 24.9991 4.26187L22.1287 4.84205C21.7635 4.91752 21.3832 4.85669 21.0598 4.67105C20.7363 4.48541 20.492 4.18779 20.3729 3.83436L19.4415 1.0403C19.3391 0.737049 19.1439 0.473653 18.8837 0.287348C18.6234 0.101042 18.3111 0.00125014 17.991 0.00207639H11.8838C11.5509 -0.0153018 11.2214 0.0767775 10.9457 0.26425C10.67 0.451723 10.4632 0.724285 10.357 1.0403L9.502 3.83436C9.38291 4.18779 9.13858 4.48541 8.81511 4.67105C8.49164 4.85669 8.11141 4.91752 7.74618 4.84205L4.79944 4.26187C4.50103 4.2197 4.19681 4.26679 3.92511 4.3972C3.65341 4.52762 3.42639 4.73552 3.27263 4.99473L0.219022 10.2775C0.0528443 10.5533 -0.0218745 10.8746 0.00554772 11.1954C0.0329699 11.5163 0.161129 11.8202 0.371702 12.0638L2.31075 14.2624C2.55552 14.5411 2.69052 14.8993 2.69052 15.2701C2.69052 15.641 2.55552 15.9992 2.31075 16.2778L0.371702 18.4764C0.161129 18.72 0.0329699 19.024 0.00554772 19.3448C-0.0218745 19.6657 0.0528443 19.987 0.219022 20.2628L3.27263 25.5455C3.4331 25.8242 3.67742 26.045 3.97077 26.1766C4.26412 26.3082 4.59153 26.3438 4.90632 26.2784L7.77671 25.6982C8.14195 25.6228 8.52218 25.6836 8.84565 25.8692C9.16912 26.0549 9.41345 26.3525 9.53254 26.7059L10.4639 29.5C10.5701 29.816 10.7769 30.0885 11.0526 30.276C11.3283 30.4635 11.6578 30.5556 11.9907 30.5382H18.0979C18.418 30.539 18.7303 30.4392 18.9905 30.2529C19.2508 30.0666 19.446 29.8032 19.5484 29.5L20.4797 26.7059C20.5988 26.3525 20.8432 26.0549 21.1666 25.8692C21.4901 25.6836 21.8703 25.6228 22.2356 25.6982L25.106 26.2784C25.4208 26.3438 25.7482 26.3082 26.0415 26.1766C26.3349 26.045 26.5792 25.8242 26.7396 25.5455L29.7933 20.2628C29.9554 19.9839 30.025 19.6608 29.992 19.3398C29.9591 19.0189 29.8254 18.7166 29.61 18.4764L27.5489 16.2778ZM25.2739 18.3237L26.4954 19.6979L24.541 23.0874L22.7394 22.7209C21.6398 22.4962 20.4959 22.683 19.5249 23.2459C18.5539 23.8088 17.8233 24.7086 17.4719 25.7746L16.8917 27.4846H12.9831L12.4335 25.744C12.0821 24.6781 11.3515 23.7782 10.3805 23.2153C9.40952 22.6524 8.26563 22.4656 7.16599 22.6904L5.36436 23.0568L3.37951 19.6826L4.60096 18.3085C5.35208 17.4687 5.76733 16.3815 5.76733 15.2549C5.76733 14.1282 5.35208 13.041 4.60096 12.2013L3.37951 10.8271L5.33382 7.46816L7.13545 7.83459C8.23509 8.05937 9.37899 7.87258 10.35 7.30967C11.321 6.74677 12.0515 5.84693 12.4029 4.78098L12.9831 3.05569H16.8917L17.4719 4.79625C17.8233 5.8622 18.5539 6.76203 19.5249 7.32494C20.4959 7.88785 21.6398 8.07464 22.7394 7.84986L24.541 7.48343L26.4954 10.8729L25.2739 12.2471C24.5312 13.0849 24.1211 14.1658 24.1211 15.2854C24.1211 16.405 24.5312 17.4859 25.2739 18.3237ZM14.9374 9.16291C13.7295 9.16291 12.5488 9.5211 11.5444 10.1922C10.5401 10.8632 9.75733 11.8171 9.29509 12.933C8.83285 14.049 8.71191 15.2769 8.94756 16.4616C9.18321 17.6463 9.76486 18.7345 10.619 19.5886C11.4731 20.4427 12.5613 21.0244 13.746 21.26C14.9307 21.4957 16.1586 21.3747 17.2746 20.9125C18.3905 20.4502 19.3443 19.6675 20.0154 18.6631C20.6865 17.6588 21.0447 16.478 21.0447 15.2701C21.0447 13.6504 20.4012 12.097 19.2559 10.9517C18.1106 9.80635 16.5572 9.16291 14.9374 9.16291ZM14.9374 18.3237C14.3335 18.3237 13.7431 18.1447 13.2409 17.8091C12.7388 17.4736 12.3474 16.9967 12.1163 16.4387C11.8851 15.8807 11.8247 15.2667 11.9425 14.6744C12.0603 14.0821 12.3511 13.538 12.7782 13.1109C13.2053 12.6839 13.7494 12.393 14.3417 12.2752C14.934 12.1574 15.548 12.2178 16.106 12.449C16.664 12.6801 17.1409 13.0715 17.4764 13.5736C17.812 14.0758 17.991 14.6662 17.991 15.2701C17.991 16.08 17.6693 16.8567 17.0967 17.4294C16.524 18.002 15.7473 18.3237 14.9374 18.3237Z"
        fill="currentColor"
      />
    </Svg>
  )
}
