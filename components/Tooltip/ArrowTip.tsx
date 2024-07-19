type ArrowTipProps = {
  children?: React.ReactNode
}

export default function ArrowTip({ children }: ArrowTipProps) {
  const baseStyle = `absolute top-[56px] right-[7px] rounded-[4px] text-[12px] text-[#fff] bg-[#333]`

  return <span className={`${baseStyle} tooltip tooltip-arrow`}>{children}</span>
}
