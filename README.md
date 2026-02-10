# Jeeves Dashboard 🛠️

A comprehensive project and task tracking dashboard built with Next.js.

## Features

- 📊 **Project Overview** - View all projects and their completion status
- ✅ **Task Tracking** - See completed, in-progress, and pending tasks
- 📈 **Progress Visualization** - Track completion percentage for each project
- 🎯 **Status Categorization** - Organize projects by status
- 📱 **Responsive Design** - Works on all screen sizes

## Project Categories

- **In Progress**: Active projects currently being worked on
- **Completed**: Finished projects with all tasks done
- **Pending**: Projects yet to start

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx     # Root layout with styling
└── page.tsx       # Dashboard component
data/
└── projects.json  # Project and task data
```

## Adding/Updating Projects

Edit `data/projects.json` to add or update projects:

```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "status": "completed|in-progress|pending",
  "completedAt": "2026-02-10",
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "status": "completed|pending|in-progress"
    }
  ]
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
