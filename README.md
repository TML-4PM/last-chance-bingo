Job Pricing Calculator
The IT Price Calculator That Even Your Boss (and Your Wife) Will Love

Welcome to the Job Pricing Calculator—the most ridiculously well-thought-out tool for calculating IT job costs you'll ever see. This isn’t your run-of-the-mill price calculator; it’s an all-in-one, advanced, configurable system that handles everything from laptop installations to emergency onsite setups. And yes, it’s funny enough to keep your boss and your wife impressed (or at least mildly amused).

Features That Will Make You Say “Wow!”
Advanced Pricing Engine:
Calculates quotes using SKU-based multipliers, configurable job details (complexity, service type, environment, etc.), service add‑ons, technician fees, emergency surcharges, and even a referral discount (enter “REF123” for a sweet 10% off)!
Dynamic Product Integration:
Our products come from a (simulated) live catalog so that you’re always up-to-date. (In production, we’d hook it up to the real Officeworks/Geeks2U data.)
Rich Service Customizations:
From extra networking to onsite installation, select your add‑ons and customize every little detail.
Robust Scheduling:
Pick a date and time slot (we load available slots from a JSON file) to schedule your job—because planning ahead is cool.
PDF Generation:
Generate a professional, compliance-friendly PDF that even your accountant will admire.
Intelligent Chatbot (Simulated NLP):
Chat with our smart (ish) chatbot that gives you recommendations and helps answer your queries.
Guided Tour:
New here? Click “Start Guided Tour” and let our overlay walk you through every feature (it’s like having a personal assistant who never takes a coffee break).
Dark Mode:
Toggle between light and dark modes because sometimes you need to work in the dark (or just like it cooler).
Analytics & Error Monitoring Placeholders:
We’ve got spots for Sentry and Google Analytics. (Just add your keys, and you’re set!)
Getting Started (For the Brave and the Bold)
Prerequisites
Node.js (v16 or later recommended)
Git (for version control, because who doesn’t love a good commit?)
A GitHub account (duh)
A Vercel account for deployment (free and fabulous)
Installation
Clone the Repository:

bash
Copy
git clone https://github.com/yourusername/job-pricing-calculator.git
cd job-pricing-calculator
Install Dependencies:

bash
Copy
npm install
Set Up Prisma: Generate the Prisma client and run your initial migration (our database loves a good makeover):

bash
Copy
npx prisma generate
npx prisma migrate dev --name init
Run Locally: Fire up the development server:

bash
Copy
npm run dev
Then, open http://localhost:3000 in your browser and bask in the glory of your creation.

Testing: Run the tests to ensure nothing’s broken—because if it’s broken, the boss might notice:

bash
Copy
npm test
Deployment with GitHub Actions and Vercel
Say goodbye to manual deployments!

GitHub Actions:
Our CI/CD pipeline in .github/workflows/ci.yml automatically tests, builds, and deploys your project on every push to the main branch. Make sure you’ve added these repository secrets:

VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
Vercel:
Connect your GitHub repository to Vercel. Every push to main triggers a fresh deployment—instant updates that keep everyone impressed.

Environment Variables
Add any extra environment variables (e.g., for Sentry, Google Analytics, etc.) in your Vercel project settings or as GitHub Secrets.

A Few Words on Humor (Because Why Not?)
If your boss asks, “How does this calculate the cost of our IT installations?” just say, “It’s like magic—with math!”
If your wife ever wonders what you’re working on, explain that you built a tool that saves money (and possibly the company), so it’s practically a superhero in code form.
