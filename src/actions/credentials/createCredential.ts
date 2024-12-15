"use server"

import { symmetricEncryption } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { createCredentialSchema, createCredentialSchemaType } from "@/schema/credential";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function createCredentials(form: createCredentialSchemaType) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated");
    }
    const { success, data } = createCredentialSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data.")
    }
    const result = await prisma.credential.create({
        data: {
            userId,
            name: data.name,
            value: await symmetricEncryption(data.value)
        }
    })

    if (!result) {
        throw new Error("Failed to create the credentials.")
    }

    revalidatePath("/credentials");
}

