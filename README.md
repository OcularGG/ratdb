# Albion Online ratDB

This is the repository for Albion Online ratDB.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Running the Server

To run the server, use the following command:

```bash
npm start
```

## API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```text
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_key
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=your_discord_redirect_uri
SESSION_SECRET=your_session_secret
```