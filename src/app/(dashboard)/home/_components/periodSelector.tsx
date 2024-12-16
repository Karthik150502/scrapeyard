"use client"
import { Period } from '@/types/analytics'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useSearchParams, useRouter } from 'next/navigation';
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
] as const;

export default function PeriodSelector({
    periods,
    selectedPeriod
}: {
    periods: Period[],
    selectedPeriod: Period
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    return (
        <Select onValueChange={(value) => {
            const [month, year] = value.split("-");
            const params = new URLSearchParams(searchParams)
            params.set("month", month);
            params.set("year", year);
            router.push(`?${params.toString()}`);
        }}
            defaultValue={`${selectedPeriod.month}-${selectedPeriod.year}`}
        >
            <SelectTrigger className='w-[180px] text-white'>
                <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
                {
                    periods.map((p, idx) => {
                        return <SelectItem key={idx} value={`${p.month}-${p.year}`}>
                            {MONTH_NAMES[p.month]} {p.year}
                        </SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}
