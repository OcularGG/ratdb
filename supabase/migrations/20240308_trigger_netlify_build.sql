-- Enable the http extension if not already enabled
create extension if not exists "http" with schema "extensions";

-- Create a function to trigger Netlify build
create or replace function public.trigger_netlify_build()
returns trigger as $$
begin
  perform
    http_post(
      url := 'https://api.netlify.com/build_hooks/67cca970825048f8e28c8498',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{}'::jsonb
    );
  return new;
exception
  when others then
    raise warning 'Failed to trigger Netlify build: %', sqlerrm;
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers for your tables
create trigger trigger_netlify_build_on_players_change
  after insert or update or delete on public.players
  for each statement
  execute function public.trigger_netlify_build();