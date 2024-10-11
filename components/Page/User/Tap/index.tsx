import { taps } from '@/helper/constants/taps'
import Link from 'next/link'

export default function Tap() {
  return (
    <div className="w-full flex-center">
      <ul className="flex gap-20 border border-border px-10 py-3 rounded-full text-[15px]">
        {taps.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
