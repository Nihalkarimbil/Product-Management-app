
# Product Management App

A full-stack **Product Management Application** built using the **MERN** (MongoDB, Express, React, Node.js) stack. This app allows users to manage products efficiently with a modern UI and API-driven backend.

---

##  Live Demo

👉 [View Deployed App](https://product-management-app-blush.vercel.app)

---

##  How to Run Locally

Follow the steps below to set up and run the application locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Nihalkarimbil/Product-Management-app.git
cd Product-Management-app
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTENT_URI=your_frontend_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloude_name
CLOUDINARY_API_KEY=your_cloudinary_Api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret_key
```

> 🔒 **Note**: Replace `the configuration string` with your actual configuaration URI.

Start the backend server:

```bash
npm run dev
```

The backend will run by default at: [http://localhost:5000](http://localhost:5000)

---

### 3. Setup Frontend

Open a new terminal window/tab and run:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory and add the following:

```
VITE_BACKEND_API=your_Backend_Api
```

Start the React application:

```bash
npm run dev
```

The frontend will run by default at: [http://localhost:5173](http://localhost:5173)

