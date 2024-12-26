import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { devtoService, DevToPost } from "../services/devto";

const DevToFeed = () => {
  const [posts, setPosts] = useState<DevToPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTags();
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  const fetchTags = async () => {
    try {
      const fetchedTags = await devtoService.getTags();
      setTags(fetchedTags);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await devtoService.getPosts(selectedTag);
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="loader">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedTag("")}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === ""
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    By {post.author} · {post.readTime}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>❤️ {post.reactions}</span>
                  <span>💬 {post.commentsCount}</span>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default DevToFeed;
