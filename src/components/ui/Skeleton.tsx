import { cn } from '@/lib/utils'
import React from 'react'


export default function Skeleton({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
    return (
        <div 
        className={cn(
            'bg-gray-900/10 rounded-md animate-pulse dark:bg-slate-500 w-full h-4',
            className
        )} 
        />
    )
}