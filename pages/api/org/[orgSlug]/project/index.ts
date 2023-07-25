import { NextApiRequest, NextApiResponse } from "next"

import {
  withAuthentication,
  withMethods,
  withValidation,
} from "@/lib/api-middlewares"
import { supabaseApiClient } from "@/lib/supabase/supabase-api"
import { Profile, Session } from "@/lib/types/supabase"
import { projectGetSchema, projectPostSchema } from "@/lib/validations/project"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session?: Session,
  profile?: Profile
) {
  try {
    const supabase = supabaseApiClient(req, res)

    if (req.method === "GET") {
      const { orgSlug } = req.query

      const { data: dataProjects, error } = await supabase
        .from("data_projects")
        .select("*")
        .eq("org_slug", orgSlug)

      if (error) return res.status(404).json(error)

      return res.status(200).json(dataProjects)
    }

    if (req.method === "POST") {
      const { orgSlug } = req.query

      const { data: orgData, error: orgError } = await supabase
        .from("organization")
        .select("id, slug")
        .eq("slug", orgSlug)
        .limit(1)
        .single()

      if (orgError) return res.status(500).json(orgError)

      const { data, error } = await supabase
        .from("project")
        .insert({ ...req.body, org_id: orgData.id })

      if (error) return res.status(500).json(error)
      return res.status(200).json({ data: 'success' })
    }
  } catch (error) {
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
