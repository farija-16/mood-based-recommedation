# Auraverse Backend

Backend service for Auraverse — a mood-based movie and book recommendation platform.

This API provides recommendation endpoints based on user mood and aesthetic preferences, using external data sources such as TMDB and Google Books.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- External APIs:
  - TMDB (Movies)
  - Google Books API

---

## Architecture Overview

- Express server with modular routing
- Non-blocking MongoDB connection
- External API-based recommendation logic
- Environment-based configuration
- Deployed on Render

---

## API Endpoints

### Health Check
# Auraverse Backend

Backend service for Auraverse — a mood-based movie and book recommendation platform.

This API provides recommendation endpoints based on user mood and aesthetic preferences, using external data sources such as TMDB and Google Books.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- External APIs:
  - TMDB (Movies)
  - Google Books API

---

## Architecture Overview

- Express server with modular routing
- Non-blocking MongoDB connection
- External API-based recommendation logic
- Environment-based configuration
- Deployed on Render

---

## API Endpoints

### Health Check
GET /

### Recommendation Service Status
GET /api/recommend/all

### Get All Recommendations
GET /api/recommend/all

### Get Recommendations by Mood & Aesthetic
GET /api/recommend/mood-aesthetic?mood=happy&aesthetic=dark



### Example Response
`json
{
  "movies": [...],
  "books": [...],
} `


### Environment Variables
Create a .env file with:
MONGO_URI=your_mongodb_connection_string
TMDB_ACCESS_TOKEN=your_tmdb_token
GOOGLE_BOOKS_API_KEY=your_google_books_key

### Local Setup
npm install
npm start

#### Server runs on:
http://localhost:5000

### Deployment
Hosted on Render
MongoDB hosted on MongoDB Atlas

### Live API Base URL:
https://mood-based-recommendation-1.onrender.com
