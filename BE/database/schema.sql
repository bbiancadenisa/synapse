--
-- PostgreSQL database cluster dump
--

-- Started on 2026-05-21 00:29:32

\restrict VIJJRktreH65NuC7mA4cUEbDJ0zak2GnOrL4QAWSkyltAls4372EruDrPlP2HUl

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Xta1RYDwCQPbREzWzJRbzg==$cMSfWBJBqWEwCW+sZADBDK/ldEPy+FDQftOAz63/FgE=:2IxU6msG4180xqIieRM7RFX2siFMhN5f9ZbLVYuN8pw=';

--
-- User Configurations
--








\unrestrict VIJJRktreH65NuC7mA4cUEbDJ0zak2GnOrL4QAWSkyltAls4372EruDrPlP2HUl

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict PVQNGS4JVgy4Lsup6srZVhBjLxkyD6DLaE42uwgVJXBMHVTDdujMQHvOL2evE5T

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-21 00:29:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-05-21 00:29:32

--
-- PostgreSQL database dump complete
--

\unrestrict PVQNGS4JVgy4Lsup6srZVhBjLxkyD6DLaE42uwgVJXBMHVTDdujMQHvOL2evE5T

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict HbzRnY2kBofdeyEUYKaBJBuEW4m2pGKDVV2M2hbxn7Gt7O9J8DvCRPIBmUIFoMc

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-21 00:29:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16388)
-- Name: pgagent; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pgagent;


ALTER SCHEMA pgagent OWNER TO postgres;

--
-- TOC entry 5261 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA pgagent; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';


--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: pgagent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;


--
-- TOC entry 5262 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgagent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';


--
-- TOC entry 923 (class 1247 OID 16788)
-- Name: difficulty_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.difficulty_level AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE public.difficulty_level OWNER TO postgres;

--
-- TOC entry 947 (class 1247 OID 24782)
-- Name: session_event_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.session_event_type AS ENUM (
    'session_started',
    'session_time_reached',
    'session_ended',
    'session_timeout',
    'break_reminder',
    'break_accepted',
    'break_ignored',
    'break_started',
    'break_ended',
    'stop_reminder',
    'stop_accepted',
    'stop_ignored',
    'penalty_triggered',
    'session_discarded'
);


ALTER TYPE public.session_event_type OWNER TO postgres;

--
-- TOC entry 944 (class 1247 OID 24716)
-- Name: session_event_type_old; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.session_event_type_old AS ENUM (
    'break_reminder',
    'break_accepted',
    'break_ignored',
    'break_started',
    'break_ended',
    'stop_reminder',
    'stop_accepted',
    'stop_ignored',
    'penalty_triggered',
    'session_started',
    'session_time_reached',
    'session_ended',
    'session_timeout'
);


ALTER TYPE public.session_event_type_old OWNER TO postgres;

--
-- TOC entry 941 (class 1247 OID 24771)
-- Name: study_session_break_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.study_session_break_status AS ENUM (
    'active',
    'accepted',
    'ignored',
    'ended',
    'skipped'
);


ALTER TYPE public.study_session_break_status OWNER TO postgres;

--
-- TOC entry 935 (class 1247 OID 24707)
-- Name: study_session_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.study_session_status AS ENUM (
    'running',
    'paused',
    'completed',
    'timed_out'
);


ALTER TYPE public.study_session_status OWNER TO postgres;

--
-- TOC entry 953 (class 1247 OID 24865)
-- Name: task_priority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_priority AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE public.task_priority OWNER TO postgres;

--
-- TOC entry 950 (class 1247 OID 24842)
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status AS ENUM (
    'todo',
    'in_progress',
    'done'
);


ALTER TYPE public.task_status OWNER TO postgres;

--
-- TOC entry 262 (class 1255 OID 24599)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 247 (class 1259 OID 16699)
-- Name: daily_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_stats (
    id integer NOT NULL,
    user_id integer,
    date date,
    energy integer,
    stress integer,
    focus integer,
    sleep_hours integer,
    total_study_minutes integer DEFAULT 0,
    breaks_taken integer DEFAULT 0,
    productivity_score integer,
    burnout_risk character varying(10) DEFAULT 'low'::character varying,
    total_break_minutes integer DEFAULT 0,
    health_points integer DEFAULT 100,
    health_message character varying(255),
    break_penalty_points integer DEFAULT 0,
    CONSTRAINT burnout_risk_check CHECK (((burnout_risk)::text = ANY ((ARRAY['low'::character varying, 'medium'::character varying, 'high'::character varying])::text[]))),
    CONSTRAINT daily_stats_energy_check CHECK (((energy >= 0) AND (energy <= 100))),
    CONSTRAINT daily_stats_focus_check CHECK (((focus >= 0) AND (focus <= 100))),
    CONSTRAINT daily_stats_stress_check CHECK (((stress >= 0) AND (stress <= 100))),
    CONSTRAINT positive_breaks_check CHECK ((breaks_taken >= 0)),
    CONSTRAINT positive_minutes_check CHECK ((total_study_minutes >= 0))
);


ALTER TABLE public.daily_stats OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 16698)
-- Name: daily_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.daily_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.daily_stats_id_seq OWNER TO postgres;

--
-- TOC entry 5263 (class 0 OID 0)
-- Dependencies: 246
-- Name: daily_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.daily_stats_id_seq OWNED BY public.daily_stats.id;


--
-- TOC entry 255 (class 1259 OID 24743)
-- Name: session_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_events (
    id integer NOT NULL,
    session_id integer NOT NULL,
    type public.session_event_type NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.session_events OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 24742)
-- Name: session_events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.session_events_id_seq OWNER TO postgres;

--
-- TOC entry 5264 (class 0 OID 0)
-- Dependencies: 254
-- Name: session_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_events_id_seq OWNED BY public.session_events.id;


--
-- TOC entry 251 (class 1259 OID 24657)
-- Name: study_session_breaks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_session_breaks (
    id integer NOT NULL,
    session_id integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone,
    planned_break_minutes integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    status public.study_session_break_status DEFAULT 'active'::public.study_session_break_status,
    duration_ms integer
);


ALTER TABLE public.study_session_breaks OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 24656)
-- Name: study_session_breaks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_session_breaks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.study_session_breaks_id_seq OWNER TO postgres;

--
-- TOC entry 5265 (class 0 OID 0)
-- Dependencies: 250
-- Name: study_session_breaks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_session_breaks_id_seq OWNED BY public.study_session_breaks.id;


--
-- TOC entry 253 (class 1259 OID 24674)
-- Name: study_session_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_session_settings (
    id integer NOT NULL,
    session_id integer NOT NULL,
    break_interval_minutes integer,
    break_duration_minutes integer,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.study_session_settings OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 24673)
-- Name: study_session_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_session_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.study_session_settings_id_seq OWNER TO postgres;

--
-- TOC entry 5266 (class 0 OID 0)
-- Dependencies: 252
-- Name: study_session_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_session_settings_id_seq OWNED BY public.study_session_settings.id;


--
-- TOC entry 249 (class 1259 OID 24641)
-- Name: study_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    task_id integer NOT NULL,
    status public.study_session_status DEFAULT 'running'::public.study_session_status NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone,
    planned_duration_minutes integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    study_time_ms integer DEFAULT 0
);


ALTER TABLE public.study_sessions OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 24640)
-- Name: study_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.study_sessions_id_seq OWNER TO postgres;

--
-- TOC entry 5267 (class 0 OID 0)
-- Dependencies: 248
-- Name: study_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_sessions_id_seq OWNED BY public.study_sessions.id;


--
-- TOC entry 243 (class 1259 OID 16613)
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL,
    estimated_total_hours integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    difficulty public.difficulty_level DEFAULT 'medium'::public.difficulty_level NOT NULL,
    is_archived boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text,
    overall_deadline timestamp without time zone NOT NULL,
    actual_hours_spent integer DEFAULT 0,
    color character varying(20),
    CONSTRAINT check_deadline_future CHECK ((overall_deadline > created_at)),
    CONSTRAINT check_hours_non_negative CHECK (((estimated_total_hours >= 0) AND (actual_hours_spent >= 0)))
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16612)
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subjects_id_seq OWNER TO postgres;

--
-- TOC entry 5268 (class 0 OID 0)
-- Dependencies: 242
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- TOC entry 245 (class 1259 OID 16643)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    subject_id integer,
    title character varying(255) NOT NULL,
    description text,
    estimated_hours integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deadline date,
    priority public.task_priority DEFAULT 'medium'::public.task_priority,
    status public.task_status DEFAULT 'todo'::public.task_status,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    actual_hours_spent double precision DEFAULT 0,
    CONSTRAINT check_actual_hours_non_negative CHECK ((actual_hours_spent >= (0)::double precision)),
    CONSTRAINT check_estimated_hours_non_negative CHECK ((estimated_hours >= 0)),
    CONSTRAINT check_task_hours_positive CHECK ((estimated_hours > 0))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16642)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 5269 (class 0 OID 0)
-- Dependencies: 244
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 241 (class 1259 OID 16598)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16597)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5270 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 5009 (class 2604 OID 16702)
-- Name: daily_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_stats ALTER COLUMN id SET DEFAULT nextval('public.daily_stats_id_seq'::regclass);


--
-- TOC entry 5026 (class 2604 OID 24746)
-- Name: session_events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_events ALTER COLUMN id SET DEFAULT nextval('public.session_events_id_seq'::regclass);


--
-- TOC entry 5021 (class 2604 OID 24660)
-- Name: study_session_breaks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_breaks ALTER COLUMN id SET DEFAULT nextval('public.study_session_breaks_id_seq'::regclass);


--
-- TOC entry 5024 (class 2604 OID 24677)
-- Name: study_session_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_settings ALTER COLUMN id SET DEFAULT nextval('public.study_session_settings_id_seq'::regclass);


--
-- TOC entry 5016 (class 2604 OID 24644)
-- Name: study_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_sessions ALTER COLUMN id SET DEFAULT nextval('public.study_sessions_id_seq'::regclass);


--
-- TOC entry 4996 (class 2604 OID 16616)
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- TOC entry 5003 (class 2604 OID 16646)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4994 (class 2604 OID 16601)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5088 (class 2606 OID 16708)
-- Name: daily_stats daily_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_stats
    ADD CONSTRAINT daily_stats_pkey PRIMARY KEY (id);


--
-- TOC entry 5090 (class 2606 OID 24891)
-- Name: daily_stats daily_stats_user_date_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_stats
    ADD CONSTRAINT daily_stats_user_date_unique UNIQUE (user_id, date);


--
-- TOC entry 5101 (class 2606 OID 24752)
-- Name: session_events session_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_events
    ADD CONSTRAINT session_events_pkey PRIMARY KEY (id);


--
-- TOC entry 5095 (class 2606 OID 24667)
-- Name: study_session_breaks study_session_breaks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_breaks
    ADD CONSTRAINT study_session_breaks_pkey PRIMARY KEY (id);


--
-- TOC entry 5097 (class 2606 OID 24682)
-- Name: study_session_settings study_session_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_settings
    ADD CONSTRAINT study_session_settings_pkey PRIMARY KEY (id);


--
-- TOC entry 5093 (class 2606 OID 24655)
-- Name: study_sessions study_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_sessions
    ADD CONSTRAINT study_sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 5080 (class 2606 OID 16622)
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- TOC entry 5085 (class 2606 OID 16654)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 5099 (class 2606 OID 24759)
-- Name: study_session_settings unique_session_settings; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_settings
    ADD CONSTRAINT unique_session_settings UNIQUE (session_id);


--
-- TOC entry 5083 (class 2606 OID 24588)
-- Name: subjects unique_user_subject_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT unique_user_subject_name UNIQUE (user_id, name);


--
-- TOC entry 5074 (class 2606 OID 16611)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5076 (class 2606 OID 24907)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 5078 (class 2606 OID 16609)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5081 (class 1259 OID 16795)
-- Name: unique_subject_name_per_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_subject_name_per_user ON public.subjects USING btree (user_id, lower((name)::text));


--
-- TOC entry 5086 (class 1259 OID 16830)
-- Name: unique_task_title_per_subject; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_task_title_per_subject ON public.tasks USING btree (subject_id, lower((title)::text));


--
-- TOC entry 5091 (class 1259 OID 16843)
-- Name: unique_user_daily_stats; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_user_daily_stats ON public.daily_stats USING btree (user_id, date);


--
-- TOC entry 5108 (class 2620 OID 24600)
-- Name: tasks set_tasks_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 5104 (class 2606 OID 16709)
-- Name: daily_stats daily_stats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_stats
    ADD CONSTRAINT daily_stats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5107 (class 2606 OID 24753)
-- Name: session_events session_events_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_events
    ADD CONSTRAINT session_events_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.study_sessions(id) ON DELETE CASCADE;


--
-- TOC entry 5105 (class 2606 OID 24668)
-- Name: study_session_breaks study_session_breaks_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_breaks
    ADD CONSTRAINT study_session_breaks_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.study_sessions(id) ON DELETE CASCADE;


--
-- TOC entry 5106 (class 2606 OID 24683)
-- Name: study_session_settings study_session_settings_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_session_settings
    ADD CONSTRAINT study_session_settings_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.study_sessions(id) ON DELETE CASCADE;


--
-- TOC entry 5102 (class 2606 OID 16623)
-- Name: subjects subjects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5103 (class 2606 OID 16655)
-- Name: tasks tasks_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE;


-- Completed on 2026-05-21 00:29:32

--
-- PostgreSQL database dump complete
--

\unrestrict HbzRnY2kBofdeyEUYKaBJBuEW4m2pGKDVV2M2hbxn7Gt7O9J8DvCRPIBmUIFoMc

-- Completed on 2026-05-21 00:29:32

--
-- PostgreSQL database cluster dump complete
--

