import { motion } from "framer-motion";
import { githubService } from "../services/github";

const GitHubConnect = () => {
  const handleConnect = () => {
    try {
      console.log("Connect GitHub button clicked");
      githubService.connectGitHub();
    } catch (error) {
      console.error("Failed to connect to GitHub:", error);
    }
  };

  return (
    <div className="flex items-start">
      <motion.button
        onClick={handleConnect}
        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Connect GitHub
      </motion.button>
    </div>
  );
};

export default GitHubConnect;
