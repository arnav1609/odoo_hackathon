"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserCard from "@/components/UserCard";
import { Skill } from "@/lib/enums";
import { UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";

const SkillSwapHomepage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  console.log(user, isSignedIn, isLoaded);

  if (!isLoaded) return <p>Loading...</p>;

  const users: UserType[] = [
    {
      id: 1,
      name: "Marc Demo",
      avatar: "/api/placeholder/80/80",
      skillsOffered: [Skill.JAVASCRIPT, Skill.NEXTJS],
      skillsWanted: [Skill.CODING, Skill.GRAPHIC_DESIGNER],
      rating: 3.9,
      available: true,
    },
    {
      id: 2,
      name: "Michelle",
      avatar: "/api/placeholder/80/80",
      skillsOffered: [Skill.REACTJS, Skill.PYTHON],
      skillsWanted: [Skill.COOKING, Skill.GRAPHIC_DESIGNER],
      rating: 2.5,
      available: true,
    },
    {
      id: 3,
      name: "Joe Willis",
      avatar: "/api/placeholder/80/80",
      skillsOffered: [Skill.JAVASCRIPT, Skill.REACT_NATIVE],
      skillsWanted: [Skill.COOKING, Skill.GRAPHIC_DESIGNER],
      rating: 4.0,
      available: true,
    },
  ];

  const [searchUsers, setSearchUsers] = useState<UserType[]>(users);
  const [availability, setAvailability] = useState("Available");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(
    function () {
      function showSearchUsers() {
        const filteredUsers = users.filter((user) => {
          const skill = searchTerm.toLowerCase().trim();

          const allSkills = [...user.skillsOffered, ...user.skillsWanted];

          return allSkills.some((s) => s.toLowerCase().includes(skill));
        });

        setSearchUsers(filteredUsers);
      }

      showSearchUsers();
    },
    [searchUsers, searchTerm, users]
  );

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
          {searchUsers.map((user) => (
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
