import BrandLogo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/themetoggle";

export default function WorkflowLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-screen">
            {children}
            <Separator />
            <footer className="flex items-center justify-between p-2">
                <BrandLogo iconSize={16} fontSize="text-xl" />
                <ModeToggle />
            </footer>
        </div>
    )
}
