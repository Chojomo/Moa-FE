import Border from './Border'
import Marquee from './Marquee'
import Favorite from './Favorite'
import AddButton from './AddButton'

export default function Intro() {
  const favorites = [
    { index: 1, src: '/images/pebble/blue-pebble.png', name: 'Diary', href: '/diaries/viewCount' },
    {
      index: 2,
      src: '/images/pebble/purple-pebble2.png',
      name: 'SuikaGame',
      href: '/zip/suikaGame',
    },
    {
      index: 3,
      src: '/images/pebble/red-pebble2.png',
      name: 'Chat',
      href: '/zip/chat',
    },
  ]
  return (
    <div className="w-[100vw] h-[100vh] py-[74px] flex-center">
      <section className="z-10 relative w-[90%] h-[100%] bg-container-bg rounded-2xl mt-[10px] px-[6%] py-[13%] md:py-[6%] overflow-hidden">
        <div className="flex gap-[35px] md:gap-[55px]">
          {favorites.map(({ index, src, name, href }) => (
            <Favorite key={index} src={src} name={name} href={href} />
          ))}
          <AddButton />
        </div>
        <Border />
      </section>
      <Marquee />
    </div>
  )
}
