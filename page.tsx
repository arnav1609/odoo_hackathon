"use client";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserCard from "@/components/UserCard";
import { Skill } from "@/lib/enums";
import { UserType } from "@/lib/types";
import { 
  useUser, 
  UserButton, 
  SignInButton, 
  SignUpButton 
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const SkillSwapHomepage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchUsers, setSearchUsers] = useState<UserType[]>([]);
  const [availability, setAvailability] = useState("Available");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real app, you'd fetch this from an API
  const mockUsers: UserType[] = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "/api/placeholder/80/80",
      skillsOffered: [Skill.JAVASCRIPT, Skill.NEXTJS],
      skillsWanted: [Skill.CODING, Skill.GRAPHIC_DESIGNER],
      rating: 4.9,
      available: false,
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

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setSearchUsers(mockUsers);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filteredUsers = mockUsers.filter((user) => {
      const skill = searchTerm.toLowerCase().trim();
      const allSkills = [...user.skillsOffered, ...user.skillsWanted];
      return allSkills.some((s) => s.toLowerCase().includes(skill));
    });
    setSearchUsers(filteredUsers);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Pagination logic
  const usersPerPage = 5;
  const totalPages = Math.ceil(searchUsers.length / usersPerPage);
  const paginatedUsers = searchUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/profile"><h1 className="text-2xl font-bold">Skill Swap Platform</h1></Link>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-gray-900 border-gray-800",
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter Bar */}
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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : paginatedUsers.length > 0 ? (
          <div className="space-y-6">
            {paginatedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            No users found matching your criteria
          </div>
        )}

        {/* Pagination */}
        {searchUsers.length > 0 && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
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
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSwapHomepage;