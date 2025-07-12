"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User, Star, MessageCircle, Check, X, Filter, Search, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SkillSwapAcceptReject = () => {
  const [selectedAction, setSelectedAction] = useState<"accept" | "reject" | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [responses, setResponses] = useState<Record<number, 'accept' | 'reject'>>({});
  type SwapRequest = typeof swapRequests[number];
  const [selectedProfile, setSelectedProfile] = useState<SwapRequest | null>(null);
  const [message, setMessage] = useState('');

  const swapRequests = [
    {
      id: 1,
      requester: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        reviews: 24,
        location: "San Francisco, CA"
      },
      offering: "Web Development",
      requesting: "Graphic Design",
      description: "I'm looking to learn graphic design fundamentals and Adobe Creative Suite. I can teach you modern web development including React, Next.js, and responsive design. I've been working as a full-stack developer for 5 years and have experience with multiple frameworks and deployment strategies.",
      duration: "2 hours",
      preferredTime: "Weekends",
      date: "March 15, 2024",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      requestedSkills: ["Photoshop", "Illustrator", "Logo Design", "Branding"],
      status: "pending"
    },
    {
      id: 2,
      requester: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 18,
        location: "New York, NY"
      },
      offering: "Data Analysis",
      requesting: "UI/UX Design",
      description: "I'm a data scientist looking to expand into design. I can teach Python, machine learning, and data visualization in exchange for UI/UX design principles. I work with large datasets and can show you how to extract meaningful insights from data.",
      duration: "3 hours",
      preferredTime: "Weekday evenings",
      date: "March 14, 2024",
      skills: ["Python", "Machine Learning", "Tableau", "SQL"],
      requestedSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      status: "pending"
    },
    {
      id: 3,
      requester: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        reviews: 31,
        location: "Los Angeles, CA"
      },
      offering: "Digital Marketing",
      requesting: "Photography",
      description: "Marketing professional wanting to learn photography for content creation. I can share insights on social media strategy, SEO, and campaign management. I've run successful campaigns for both B2B and B2C companies.",
      duration: "2.5 hours",
      preferredTime: "Flexible",
      date: "March 13, 2024",
      skills: ["SEO", "Social Media", "Google Ads", "Content Strategy"],
      requestedSkills: ["Portrait Photography", "Lighting", "Photo Editing", "Composition"],
      status: "pending"
    },
    {
      id: 4,
      requester: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        reviews: 15,
        location: "Seattle, WA"
      },
      offering: "Mobile Development",
      requesting: "Video Production",
      description: "iOS developer interested in learning video editing and production. I can teach Swift, React Native, and mobile app architecture. I've published several apps on the App Store and can guide you through the entire development process.",
      duration: "4 hours",
      preferredTime: "Weekends",
      date: "March 12, 2024",
      skills: ["Swift", "React Native", "iOS", "App Store"],
      requestedSkills: ["Final Cut Pro", "Color Grading", "Audio Editing", "Storytelling"],
      status: "pending"
    },
    {
      id: 5,
      requester: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 22,
        location: "Austin, TX"
      },
      offering: "Business Strategy",
      requesting: "Web Design",
      description: "Management consultant looking to learn web design to create better presentations and visual materials. I can teach strategic planning and business analysis. I've worked with Fortune 500 companies and startups alike.",
      duration: "3 hours",
      preferredTime: "Weekday mornings",
      date: "March 11, 2024",
      skills: ["Strategic Planning", "Business Analysis", "Consulting", "Presentation"],
      requestedSkills: ["HTML/CSS", "Responsive Design", "Typography", "Color Theory"],
      status: "pending"
    }
  ];

  // Extract all unique skills for the skill filter dropdown
  const getAllSkills = () => {
    const allSkills = new Set<string>();
    swapRequests.forEach(request => {
      request.skills.forEach(skill => allSkills.add(skill));
      request.requestedSkills.forEach(skill => allSkills.add(skill));
    });
    return Array.from(allSkills).sort();
  };

  const allSkills = getAllSkills();

  const handleAction = (requestId: number, action: 'accept' | 'reject') => {
    setResponses(prev => ({
      ...prev,
      [requestId]: action
    }));
    setSelectedAction(action);
    setAlertMessage(action === 'accept' 
      ? 'Request accepted! You can now coordinate with the requester.' 
      : 'Request declined. The requester has been notified.');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredRequests = swapRequests.filter(request => {
    // Search term matching (name, category, or individual skills)
    const matchesSearch = searchTerm === '' || 
      request.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.offering.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requesting.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.requestedSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter
    const matchesStatusFilter = filterStatus === 'all' || 
                         (filterStatus === 'responded' && responses[request.id]) ||
                         (filterStatus === 'pending' && !responses[request.id]);
    
    // Skill filter
    const matchesSkillFilter = skillFilter === 'all' ||
                              request.skills.includes(skillFilter) ||
                              request.requestedSkills.includes(skillFilter);
    
    return matchesSearch && matchesStatusFilter && matchesSkillFilter;
  });

  const getStatusColor = (requestId: number) => {
    const response = responses[requestId];
    if (response === 'accept') return 'bg-teal-500/20 text-teal-400';
    if (response === 'reject') return 'bg-red-500/20 text-red-400';
    return 'bg-amber-500/20 text-amber-400';
  };

  const getStatusText = (requestId: number) => {
    const response = responses[requestId];
    if (response === 'accept') return 'Accepted';
    if (response === 'reject') return 'Declined';
    return 'Pending';
  };

  const getCurrentProfileIndex = () => {
    return filteredRequests.findIndex(req => req.id === selectedProfile?.id);
  };

  const navigateProfile = (direction: 'next' | 'prev') => {
    const currentIndex = getCurrentProfileIndex();
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= filteredRequests.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredRequests.length - 1 : currentIndex - 1;
    }
    
    setSelectedProfile(filteredRequests[newIndex]);
  };

  const openProfile = (profile: SwapRequest) => {
    setSelectedProfile(profile);
  };

  const closeProfile = () => {
    setSelectedProfile(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setSkillFilter('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filterStatus !== 'all') count++;
    if (skillFilter !== 'all') count++;
    return count;
  };

  // Quick skill search function
  const handleSkillClick = (skill: string) => {
    setSearchTerm(skill);
  };

  // List View
  if (!selectedProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                 <Link href="/"><ArrowLeft className="w-5 h-5 text-slate-300" /></Link>
                </button>
                <h1 className="text-xl font-semibold text-white">Skill Swap Requests</h1>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {filteredRequests.length} requests
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {showAlert && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
            <Alert className="bg-slate-800 border-slate-700 text-white">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Enhanced Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, skill category, or specific skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:border-teal-500 focus:outline-none"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>
                
                {/* Skill Filter */}
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-slate-400" />
                  <select
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="bg-slate-800/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-teal-500 focus:outline-none min-w-48"
                  >
                    <option value="all">All Skills</option>
                    {allSkills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Active Filters & Clear */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">Active filters:</span>
                  <div className="flex items-center space-x-2">
                    {searchTerm && (
                      <span className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded-md text-sm">
                        Search: "{searchTerm}"
                      </span>
                    )}
                    {filterStatus !== 'all' && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm">
                        Status: {filterStatus}
                      </span>
                    )}
                    {skillFilter !== 'all' && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md text-sm">
                        Skill: {skillFilter}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white text-sm underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Requests Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-1 gap-6">
            {filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer"
                onClick={() => openProfile(request)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={request.requester.avatar} 
                      alt={request.requester.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{request.requester.name}</h3>
                      <div className="flex items-center space-x-3 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span>{request.requester.rating}</span>
                          <span>({request.requester.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.requester.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.id)}`}>
                    {getStatusText(request.id)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-teal-400 text-sm">Offering to Teach</h4>
                    <p className="text-white font-medium">{request.offering}</p>
                    <div className="flex flex-wrap gap-1">
                      {request.skills.slice(0, 3).map((skill, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillClick(skill);
                          }}
                          className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded-md text-xs hover:bg-teal-500/30 transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                      {request.skills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded-md text-xs">
                          +{request.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-purple-400 text-sm">Wants to Learn</h4>
                    <p className="text-white font-medium">{request.requesting}</p>
                    <div className="flex flex-wrap gap-1">
                      {request.requestedSkills.slice(0, 3).map((skill, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillClick(skill);
                          }}
                          className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-xs hover:bg-purple-500/30 transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                      {request.requestedSkills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded-md text-xs">
                          +{request.requestedSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-2">
                  {request.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{request.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{request.preferredTime}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-sm">{request.date}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">No requests found</div>
              <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria</p>
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detailed Profile View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={closeProfile}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
              <h1 className="text-xl font-semibold text-white">Skill Swap Request</h1>
              <span className="text-slate-400 text-sm">
                {getCurrentProfileIndex() + 1} of {filteredRequests.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProfile.id)}`}>
                {getStatusText(selectedProfile.id)}
              </span>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => navigateProfile('prev')}
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                  disabled={filteredRequests.length <= 1}
                >
                  <ChevronLeft className="w-5 h-5 text-slate-300" />
                </button>
                <button 
                  onClick={() => navigateProfile('next')}
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                  disabled={filteredRequests.length <= 1}
                >
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert className="bg-slate-800 border-slate-700 text-white">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requester Profile */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-start space-x-4">
                <img 
                  src={selectedProfile.requester.avatar} 
                  alt={selectedProfile.requester.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-white">{selectedProfile.requester.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-slate-300 text-sm">{selectedProfile.requester.rating}</span>
                      <span className="text-slate-500 text-sm">({selectedProfile.requester.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProfile.requester.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(skill);
                          closeProfile();
                        }}
                        className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm hover:bg-teal-500/30 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Details */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Swap Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-teal-400">Offering to Teach</h4>
                  <p className="text-white text-lg">{selectedProfile.offering}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-purple-400">Wants to Learn</h4>
                  <p className="text-white text-lg">{selectedProfile.requesting}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-300 mb-2">Description</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedProfile.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{selectedProfile.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{selectedProfile.preferredTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">1-on-1 Session</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Skills Involved</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-teal-400 mb-3">{selectedProfile.requester.name} can teach:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(skill);
                          closeProfile();
                        }}
                        className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm hover:bg-teal-500/30 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-purple-400 mb-3">You can teach:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.requestedSkills.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(skill);
                          closeProfile();
                        }}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm hover:bg-purple-500/30 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

       {/* Action Panel */}
                 <div className="space-y-6">
                   {/* Quick Actions */}
                   <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                     <h3 className="text-lg font-semibold text-white mb-4">Respond to Request</h3>
                     
                     <div className="space-y-3">
                       <button 
                         onClick={() => handleAction(selectedProfile.id, 'accept')}
                         className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                       >
                         <Check className="w-5 h-5" />
                         <span>Accept Request</span>
                       </button>
                       
                       <button 
                         onClick={() => handleAction(selectedProfile.id, 'reject')}
                         className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                       >
                         <X className="w-5 h-5" />
                         <span>Decline Request</span>
                       </button>
                     </div>
                   </div>
       
                   {/* Message */}
                   <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                     <h3 className="text-lg font-semibold text-emerald-400 mb-4">Send Message</h3>
                     
                     <div className="space-y-4">
                       <textarea
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         placeholder="Add a personal message (optional)"
                         className="w-full bg-slate-700 text-emerald-400 placeholder-slate-400 rounded-xl p-3 h-24 resize-none border border-slate-600 focus:border-teal-500 focus:outline-none"
                       />
                       
                       <button className="w-full bg-slate-700 hover:bg-slate-600 text-black font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2">
                         <MessageCircle className="w-4 h-4" />
                         <span>Send Message</span>
                       </button>
                     </div>
                   </div>
       
                   {/* Request Info */}
                   <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                     <h3 className="text-lg font-semibold text-white mb-4">Request Info</h3>
                     
                     <div className="space-y-3 text-sm">
                       <div className="flex justify-between">
                         <span className="text-slate-400">Request ID:</span>
                         <span className="text-slate-300">#{selectedProfile.id.toString().padStart(6, '0')}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-slate-400">Submitted:</span>
                         <span className="text-slate-300">{selectedProfile.date}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-slate-400">Status:</span>
                         <span className={getStatusColor(selectedProfile.id).includes('amber') ? 'text-amber-400' : 
                                          getStatusColor(selectedProfile.id).includes('teal') ? 'text-teal-400' : 'text-red-400'}>
                           {getStatusText(selectedProfile.id)}
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         );
       };
       
       export default SkillSwapAcceptReject;