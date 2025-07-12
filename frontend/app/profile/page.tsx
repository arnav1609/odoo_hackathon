"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Plus,
  X,
  Save,
  Camera,
  Settings,
  Award,
  Clock,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

// TypeScript interfaces
interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  joinDate: string;
  avatar?: string;
  rating: number;
  totalRatings: number;
  completedSwaps: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: 'Available' | 'Busy' | 'Away';
}

interface ProfilePageProps {
  user?: UserProfile;
}

const UserProfilePage: React.FC<ProfilePageProps> = ({ user: initialUser }) => {
  // Default user data
  const defaultUser: UserProfile = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer and designer with 5+ years of experience. Love sharing knowledge and learning new skills from others.',
    joinDate: '2023-01-15',
    rating: 4.8,
    totalRatings: 24,
    completedSwaps: 18,
    skillsOffered: [
      { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
      { id: '2', name: 'React', level: 'Advanced', category: 'Programming' },
      { id: '3', name: 'UI/UX Design', level: 'Advanced', category: 'Design' },
      { id: '4', name: 'Photography', level: 'Intermediate', category: 'Creative' }
    ],
    skillsWanted: [
      { id: '5', name: 'Python', level: 'Intermediate', category: 'Programming' },
      { id: '6', name: 'Data Science', level: 'Beginner', category: 'Analytics' },
      { id: '7', name: 'Spanish', level: 'Beginner', category: 'Language' }
    ],
    availability: 'Available'
  };

  const [user, setUser] = useState<UserProfile>(initialUser || defaultUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(user);
  const [newSkill, setNewSkill] = useState<{ name: string; level: Skill['level']; category: string }>({
    name: '',
    level: 'Beginner',
    category: ''
  });
  const [showAddSkill, setShowAddSkill] = useState<{ offered: boolean; wanted: boolean }>({
    offered: false,
    wanted: false
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category || 'General'
    };

    const fieldName = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    setEditedUser(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], skill]
    }));

    setNewSkill({ name: '', level: 'Beginner', category: '' });
    setShowAddSkill(prev => ({ ...prev, [type]: false }));
  };

  const removeSkill = (type: 'offered' | 'wanted', skillId: string) => {
    const fieldName = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    setEditedUser(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter(skill => skill.id !== skillId)
    }));
  };

  const SkillTag: React.FC<{ 
    skill: Skill; 
    type: 'offered' | 'wanted'; 
    onRemove?: () => void; 
    showRemove?: boolean 
  }> = ({ skill, type, onRemove, showRemove = false }) => (
    <div className={`relative inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      type === 'offered' 
        ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700' 
        : 'bg-blue-900/30 text-blue-400 border border-blue-700'
    }`}>
      <span>{skill.name}</span>
      <span className="ml-2 text-xs opacity-70">({skill.level})</span>
      {showRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  const ProfileSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
            <Link href="/"><ArrowLeft className="w-6 h-6" /></Link>
            </button>
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Link href="/dashboard"><Settings className="w-6 h-6" /></Link>
            </button>
            <button className="border border-gray-600 px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Message
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <ProfileSection title="Profile">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 p-2 rounded-full transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.availability === 'Available' 
                    ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700'
                    : user.availability === 'Busy'
                    ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                    : 'bg-red-900/30 text-red-400 border border-red-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    user.availability === 'Available' ? 'bg-emerald-400' : 
                    user.availability === 'Busy' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  {user.availability}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={editedUser.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={editedUser.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Location"
                  />
                  <textarea
                    value={editedUser.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white h-24 resize-none"
                    placeholder="Bio"
                  />
                  <select
                    value={editedUser.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Away">Away</option>
                  </select>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {user.bio && (
                    <p className="text-gray-300 text-sm leading-relaxed">{user.bio}</p>
                  )}
                </div>
              )}
            </ProfileSection>

            {/* Stats Card */}
            <ProfileSection title="Statistics">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-2xl font-bold">{user.rating}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Rating ({user.totalRatings} reviews)</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Award className="w-4 h-4 text-teal-400" />
                    <span className="text-2xl font-bold">{user.completedSwaps}</span>
                  </div>
                  <p className="text-gray-400 text-sm">Completed Swaps</p>
                </div>
              </div>
            </ProfileSection>
          </div>

          {/* Right Column - Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Offered */}
            <ProfileSection title="Skills Offered">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {editedUser.skillsOffered.map((skill) => (
                    <SkillTag
                      key={skill.id}
                      skill={skill}
                      type="offered"
                      showRemove={isEditing}
                      onRemove={() => removeSkill('offered', skill.id)}
                    />
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-4">
                    {showAddSkill.offered ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          placeholder="Skill name"
                        />
                        <div className="flex space-x-2">
                          <select
                            value={newSkill.level}
                            onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as Skill['level'] }))}
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          <input
                            type="text"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                            placeholder="Category"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addSkill('offered')}
                            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Add Skill
                          </button>
                          <button
                            onClick={() => setShowAddSkill(prev => ({ ...prev, offered: false }))}
                            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSkill(prev => ({ ...prev, offered: true }))}
                        className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Skill</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Skills Wanted */}
            <ProfileSection title="Skills Wanted">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {editedUser.skillsWanted.map((skill) => (
                    <SkillTag
                      key={skill.id}
                      skill={skill}
                      type="wanted"
                      showRemove={isEditing}
                      onRemove={() => removeSkill('wanted', skill.id)}
                    />
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-4">
                    {showAddSkill.wanted ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          placeholder="Skill name"
                        />
                        <div className="flex space-x-2">
                          <select
                            value={newSkill.level}
                            onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as Skill['level'] }))}
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          <input
                            type="text"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                            placeholder="Category"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addSkill('wanted')}
                            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Add Skill
                          </button>
                          <button
                            onClick={() => setShowAddSkill(prev => ({ ...prev, wanted: false }))}
                            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSkill(prev => ({ ...prev, wanted: true }))}
                        className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Skill</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Recent Activity */}
            <ProfileSection title="Recent Activity">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Completed skill swap with Sarah Chen</p>
                    <p className="text-gray-400 text-sm">Taught JavaScript, learned Python basics</p>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">2 days ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Received 5-star rating</p>
                    <p className="text-gray-400 text-sm">Great teacher! Very patient and knowledgeable.</p>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">1 week ago</span>
                  </div>
                </div>
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;