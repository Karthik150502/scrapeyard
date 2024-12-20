import { setupUser } from "@/actions/billing/setupUser"
import { waitFor } from "@/lib/waitFor"

export default async function SetupPage() {
    return await setupUser()
}