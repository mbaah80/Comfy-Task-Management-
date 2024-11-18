# Task Management Dashboard

## Description
This is a Task Management Dashboard built using React, Redux, and TailwindCSS. The app allows users to mock login, and manage their tasks. It includes features like theme switching (dark/light mode), task creation, updating, deletion, and filtering based on task status and priority.

## How to Run the Project
"start": "react-scripts start",

### Prerequisites
- Node.js and npm should be installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### Installation Steps
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

src/
├── components/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── TaskList.tsx
│   └── TaskForm.tsx
├── redux/
│   ├── authSlice.ts
│   └── taskSlice.ts
├── App.tsx
├── index.tsx
└── tailwind.config.js

npm install
npm start


Dependencies
React: The front-end framework used for building the UI.
Redux Toolkit: For state management.
TailwindCSS: For styling the components with utility-first CSS.
Axios: For making API requests (or handling data persistence via local storage).
UUID: For generating unique task IDs.

Application Architecture
The application is structured as follows:

Frontend
React: The main UI components are created using React.
Redux: State management is handled using Redux Toolkit.
authSlice: Manages authentication state, including token storage and theme switching.
taskSlice: Manages the state of tasks, including CRUD operations, filtering, and persistence.
TailwindCSS: Used for styling the UI with a responsive design approach.
Task Management
Tasks are stored in Redux state and are persisted using localStorage to retain data across page reloads. The taskSlice uses a mock API (or local storage) for task CRUD operations.

Authentication
JWT-based authentication is simulated. Upon login, a token is stored in Redux state and localStorage. The login/logout functionality is managed in the authSlice

Demo Url : https://comfy-task-management.vercel.app/
