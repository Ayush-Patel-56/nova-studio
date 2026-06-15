-- Nova Studio — Supabase Schema
-- Run this entire file in the Supabase SQL Editor (supabase.com → your project → SQL Editor → New Query)

CREATE TABLE projects (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  category   TEXT NOT NULL,
  image_url  TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stats (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Seed stats
INSERT INTO stats (label, value) VALUES
  ('Projects Completed', '150+'),
  ('Clients Worldwide', '50+'),
  ('Years Experience', '5');

-- Seed services
INSERT INTO services (title, description) VALUES
  ('Web Design', 'Interfaces built around how people actually use them. We design for clarity first, aesthetics second.'),
  ('Front-End Development', 'Fast, accessible, maintainable code. React and Next.js are our primary tools.'),
  ('Branding', 'Visual identity that holds up across every touchpoint — from business cards to full product launches.');

-- Disable RLS for development (re-enable and add policies before production)
ALTER TABLE projects  DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts  DISABLE ROW LEVEL SECURITY;
ALTER TABLE stats     DISABLE ROW LEVEL SECURITY;
ALTER TABLE services  DISABLE ROW LEVEL SECURITY;
