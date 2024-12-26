import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/axios";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  points: number;
  examples: {
    input: string;
    output: string;
  }[];
}

const CodingChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    fetchChallenges();
  }, [difficulty]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/challenges", {
        params: { difficulty },
      });
      setChallenges(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setError("Failed to fetch challenges");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="loader">Loading challenges...</div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Coding Challenges</h2>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <AnimatePresence>
        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{challenge.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {challenge.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {challenge.points} points
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{challenge.description}</p>
              {challenge.examples.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Example:</h4>
                  <div className="mt-2 bg-gray-50 p-3 rounded">
                    <p>
                      <span className="font-medium">Input:</span>{" "}
                      {challenge.examples[0].input}
                    </p>
                    <p>
                      <span className="font-medium">Output:</span>{" "}
                      {challenge.examples[0].output}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CodingChallenges;
