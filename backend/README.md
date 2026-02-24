dev-log-backend/
├── node_modules/         # Auto-generated (ignore in git)
├── src/                  # Saara main code yaha rahega
│   ├── config/           # Database connection logic (db.js)
│   ├── models/           # Mongoose Schemas (Log.js, User.js)
│   ├── controllers/      # Functions jo logic handle karengi (logController.js)
│   ├── routes/           # API Endpoints (logRoutes.js)
│   ├── middleware/       # Custom checks (auth, error handling)
│   └── app.js            # Express app setup
├── .env                  # Private keys & DB URL (Don't share!)
├── .gitignore            # Files to ignore (node_modules, .env)
├── package.json          # Dependencies & Scripts
├── README.md             # Project ka description (Most Important!)
└── server.js             # Entry point (Server start line)