-- Create table for WEST server
CREATE TABLE west_server (
  rat_id SERIAL PRIMARY KEY,
  rat VARCHAR(255),
  known_aliases TEXT[],
  discord VARCHAR(255),
  discord_aliases TEXT[],
  discord_display_name VARCHAR(255),
  discord_display_name_aliases TEXT[],
  ratguard_id SERIAL,
  current_guild VARCHAR(255),
  previous_guilds TEXT[],
  date_of_incident DATE,
  victim VARCHAR(255),
  victim_discord VARCHAR(255),
  incident_type VARCHAR(50),
  incident_details TEXT,
  video_evidence TEXT[],
  image_evidence TEXT[],
  soundclip_evidence TEXT[],
  reporter VARCHAR(255),
  reporter_discord VARCHAR(255),
  reported_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for EAST server
CREATE TABLE east_server (
  rat_id SERIAL PRIMARY KEY,
  rat VARCHAR(255),
  known_aliases TEXT[],
  discord VARCHAR(255),
  discord_aliases TEXT[],
  discord_display_name VARCHAR(255),
  discord_display_name_aliases TEXT[],
  ratguard_id SERIAL,
  current_guild VARCHAR(255),
  previous_guilds TEXT[],
  date_of_incident DATE,
  victim VARCHAR(255),
  victim_discord VARCHAR(255),
  incident_type VARCHAR(50),
  incident_details TEXT,
  video_evidence TEXT[],
  image_evidence TEXT[],
  soundclip_evidence TEXT[],
  reporter VARCHAR(255),
  reporter_discord VARCHAR(255),
  reported_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for EUROPE server
CREATE TABLE europe_server (
  rat_id SERIAL PRIMARY KEY,
  rat VARCHAR(255),
  known_aliases TEXT[],
  discord VARCHAR(255),
  discord_aliases TEXT[],
  discord_display_name VARCHAR(255),
  discord_display_name_aliases TEXT[],
  ratguard_id SERIAL,
  current_guild VARCHAR(255),
  previous_guilds TEXT[],
  date_of_incident DATE,
  victim VARCHAR(255),
  victim_discord VARCHAR(255),
  incident_type VARCHAR(50),
  incident_details TEXT,
  video_evidence TEXT[],
  image_evidence TEXT[],
  soundclip_evidence TEXT[],
  reporter VARCHAR(255),
  reporter_discord VARCHAR(255),
  reported_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);