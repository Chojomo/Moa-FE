export const isMatchDevice = () => {
  const isDesktop = window.matchMedia('(min-width: 1280px)').matches
  const isLaptop = window.matchMedia('(min-width: 1024px) and (max-width: 1280px)').matches
  const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 1024px)').matches
  const isMobile = window.matchMedia('(max-width: 600px)').matches
  const isMobileXS = window.matchMedia('(max-width: 400px)').matches

  return { isDesktop, isLaptop, isTablet, isMobile, isMobileXS }
}
