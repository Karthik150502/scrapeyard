"use server"

import { PackId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";


export async function purchaseCredits(packId: PackId) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated")
    }

}