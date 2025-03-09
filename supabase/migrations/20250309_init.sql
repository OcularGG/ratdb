-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (unchanged)
-- Previous profiles table code remains the same...

-- Create rat_reports table
CREATE TYPE server_region AS ENUM ('WEST', 'EAST', 'EUROPE');
CREATE TYPE incident_type AS ENUM ('THEFT', 'SCAM', 'MAMMOTH_SCAM');

CREATE TABLE rat_reports (
    id SERIAL PRIMARY KEY,
    rat_name TEXT NOT NULL,
    aliases TEXT[],
    discord_main TEXT,
    discord_alts TEXT[],
    incident_date DATE NOT NULL,
    details TEXT NOT NULL,
    server server_region NOT NULL,
    type incident_type NOT NULL,
    verified BOOLEAN DEFAULT false,
    evidence_links TEXT[],
    reporter_name TEXT NOT NULL,
    report_timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for rat_reports
ALTER TABLE rat_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for rat_reports
CREATE POLICY "Anyone can read rat_reports" 
    ON rat_reports FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can create reports" 
    ON rat_reports FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Only admins can update reports" 
    ON rat_reports FOR UPDATE 
    TO authenticated 
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE email LIKE '%@admin.com'
    ));