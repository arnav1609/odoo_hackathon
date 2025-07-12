"use client";
<<<<<<< HEAD

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserCard from "@/components/UserCard";

const SkillSwapHomepage = () => {
  const [availability, setAvailability] = useState("Available");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const users = [
    {
      id: 1,
      name: "Marc Demo",
      avatar: "/api/placeholder/80/80",
      skillsOffered: ["Java Script", "Python"],
      skillsWanted: ["Coding", "Graphic designer"],
      rating: 3.9,
      available: true,
    },
    {
      id: 2,
      name: "Michelle",
      avatar: "/api/placeholder/80/80",
      skillsOffered: ["Java Script", "Python"],
      skillsWanted: ["Cooking", "Graphic designer"],
      rating: 2.5,
      available: true,
    },
    {
      id: 3,
      name: "Joe Willis",
      avatar: "/api/placeholder/80/80",
      skillsOffered: ["Java Script", "Python"],
      skillsWanted: ["Cooking", "Graphic designer"],
      rating: 4.0,
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
          <button className="border border-gray-600 px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Login
          </button>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white appearance-none min-w-32"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="All">All</option>
            </select>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
          </div>
          <button className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* User Cards */}
        <div className="space-y-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-teal-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapHomepage;
