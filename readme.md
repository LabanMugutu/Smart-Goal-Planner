# Smart Goal Planner

## Setup

1. Install dependencies: `npm install`
2. Start the fake REST API: `npm run server` (runs json-server on port 3001)
3. In another terminal start the React app: `npm start`

React app expects json-server at `http://localhost:3001/goals`.

## Features implemented

- Data persistence via `db.json` and `json-server`
- Full CRUD:
  - Create new goals (POST)
  - Read goals on load (GET)
  - Update goals (PATCH and PUT)
  - Delete goals (DELETE)
- Progress tracking:
  - Saved vs target shown per goal
  - Remaining amount calculated
  - Visual progress bar per goal
- Deposits:
  - Add money to a specific goal (PATCH updates savedAmount)
  - UI updates immediately after deposit
- Overview:
  - Total goals, total saved, completed count
  - Time-left per goal and warnings:
    - If deadline within 30 days and not complete → warning
    - If deadline passed and not complete → marked Overdue

## Notes

- IDs are normalized to strings in API wrapper to avoid type mismatches.
- Numeric fields are normalized to numbers on read and on update.
- Date handling uses `date-fns` for safety and readability.

Feel free to fork this repo and improve the project.
This Repo was for educational purposes
## Contact me via 
 - gmail :labanmugutu@gmail.com