import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import StackOverflowConnect from "../components/StackOverflowConnect";
import { githubService } from "../services/github";
import TechNews from "../components/TechNews";
import CodingChallenges from "../components/CodingChallenges";
import JobListings from "../components/JobListings";
import DevToFeed from "../components/DevToFeed";
import TrelloBoard from "../components/TrelloBoard";
import JiraBoard from "../components/JiraBoard";
import { motion } from "framer-motion";
import GitHubConnect from "../components/GitHubConnect";

export default function Dashboard() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">GitHub Activity</h2>
            <div className="mt-4">
              <GitHubConnect />
            </div>
          </motion.div>

          {/* Stack Overflow Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">Stack Overflow</h2>
            <div className="mt-4">
              <StackOverflowConnect />
            </div>
          </motion.div>

          {/* Tech News Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">Tech News</h2>
            <div className="mt-4">
              <TechNews />
            </div>
          </motion.div>

          {/* Coding Challenges Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">Coding Challenges</h2>
            <div className="mt-4">
              <CodingChallenges />
            </div>
          </motion.div>

          {/* Job Listings Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">Job Listings</h2>
            <div className="mt-4">
              <JobListings />
            </div>
          </motion.div>

          {/* Dev.to Feed Section */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">Dev.to Feed</h2>
            <div className="mt-4">
              <DevToFeed />
            </div>
          </motion.div>

          {/* Project Management Section - Full Width */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Trello Board Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold">Project Tasks (Trello)</h2>
              <div className="mt-4">
                <TrelloBoard />
              </div>
            </motion.div>

            {/* Jira Board Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold">Project Issues (Jira)</h2>
              <div className="mt-4">
                <JiraBoard />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
