-- Desc: This file contains the RLS policies for the database

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- organizations
CREATE OR REPLACE POLICY "members can see only their organizations" ON public.organizations FOR SELECT TO authenticated USING (public.is_member_org((id)::text));
CREATE OR REPLACE POLICY "authenticated users can create an organization" ON public.organizations FOR INSERT TO authenticated WITH CHECK (true);
CREATE OR REPLACE POLICY "only owner can delete their organizations" ON public.organizations FOR DELETE TO authenticated USING (public.has_role_org((id)::text, '"OWNER"'::text));
CREATE OR REPLACE POLICY "owners can update their organizations" ON public.organizations FOR UPDATE TO authenticated USING (public.has_role_org((id)::text, '"OWNER"'::text)) WITH CHECK (public.has_role_org((id)::text, '"OWNER"'::text));

-- organization_profiles
CREATE OR REPLACE POLICY "only members of the organization can select" ON public.organization_profiles FOR SELECT TO authenticated USING ((public.is_member_org((org_id)::text) AND public.is_current_org((org_id)::text)));
CREATE OR REPLACE POLICY "only owners can delete" ON public.organization_profiles FOR DELETE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text));
CREATE OR REPLACE POLICY "only owners can update" ON public.organization_profiles FOR UPDATE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text)) WITH CHECK (public.has_role_org((org_id)::text, '"OWNER"'::text));
CREATE OR REPLACE POLICY "authenticathed users can insert" ON public.organization_profiles FOR INSERT TO authenticated WITH CHECK (true);

-- projects
CREATE OR REPLACE POLICY "authenticathed users can insert" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE OR REPLACE POLICY "only members of the organization can select" ON public.projects FOR SELECT TO authenticated USING ((public.is_member_org((org_id)::text) AND public.is_current_org((org_id)::text)));
CREATE OR REPLACE POLICY "only owners can delete" ON public.projects FOR DELETE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text));
CREATE OR REPLACE POLICY "only owners can update" ON public.projects FOR UPDATE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text)) WITH CHECK (public.has_role_org((org_id)::text, '"OWNER"'::text));

-- organization_subscriptions
CREATE OR REPLACE POLICY "authenticated users can create an organization subscriptions" ON public.organization_subscriptions FOR INSERT TO authenticated WITH CHECK (true);
CREATE OR REPLACE POLICY "members can see only their organizations subscriptions" ON public.organization_subscriptions FOR SELECT TO authenticated USING (public.is_member_org((org_id)::text));
CREATE OR REPLACE POLICY "only owner can delete their organizations subscriptions" ON public.organization_subscriptions FOR DELETE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text));
CREATE OR REPLACE POLICY "owners can update their organizations subscriptions" ON public.organization_subscriptions FOR UPDATE TO authenticated USING (public.has_role_org((org_id)::text, '"OWNER"'::text)) WITH CHECK (public.has_role_org((org_id)::text, '"OWNER"'::text));
