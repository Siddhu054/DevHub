import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Issue {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "open" | "inProgress" | "resolved";
}

const JiraBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "PROJ-1",
      title: "Implement User Authentication",
      description: "Add JWT authentication system",
      priority: "high",
      status: "open",
    },
    {
      id: "PROJ-2",
      title: "Create Dashboard UI",
      description: "Design and implement responsive dashboard layout",
      priority: "medium",
      status: "inProgress",
    },
    {
      id: "PROJ-3",
      title: "API Integration",
      description: "Connect frontend with backend APIs",
      priority: "high",
      status: "resolved",
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleStatusChange = (issueId: string, newStatus: Issue["status"]) => {
    setIssues(
      issues.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {issues.map((issue) => (
          <motion.div
            key={issue.id}
            layoutId={issue.id}
            onClick={() => handleIssueClick(issue)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-sm rounded ${
                  issue.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : issue.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {issue.priority}
              </span>
              <h3 className="font-medium">{issue.title}</h3>
            </div>
            <p className="text-gray-600 mt-2">{issue.description}</p>
            <div className="mt-2">
              <span
                className={`px-2 py-1 text-sm rounded ${
                  issue.status === "open"
                    ? "bg-blue-100 text-blue-800"
                    : issue.status === "inProgress"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {issue.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              layoutId={selectedIssue.id}
              className="bg-white p-6 rounded-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-2">
                {selectedIssue.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedIssue.description}</p>
              <div className="flex gap-2">
                <select
                  value={selectedIssue.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedIssue.id,
                      e.target.value as Issue["status"]
                    )
                  }
                  className="px-3 py-2 border rounded"
                >
                  <option value="open">Open</option>
                  <option value="inProgress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JiraBoard;
