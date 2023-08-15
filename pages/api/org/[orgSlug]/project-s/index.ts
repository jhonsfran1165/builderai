import { NextApiRequest, NextApiResponse } from "next"

import {
  withAuthentication,
  withMethods,
  withValidation,
} from "@/lib/api-middlewares"
import { db } from "@/lib/db/api"
import { Profile, Session } from "@/lib/types/supabase"
import { projectGetSchema, projectPostSchema } from "@/lib/validations/project"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session?: Session,
  profile?: Profile
) {
  try {
    if (req.method === "GET") {
      const { orgSlug } = req.query

      const { data: dataProjects, error } = await db
        .from("data_projects")
        .select("*")
        .eq("org_slug", orgSlug)

      if (error) return res.status(404).json(error)

      return res.status(200).json(dataProjects)
    }

    if (req.method === "POST") {
      const { orgSlug } = req.query

      const { data: projects, error } = await db
        .from("project")
        .select("*, organization!inner(*)")
        .eq("organization.slug", orgSlug)

      if (error) return res.status(404).json(error)

      return res.status(200).json(projects)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

const validMethods = ["GET", "POST"]

export default withMethods(
  // valid methods for this endpoint
  validMethods,
  // validate payload for this methods
  withValidation(
    {
      GET: projectGetSchema,
      POST: projectPostSchema,
    },
    // validate session for ["POST", "DELETE", "PUT"] endpoints only
    withAuthentication(handler, {
      protectedMethods: ["POST", "GET"],
      needProfileDetails: true,
    })
  )
)