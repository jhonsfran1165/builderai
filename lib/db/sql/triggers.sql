-- This file contains triggers that are used to update the claims table when

-- users
CREATE OR REPLACE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile_auth();

-- organizations
CREATE OR REPLACE TRIGGER update_claims_user_org_profiles AFTER INSERT OR UPDATE ON public.organization_profiles FOR EACH ROW EXECUTE FUNCTION public.update_claims_org_user();
CREATE OR REPLACE TRIGGER delete_claims_user_org_profiles AFTER DELETE ON public.organization_profiles FOR EACH ROW EXECUTE FUNCTION public.delete_claims_org_user();

-- organization
CREATE OR REPLACE TRIGGER update_claims_user_org AFTER UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_claims_org_user();

-- organization_subscriptions
CREATE OR REPLACE TRIGGER update_claims_user_subscription AFTER INSERT OR UPDATE ON public.organization_subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_claims_org_user();
