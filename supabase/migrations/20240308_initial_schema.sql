-- Enable PostgreSQL extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Create enum for server names
create type server_name as enum ('WEST', 'EAST', 'EUROPE');

-- Create players table
create table public.players (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  server server_name not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint players_name_length check (char_length(name) >= 3)
);

-- Create index for text search
create index players_name_trgm_idx on public.players using gin (name gin_trgm_ops);

-- Create function to search all servers
create or replace function public.search_all_servers(search_term text)
returns table (
  id uuid,
  name text,
  server server_name,
  created_at timestamp with time zone
)
language plpgsql
security definer
as $$
begin
  return query
  select p.id, p.name, p.server, p.created_at
  from public.players p
  where p.name % search_term
  order by similarity(p.name, search_term) desc
  limit 100;
end;
$$;

-- Create function to get server stats
create or replace function public.get_server_stats()
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  select json_build_object(
    'west', (select json_build_object('count', count(*)) from public.players where server = 'WEST'),
    'east', (select json