-- drop table if exists posts;

create table if not exists posts (
        id serial primary key,
        title text not null,
        subtitle text not null,
        slug text,
        tags text[] not null,
        body text not null,
        created timestamptz not null,
        updated timestamptz not null
);

CREATE EXTENSION IF NOT EXISTS "unaccent";

-- drop function if exists slugify;

CREATE OR REPLACE FUNCTION slugify("value" TEXT)
RETURNS TEXT AS $$
  WITH "unaccented" AS (
    SELECT unaccent("value") AS "value"
  ),
  "lowercase" AS (
    SELECT lower("value") AS "value"
    FROM "unaccented"
  ),
  "removed_quotes" AS (
    SELECT regexp_replace("value", '[''"]+', '', 'gi') AS "value"
    FROM "lowercase"
  ),
  "hyphenated" AS (
    SELECT regexp_replace("value", '[^a-z0-9\\-_]+', '-', 'gi') AS "value"
    FROM "removed_quotes"
  ),
  "trimmed" AS (
    SELECT regexp_replace(regexp_replace("value", '\-+$', ''), '^\-', '') AS "value"
    FROM "hyphenated"
  )
  SELECT "value" FROM "trimmed";
$$ LANGUAGE SQL STRICT IMMUTABLE;

-- drop function if exists public.set_slug_from_name;

CREATE OR REPLACE FUNCTION public.set_slug_from_name() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(concat(NEW.title, '-', NEW.subtitle, '-', (NEW.id)::text));
  RETURN NEW;
END
$$;

-- drop trigger if exists "trg_slug_insert_update" on "posts";

CREATE TRIGGER "trg_slug_insert_update"
BEFORE INSERT OR UPDATE ON "posts"
FOR EACH ROW
WHEN (NEW.title IS NOT NULL AND NEW.subtitle IS NOT NULL AND NEW.id IS NOT NULL)
-- WHEN (NEW.title IS NOT NULL AND NEW.subtitle IS NOT NULL AND NEW.id IS NOT NULL AND NEW.slug IS NULL)
EXECUTE PROCEDURE set_slug_from_name();
