import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

const TrelloBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Setup Authentication",
      description: "Implement JWT authentication for the application",
      status: "todo",
    },
    {
      id: "2",
      title: "Create Dashboard Layout",
      description: "Design and implement the main dashboard layout",
      status: "inProgress",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Connect frontend with backend APIs",
      status: "done",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {["todo", "inProgress", "done"].map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">
              {status === "todo"
                ? "To Do"
                : status === "inProgress"
                ? "In Progress"
                : "Done"}
            </h3>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    layoutId={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="bg-white p-3 rounded shadow cursor-pointer"
                  >
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              layoutId={selectedTask.id}
              className="bg-white p-6 rounded-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-2">
                {selectedTask.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedTask.description}</p>
              <div className="flex gap-2">
                <select
                  value={selectedTask.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedTask.id,
                      e.target.value as Task["status"]
                    )
                  }
                  className="px-3 py-2 border rounded"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button
                  onClick={() => setSelectedTask(null)}
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

export default TrelloBoard;
