import Link from 'next/link'

export default function Zip() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <p>Zip</p>
      <p>Zip</p>
      <p>Zip</p>
      <Link
        href="/demo"
        className="text-center w-[150px] p-[20px] bg-accent rounded-full text-black font-bold"
      >
        Demo Editor
      </Link>
    </div>
  )
}
