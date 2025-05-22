# Cents - Minimalist Budget Tracker

A modern, minimalist budget tracking application built with React, Node.js, and Tailwind CSS. Track your expenses, visualize your spending patterns, and manage your budget with ease.

## Features

- 📱 Clean, minimalist user interface
- 🌓 Dark/Light mode support
- 📊 Visual expense tracking with charts
- 💰 Quick expense entry
- 📝 Edit and delete expenses
- 💾 Local storage persistence
- 📱 Responsive design for all devices

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- Database: MongoDB
- Charts: Chart.js
- Icons: Heroicons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (if using local database)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cents-app.git
cd cents-app
```

2. Install dependencies:
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
```

4. Start the development servers:

```bash
# Start the backend server (from root directory)
npm run server

# Start the frontend development server (from client directory)
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
cents-app/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # React components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
├── server.js              # Backend server
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Heroicons](https://heroicons.com/) 