# Simple Task Management Application

A simple task management web application built with **React**, **Redux Toolkit**, and **Tailwind CSS**, supporting task management with drag-and-drop, task creation, editing, deletion, and backend integration.

---

## Features

* **Add Task**: Create new tasks directly in any column.
* **Edit Task**: Edit task title and description with backend update.
* **Delete Task**: Remove tasks permanently from the database.
* **Drag & Drop**: Move tasks between columns with position tracking.

---

## Tech Stack

* **Frontend**: React, TypeScript, Tailwind CSS, Node v16.20.2
* **State Management**: Redux Toolkit
* **Drag & Drop**: @hello-pangea/dnd
* **API Communication**: Axios
* **Backend**: REST API (Laravel 8 or any RESTful service)

---

## Short Description

This simple app allows users to manage tasks visually across columns such as **Backlog**, **Ready to Go**, **In Progress**, and **Done**. Tasks can be created, edited, deleted, and rearranged with drag-and-drop. The application ensures all operations persist to a backend API and the UI stays responsive and smooth.

---

## API Endpoints

Assuming a REST API backend, the endpoints used are:

| Method | Endpoint     | Description                                          |
| ------ | ------------ | ---------------------------------------------------- |
| GET    | `/tasks`     | Fetch all tasks (paginated)                          |
| POST   | `/tasks`     | Create a new task                                    |
| PUT    | `/tasks/:id` | Update a task (title, description, status, position) |
| DELETE | `/tasks/:id` | Delete a task                                        |

**Sample Response for GET `/tasks`:**

```json
{
  "data": [
    {
      "id": 2,
      "title": "Test",
      "description": "test",
      "status": "Backlog",
      "position": 1,
      "created_at": "2025-09-16 23:23:51",
      "updated_at": "2025-09-16 23:23:51"
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

## Local Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FreL082998/Simple-Task-Management-App
   cd Simple-Task-Management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root and add:

   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

* Click **+** in a column header to add a new task.
* Click **✏️** on a task to edit title and description.
* Click **🗑** to delete a task.
* Drag and drop tasks between columns to update status and position.

All changes are persisted to the backend API.

---

## License

MIT License
