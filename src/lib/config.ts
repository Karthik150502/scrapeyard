import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react";




export const dashboardRoutes = [
    {
        path: 'home',
        label: "Home",
        icon: HomeIcon
    },
    {
        path: 'workflows',
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        path: 'credentials',
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        path: 'billing',
        label: "Billing",
        icon: CoinsIcon
    },
]