"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "kn", label: "Kannada" },
  { value: "ta", label: "Tamil" },
  { value: "ml", label: "Malayalam" },
  { value: "te", label: "Telugu" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const GENRE_OPTIONS = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "animation", label: "Animation" },
  { value: "comedy", label: "Comedy" },
  { value: "crime", label: "Crime" },
  { value: "documentary", label: "Documentary" },
  { value: "drama", label: "Drama" },
  { value: "family", label: "Family" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "scifi", label: "Sci-Fi" },
  { value: "thriller", label: "Thriller" },
  { value: "war", label: "War" },
  { value: "western", label: "Western" },
  { value: "recent", label: "Recently Released" },
];

interface MovieResult {
  id: number;
  imdbId: string;
  title: string;
  tagline: string;
  overview: string;
  releaseDate: string;
  runtime: number;
  genres: string[];
  poster: string | null;
  backdrop: string | null;
  ratings: {
    rottenTomatoes: number;
    imdb: string;
    tmdb: number;
  };
  director: string;
  cast: { name: string; character: string }[];
  streamingProviders: { name: string; logo: string; type: string }[];
  totalResults: number;
}

export default function MoviesPage() {
  const [language, setLanguage] = useState("en");
  const [genre, setGenre] = useState("drama");
  const [minYear, setMinYear] = useState("");
  const [minRating, setMinRating] = useState("90");
  const [movie, setMovie] = useState<MovieResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRecent = genre === "recent";

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      genre,
      language,
      minRating,
    });

    if (minYear && !isRecent) {
      params.set("minYear", minYear);
    }

    try {
      const res = await fetch(`/api/movie?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch movie");
        setMovie(null);
      } else {
        setMovie(data);
      }
    } catch {
      setError("Network error. Please try again.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <main className="min-h-[calc(100vh-52px)] bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Movie Shuffler
          </h1>
          <p className="text-slate-400">
            Discover highly-rated movies from around the world
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {GENRE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Year */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Min Year
              </label>
              <input
                type="number"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                placeholder="e.g. 2000"
                disabled={isRecent}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Min RT Score */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Min RT Score
              </label>
              <input
                type="number"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                min="0"
                max="100"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <button
            onClick={fetchMovie}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-sky-400 hover:bg-sky-500 disabled:bg-sky-400/50 text-slate-900 font-medium rounded-lg transition-colors"
          >
            {loading ? "Searching..." : "Find Movie"}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400">Finding the perfect movie for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Movie Card */}
        {movie && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Poster */}
              {movie.poster && (
                <div className="flex-shrink-0 md:w-64">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={256}
                    height={384}
                    className="w-full md:w-64 h-auto object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-100 mb-1">
                  {movie.title}
                </h2>

                {/* Tagline */}
                {movie.tagline && (
                  <p className="text-slate-400 italic mb-4">{movie.tagline}</p>
                )}

                {/* Ratings Row */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="text-slate-100">
                    <span className="text-lg">🍅</span> {movie.ratings.rottenTomatoes}%
                  </span>
                  <span className="text-slate-100">
                    <span className="text-lg">⭐</span> {movie.ratings.imdb}/10
                  </span>
                  <span className="text-slate-100">
                    <span className="text-lg">🎬</span> {movie.ratings.tmdb.toFixed(1)}/10
                  </span>
                </div>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-4">
                  <span>{movie.releaseDate}</span>
                  <span className="text-slate-600">•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                  <span className="text-slate-600">•</span>
                  <span>{movie.genres.join(", ")}</span>
                </div>

                {/* Director & Cast */}
                <div className="mb-4">
                  <p className="text-slate-300">
                    <span className="text-slate-400">Director:</span> {movie.director}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-400">Cast:</span>{" "}
                    {movie.cast.map((c) => c.name).join(", ")}
                  </p>
                </div>

                {/* Overview */}
                <p className="text-slate-300 mb-6 leading-relaxed">{movie.overview}</p>

                {/* Streaming Providers */}
                {movie.streamingProviders.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-slate-400 mb-2">Watch On:</p>
                    <div className="flex flex-wrap gap-3">
                      {movie.streamingProviders.map((provider) => (
                        <div
                          key={provider.name}
                          className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2"
                        >
                          <Image
                            src={provider.logo}
                            alt={provider.name}
                            width={24}
                            height={24}
                            className="rounded"
                          />
                          <span className="text-sm text-slate-300">{provider.name}</span>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              provider.type === "stream"
                                ? "bg-green-900/50 text-green-400"
                                : provider.type === "rent"
                                  ? "bg-amber-900/50 text-amber-400"
                                  : "bg-blue-900/50 text-blue-400"
                            }`}
                          >
                            {provider.type === "stream" ? "Stream" : provider.type === "rent" ? "Rent" : "Buy"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shuffle Button */}
                <button
                  onClick={fetchMovie}
                  disabled={loading}
                  className="px-6 py-2.5 bg-sky-400 hover:bg-sky-500 disabled:bg-sky-400/50 text-slate-900 font-medium rounded-lg transition-colors"
                >
                  🎲 Shuffle
                </button>

                {/* Total Results */}
                <p className="text-sm text-slate-500 mt-4">
                  Found {movie.totalResults} movies matching your criteria
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
