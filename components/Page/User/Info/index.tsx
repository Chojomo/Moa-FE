import Profile from './Profile'

export default function UserInfo() {
  const ghost = {
    profile: '/images/pebble/purple-pebble2.png',
    nickName: 'ichubtou',
    follows: 3,
    followers: 2,
  }
  return (
    <div className="w-[70%]">
      <Profile user={ghost} />
    </div>
  )
}
