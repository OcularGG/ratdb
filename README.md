# Albion ratDB

This is a website for tracking incidents in the Albion Online game, specifically for rats (players who engage in negative behavior). The site allows users to view and search incidents in different servers (WEST, EAST, EUROPE) and includes Discord authentication.

## Features

- PostgreSQL database hosted on Supabase
- Three different database views for different servers
- Search functionality with autocomplete
- Discord login/authentication
- Light and dark mode
- Footer with Privacy Policy, Terms of Use, and Fair Reporting Policy
- Basic 404 page

## Setup

### Prerequisites

- Node.js and npm installed
- Supabase account and project
- Discord Developer application
- Netlify account

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-github-username/albion-ratdb.git
   cd albion-ratdb
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_KEY=your-supabase-api-key
   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret
   DISCORD_REDIRECT_URI=your-discord-redirect-uri
   ```

   Refer to `.env.example` for the required variables.

4. **Run the application locally:**

   ```bash
   npm start
   ```

5. **Deploy to Netlify:**

   - Push your code to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/your-github-username/albion-ratdb.git
     git push -u origin main
     ```

   - Go to Netlify, create a new site, and link it to your GitHub repository.
   - Set the build command to `npm run build` and the publish directory to `build`.
   - Add the environment variables in Netlify settings.

## Usage

- Visit your Netlify site URL.
- Use the search bar to search for incidents.
- Log in with Discord to access additional features.

## License

MIT License