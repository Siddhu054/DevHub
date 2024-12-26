import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/axios";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
}

const TechNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/technews");
      setNews(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="loader">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tech News</h2>
      <AnimatePresence>
        <div className="grid gap-4">
          {news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm">{item.source}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TechNews;
