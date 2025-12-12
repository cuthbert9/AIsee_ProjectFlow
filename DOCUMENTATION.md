# AIsee_ProjectFlow Documentation

## Project Overview
AIsee_ProjectFlow is a full-stack web application designed to manage projects, likely focusing on AI-driven project flows. It features a React-based frontend and a Node.js/Express backend with a PostgreSQL database.

## Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI Components:**  Lucide React icons, React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (`pg` driver)
- **Utilities:** Cors, Dotenv

### DevOps
- **Containerization:** Docker, Docker Compose

---

## Getting Started

### Prerequisites
- Docker & Docker Compose (Recommended)
- Node.js (v18+) and npm (for manual setup)

### Running with Docker (Recommended)
The project includes a `docker-compose.yml` file for easy orchestration.

1. **Create a `.env` file** in the root or `backend` directory with necessary environment variables (e.g., `DATABASE_URL`).
2. **Build and Run:**
   ```bash
   docker-compose up --build
   ```
   - **Frontend:** Accessible at `http://localhost:`
   - **Backend:** Accessible at `http://localhost:3000`

### Manual Setup

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Runs on `http://localhost:3000`.

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Typically runs on `http://localhost:5173` (Vite default), though Docker maps it to 80.

---

## Backend Documentation

### API Endpoints
Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/projects` | Create a new project |
| `GET` | `/projects` | Retrieve all projects |
| `PUT` | `/projects/:id` | Update an existing project by ID |
| `DELETE` | `/projects/:id` | Delete a project by ID |
| `GET` | `/` | Health check ("This Route is working !") |

### Database Schema
The database uses **PostgreSQL** managed by **Drizzle ORM**.

#### Table: `projects`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, unique | Auto-generated UUID |
| `name` | Text | Not Null | Project name |
| `description` | Text | Not Null | Project description |
| `keywords` | Text[] | Not Null | Array of keywords |
| `priority` | Text | Not Null | Priority level |
| `usecases` | Text[] | Not Null | Array of use cases |
| `role` | Text | Not Null | User role associated with project |
| `datasources` | Text[] | Not Null | Array of data sources |
| `socials` | Text[] | Not Null | Array of social links |
| `dashboardMetrics` | Text[] | Not Null | Array of metrics |

---

## Frontend Documentation

### Directory Structure
- `src/components`: Contains all React components.
- `src/Context`: Context providers (if any).
- `src/lib`: Utility functions and libraries.
- `src/services`: API service calls.
- `src/assets`: Static assets.

### Key Components
- **`App.tsx`**: Main application layout, renders `Sidebar` and `CreateProject`.
- **`Sidebar.tsx`**: Navigation sidebar.
- **`CreateProject.tsx`**: Main form/interface for creating new projects.
- **`ProjectCard.tsx`**: Component to display individual project details (likely used in a list view).
- **`EditProject.tsx`**: Interface for editing existing projects.

### Styling
The project uses **Tailwind CSS** for styling. Global styles are defined in `src/index.css`.
