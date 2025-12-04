Uber Clone – MERN + Next.js
A full‑stack Uber‑style ride‑hailing demo built with Node.js/Express, MongoDB, and Next.js + React. Riders can request rides, drivers see incoming ride requests, and both can manage trips from their dashboards.

Features:
Authentication & roles
JWT‑based login / register
Separate rider and driver roles
Protected API routes with auth middleware
Rider experience
Home page with ride request form
Live map preview (Leaflet + OpenStreetMap)
Rider dashboard with ride history
Driver experience

Driver dashboard that:
Polls backend every 5s for pending ride requests
Allows driver to accept or complete rides
Only drivers see driver tools; riders see their own history

Backend:
REST API with Express
MongoDB via Mongoose (Users, Rides)
CORS configured for http://localhost:3000
Basic global error handler

Frontend
Next.js 13 pages router
Auth context with persisted token/user in localStorage
Responsive home page with map + marketing sections
Uber‑style footer and layout

Tech Stack :

Backend:
Node.js
Express
MongoDB + Mongoose
JSON Web Token (JWT)
bcryptjs
cors
dotenv

Frontend:
Next.js 13
React 18
React‑Leaflet + Leaflet (maps)
CSS Modules

uber_clone/
  backend/
    app.js
    server.js
    config/
      db.js
      paymentConfig.js
    controllers/
      authController.js
      rideController.js
    middlewares/
      authMiddleware.js
      errorHandler.js
    models/
      User.js
      Ride.js
      Driver.js
    routes/
      authRoutes.js
      rideRoutes.js
    services/
      mapService.js
      stripeService.js
    utils/
      hashPassword.js
      jwtUtils.js
      sendEmail.js (optional)
    tests/
      auth.test.js
      ride.test.js

  frontend/
    pages/
      index.jsx
      login.jsx
      register.jsx
      dashboard.jsx
      _app.jsx
      _document.jsx
    components/
      RideForm.jsx
      MapComponent.jsx
      DriverDashboard.jsx
      RideHistory.jsx
      UserProfile.jsx
      DashboardLayout.jsx
      Footer.jsx
      HomeHero.module.css
      Footer.module.css
    context/
      AuthContext.js
    public/
      (static assets)


Getting Started
1. Clone and install
bash
git clone <your-repo-url> uber_clone
cd uber_clone
Backend
bash
cd backend
npm install
Create .env in backend/:

text
MONGO_URI=mongodb://localhost:27017/uberclone
JWT_SECRET=supersecretkey
STRIPE_SECRET_KEY=sk_test_your_key_here        # optional for payments
GEOAPIFY_API_KEY=your_geoapify_key_here       # optional for routing
NOTIFY_EMAIL=youremail@gmail.com              # optional for email utils
NOTIFY_EMAIL_PASSWORD=your_app_password
Start backend:

bash
npm start
Backend runs on: http://localhost:5000

Frontend
bash
cd ../frontend
npm install
npm run dev
Frontend runs on: http://localhost:3000

Make sure backend/app.js CORS is set to:

js
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
Usage
Register a rider

Go to http://localhost:3000/register

Choose role rider

Log in as rider

Request a ride from the home page

See rides in Dashboard → “My Rides”

Register a driver

Role driver

Log in as driver

Open Dashboard → see Available Ride Requests

Accept a ride and then mark it completed

Testing (backend)
From backend/:

bash
npm test
Runs Jest + Supertest tests for auth and rides.

Notes & Next Steps
Map routing and fare calculation are stubbed via mapService.js; plug in real coordinates and API keys to enable.

Stripe integration is scaffolded via stripeService.js but not wired into UI yet.

Notifications (sendEmail.js) are optional; if unused, remove imports and .env keys.

Feel free to extend with:
Real‑time updates via Socket.io
Stripe Checkout / Payment Element
Driver location tracking on the map
Better ride matching and pricing logic