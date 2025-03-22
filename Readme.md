
## 📚 **URL Shortener Project**

This project is a **URL Shortener API** built using **Node.js, Express, and MongoDB**. It converts long URLs into short, easily shareable URLs and redirects them to the original URL when accessed.

---

## 🚀 **Project Overview**

- **Shorten URL API:** Accepts a long URL and returns a shortened version.
- **Custom Alias Support:** Allows users to create custom short URLs.
- **Redirect URL API:** Redirects users from a short URL to the original URL.
- **Visit Count Tracking:** Tracks the number of visits to a URL.

---

## ⚙️ **Project Structure**

```
GIVA
├── controllers
│   └── urlController.js   # Handles URL shortening and redirection logic
├── models
│   └── urlModel.js        # Defines URL schema and model for MongoDB
├── routes
│   └── urlRoutes.js       # Defines API routes and endpoints
├── utils
│   └── generateShortCode.js  # Generates a unique short code
├── .env                   # Environment variables
├── server.js              # Main server configuration
└── package.json           # Project dependencies
```

---

## 💡 **Algorithms and Code Explanation**

### 1. **URL Shortening Logic**
- When a user submits a long URL:
  - If a custom alias is provided, the system checks if it’s available.
  - If no alias is provided, a unique random short code is generated.
- A new record is inserted into the MongoDB database.
- The generated short URL is returned as a response.

✅ **Key Algorithm:**  
- Generates a random short code using `generateShortCode.js`:
```js
const crypto = require("crypto");

// Generate a random 6-character string or use a custom alias
const generateShortCode = (alias) => {
  return alias || crypto.randomBytes(3).toString("hex");
};

module.exports = generateShortCode;
```

---

### 2. **Redirection Logic**
- When a user accesses a short URL:
  - It checks if the short code exists in the database.
  - If the record is found and the URL is not expired, it redirects the user to the original URL.
- Visit count is incremented for each redirection.

✅ **Redirection Code:**
```js
exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  const url = await URL.findOne({ shortCode });

  if (!url || (url.expiry && url.expiry < Date.now())) {
    return res.status(404).json({ error: "URL not found or expired" });
  }

  // Update visit count
  url.visitCount += 1;
  await url.save();
  res.redirect(url.originalUrl);
};
```

---

### 3. **Custom Alias Handling**
- If the user provides an alias, the system checks whether the alias is already taken.
- If not, it assigns the alias to the URL record.

✅ **Alias Code:**
```js
if (alias) {
  const aliasExists = await URL.findOne({ customAlias: alias });
  if (aliasExists) {
    return res.status(400).json({ error: "Alias is already taken" });
  }
}

// Generate short code
const shortCode = generateShortCode(alias);
```

---

## 📦 **Installation and Setup**

### 1. **Clone the Repository**
```bash
git clone https://github.com/viendimine/Vishy_Url-Shortener.git
cd Vishy_Url-Shortener
```

---

### 2. **Install Dependencies**
```bash
npm install
```

---

### 3. **Set Up Environment Variables**
Create a `.env` file in the root directory with the following:
```
MONGO_URI=<your-mongodb-uri>
BASE_URL=https://your-app-name.onrender.com
PORT=5000
```

✅ **Example MongoDB URI:**
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/url-shortener
```

---

### 4. **Run the Server Locally**
```bash
node server.js
```

---

## 📡 **API Endpoints**

### 1. **Shorten URL**
- **Endpoint:** `POST /shorten`
- **Request:**
```json
{
  "url": "https://www.example.com/some/very/long/url",
  "alias": "custom-alias"  // Optional
}
```
- **Response:**
```json
{
  "shortUrl": "https://your-app-name.onrender.com/custom-alias"
}
```

---

### 2. **Redirect to Original URL**
- **Endpoint:** `GET /:shortCode`
- **Request:**  
Access the shortened URL in your browser:
```
https://your-app-name.onrender.com/custom-alias
```
✅ It will redirect to the original URL.

---

## 🌐 **Deploying to Render**

### 1. **Push Code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

---

### 2. **Deploy on Render**
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click on **New Web Service**.
3. Connect your GitHub repository.
4. Choose **Node.js** as the environment.
5. Set the build command:
```bash
npm install
```
6. Set the start command:
```bash
node server.js
```
7. Add environment variables (same as in `.env`).
8. Click **Deploy**.

---

## 📝 **MongoDB Atlas Setup**

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster.
3. Whitelist your IP address or set to `0.0.0.0/0` for all IPs.
4. Create a database named `url-shortener`.
5. Add a new database user and note down the **username** and **password**.
6. Use the connection string in your `.env` file:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/url-shortener
```

---

## 🎯 **Troubleshooting Tips**
- Check if your `.env` file is properly configured.
- Check MongoDB connection string for typos.
- Monitor logs in Render for errors.

---

## 🎉 **Conclusion**
You now have a fully functional URL shortener service deployed on Render!  

