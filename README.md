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
* **Backend**: Laravel 8 (REST API)

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



**Clone the repository:**

   ```bash
   git clone https://github.com/FreL082998/Simple-Task-Management-App.git
   cd Simple-Task-Management
   ```

### Backend (Laravel)

1. **Configure environment variables:**
   Create a `.env` file in the root/api and add:

   ```env
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=base64:uc8ejaPvyEdRr8P8bm7VO4uJecTwDZ9daiFq+Iv8fq0=
    APP_DEBUG=true
    APP_URL=http://localhost

    LOG_CHANNEL=stack
    LOG_DEPRECATIONS_CHANNEL=null
    LOG_LEVEL=debug

    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=exam_db
    DB_USERNAME=xampp
    DB_PASSWORD=Abc@12345

    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    FILESYSTEM_DRIVER=local
    QUEUE_CONNECTION=sync
    SESSION_DRIVER=file
    SESSION_LIFETIME=120

    MEMCACHED_HOST=127.0.0.1

    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_MAILER=smtp
    MAIL_HOST=mailhog
    MAIL_PORT=1025
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS=null
    MAIL_FROM_NAME="${APP_NAME}"

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_DEFAULT_REGION=us-east-1
    AWS_BUCKET=
    AWS_USE_PATH_STYLE_ENDPOINT=false

    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1

    MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
   ```

2. **Install dependencies:**

   ```bash
   composer install
   ```

3. **Run Migrations:**

   ```bash
   php artisan migrate
   ```

4. **Start Laravel Server:**

   ```bash
   php artisan serve
   ```

   Backend will run at `http://127.0.0.1:8000`

### Frontend (React)

1. **Configure environment variables:**
   Create a `.env` file in the root/web and add:

   ```env
    VITE_API_BASE=http://localhost:8000
    VITE_PORT=3000
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Run the development server:**

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
