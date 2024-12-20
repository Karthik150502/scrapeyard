import { Period } from "@/types/analytics";
import StatsCard from "./statsCard";
import { getStatsCardsValues } from "@/actions/analytics/getStatsCardValues";
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from "lucide-react";
import { waitFor } from "@/lib/waitFor";

export async function StatsCards({ selectedPeriod }: {
    selectedPeriod: Period
}) {
    const data = await getStatsCardsValues(selectedPeriod);
    return <div className='w-full grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]'>
        <StatsCard title="Workflow Executions" value={data.worflowExecutions} icon={CirclePlayIcon} />
        <StatsCard title="Phase Executions" value={data.phaseExecutions} icon={WaypointsIcon} />
        <StatsCard title="Credits Consumed" value={data.creditsConsumed} icon={CoinsIcon} />
    </div>
}
