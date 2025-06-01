# Dev-Connect-API

---

# DevConnect Backend

DevConnect is a backend service built using **Node.js**, **Express**, and **MongoDB**. It provides APIs for user authentication, profile management, and blogging functionality for the DevConnect platform — a place for developers to connect, share, and grow.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **RESTful APIs**
- **Dotenv** for environment config


## 📁 Folder Structure

```

/backend
│
├── /controllers      # Handles business logic
├── /routes           # API routes
├── /models           # Mongoose schemas
├── /utils            # Helper functions (e.g., JWT)
├── /middleware       # Auth middleware
├── .env              # Environment variables
└── server.js         # Entry point

````

---
## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/laksii-fr/Dev-Connect-API.git
cd Dev-Connect-API
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 🔐 Authentication

JWT-based authentication is used. After successful login, a token is issued and must be sent in the `Authorization` header for protected routes.

```
Authorization: Bearer <your_token>
```

---

## 📌 Available Routes

### Auth Routes (`/auth`)

* `POST /auth/register` – Register new user
* `POST /auth/login` – Login and receive token

### Profile Routes (`/profile`)

* `POST /profile/create-profile` – Create user profile *(auth required)*
* `GET /profile/:subId` – Get user profile by subId *(auth required)*

### Blog Routes (`/blog`)

* `POST /blog/create` – Create new blog *(auth required)*
* `GET /blog/all` – Get all blogs
* `GET /blog/:blogId` – Get specific blog by ID

---

## 🧪 Example cURL Request

```bash
curl -X POST http://localhost:5000/profile/create-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"email": "john@example.com", "name": "John Doe", "Phone": 9876543210}'
```

---

## 🧩 Future Enhancements

* Comment & Like system for blogs
* Pagination for blog feeds
* Admin panel
* Integration with frontend (React/Next.js)

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## 📄 License

[MIT](LICENSE)

## ✨ Maintainer

**Lakshay Sharma**

GitHub: [@laksii-fr](https://github.com/laksii-fr)

Let me know if you want me to generate an auto-linked table of contents, or tailor it for deployment (e.g., with `Docker`, `Vercel`, or `Render`).

