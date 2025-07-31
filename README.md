# Tasky app for Task Management

## Production Live Link

Live [https://taskobd.vercel.app](https://taskobd.vercel.app)

## Getting Started

## Clone the repository

- HTTPS

```bash
git clone https://github.com/roushan-sheik/tasko-frontend.git
```

- SSH

```bash
git clone git@github.com:roushan-sheik/tasko-frontend.git
```

## Navigate to the directory

```bash
cd tasko-frontend
```

## Install all the dependencies

```bash
npm install

```

## Create a .env file and past the Backend API Base Url

```bash
touch .env

```

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

### Or add this

```bash
NEXT_PUBLIC_API_BASE_URL=https://tasko-backend-production.up.railway.app/api/v1
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## App is running on this port

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File and Folder Structure

```
.
├── app
│   ├── (AuthLayout)
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── reset-password
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── (DashboardLayout)
│   │   ├── dashboard
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   └── spin-wheel
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── layout
│   │   ├── DashboardHeader.tsx
│   │   └── Header.tsx
│   ├── shared
│   │   └── SectionContainer.tsx
│   ├── tasks
│   │   ├── ConfirmationModal.tsx
│   │   ├── CreateTaskModal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── StatusDropdown.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskFilters.tsx
│   └── ui
├── config
│   └── index.ts
├── constants
├── context
│   └── AuthContext.tsx
├── hooks
│   ├── useAuth.ts
│   └── useTasks.ts
├── providers
│   └── QueryProvider.tsx
├── schemas
│   ├── createTask.schema.ts
│   ├── login.schema.ts
│   ├── resetPassword.schema.ts
│   └── signup.schema.ts
├── services
│   ├── authService.ts
│   └── taskService.ts
└── types
   ├── authService.ts
   ├── auth.ts
   └── task.ts

```
