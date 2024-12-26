import React, { useEffect, useState } from "react";
import { jobsService, JobListing } from "../services/jobs";
import { motion, AnimatePresence } from "framer-motion";

const JobListings = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("All Types");
  const [remoteOnly, setRemoteOnly] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, jobType, remoteOnly]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsService.getJobs({
        search: searchTerm,
        type: jobType,
        remote: remoteOnly,
      });
      setJobs(response);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="loader">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
        <div className="flex items-center space-x-4">
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="All Types">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Contract">Contract</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>Remote Only</span>
          </label>
        </div>
      </form>

      <AnimatePresence>
        <div className="space-y-4">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className="text-gray-600">{job.salary}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {job.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {job.location}
                </span>
                {job.remote && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Remote
                  </span>
                )}
              </div>
              <p className="mt-2 text-gray-600">{job.description}</p>
              <div className="mt-4">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Posted: {new Date(job.postedDate).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default JobListings;
