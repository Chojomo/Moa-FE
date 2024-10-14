import Profile from './Profile'

export default function UserInfo() {
  const ghost = {
    profile: '/images/pebble/purple-pebble2.png',
    nickName: 'ichubtou',
    follows: 3,
    followers: 2,
  }
  return (
    <div className="w-full h-[90px] mt-[130px] mb-[10%]">
      <Profile user={ghost} />
    </div>
  )
}
