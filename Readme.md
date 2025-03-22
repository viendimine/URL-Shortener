---

## 📚 **URL Shortener API**

This project is a simple URL shortener built using **Node.js**, **Express**, and **MongoDB**.  
It allows users to shorten long URLs, create custom aliases, and redirect shortened URLs to their original destinations.  
The project also supports basic URL statistics like tracking the number of visits.

---

## 🎯 **Project Architecture & Approach**

### 📌 **How It Works:**
1. **Shorten URL:**  
   - Users send a `POST /shorten` request with the original URL.
   - A short code is generated using a utility function or a custom alias if provided.
   - The URL and its short code are stored in the MongoDB database.

2. **Redirect URL:**  
   - A `GET /:shortCode` request redirects the user to the original URL.
   - Visit count is incremented for every hit on the short URL.

3. **Handling Edge Cases:**
   - Duplicate aliases are checked to prevent conflicts.
   - Expired or invalid short codes return a `404` error.

---

## 🚀 **Tech Stack**

- **Backend:** Node.js + Express.js
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Deployment Platform:** Render (optional: Railway / Fly.io)

---

## 🛠️ **Setup Instructions**

### ✅ **Step 1: Clone the Repository**
```bash
git clone https://github.com/viendimine/Vishy_Url-Shortener.git
cd Vishy_Url-Shortener
```

### ✅ **Step 2: Install Dependencies**
```bash
npm install
```

### ✅ **Step 3: Create a `.env` File**
Create a `.env` file in the root directory and add the following:

```
MONGO_URI=<your_mongodb_connection_string>
BASE_URL=http://localhost:5000
PORT=5000
```

👉 **To Get `MONGO_URI`:**
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database).
- Create a new cluster.
- Click on `Connect` > `Connect your application`.
- Copy the **connection string** (something like):
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/urlshortener?retryWrites=true&w=majority
```
- Replace `<username>` and `<password>` with your credentials.

---

## ▶️ **Run the Project Locally**

### ✅ **Step 1: Start the Server**
```bash
node server.js
```
OR if you're using `nodemon`:
```bash
npx nodemon server.js
```

### ✅ **Step 2: Access the API**
- Visit `http://localhost:5000` in your browser.
- Use Postman or any API testing tool to send requests.

---

## 📡 **API Endpoints & Usage**

### 1️⃣ **POST /shorten**
**Request:**
```json
POST /shorten
Content-Type: application/json

{
  "url": "https://www.example.com",
  "alias": "customAlias"  // Optional
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/customAlias"
}
```

---

### 2️⃣ **GET /:shortCode**
**Request:**
```http
GET /customAlias
```

**Response:**  
✅ Redirects to `https://www.example.com`.  
If the URL is expired or invalid, returns:
```json
{
  "error": "URL not found or expired"
}
```

---

### 3️⃣ **Error Responses**
- **400 Bad Request:** Invalid input or duplicate alias.
- **404 Not Found:** URL not found or expired.

---

## 🌐 **Deployment on Render**

### ✅ **Step 1: Create a GitHub Repository**
- Push your project to GitHub using:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### ✅ **Step 2: Deploy on Render**
1. Go to [Render](https://render.com/).
2. Click **New Web Service**.
3. Connect your GitHub repository.
4. Select the correct repository (`Vishy_Url-Shortener`).
5. Set **Build Command**:
```bash
npm install
```
6. Set **Start Command**:
```bash
node server.js
```
7. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `BASE_URL`: Your Render URL (e.g., `https://your-app.onrender.com`).
8. Click **Deploy**.

---

## 🛢️ **MongoDB Cloud Setup**

### ✅ **Step 1: Create MongoDB Atlas Account**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas).
- Create a **New Cluster** (select any free tier region).

### ✅ **Step 2: Set Up Database**
1. Click on **Database Access** → Add a new database user.
2. Add your username and password.
3. Click on **Network Access** → Add IP address.
4. Select **Allow Access from Anywhere**.

### ✅ **Step 3: Get Connection String**
- Click on `Connect` → `Connect your application`.
- Copy the connection string and replace in `.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urlshortener?retryWrites=true&w=majority
```

---

## 📈 **Future Enhancements**

✅ Custom URL expiration options.  
✅ Track detailed analytics (country, device, etc.).  
✅ Scale to handle millions of requests.  

---

## 📄 **License**
This project is licensed under the MIT License.

---

🎉 **Project Successfully Set Up & Deployed!**  
Let me know if you encounter any issues! 😊
