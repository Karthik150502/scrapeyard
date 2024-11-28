'use client'
import { ThemeProvider } from 'next-themes'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader"

export default function AppProviders({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState<QueryClient>(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient} >
            <NextTopLoader color='#7C3AED' showSpinner={false} />
            <ThemeProvider
                attribute={"class"}
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    )
}
