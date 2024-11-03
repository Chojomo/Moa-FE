import Sort from '../Sort'
import Post from './Post'
import { posts } from '@/helper/constants/posts'

export default function Posts() {
  return (
    <div className="w-full flex-grow flex flex-col bg-background">
      <Sort />
      <div className="w-[full] flex flex-col flex-grow px-[10%] gap-[40px] sm:gap-[0px] mb-[95px]">
        {posts.map((post) => (
          <Post key={post.index} post={post} />
        ))}
      </div>
    </div>
  )
}
