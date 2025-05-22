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
- Database: SQLite (no external account needed)
- Charts: Chart.js
- Icons: Heroicons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python 3.11+ (for optional data analysis)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cubecodefowad/Cents_App.git
cd Cents_App
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. (Optional) Install Python dependencies for data analysis:
```bash
pip install -r requirements.txt
```

4. Start the development servers:

```bash
# Start the backend server (from root directory)
npm run dev

# Start the frontend development server (from client directory)
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Cents_App/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # React components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
├── server.js              # Backend server (Express + SQLite)
├── package.json           # Project dependencies
├── requirements.txt       # Python analysis dependencies
├── analyze_expenses.py    # Python analysis script
└── README.md              # Project documentation
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