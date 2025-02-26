'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

import { getUserDiaries } from '@/lib/api/user'
import { Post } from '@/components/Page/User/Posts'

type PostType = {
  commentCount: number
  diaryContents: string
  diaryId: string
  diaryPublishedAt: string
  diaryThumbnail: null | string
  diaryTitle: string
  likeCount: number
}

type PostsProps = {
  params: { id: string }
}

export default function Posts({ params }: PostsProps) {
  const { id: userId } = params

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => {
      const isDesktop = window.innerHeight >= 1000
      return isDesktop
        ? getUserDiaries({ userId, pageParam, pageSize: 8 })
        : getUserDiaries({ userId, pageParam, pageSize: 4 })
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage?.pageInfo.isLast)
      const nextPage = lastPage?.pageInfo.isLast ? undefined : lastPage.pageInfo.page
      return nextPage
    },
    initialPageParam: 0,
  })

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  return (
    <div className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[10%] pb-[100px]">
      {data?.pages[0].data.map((post: PostType) => <Post key={post.diaryId} post={post} />)}
    </div>
  )
}
