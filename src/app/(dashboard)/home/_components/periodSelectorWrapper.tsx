import { Period } from "@/types/analytics";
import PeriodSelector from "./periodSelector";
import { getPeriods } from "@/actions/analytics/getPeriods";

export async function PeriodSelectorWrapper({ selectedPeriod }: {
    selectedPeriod: Period
}) {
    const periods = await getPeriods();
    return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />
}

