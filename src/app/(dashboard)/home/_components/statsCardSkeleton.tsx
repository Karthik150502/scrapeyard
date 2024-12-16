import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSkeleton() {
    return <div className="grid gap-3 lg:hap-8 lg:grid-cols-3">
        {
            [1, 2, 3].map((item) => (<Skeleton key={item} className='w-full min-h-[120px]' />
            ))
        }
    </div>
}