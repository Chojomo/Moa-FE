import { Icon } from '@/components/Icon'
import { posts } from '@/helper/constants/popular'
import PopularCard from './PopularCard'

export default function Intro() {
  return (
    <div className="w-[100vw] h-[100vh] flex-center flex-col gap-[50px]">
      <div className="flex-center flex-col gap-[20px]">
        <i className="w-[70px] h-[70px] flex-center rounded-full bg-icon-bg">
          <Icon name="Crown" width={36} height={34} />
        </i>
        <h1 className="text-[24px] text-heading-text font-bold">most popular</h1>
      </div>
      <div className="flex-center gap-[50px]">
        {posts.map((post) => (
          <PopularCard
            key={post.index}
            //  이미지 없을 때 랜덤 도형 넣어주기
            post={post}
          />
        ))}
      </div>
    </div>
  )
}
