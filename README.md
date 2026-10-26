# PlanEvent — Event Registration Admin Panel

PlanEvent is a beginner-friendly MERN starter for the event registration admin panel, styled with a warm cream-and-brown UI.

## Required folders

```text
planevent/
├── frontend/    # React + Vite + React Router
└── backend/     # Node.js + Express + Mongoose
```

## What is included

- Dashboard screen with the required columns: Event ID, Event Name, Event Date, Venue, Total Registrations
- Navbar with only **Dashboard** and **Add Event** tabs
- Add Event form with Event Name, Event Description, Event Date, Venue
- An edit screen reached by the Dashboard's Update button
- Delete button in the Dashboard
- Responsive warm neutral styling
- Frontend API helper functions and a backend route file with TODOs for the exam's core CRUD implementation

**Important:** This is a starter, not a finished exam submission. The Express event route handlers are intentionally left as TODOs for you to implement and test. The UI will not perform end-to-end CRUD until those API handlers are completed and MongoDB Atlas is configured.

## 1. Configure MongoDB Atlas

1. Create or use a MongoDB Atlas **test** project and cluster.
2. Create a database user with a test password.
3. In Atlas Network Access, allow your current IP address for testing.
4. Copy the application's connection string, replace the username/password placeholders, and use a database name such as `event_admin_exam`.
5. Open `backend/.env` and replace `MONGODB_URI` with that connection string. Use only a test credential and follow your exam instructions for repository sharing.

The `.env` in this ZIP contains a placeholder, not a working secret. Never publish a real personal or production secret.

## 2. Start the backend

Open a terminal in `backend/` and run:

```bash
npm install
npm run dev
```

The server uses port `5000`. At first, the event API endpoints are not implemented; complete the TODOs in `routes/events.js` before expecting the frontend CRUD to work.

## 3. Start the frontend

Open a second terminal in `frontend/` and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 4. Finish the TODOs in this order

1. **Read `backend/models/Event.js`.** It defines the event fields and a default `totalRegistrations` value of `0`.
2. **Implement `GET /api/events`** in `backend/routes/events.js`. Return all events as JSON. The dashboard expects an array.
3. **Implement `GET /api/events/:id`**. Find an event by its MongoDB `_id`; return a clear 404 response if it does not exist.
4. **Implement `POST /api/events`**. Validate the required fields, create and save the event, and return the created document.
5. **Implement `PUT /api/events/:id`**. Validate the ID and update the existing event, returning the updated document.
6. **Implement `DELETE /api/events/:id`**. Delete the requested event and return a success response.
7. Check each endpoint with a REST client or browser where appropriate, then test Add, Update, and Delete through the React UI.
8. Check the browser console and backend terminal for errors. Confirm all five dashboard columns appear and that the registration count is displayed.

## 5. GitHub submission checklist

- Both `frontend/` and `backend/` folders are committed.
- Both `package.json` files are present.
- MongoDB Atlas uses test credentials only.
- If your examination instructions require committing `.env`, make sure it contains only the test/dummy connection information approved for the exam—not personal or production secrets.
- Fresh install works: run `npm install` separately inside `backend/` and `frontend/`.
- Dashboard, Add, Update, and Delete are tested end to end.
- Repository access is set as requested by the exam instructions.

## Notes

- Event ID in the table is the MongoDB document `_id`.
- `totalRegistrations` starts at `0`; the brief does not require building a separate attendee registration workflow.
- No login, analytics, search, filters, or other extra features are included.
