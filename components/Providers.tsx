'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} /> */}
    </QueryClientProvider>
  )
}

export default Providers
