'use client'

import { Icon } from '@/components/Icon'
import Button from '@/components/Button'

export default function OAuth() {
  const types = [
    { name: 'kakao', icon: 'Kakao' },
    { name: 'naver', icon: 'Naver' },
    { name: 'google', icon: 'Google' },
  ]

  const handleClick = (name: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${name}`
  }

  return (
    <div className="flex-center gap-[30px] mt-[10px]">
      {types.map(({ name, icon }) => (
        <Button
          key={name}
          type="button"
          ariaLabel={`${name} 로그인 버튼`}
          className={name === 'google' ? 'border border-border rounded-full' : ''}
          onClick={() => handleClick(name)}
        >
          <Icon name={icon} width={50} height={50} />
        </Button>
      ))}
    </div>
  )
}
