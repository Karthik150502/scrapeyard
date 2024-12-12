import { z } from 'zod';



export const createWorkflowSchema = z.object({
    name: z.string({ required_error: "Enter the name." }).min(1, "Name must contain atleat 1 character.").max(50, "Name cannot be more than 50 characters"),
    description: z.string().max(80).optional(),
})


export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;


export const duplicateWorkflowSchema = createWorkflowSchema.extend({
    workflowId: z.string()
})
export type duplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;