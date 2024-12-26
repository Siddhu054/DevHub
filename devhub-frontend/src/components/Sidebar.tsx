import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaGithub,
  FaStackOverflow,
  FaNewspaper,
  FaCode,
  FaBriefcase,
  FaTrello,
  FaJira,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaCode /> },
    { path: "/github", label: "GitHub", icon: <FaGithub /> },
    {
      path: "/stackoverflow",
      label: "Stack Overflow",
      icon: <FaStackOverflow />,
    },
    { path: "/technews", label: "Tech News", icon: <FaNewspaper /> },
    { path: "/challenges", label: "Coding Challenges", icon: <FaCode /> },
    { path: "/jobs", label: "Job Listings", icon: <FaBriefcase /> },
    { path: "/trello", label: "Trello Board", icon: <FaTrello /> },
    { path: "/jira", label: "Jira Board", icon: <FaJira /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#0F172A] text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DevHub</h1>
      </div>

      <nav className="mt-6 h-[calc(100vh-200px)] overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive(item.path)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section at Bottom */}
      <div className="fixed bottom-0 w-64 p-6 bg-[#0F172A]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm">BS</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Balla Siddhartha</p>
            <p className="text-xs text-gray-400">Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
