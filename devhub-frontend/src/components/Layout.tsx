import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import NotificationBell from "./NotificationBell";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">DevHub</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <NotificationBell />
                  <button
                    onClick={signOut}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => (window.location.href = "/auth/signin")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
