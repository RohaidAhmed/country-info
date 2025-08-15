// app/providers.tsx
'use client'

import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ProvidersProps = {
    children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    // Create a QueryClient instance once per session
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
