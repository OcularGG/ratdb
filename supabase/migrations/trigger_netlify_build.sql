-- Create a function to trigger Netlify build
create or replace function trigger_netlify_build()
returns trigger as $$
begin
  perform
    net.http_post(
      url := 'https://api.netlify.com/build_hooks/YOUR_UNIQUE_HOOK_ID',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{}'::jsonb
    );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger for the players table
create trigger trigger_netlify_build_on_players_change
  after insert or update or delete on players
  for each statement
  execute function trigger_netlify_build();