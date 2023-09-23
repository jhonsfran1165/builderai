import { organizationRouter } from "./router/organizations"
import { createTRPCRouter } from "./trpc"

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
  organization: organizationRouter,
})
