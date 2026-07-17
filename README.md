# Revline

A car-enthusiast social + marketplace app prototype (React + Tailwind + Vite).

## Run it on your own computer

1. Install [Node.js](https://nodejs.org) (the LTS version) if you don't have it.
2. Unzip this project, open a terminal in the folder, and run:
   ```
   npm install
   npm run dev
   ```
3. Open the link it gives you (usually http://localhost:5173) in your browser.

## Get a real link you can send people (no coding required)

**Option A — fastest, no account needed:**
1. In the project folder, run:
   ```
   npm install
   npm run build
   ```
   This creates a `dist` folder.
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page.
4. It gives you a live URL instantly (e.g. `random-name-123.netlify.app`) — send that to anyone.

**Option B — proper setup for ongoing changes (recommended once you're iterating):**
1. Create a free account at https://github.com and https://vercel.com
2. Create a new GitHub repository and push this project to it:
   ```
   git init
   git add .
   git commit -m "first version"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. In Vercel, click "Add New Project," import that GitHub repo, and click Deploy.
4. Every time you push new changes to GitHub, Vercel automatically redeploys — so you get a permanent link that updates as you learn and build more.

## Add it to your iPhone home screen

Once it's deployed (Option A or B above gives you a live URL):

1. Open the live URL in **Safari** on your iPhone (must be Safari, not Chrome)
2. Tap the **Share** icon (square with an arrow) in the bottom toolbar
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

It'll now sit on your home screen with its own Revline icon and open full-screen, no browser bar — just like a real app.

## What's next (in order)

- Right now all the data (posts, parts, cars) is fake, hardcoded in `src/App.jsx`.
- The next real step is connecting it to [Supabase](https://supabase.com) (free) so posts, users, and parts are stored for real and update live.
- After that: Stripe for real payments on parts/collectibles.
