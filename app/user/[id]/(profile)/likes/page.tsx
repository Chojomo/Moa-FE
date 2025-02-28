'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getUserLikes } from '@/lib/api/user'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

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

type LikesProps = {
  params: { id: string }
}

export default function Likes({ params }: LikesProps) {
  const { id: userId } = params

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['likes'],
    queryFn: ({ pageParam = 0 }) => {
      const isDesktop = window.innerHeight >= 1000
      return isDesktop
        ? getUserLikes({ userId, pageParam, pageSize: 8 })
        : getUserLikes({ userId, pageParam, pageSize: 5 })
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pageInfo.isLast ? undefined : lastPage.pageInfo.page
      return nextPage
    },
    initialPageParam: 0,
  })

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  return (
    <div className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[5%] pb-[10%]">
      {data?.pages.flatMap((page) =>
        page.data.map((post: PostType) => <Post key={post.diaryId} post={post} />)
      )}
    </div>
  )
}
