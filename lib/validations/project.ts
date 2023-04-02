import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export const projectCreateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "projectName has to be at least 3 characters" }),
  description: z
    .string()
    .min(6, { message: "description must be at least 6 characters" }),
})

export const projectGetSchema = z.object({
  orgSlug: z.string().min(1, {
    message:
      "invalid name for the organization, it has to be at least 3 characters",
  }),
  projectSlug: z
    .string()
    .min(1, { message: "project slug has to be at least 1 characters" })
    .optional(),
})

export type projectCreateType = z.infer<typeof projectCreateSchema>
