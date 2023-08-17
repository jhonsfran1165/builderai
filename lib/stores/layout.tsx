import { create } from "zustand"

import {
  AppClaims,
  AppModulesNav,
  AppOrgClaim,
  DashboardNavItem
} from "@/lib/types"
import {
  DataProjectsView, Session
} from "@/lib/types/db"

export const useStore = create<{
  contextHeader: string
  orgSlug: string
  orgId: string
  projectSlug: string
  projectData: DataProjectsView | null
  session: Session | null
  modulesApp: AppModulesNav | {}
  activeTabs: DashboardNavItem[]
  activeTab: DashboardNavItem | null
  activeSegment: string
  activePathPrefix: string
  rootPathTab: string
  moduleTab: string
  numberSegments: number
  orgData: AppOrgClaim | null
  appClaims: AppClaims | null
}>((set) => ({
  contextHeader: "",
  orgSlug: "",
  orgId: "",
  projectSlug: "",
  projectData: null,
  session: null,
  modulesApp: {},
  activeTabs: [],
  activeTab: null,
  activeSegment: "",
  numberSegments: 0,
  activePathPrefix: "/",
  rootPathTab: "/",
  moduleTab: "",
  orgData: null,
  appClaims: null,
}))
