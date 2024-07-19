type IntroTipProps = {
  children?: React.ReactNode
}

export default function IntroTip({ children }: IntroTipProps) {
  const baseStyle = `relative bottom-[15px] rounded-[50px] text-[12px] text-[#fff] bg-main-blue px-[20px] cursor-default font-bold`
  return <span className={`${baseStyle} tooltip tooltip-intro`}>{children}</span>
}
