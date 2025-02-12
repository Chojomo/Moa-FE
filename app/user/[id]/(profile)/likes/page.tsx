import { POSTS } from '@/helper/constants/posts'
import { Post } from '@/components/Page/User/Posts'

// 임시 타입
type PostType = {
  index: number
  src: string
  writer: string
  title: string
  description: string
}

export default function Likes() {
  return (
    <div className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[5%] pb-[10%]">
      {POSTS.map((post: PostType) => (
        <Post key={post.index} post={post} />
      ))}
    </div>
  )
}
