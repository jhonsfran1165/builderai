import SupabaseListener from "@/components/auth//supabase-listener"
import SupabaseProvider from "@/components/auth/supabase-provider"
import StoreHandler from "@/components/layout/store-handler"
import { AppModules } from "@/lib/config/dashboard"
import { createServerClient } from "@/lib/supabase/supabase-server"
import { AppClaims } from "@/lib/types"
import { getOrgsFromClaims } from "@/lib/utils"

import "server-only"

// do not cache this layout because it validates the session constantly
export const revalidate = 0

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const appClaims = session?.user.app_metadata as AppClaims

  const renderListeners = () => {
    if (!appClaims) return null

    const { allOrgIds } = getOrgsFromClaims({ appClaims })
    return (
      <>
        <SupabaseListener
          serverAccessToken={session?.access_token}
          orgIdsBelongToUser={allOrgIds}
          profileId={session?.user.id}
        />
        <StoreHandler
          appClaims={appClaims}
          session={session}
          modulesApp={AppModules}
        />
      </>
    )
  }

  // for now we use zustag for state management but not sure if we can use something like https://jotai.org/ or recoil for the page builder
  return (
    <SupabaseProvider session={session}>
      {renderListeners()}
      {children}
    </SupabaseProvider>
  )
}
