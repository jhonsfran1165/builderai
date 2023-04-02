import "server-only"
import { AppModules } from "@/lib/config/dashboard"
import { createServerClient } from "@/lib/supabase/supabase-server"
import { OrganizationProfilesData } from "@/lib/types/supabase"
import SupabaseListener from "@/components/auth//supabase-listener"
import SupabaseProvider from "@/components/auth/supabase-provider"
import StoreHandler from "@/components/layout/store-handler"

// do not cache this layout because it validates the session constantly
export const revalidate = 0

export default async function AuthLayout({
  children,
}: {
  r
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: orgProfiles } = await supabase
    .from("organization_profiles")
    .select("*, profile(*), organization(*)")
    .eq("profile_id", session?.user.id)

  // for now we use zustag for state manament but not sure if we can use something like https://jotai.org/ or recoil
  return (
    <SupabaseProvider session={session}>
      <SupabaseListener serverAccessToken={session?.access_token} />
      <StoreHandler
        orgProfiles={orgProfiles as OrganizationProfilesData[]}
        session={session}
        modulesApp={AppModules}
      />
      {children}
    </SupabaseProvider>
  )
}