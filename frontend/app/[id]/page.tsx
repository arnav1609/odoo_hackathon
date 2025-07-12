"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Calendar, MessageCircle, UserPlus,  Settings, Award, BookOpen, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const skills = [
    { name: 'React Development', level: 'Expert', color: 'bg-blue-500' },
    { name: 'UI/UX Design', level: 'Advanced', color: 'bg-purple-500' },
    { name: 'Python', level: 'Intermediate', color: 'bg-green-500' },
    { name: 'Photography', level: 'Beginner', color: 'bg-yellow-500' }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 5,
      comment: 'Alex helped me understand React hooks in just one session. Excellent teacher!',
      date: '2 days ago',
      skill: 'React Development'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'MC',
      rating: 4,
      comment: 'Great at explaining complex UI concepts. Very patient and knowledgeable.',
      date: '1 week ago',
      skill: 'UI/UX Design'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: 'ER',
      rating: 5,
      comment: 'Amazing photography tips! Really improved my composition skills.',
      date: '2 weeks ago',
      skill: 'Photography'
    }
  ];

  const completedSwaps = [
    { id: 1, title: 'React Hooks Masterclass', partner: 'Sarah J.', date: 'Dec 15, 2024', type: 'Teaching' },
    { id: 2, title: 'Advanced CSS Grid', partner: 'Tom K.', date: 'Dec 12, 2024', type: 'Learning' },
    { id: 3, title: 'UI Design Principles', partner: 'Lisa M.', date: 'Dec 8, 2024', type: 'Teaching' }
  ];

  const { id } = params;
  console.log(id);
 
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/"><ArrowLeft className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" /></Link>
            <h1 className="text-xl font-semibold">Skill Swap Platform</h1>
          </div>
          <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-teal-500">
                <AvatarImage src="/api/placeholder/150/150" alt="Alex Thompson" />
                <AvatarFallback className="bg-teal-500 text-white text-2xl font-bold">AT</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Alex Thompson</h2>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      <span className="text-white font-medium">4.9</span>
                      <span className="text-gray-400 ml-1">(127 reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined Dec 2023</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-black hover:bg-gray-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300 leading-relaxed">
              Full-stack developer with 5+ years of experience in React, Node.js, and Python. 
              Passionate about teaching and sharing knowledge. Always excited to learn new technologies 
              and help others grow their skills. Available for skill swaps in web development, 
              UI/UX design, and photography.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-gray-400">Skills Taught</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-sm text-gray-400">Skills Learned</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-gray-400">Connections</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">4.9</div>
              <div className="text-sm text-gray-400">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal-600">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-teal-600">Skills</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-teal-600">Reviews</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-teal-600">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Skills</CardTitle>
                  <CardDescription className="text-gray-400">Most popular skills offered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.slice(0, 3).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Reviews</CardTitle>
                  <CardDescription className="text-gray-400">What others are saying</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-600 text-white text-xs">
                            {review.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-white">{review.name}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">All Skills</CardTitle>
                <CardDescription className="text-gray-400">Skills available for teaching and learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                        <span className="text-sm text-gray-400">Available for teaching</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">All Reviews</CardTitle>
                <CardDescription className="text-gray-400">127 reviews from skill swap partners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-600 text-white">
                          {review.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white">{review.name}</h4>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {review.skill}
                          </Badge>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Skill Swap History</CardTitle>
                <CardDescription className="text-gray-400">Recent completed skill exchanges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedSwaps.map((swap) => (
                  <div key={swap.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                    <div>
                      <h4 className="font-medium text-white mb-1">{swap.title}</h4>
                      <p className="text-sm text-gray-400">with {swap.partner}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={swap.type === 'Teaching' ? 'default' : 'secondary'} 
                        className={swap.type === 'Teaching' ? 'bg-teal-600' : 'bg-blue-600'}
                      >
                        {swap.type}
                      </Badge>
                      <p className="text-sm text-gray-400 mt-1">{swap.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;