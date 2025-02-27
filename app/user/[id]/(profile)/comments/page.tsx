'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

import { getUserComments } from '@/lib/api/user'

import { Comment } from '@/components/Page/User/Comments'

type CommentType = {
  commentContents: string
  commentCreatedAt: string
  commentId: string
  diaryId: string
  diaryTitle: string
}

type CommentsProps = {
  params: { id: string }
}

export default function Comments({ params }: CommentsProps) {
  const { id: userId } = params

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['dfsf'],
    queryFn: ({ pageParam = 0 }) => {
      const isDesktop = window.innerHeight >= 1000
      return isDesktop
        ? getUserComments({ userId, pageParam, pageSize: 8 })
        : getUserComments({ userId, pageParam, pageSize: 5 })
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.pageInfo.isLast ? undefined : lastPage.pageInfo.page

      console.log(nextPage)
      return nextPage
    },
    initialPageParam: 0,
  })

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  return (
    <div className="w-full animate-fadeIn flex flex-wrap justify-center gap-10 pt-[5%] pb-[10%]">
      {data?.pages[0].data.map((comment: CommentType) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}

      <div className="flex justify-center items-center p-4">
        {isFetchingNextPage && <p>로드 중...</p>}
      </div>
    </div>
  )
}
