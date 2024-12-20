import React, { Suspense } from 'react'
import { Period } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { PeriodSelectorWrapper } from './_components/periodSelectorWrapper';
import { StatsCardsSkeleton } from './_components/statsCardSkeleton';
import { StatsCards } from './_components/statCards';
import { getWorlflowEcxecutionStats } from '@/actions/analytics/getWorlflowEcxecutionStats';
import ExecutionStatusChart from './_components/executionStatusChart';
import { getCreditsUsageInPeriod } from '@/actions/analytics/getCreditsUsageInPeriod';
import CreditsUsageChart from './_components/creditsUsageChart';
export default function DashboardHome({ searchParams }: {
    searchParams: {
        month?: string,
        year?: string
    }
}) {
    const currentDate = new Date();
    const currMonth = currentDate.getMonth();
    const currYear = currentDate.getFullYear();
    const { month, year } = searchParams;
    const period = {
        month: month ? parseInt(month) : currMonth,
        year: year ? parseInt(year) : currYear
    } as Period;
    return (
        <div className='flex flex-1 flex-col h-full p-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Home</h1>
                <Suspense fallback={<Skeleton className='w-[180px] h-[40px]' />}>
                    <PeriodSelectorWrapper selectedPeriod={period} />
                </Suspense>
            </div>
            <div className="h-full py-6 flex flex-col gap-4">
                <Suspense fallback={<StatsCardsSkeleton />}>
                    <StatsCards selectedPeriod={period} />
                </Suspense>

                <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                    <StatsExecutionStatus selectedPeriod={period} />
                </Suspense>
                <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                    <CreditsUsageInPeriod selectedPeriod={period} />
                </Suspense>
            </div>
        </div>
    )
}



async function StatsExecutionStatus({
    selectedPeriod
}: {
    selectedPeriod: Period
}) {

    const data = await getWorlflowEcxecutionStats(selectedPeriod);
    return <ExecutionStatusChart data={data} />
}
async function CreditsUsageInPeriod({
    selectedPeriod
}: {
    selectedPeriod: Period
}) {

    const data = await getCreditsUsageInPeriod(selectedPeriod);
    return <CreditsUsageChart
        data={data}
        title="Daily Credits usage"
        description="Daily credits consumed in selected period" />
}