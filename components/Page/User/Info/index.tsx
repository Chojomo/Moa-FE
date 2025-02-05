import Profile from './Profile'

export default function UserInfo() {
  const ghost = {
    profile: '/images/pebble/purple-pebble2.png',
    nickName: 'ichubtou',
    dio: '안녕하세요. 반갑습니다.',
    follows: 3,
    followers: 2,
  }
  return (
    <div className="w-full h-full">
      <Profile user={ghost} />
    </div>
  )
}
