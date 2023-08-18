-- Custom SQL migration file, put you code below! --

CREATE VIEW public.data_orgs WITH (security_invoker) AS
 SELECT DISTINCT profiles.role,
    profiles.profile_id,
    profiles.org_id as profiles_org_id,
    profiles.is_default,
    org.id as org_id,
    org.slug AS org_slug,
    org.image AS org_image,
    org.type AS org_type,
    org.stripe_id AS org_stripe_id,
    coalesce(subscription."tier"::text, 'FREE'::text) as tier
   FROM public.organization_profiles profiles
     LEFT JOIN public.organization_subscriptions subscription ON subscription.org_id = profiles.org_id
     LEFT JOIN public.organizations org ON org.id = profiles.org_id;

CREATE VIEW public.data_projects WITH (security_invoker) AS
  SELECT DISTINCT
    subscription.status AS status_subscription,
    subscription."interval" AS subscription_interval,
    subscription."metadata" AS subscription_metadata,
    subscription."interval_count" AS subscription_interval_count,
    subscription.current_period_start AS subscription_period_starts,
    subscription.current_period_end AS subscription_period_ends,
    subscription.ended_at AS subscription_ended_at,
    subscription.canceled_at AS subscription_canceled_at,
    subscription.trial_start AS subscription_trial_starts,
    subscription.trial_end AS subscription_trial_ends,
    org.id as org_id,
    org.slug AS org_slug,
    org.image AS org_image,
    org.type AS org_type,
    org.stripe_id AS org_stripe_id,
    proj.id AS project_id,
    proj.slug AS project_slug,
    proj.name AS project_name,
    proj.description AS project_description,
    proj.custom_domain AS project_domain,
    proj.subdomain AS project_subdomain,
    proj.logo AS project_logo,
    proj.created_at AS project_created_at,
    coalesce(subscription."tier"::text, 'FREE'::text) as tier
   FROM public.organizations org
     JOIN public.projects proj ON proj.org_id = org.id
     LEFT JOIN public.organization_subscriptions subscription ON subscription.org_id = org.id AND subscription.project_id = proj.id;
