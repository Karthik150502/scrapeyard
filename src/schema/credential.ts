import { z } from 'zod';
export const createCredentialSchema = z.object({
    name: z.string().min(1, "Credential must have a name").max(30, "Credential name too long."),
    value: z.string().min(1, "Credential must have a value").max(500, "Credential value too long.")
})

export type createCredentialSchemaType = z.infer<typeof createCredentialSchema>;




