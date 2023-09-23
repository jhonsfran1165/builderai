--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: builderai
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO builderai;

--
-- Name: plan; Type: TYPE; Schema: public; Owner: builderai
--

CREATE TYPE public.plan AS ENUM (
    'STANDARD',
    'PRO',
    'FREE'
);


ALTER TYPE public.plan OWNER TO builderai;

--
-- Name: project_tier; Type: TYPE; Schema: public; Owner: builderai
--

CREATE TYPE public.project_tier AS ENUM (
    'PRO',
    'FREE'
);


ALTER TYPE public.project_tier OWNER TO builderai;

--
-- Name: custom_exception(text); Type: FUNCTION; Schema: public; Owner: builderai
--

CREATE FUNCTION public.custom_exception(message text) RETURNS boolean
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


ALTER FUNCTION public.custom_exception(message text) OWNER TO builderai;

--
-- Name: debug_update_tenant_data(text, text); Type: FUNCTION; Schema: public; Owner: builderai
--

CREATE FUNCTION public.debug_update_tenant_data(tenantid text, projectid text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    table_record RECORD;
    sql_statement text;
BEGIN
    -- Loop through all tables in the public schema
    FOR table_record IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        -- Check if the table has columns named "tenantID" and "projectId"
        IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = table_record.tablename -- Cast tablename as text
            AND column_name = 'tenant_id'
            AND EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = table_record.tablename -- Cast tablename as text
                AND column_name = 'project_id'
            )
        ) THEN
            -- Construct the SQL statement without executing it
            sql_statement := 'UPDATE "' || table_record.tablename || '" SET tenant_id = "' || tenantId|| '" WHERE tenant_id = "' || tenantId || '" AND project_id = "' || projectId || '"';
            select custom_exception(sql_statement::text); -- Print the SQL statement for debugging
        --ELSE
            -- Print a message if the table doesn't have tenantID or projectId
            --RAISE NOTICE 'Table % does not have tenantID or projectId', table_record.tablename;
            --select custom_exception(table_record.tablename::text);
        END IF;
    END LOOP;
END;
$$;


ALTER FUNCTION public.debug_update_tenant_data(tenantid text, projectid text) OWNER TO builderai;

--
-- Name: test_dynamic_sql(text, text); Type: FUNCTION; Schema: public; Owner: builderai
--

CREATE FUNCTION public.test_dynamic_sql(tenantid text, projectid text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    sql_statement text;
BEGIN
    -- Construct a dynamic SQL statement with parameter placeholders
    -- In this example, we're just printing the SQL statement
    -- Replace this with your actual UPDATE statement
    sql_statement := 'UPDATE your_table SET tenantID = ' || quote_literal(tenantId) || ' WHERE tenantID = ' || quote_literal(tenantId) || ' AND projectId = ' || quote_literal(projectId);

    select custom_exception(sql_statement);
END;
$$;


ALTER FUNCTION public.test_dynamic_sql(tenantid text, projectid text) OWNER TO builderai;

--
-- Name: update_tenant(text, text); Type: FUNCTION; Schema: public; Owner: builderai
--

CREATE FUNCTION public.update_tenant(tenantid text, projectid text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- Loop through all tables in the public schema
    FOR table_record IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        -- Check if the table has columns named "tenant_id" and "project_id"
        IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = table_record.tablename::text
            AND column_name = 'tenant_id'
            AND EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = table_record.tablename::text
                AND column_name = 'project_id'
            )
        ) THEN
            -- Update the table with the given tenant_id and project_id if both match
            EXECUTE 'UPDATE ' || table_record.tablename || ' SET tenant_id = ' || quote_literal(tenantId) || ' WHERE tenant_id = ' || quote_literal(tenantId) || ' AND project_id = ' || quote_literal(projectId);
        END IF;
    END LOOP;
END;
$$;


ALTER FUNCTION public.update_tenant(tenantid text, projectid text) OWNER TO builderai;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: builderai
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO builderai;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: builderai
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO builderai;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: builderai
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: apikey; Type: TABLE; Schema: public; Owner: builderai
--

CREATE TABLE public.apikey (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone,
    last_used timestamp without time zone,
    revoked_at timestamp without time zone,
    project_id text NOT NULL,
    name text NOT NULL,
    key text NOT NULL,
    tenant_id text NOT NULL
);


ALTER TABLE public.apikey OWNER TO builderai;

--
-- Name: ingestion; Type: TABLE; Schema: public; Owner: builderai
--

CREATE TABLE public.ingestion (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    project_id text NOT NULL,
    apikey_id text NOT NULL,
    schema json NOT NULL,
    hash text NOT NULL,
    parent text,
    origin text NOT NULL,
    tenant_id text NOT NULL
);


ALTER TABLE public.ingestion OWNER TO builderai;

--
-- Name: project; Type: TABLE; Schema: public; Owner: builderai
--

CREATE TABLE public.project (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    slug text NOT NULL,
    name text,
    workspace_id text NOT NULL,
    tier public.project_tier DEFAULT 'FREE'::public.project_tier,
    url text,
    tenant_id text NOT NULL
);


ALTER TABLE public.project OWNER TO builderai;

--
-- Name: workspace; Type: TABLE; Schema: public; Owner: builderai
--

CREATE TABLE public.workspace (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    slug text NOT NULL,
    name text,
    tenant_id text NOT NULL,
    is_personal boolean DEFAULT false,
    trial_ends timestamp without time zone,
    billing_period_start timestamp without time zone,
    billing_period_end timestamp without time zone,
    stripe_id text,
    subscription_id text,
    plan public.plan DEFAULT 'FREE'::public.plan
);


ALTER TABLE public.workspace OWNER TO builderai;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: builderai
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: builderai
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	7cc84e2ec2c6744d77abf51e486c0c783287108d4b3d62177b6d260d1c7762ea	1695064914570
2	c844f8b875d587a793e5e78c8abc6b8a5a5bf223c1b1c560218828dbfbdb0eac	1695221733660
3	aaa54cc8e744be862232e119cc8c5464d32159f40b7150b150818ba48490ac2f	1695224054986
\.


--
-- Data for Name: apikey; Type: TABLE DATA; Schema: public; Owner: builderai
--

COPY public.apikey (id, created_at, updated_at, expires_at, last_used, revoked_at, project_id, name, key, tenant_id) FROM stdin;
api_FZ2G4tpFag5SM8YmiYVDnV	2023-09-20 16:42:31.142618	2023-09-20 16:42:31.142618	\N	\N	\N	proj_PBE9Ngg9rxWNo8dshvcYYs	dsfsdfsdf	builderai_live_LmYhn1sE5BcMyu4424xDsm	org_2VIQUS8eckP6Sg5oYfPoHkpVGl7
api_QzMq3oWRGo4t3Lou5yxiB5	2023-09-20 17:01:55.038827	2023-09-20 17:01:55.038827	\N	\N	\N	proj_Q8Y7M8jpo5qJ8kSp2KqBMc	asdasdas	builderai_live_GyDVMdb7g5Tae513B2Tfuh	org_2VIQUS8eckP6Sg5oYfPoHkpVGl7
api_EtRyWGj3H4735aWEG7CvnT	2023-09-20 17:23:14.871095	2023-09-20 17:23:14.871095	\N	\N	\N	proj_5CG9aN36HgJ6zPQTcBmNME	eqweqwe	builderai_live_B61WF6w9zyPFtupzcvRPoF	org_2VIQUS8eckP6Sg5oYfPoHkpVGl7
\.


--
-- Data for Name: ingestion; Type: TABLE DATA; Schema: public; Owner: builderai
--

COPY public.ingestion (id, created_at, updated_at, project_id, apikey_id, schema, hash, parent, origin, tenant_id) FROM stdin;
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: builderai
--

COPY public.project (id, created_at, updated_at, slug, name, workspace_id, tier, url, tenant_id) FROM stdin;
proj_DvHAjWeqFt71csq3vxBhEJ	2023-09-20 16:25:41.771353	2023-09-20 16:25:41.771353	billions-shoe	sample project	wk_2VIQIMKAwUuMfTDUZFYxxVmpgVp	FREE	https://example.com	user_2VIQIMKAwUuMfTDUZFYxxVmpgVp
proj_PBE9Ngg9rxWNo8dshvcYYs	2023-09-20 16:26:02.327429	2023-09-20 16:26:02.327429	salmon-football	jhonsfran	wk_2VIQIMKAwUuMfTDUZFYxxVmpgVp	FREE	https://example.com	user_2VIQIMKAwUuMfTDUZFYxxVmpgVp
proj_Q8Y7M8jpo5qJ8kSp2KqBMc	2023-09-20 17:01:51.244971	2023-09-20 17:01:51.244971	sharp-eggplant	sample project	wk_2VIQIMKAwUuMfTDUZFYxxVmpgVp	FREE	https://example.com	user_2VIQIMKAwUuMfTDUZFYxxVmpgVp
proj_5CG9aN36HgJ6zPQTcBmNME	2023-09-20 17:23:12.271936	2023-09-20 17:23:12.271936	narrow-magician	asdasd	wk_2VIQIMKAwUuMfTDUZFYxxVmpgVp	FREE	https://example.com	user_2VIQIMKAwUuMfTDUZFYxxVmpgVp
\.


--
-- Data for Name: workspace; Type: TABLE DATA; Schema: public; Owner: builderai
--

COPY public.workspace (id, created_at, updated_at, slug, name, tenant_id, is_personal, trial_ends, billing_period_start, billing_period_end, stripe_id, subscription_id, plan) FROM stdin;
wk_2VIQIMKAwUuMfTDUZFYxxVmpgVp	2023-09-20 16:03:49.373921	2023-09-20 16:03:49.373921	jhonsfran1165	Sebastian	user_2VIQIMKAwUuMfTDUZFYxxVmpgVp	t	\N	\N	\N	\N	\N	FREE
wk_2VIQUS8eckP6Sg5oYfPoHkpVGl7	2023-09-20 16:04:03.716856	2023-09-20 16:04:03.716856	jhonsfran	jhonsfran	org_2VIQUS8eckP6Sg5oYfPoHkpVGl7	f	\N	\N	\N	\N	\N	FREE
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: builderai
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 3, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: builderai
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: apikey apikey_key_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.apikey
    ADD CONSTRAINT apikey_key_unique UNIQUE (key);


--
-- Name: apikey apikey_pkey; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.apikey
    ADD CONSTRAINT apikey_pkey PRIMARY KEY (id);


--
-- Name: ingestion ingestion_pkey; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.ingestion
    ADD CONSTRAINT ingestion_pkey PRIMARY KEY (id);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: project project_slug_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_slug_unique UNIQUE (slug);


--
-- Name: workspace workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_pkey PRIMARY KEY (id);


--
-- Name: workspace workspace_slug_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_slug_unique UNIQUE (slug);


--
-- Name: workspace workspace_stripe_id_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_stripe_id_unique UNIQUE (stripe_id);


--
-- Name: workspace workspace_subscription_id_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_subscription_id_unique UNIQUE (subscription_id);


--
-- Name: workspace workspace_tenant_id_unique; Type: CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_tenant_id_unique UNIQUE (tenant_id);


--
-- Name: apikey_key_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX apikey_key_idx ON public.apikey USING btree (key);


--
-- Name: apikey_project_id_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX apikey_project_id_idx ON public.apikey USING btree (project_id);


--
-- Name: apikey_tenant_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX apikey_tenant_uidx ON public.apikey USING btree (tenant_id);


--
-- Name: ingestion_apikey_id_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX ingestion_apikey_id_idx ON public.ingestion USING btree (apikey_id);


--
-- Name: ingestion_project_id_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX ingestion_project_id_idx ON public.ingestion USING btree (project_id);


--
-- Name: project_slug_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX project_slug_idx ON public.project USING btree (slug);


--
-- Name: project_tenant_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX project_tenant_uidx ON public.project USING btree (tenant_id);


--
-- Name: project_workspace_id_idx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE INDEX project_workspace_id_idx ON public.project USING btree (workspace_id);


--
-- Name: workspace_slug_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX workspace_slug_uidx ON public.workspace USING btree (slug);


--
-- Name: workspace_stripe_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX workspace_stripe_uidx ON public.workspace USING btree (stripe_id);


--
-- Name: workspace_subscription_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX workspace_subscription_uidx ON public.workspace USING btree (subscription_id);


--
-- Name: workspace_tenant_uidx; Type: INDEX; Schema: public; Owner: builderai
--

CREATE UNIQUE INDEX workspace_tenant_uidx ON public.workspace USING btree (tenant_id);


--
-- Name: apikey apikey_project_id_project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.apikey
    ADD CONSTRAINT apikey_project_id_project_id_fk FOREIGN KEY (project_id) REFERENCES public.project(id) ON DELETE CASCADE;


--
-- Name: ingestion ingestion_apikey_id_apikey_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.ingestion
    ADD CONSTRAINT ingestion_apikey_id_apikey_id_fk FOREIGN KEY (apikey_id) REFERENCES public.apikey(id) ON DELETE CASCADE;


--
-- Name: ingestion ingestion_project_id_project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.ingestion
    ADD CONSTRAINT ingestion_project_id_project_id_fk FOREIGN KEY (project_id) REFERENCES public.project(id) ON DELETE CASCADE;


--
-- Name: project project_workspace_id_workspace_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: builderai
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_workspace_id_workspace_id_fk FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) ON DELETE CASCADE;


--
-- Name: apikey; Type: ROW SECURITY; Schema: public; Owner: builderai
--

ALTER TABLE public.apikey ENABLE ROW LEVEL SECURITY;

--
-- Name: apikey everyone can insert; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "everyone can insert" ON public.apikey FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: ingestion everyone can insert; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "everyone can insert" ON public.ingestion FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: project everyone can insert; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "everyone can insert" ON public.project FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: workspace everyone can insert; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "everyone can insert" ON public.workspace FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: ingestion; Type: ROW SECURITY; Schema: public; Owner: builderai
--

ALTER TABLE public.ingestion ENABLE ROW LEVEL SECURITY;

--
-- Name: apikey organization member can delete; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can delete" ON public.apikey FOR DELETE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: ingestion organization member can delete; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can delete" ON public.ingestion FOR DELETE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: project organization member can delete; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can delete" ON public.project FOR DELETE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: workspace organization member can delete; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can delete" ON public.workspace FOR DELETE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: apikey organization member can select; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can select" ON public.apikey FOR SELECT TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: ingestion organization member can select; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can select" ON public.ingestion FOR SELECT TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: project organization member can select; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can select" ON public.project FOR SELECT TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: workspace organization member can select; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can select" ON public.workspace FOR SELECT TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: apikey organization member can update; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can update" ON public.apikey FOR UPDATE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id)) WITH CHECK ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: ingestion organization member can update; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can update" ON public.ingestion FOR UPDATE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id)) WITH CHECK ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: project organization member can update; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can update" ON public.project FOR UPDATE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id)) WITH CHECK ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: workspace organization member can update; Type: POLICY; Schema: public; Owner: builderai
--

CREATE POLICY "organization member can update" ON public.workspace FOR UPDATE TO authenticated USING ((current_setting('app.tenantId'::text, true) = tenant_id)) WITH CHECK ((current_setting('app.tenantId'::text, true) = tenant_id));


--
-- Name: project; Type: ROW SECURITY; Schema: public; Owner: builderai
--

ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;

--
-- Name: workspace; Type: ROW SECURITY; Schema: public; Owner: builderai
--

ALTER TABLE public.workspace ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

