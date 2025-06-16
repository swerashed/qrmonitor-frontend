import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SettingsLoading = () => {
    return (
        <div className='p-10 space-y-6'>
            <div className='flex flex-col gap-2'>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-6 w-80" />
            </div>

            <div className='flex gap-2 w-full'>
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
            </div>
            <Card className='p-6 space-y-4'>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-6 w-80" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-10 w-40" />
            </Card>
            <Card className='p-6 space-y-4'>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-6 w-80" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-10 w-40" />
            </Card>
            <Card className='p-6 space-y-4'>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-6 w-80" />
                </div>

                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <div className='flex gap-3'>
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className='flex gap-3'>
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className='flex gap-3'>
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-10 w-40" />
            </Card>
        </div>
    )
}

export default SettingsLoading