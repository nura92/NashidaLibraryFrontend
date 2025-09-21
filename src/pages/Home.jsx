import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import VideoCard from "../components/VideoCard";
import { FaTelegramPlane, FaYoutube, FaGlobe } from "react-icons/fa";
import axios from "axios";

const categories = {
  Ethiopia: ["Ethiopian Nashid", "Amharic Nashid", "Oromo Nashid"],
  Somalia: ["Somali Nashid", "Islamic Songs Somalia"],
  Egypt: ["Egyptian Nashid", "Arabic Nashid"],
  SaudiArabia: ["Saudi Nashid", "Makkah Nashid"],
  English: ["English Nashid", "Islamic Songs English"]
};

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("Ethiopian Nashid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    fetchVideos(query, true);
    // eslint-disable-next-line
  }, [query]);

  const fetchVideos = async (searchQuery, reset = false, newToday = false) => {
    try {
      if (!reset) setLoading(true);
      else setRefreshing(true);
      setError("");

      const params = { query: searchQuery.trim(), pageToken: reset ? "" : nextPageToken };
      if (newToday) {
        // ISO date 24 hours ago
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        params.publishedAfter = yesterday;
      }

      const res = await axios.get("https://nashidalibrary.onrender.com/api/youtube", { params });
      const data = res.data.videos || [];
      const token = res.data.nextPageToken || null;

      setVideos(reset ? data : [...videos, ...data]);
      setNextPageToken(token);
    } catch (err) {
      console.error("❌ Error fetching videos:", err.message);
      setError("Failed to load videos. Try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchMove = (e) => { touchEndY.current = e.touches[0].clientY; };
  const handleTouchEnd = () => {
    const distance = touchEndY.current - touchStartY.current;
    if (distance > 70) fetchVideos(query, true);
  };

  return (
    <div
      className="min-h-screen bg-islamicCream flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="bg-islamicGreen text-white py-3 shadow-md flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-kufi">🌙 Nashid Library</span>
          <span className="hidden md:inline text-sm text-islamicGold">
            Your Islamic Nashid Collection
          </span>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <a href="https://t.me/nurehu" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaTelegramPlane />
          </a>
          <a href="https://www.youtube.com/@CodersTech-nuredev" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaYoutube />
          </a>
          <a href="https://github.com/nura92/crypto-calculator" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaGlobe />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        {refreshing && (
          <p className="text-center text-islamicGreen font-bold mb-4">⏳ Refreshing...</p>
        )}
        <SearchBar onSearch={(q) => setQuery(q)} />
        <CategorySelector categories={categories} onSelect={setQuery} />

        {/* New Nashids Today button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchVideos(query, true, true)}
            className="px-4 py-2 bg-islamicGold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
          >
            🌟 New Nashids Today
          </button>
        </div>

        {loading && !refreshing && (
          <p className="text-center text-islamicGreen font-bold mt-6">
            ⏳ Loading Nashids...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 font-bold mt-6">{error}</p>
        )}

        {/* Video grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-600 col-span-full">
                No Nashids found. Try another category or search.
              </p>
            )
          )}
        </div>

        {/* Load More button */}
        {nextPageToken && !loading && !refreshing && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchVideos(query)}
              className="px-6 py-2 bg-islamicGreen hover:bg-islamicDark text-white rounded-lg font-semibold transition-colors"
            >
              ⬇ Load More
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-islamicGreen text-white py-3 shadow-inner flex flex-col md:flex-row items-center justify-between px-4 md:px-8 mt-10">
        <span className="text-sm md:text-base font-kufi">© 2025 Nashid Library</span>
        <div className="flex items-center gap-4 mt-2 md:mt-0 text-lg">
          <a href="https://t.me/nurehu" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaTelegramPlane />
          </a>
          <a href="https://www.youtube.com/@CodersTech-nuredev" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaYoutube />
          </a>
          <a href="https://github.com/nura92/crypto-calculator" target="_blank" rel="noopener noreferrer" className="hover:text-islamicGold transition-colors">
            <FaGlobe />
          </a>
        </div>
      </footer>
    </div>
  );
}
