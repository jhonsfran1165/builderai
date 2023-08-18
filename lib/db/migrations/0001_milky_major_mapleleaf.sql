-- Functions for the database

CREATE OR REPLACE FUNCTION public.config_org(user_id uuid, org_id uuid, slug text, type public.organization_types, name text, image text, description text, role_user public.organization_roles) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  DECLARE is_default boolean = coalesce((select NOT(EXISTS(select 1 from organization_profiles where profile_id = user_id AND is_default = true))), false);
  BEGIN
    IF session_user = 'authenticator' THEN
      INSERT INTO "organizations" (id, slug, type, name, image, description) VALUES (org_id, slug, type, name, image, description);
      INSERT INTO "organization_profiles" (org_id, profile_id, role, is_default) VALUES (org_id, user_id, role_user, is_default);
      RETURN 'OK';
    END IF;
END
$$;


CREATE OR REPLACE FUNCTION public.create_profile_auth() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$BEGIN

  IF new.raw_user_meta_data->>'user_name' IS NOT NULL THEN
    insert into public.profile (id, username, full_name, avatar_url)
    values (
      new.id,
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url'
    );
  ELSE
    insert into public.profiles (id, username, full_name, avatar_url)
    values (new.id, new.email, new.email, null);
  END IF;

  return new;

END;
$$;


CREATE OR REPLACE FUNCTION public.custom_exception(message text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      RAISE EXCEPTION USING
        HINT = 'Please check users permissions',
        MESSAGE = message,
        DETAIL = 'this execption is raise from no_owner_exception()',
        ERRCODE = '10000';
    END;
$$;


CREATE OR REPLACE FUNCTION public.delete_claim(uid uuid, claim text) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
        SELECT no_owner_exception();
      ELSE
        update auth.users set raw_app_meta_data =
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$$;


CREATE OR REPLACE FUNCTION public.delete_claims_org_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  DECLARE _org_id uuid = coalesce(new.org_id, old.org_id);
  DECLARE _data record;
  BEGIN
    -- _data is a structure that contains an element for each column in the select list
    FOR _data IN (SELECT id, (raw_app_meta_data->'organizations') - _org_id::text as value FROM auth.users WHERE raw_app_meta_data->'organizations' ? _org_id::text)
    LOOP
      UPDATE auth.users
      SET raw_app_meta_data = raw_app_meta_data || json_build_object('organizations', COALESCE(_data.value, '{}'))::jsonb
      WHERE id = _data.id;
    END LOOP;
  RETURN null;
END
$$;


CREATE OR REPLACE FUNCTION public.delete_claims_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  DECLARE _org_id uuid = coalesce(new.org_id, old.org_id);
  DECLARE _data record;
  BEGIN
    -- _data is a structure that contains an element for each column in the select list
    FOR _data IN (SELECT id, (raw_app_meta_data->'organizations') - _org_id::text as value FROM auth.users WHERE raw_app_meta_data->'organizations' ? _org_id::text)
    LOOP
      UPDATE auth.users
      SET raw_app_meta_data = raw_app_meta_data || json_build_object('organizations', COALESCE(_data.value, '{}'))::jsonb
      WHERE id = _data.id;
    END LOOP;
  RETURN null;
END
$$;


CREATE OR REPLACE FUNCTION public.get_claim(user_id uuid, claim text) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = user_id;
      return retval;
    END;
$$;


CREATE OR REPLACE FUNCTION public.get_claims(user_id uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      select raw_app_meta_data from auth.users into retval where id = user_id;
      return retval;
    END;
$$;


CREATE OR REPLACE FUNCTION public.get_my_jwt_claim(claim text) RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$$;


CREATE OR REPLACE FUNCTION public.get_my_jwt_claims() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$$;


CREATE OR REPLACE FUNCTION public.has_role_org(org_id text, role text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN

      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        SELECT jwt_expired_exception(); -- jwt expired
      END IF;

      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true (only a few users have this)

      ELSEIF coalesce((coalesce(current_setting('request.jwt.claims', true), '{}')::jsonb -> 'app_metadata' -> 'organizations' -> org_id -> 'role')::text, ''::text) = role THEN
        return true; -- user is the owner of their organization

      ELSE
        SELECT no_owner_exception(); -- user does NOT have claims_admin set to true
      END IF;

    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


CREATE OR REPLACE FUNCTION public.is_claims_admin() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        SELECT jwt_expired_exception(); -- jwt expired
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


CREATE OR REPLACE FUNCTION public.is_current_org(org_id text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  BEGIN

    IF session_user = 'authenticator' THEN

      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        SELECT jwt_expired_exception(); -- jwt expired
      END IF;

      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true (only a few users have this)

      ELSEIF coalesce((coalesce(current_setting('request.jwt.claims', true), '{}')::jsonb -> 'app_metadata' -> 'current_org' -> 'org_id')::text, ''::text) = '"' || org_id::text || '"' THEN
        return true; -- user is the owner of their organization

      ELSE
        return false;
      END IF;

    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


CREATE OR REPLACE FUNCTION public.is_member_org(org_id text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN

      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        SELECT jwt_expired_exception(); -- jwt expired
      END IF;

      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true (only a few users have this)

      ELSEIF (coalesce(current_setting('request.jwt.claims', true), '{}')::jsonb -> 'app_metadata' -> 'organizations' -> org_id) IS NOT NULL THEN
        return true; -- user is the owner of their organization

      ELSE
        return false;
      END IF;

    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


CREATE OR REPLACE FUNCTION public.jwt_expired_exception() RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      RAISE EXCEPTION USING
        HINT = 'Please check users credentials',
        MESSAGE = 'JWT expired, log in again',
        DETAIL = 'this execption is raise from jwt_expired_exception()',
        ERRCODE = '10001';
    END;
$$;


CREATE OR REPLACE FUNCTION public.no_admin_exception() RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      RAISE EXCEPTION USING
        HINT = 'Please check users credentials',
        MESSAGE = 'You are not the admin of the system',
        DETAIL = 'this execption is raise from is_claims_admin()',
        ERRCODE = '10002';
    END;
$$;


CREATE OR REPLACE FUNCTION public.no_owner_exception() RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      RAISE EXCEPTION USING
        HINT = 'Please check users permissions',
        MESSAGE = 'Only owners or admins can perform this action',
        DETAIL = 'this execption is raise from no_owner_exception()',
        ERRCODE = '10000';
    END;
$$;


CREATE OR REPLACE FUNCTION public.set_claim(uid uuid, claim text, value jsonb) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
        SELECT no_owner_exception();
      ELSE
        update auth.users set raw_app_meta_data =
          raw_app_meta_data ||
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$$;


CREATE OR REPLACE FUNCTION public.set_my_claim(claim text, value jsonb) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
    BEGIN
      update auth.users set raw_app_meta_data =
        raw_app_meta_data ||
          json_build_object(claim, value)::jsonb where id = auth.uid();
      return 'OK';
    END;
$$;


CREATE OR REPLACE FUNCTION public.update_claims_org_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  DECLARE _org_id uuid;
  DECLARE _data record;
  BEGIN
    IF TG_TABLE_NAME::regclass::text = 'organizations' THEN
      _org_id = coalesce(new.id, old.id);
    ELSE
      _org_id = coalesce(new.org_id, old.org_id);
    END IF;

    -- _data is a structure that contains an element for each column in the select list
    FOR _data IN (SELECT profile_id, json_object_agg(org_id, value) as json_data FROM (SELECT profile_id, org_id, json_build_object('role', role, 'tier', tier, 'slug', org_slug, 'is_default', is_default, 'image', org_image, 'type', org_type) as value
        FROM data_orgs WHERE profile_id IN (SELECT profile_id from organization_profiles where org_id = _org_id)) as data group by profile_id)
    LOOP
      UPDATE auth.users
      SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}') || COALESCE(jsonb_build_object('organizations', COALESCE(_data.json_data, '{}')::jsonb), '{}')
      WHERE id = _data.profile_id;
    END LOOP;
  RETURN null;
END
$$;


CREATE OR REPLACE FUNCTION public.update_claims_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  DECLARE _org_id uuid;
  BEGIN
    IF TG_TABLE_NAME::regclass::text = 'organizations' THEN
      _org_id = coalesce(new.id, old.id);
    ELSE
      _org_id = coalesce(new.org_id, old.org_id);
    END IF;

    UPDATE auth.users set raw_app_meta_data = raw_app_meta_data || json_build_object('organizations', COALESCE((
      SELECT json_object_agg(org_id, value) FROM (
        SELECT org_id, json_build_object('role', role, 'tier', tier, 'slug', org_slug, 'is_default', is_default, 'image', org_image, 'type', org_type) as value
        FROM data_orgs
        WHERE profile_id IN (SELECT profile_id from organization_profiles where org_id = _org_id)
        GROUP by org_id, role, tier, org_slug, is_default, org_image, org_type) as data), '{}'))::jsonb
    WHERE id IN (SELECT profile_id from organization_profiles where org_id = _org_id);
  RETURN null;
END
$$;
