import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // seconds (Vercel Pro/Hobby limit)

// Genre ID mapping for TMDB
const GENRE_MAP: Record<string, number | null> = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  horror: 27,
  mystery: 9648,
  romance: 10749,
  scifi: 878,
  thriller: 53,
  war: 10752,
  western: 37,
  recent: null,
};

// Language to region mapping
const LANGUAGE_MAP: Record<string, string> = {
  en: "US",
  hi: "IN",
  kn: "IN",
  ta: "IN",
  ml: "IN",
  te: "IN",
  ko: "KR",
  ja: "JP",
  es: "ES",
  fr: "FR",
  de: "DE",
  zh: "CN",
};

// In-memory cache with TTL
interface CacheEntry {
  data: FilteredMovie[];
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface TMDBMovie {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_language: string;
}

interface FilteredMovie {
  id: number;
  imdbId: string;
  title: string;
  rtScore: number;
  imdbRating: string;
  tmdbScore: number;
}

interface TMDBMovieDetails {
  id: number;
  imdb_id?: string;
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

interface StreamingProvider {
  provider_name: string;
  logo_path: string;
  provider_id: number;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY || "");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

async function fetchOMDB(imdbId: string): Promise<{ Ratings?: { Source: string; Value: string }[] }> {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OMDB API error: ${res.status}`);
  return res.json();
}

function parseRTScore(value: string): number {
  // RT score format: "85%"
  return parseInt(value.replace("%", ""), 10) || 0;
}

async function discoverMovies(
  genre: string,
  minYear: string | null,
  language: string
): Promise<TMDBMovie[]> {
  const allMovies: TMDBMovie[] = [];
  const isRecent = genre === "recent";
  const genreId = GENRE_MAP[genre];

  // Fetch 2 pages for variety (keep response fast)
  for (let page = 1; page <= 2; page++) {
    const params: Record<string, string> = {
      sort_by: "vote_average.desc",
      "vote_count.gte": "50",
      with_original_language: language,
      page: page.toString(),
    };

    if (isRecent) {
      // Filter to last 2 years
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      params["primary_release_date.gte"] = twoYearsAgo.toISOString().slice(0, 10);
    } else {
      if (genreId) {
        params.with_genres = genreId.toString();
      }
      if (minYear) {
        params["primary_release_date.gte"] = `${minYear}-01-01`;
      }
    }

    const data = await fetchTMDB<{ results: TMDBMovie[] }>("/discover/movie", params);
    allMovies.push(...data.results);
  }

  return allMovies;
}

async function getIMDBId(tmdbId: number): Promise<string | null> {
  try {
    const data = await fetchTMDB<{ imdb_id?: string }>(`/movie/${tmdbId}/external_ids`);
    return data.imdb_id || null;
  } catch {
    return null;
  }
}

async function filterMoviesByRating(
  movies: TMDBMovie[],
  minRating: number
): Promise<FilteredMovie[]> {
  // Process up to 20 movies in parallel batches of 5
  const moviesToProcess = movies.slice(0, 20);
  const filtered: FilteredMovie[] = [];
  const BATCH_SIZE = 5;

  for (let i = 0; i < moviesToProcess.length; i += BATCH_SIZE) {
    const batch = moviesToProcess.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(async (movie) => {
        const imdbId = await getIMDBId(movie.id);
        if (!imdbId) return null;

        let rtScore = 0;
        let imdbRating = "N/A";

        try {
          const omdbData = await fetchOMDB(imdbId);
          const rtRating = omdbData.Ratings?.find((r) => r.Source === "Rotten Tomatoes");
          const imdbRatingData = omdbData.Ratings?.find((r) => r.Source === "Internet Movie Database");

          if (rtRating) {
            rtScore = parseRTScore(rtRating.Value);
          } else {
            rtScore = Math.round(movie.vote_average * 10);
          }

          if (imdbRatingData) {
            imdbRating = imdbRatingData.Value.split("/")[0] ?? "N/A";
          }
        } catch {
          rtScore = Math.round(movie.vote_average * 10);
        }

        if (rtScore >= minRating) {
          return { id: movie.id, imdbId, title: movie.title, rtScore, imdbRating, tmdbScore: movie.vote_average };
        }
        return null;
      })
    );

    filtered.push(...results.filter((r): r is FilteredMovie => r !== null));

    // Stop early if we have enough candidates
    if (filtered.length >= 10) break;
  }

  return filtered;
}

async function getMovieDetails(movieId: number, language: string) {
  const region = LANGUAGE_MAP[language] || "US";

  // Fetch movie details, credits, and watch providers in parallel
  const [details, credits, watchProviders] = await Promise.all([
    fetchTMDB<TMDBMovieDetails>(`/movie/${movieId}`),
    fetchTMDB<{
      crew: { job: string; name: string }[];
      cast: { name: string; character: string }[];
    }>(`/movie/${movieId}/credits`),
    fetchTMDB<{
      results: Record<string, {
        flatrate?: StreamingProvider[];
        rent?: StreamingProvider[];
        buy?: StreamingProvider[];
      }>;
    }>(`/movie/${movieId}/watch/providers`),
  ]);

  // Get director
  const director = credits.crew.find((c) => c.job === "Director")?.name || "Unknown";

  // Get top 5 cast
  const cast = credits.cast.slice(0, 5).map((c) => ({
    name: c.name,
    character: c.character,
  }));

  // Get streaming providers for the region
  const regionProviders = watchProviders.results[region] || watchProviders.results["US"] || {};

  // Collect and deduplicate providers
  const providerMap = new Map<string, { name: string; logo: string; type: string }>();

  // Add flatrate (streaming) providers
  for (const provider of regionProviders.flatrate || []) {
    if (!providerMap.has(provider.provider_name)) {
      providerMap.set(provider.provider_name, {
        name: provider.provider_name,
        logo: `https://image.tmdb.org/t/p/w45${provider.logo_path}`,
        type: "stream",
      });
    }
  }

  // Add up to 3 rent providers
  let rentCount = 0;
  for (const provider of regionProviders.rent || []) {
    if (rentCount >= 3) break;
    if (!providerMap.has(provider.provider_name)) {
      providerMap.set(provider.provider_name, {
        name: provider.provider_name,
        logo: `https://image.tmdb.org/t/p/w45${provider.logo_path}`,
        type: "rent",
      });
      rentCount++;
    }
  }

  // Add up to 3 buy providers
  let buyCount = 0;
  for (const provider of regionProviders.buy || []) {
    if (buyCount >= 3) break;
    if (!providerMap.has(provider.provider_name)) {
      providerMap.set(provider.provider_name, {
        name: provider.provider_name,
        logo: `https://image.tmdb.org/t/p/w45${provider.logo_path}`,
        type: "buy",
      });
      buyCount++;
    }
  }

  const streamingProviders = Array.from(providerMap.values());

  return {
    id: details.id,
    imdbId: details.imdb_id,
    title: details.title,
    tagline: details.tagline,
    overview: details.overview,
    releaseDate: details.release_date,
    runtime: details.runtime,
    genres: details.genres.map((g) => g.name),
    poster: details.poster_path
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : null,
    backdrop: details.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
      : null,
    director,
    cast,
    streamingProviders,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre") || "drama";
    const minYear = searchParams.get("minYear");
    const language = searchParams.get("language") || "en";
    const minRating = parseInt(searchParams.get("minRating") || "90", 10);

    // Check cache
    const cacheKey = `${genre}-${minYear}-${language}-${minRating}`;
    const cached = cache.get(cacheKey);
    let filteredMovies: FilteredMovie[];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      filteredMovies = cached.data;
    } else {
      // Discover movies from TMDB
      const movies = await discoverMovies(genre, minYear, language);

      // Filter by RT score (or scaled TMDB score)
      filteredMovies = await filterMoviesByRating(movies, minRating);

      // Cache results
      cache.set(cacheKey, {
        data: filteredMovies,
        timestamp: Date.now(),
      });
    }

    if (filteredMovies.length === 0) {
      return NextResponse.json(
        { error: "No movies found matching your criteria. Try lowering the minimum rating." },
        { status: 404 }
      );
    }

    // Pick a random movie
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const selectedMovie = filteredMovies[randomIndex]!;

    // Get full details
    const details = await getMovieDetails(selectedMovie.id, language);

    return NextResponse.json({
      ...details,
      ratings: {
        rottenTomatoes: selectedMovie.rtScore,
        imdb: selectedMovie.imdbRating,
        tmdb: selectedMovie.tmdbScore,
      },
      totalResults: filteredMovies.length,
    });
  } catch (error) {
    console.error("Movie API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie data. Please try again." },
      { status: 500 }
    );
  }
}
