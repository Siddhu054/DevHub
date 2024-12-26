import { motion } from "framer-motion";
import { stackoverflowService } from "../services/stackoverflow";

const StackOverflowConnect = () => {
  const handleConnect = () => {
    try {
      console.log("Connect Stack Overflow button clicked");
      stackoverflowService.connectStackOverflow();
    } catch (error) {
      console.error("Failed to connect to Stack Overflow:", error);
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
        Connect Stack Overflow
      </motion.button>
    </div>
  );
};

export default StackOverflowConnect;
