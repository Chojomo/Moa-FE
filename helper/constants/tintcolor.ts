export const tintcolor = (activeIndex: number, index: number) => {
  return activeIndex === index
    ? 'border-white-active text-white-active'
    : 'border-nav-border text-icon-normal'
}

export const tincolorIcon = (activeIndex: number, index: number) => {
  return activeIndex === index ? 'rgba(255, 255, 255, 0.85)' : 'rgb(166,166,166)'
}
