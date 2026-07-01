# Employee Management System (EMS) - Frontend

This is the React (Vite) frontend application for the Employee Management System, designed as a self-contained repository for deployment (e.g. to Vercel, Netlify, or Hostinger).

## Features & Styling
- **Modern Dark Slate Glassmorphic Design** using pure CSS.
- **Lucide React Icons** for sharp, vector layout aesthetics.
- **React Router** for clean page navigation (Dashboard, Directory, Details, Forms).
- **Responsive Layout** supporting mobile sidebars and desktop grids.

## Folder Structure
```
ems-frontend/
├── public/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Common UI Shell (Navbar, Sidebar, Layout)
│   ├── pages/           # Pages (Dashboard, EmployeeList, EmployeeDetails, EmployeeForm)
│   ├── services/        # Fetch API Client (api.js)
│   ├── App.jsx          # Router configurations
│   ├── index.css        # Core custom stylesheet (variables, components, responsive grid)
│   └── main.jsx         # React application mounting
├── .env.example         # Template for client API configurations
├── vite.config.js       # Vite configuration settings
└── package.json
```

## Setup & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file from the template:
   ```bash
   cp .env.example .env # On Linux/macOS
   # Or copy/paste and name it .env on Windows
   ```
   *Make sure `VITE_API_URL` points to `http://localhost:5000/api/employees` during local development.*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The site will load on the address shown in the terminal (usually `http://localhost:5173` or `http://localhost:5174`).

---

## Deploying to Production (e.g., Vercel / Netlify)

To deploy the frontend separately:
1. Initialize Git in the `ems-frontend` directory and push it to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   # Create a new repo on GitHub, link it, and push
   ```
2. Log into [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
3. Import your frontend GitHub repository.
4. Set the build parameters:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add the **Environment Variables**:
   - `VITE_API_URL`: Set this to your deployed backend URL. E.g., `https://my-ems-backend.onrender.com/api/employees`.
6. Click **Deploy**. Vercel/Netlify will host your frontend and make it accessible globally!
