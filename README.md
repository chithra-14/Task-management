# TaskFlow - Task Management Application

Full-stack task manager using **HTML, CSS, JavaScript, Node.js, Express.js and MongoDB**.

## Features
- Register/Login
- JWT authentication
- Password hashing with bcrypt
- Add, view, edit and delete tasks
- Complete/reopen tasks
- Priority and due date
- Search and status filtering
- Responsive UI

## Run

Open VS Code in this project.

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/taskmanagement
JWT_SECRET=my_task_secret_123
PORT=5000
```

Then:

```bash
npm start
```

Open `http://localhost:5000`.

**Do not upload `.env` to GitHub.**
