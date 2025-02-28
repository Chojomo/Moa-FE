export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="w-full h-[100vh] flex-center">
        <div className="z-10 w-[90%] md:w-[60%] h-[100vh] pt-[74px] pb-[10%] flex flex-col">
          {children}
        </div>
        <div className="absolute top-0 w-full h-1/2 bg-[linear-gradient(0deg,#FFFFFF,#e9e9e9)] dark:bg-[linear-gradient(0deg,#000000,#2a2a2a)]" />
      </div>
    </div>
  )
}
