import axios from "axios";


/* ----------------------------------------------------
   UTILS & CONFIG
---------------------------------------------------- */
const normalize = (s) => (s || "").trim().toLowerCase();

function getTMDBClient() {
  return axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
    timeout: 20000,
  });
}


/* ----------------------------------------------------
   MAPPING (Mood = Primary, Aesthetic = Secondary)
---------------------------------------------------- */
const MOVIE_GENRES = {
  "happy": "35,10751",        // Comedy, Family
  "sad": "18",               // Drama
  "in love": "10749",        // Romance
  "heartbroken": "18,10749", // Drama, Romance
  "mood swings": "53,18,9648", // Thriller, Drama, Mystery
  "zoned out": "878,14,16",  // Sci-Fi, Fantasy, Animation
  "not sure": "18,35"        // Drama, Comedy (General)
};

const AESTHETIC_FILTERS = {
  "vintage": { year_lte: "1990-01-01", keyword: null },
  "dark": { year_lte: null, keyword: "9715" },    // Suspense/Gritty
  "cozy": { year_lte: null, keyword: "158718" },  // Comfort
  "sports": { year_lte: null, keyword: "6075" },
  "romcom": { year_lte: null, keyword: "9799" }
};

/* ----------------------------------------------------
   MOVIE FETCHER
---------------------------------------------------- */
async function fetchMovies(mood, aesthetic) {
  const normMood = normalize(mood);
  const normAesthetic = normalize(aesthetic);

  const genreIds = MOVIE_GENRES[normMood] || "18"; // Fallback to Drama
  const aestheticConfig = AESTHETIC_FILTERS[normAesthetic];

  let params = {
    include_adult: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
    with_genres: genreIds,
    "vote_count.gte": 150, // Ensures quality/recognizable movies
  };

  // Apply Secondary Aesthetic Filters
  if (aestheticConfig) {
    if (aestheticConfig.keyword) params.with_keywords = aestheticConfig.keyword;
    if (aestheticConfig.year_lte) params["primary_release_date.lte"] = aestheticConfig.year_lte;
  }

  try {
    const TMDB = getTMDBClient();
    let res = await TMDB.get("/discover/movie", { params });

    let movies = res.data.results || [];

    // FALLBACK: If Primary + Secondary is too specific (0 results), search Mood only
    if (movies.length === 0) {
      console.log(`Fallback: No movies found for ${mood} + ${aesthetic}. Trying Mood only.`);
      delete params.with_keywords;
      delete params["primary_release_date.lte"];
      res = await TMDB.get("/discover/movie", { params });
      movies = res.data.results || [];
    }

    return movies.slice(0, 10);
  } catch (err) {
    console.error("TMDB API Error:", err.message);
    return [];
  }
}

/* ----------------------------------------------------
   BOOK FETCHER
---------------------------------------------------- */
async function fetchBooks(mood, aesthetic) {
  // Primary: Mood, Secondary: Aesthetic
 // const query = `${mood} fiction ${aesthetic}`;
  /* Change the query line in fetchBooks to this: */
const query = `intitle:${mood}+${aesthetic}+fiction`;
  
  try {
    const res = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query,
        maxResults: 15,
        key: process.env.GOOGLE_BOOKS_API_KEY
      }
    });

    let items = res.data.items || [];

    // FALLBACK: If specific query returns nothing, search just the mood
    if (items.length === 0) {
      const fallbackRes = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: { q: `${mood} fiction`, maxResults: 15, key: process.env.GOOGLE_BOOKS_API_KEY }
      });
      items = fallbackRes.data.items || [];
    }

    return items
      .filter(b => b.volumeInfo?.imageLinks?.thumbnail) // Only books with covers
      .map(b => ({
        id: b.id,
        volumeInfo: {
          title: b.volumeInfo.title,
          authors: b.volumeInfo.authors || ["Unknown Author"],
          description: b.volumeInfo.description,
          imageLinks: b.volumeInfo.imageLinks
        }
      })).slice(0, 10);
  } catch (err) {
    console.error("Google Books Error:", err.message);
    return [];
  }
}

/* ----------------------------------------------------
   MAIN CONTROLLER
---------------------------------------------------- */
export const getRecommendations = async (req, res) => {
  // Fetch from query string (sent via GET request from frontend)
  const { mood, aesthetic } = req.query;

  if (!mood || !aesthetic) {
    return res.status(400).json({ error: "Mood and aesthetic are required parameters." });
  }

  try {
    console.log(`Processing Recs for Mood: ${mood} | Aesthetic: ${aesthetic}`);

    const [movies, books] = await Promise.all([
      fetchMovies(mood, aesthetic),
      fetchBooks(mood, aesthetic)
    ]);

    res.json({
      mood,
      aesthetic,
      movies,
      books
    });
  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};