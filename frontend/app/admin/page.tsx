"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  UserX, 
  MessageSquare, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  Activity,
  Send,
  FileText,
  Eye,
  Ban,
  Trash2,
  Settings,
  Bell,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [banReason, setBanReason] = useState('');
  type User = {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    status: string;
    swapsCompleted: number;
    rating: number;
    reports: number;
  };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock data for demonstration
  const stats = {
    totalUsers: 1247,
    activeSwaps: 89,
    pendingReviews: 23,
    reportedContent: 7,
    bannedUsers: 15,
    monthlyGrowth: 12.5
  };

  const pendingSkills = [
    {
      id: 1,
      user: 'John Doe',
      skill: 'Advanced Hacking Techniques',
      description: 'Learn how to hack into any system quickly and efficiently. Perfect for beginners!',
      category: 'Technology',
      submitted: '2024-01-10',
      status: 'pending',
      flagged: true
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      skill: 'Digital Marketing Strategy',
      description: 'Comprehensive guide to modern digital marketing including SEO, social media, and analytics.',
      category: 'Marketing',
      submitted: '2024-01-12',
      status: 'pending',
      flagged: false
    },
    {
      id: 3,
      user: 'Mike Chen',
      skill: 'GET RICH QUICK!!!',
      description: 'Make $1000 per day with this ONE SIMPLE TRICK! No experience needed! Click here now!',
      category: 'Business',
      submitted: '2024-01-11',
      status: 'pending',
      flagged: true
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex@email.com',
      joinDate: '2023-12-15',
      status: 'active',
      swapsCompleted: 47,
      rating: 4.9,
      reports: 0
    },
    {
      id: 2,
      name: 'Spam User',
      email: 'spam@fake.com',
      joinDate: '2024-01-10',
      status: 'flagged',
      swapsCompleted: 2,
      rating: 2.1,
      reports: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma@email.com',
      joinDate: '2024-01-05',
      status: 'active',
      swapsCompleted: 23,
      rating: 4.7,
      reports: 0
    }
  ];

  const swaps = [
    {
      id: 1,
      teacher: 'Alex Thompson',
      student: 'Sarah Wilson',
      skill: 'React Development',
      status: 'accepted',
      date: '2024-01-15',
      duration: '2 hours'
    },
    {
      id: 2,
      teacher: 'Mike Chen',
      student: 'Emma Rodriguez',
      skill: 'Photography',
      status: 'pending',
      date: '2024-01-16',
      duration: '1 hour'
    },
    {
      id: 3,
      teacher: 'Lisa Johnson',
      student: 'Tom Wilson',
      skill: 'Python Programming',
      status: 'cancelled',
      date: '2024-01-14',
      duration: '3 hours'
    }
  ];

  const handleApproveSkill = (skillId: number) => {
    console.log(`Approved skill ${skillId}`);
  };

  const handleRejectSkill = (skillId: number) => {
    console.log(`Rejected skill ${skillId}`);
  };

  const handleBanUser = (userId: number) => {
    console.log(`Banned user ${userId} for reason: ${banReason}`);
    setBanReason('');
    setSelectedUser(null);
  };

  const handleSendMessage = () => {
    console.log(`Sending ${messageType} message: ${messageText}`);
    setMessageText('');
  };

  const handleDownloadReport = (reportType: string) => {
    console.log(`Downloading ${reportType} report`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'accepted': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      case 'active': return 'bg-green-600';
      case 'flagged': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            <Shield className="h-6 w-6 text-teal-400" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white" />
            <Settings className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white" />
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-teal-500 text-white text-sm">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.activeSwaps}</div>
              <div className="text-sm text-gray-400">Active Swaps</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.pendingReviews}</div>
              <div className="text-sm text-gray-400">Pending Reviews</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.reportedContent}</div>
              <div className="text-sm text-gray-400">Reported Content</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <UserX className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.bannedUsers}</div>
              <div className="text-sm text-gray-400">Banned Users</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.monthlyGrowth}%</div>
              <div className="text-sm text-gray-400">Monthly Growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal-600">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-teal-600">Skill Reviews</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-teal-600">User Management</TabsTrigger>
            <TabsTrigger value="swaps" className="data-[state=active]:bg-teal-600">Swap Monitoring</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-teal-600">Platform Messages</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-teal-600">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert className="bg-red-900 border-red-700">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-red-100">
                      Multiple spam reports for user "Spam User" - requires immediate attention
                    </AlertDescription>
                  </Alert>
                  <Alert className="bg-yellow-900 border-yellow-700">
                    <Clock className="h-4 w-4" />
                    <AlertDescription className="text-yellow-100">
                      23 skill descriptions pending review for over 48 hours
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Platform Announcement
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Weekly Report
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Review Flagged Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Pending Skill Descriptions</CardTitle>
                <CardDescription className="text-gray-400">
                  Review and approve or reject skill descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingSkills.map((skill) => (
                    <div key={skill.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-white">{skill.skill}</h3>
                            {skill.flagged && (
                              <Badge className="bg-red-600 text-white">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">by {skill.user}</p>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">{skill.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Category: {skill.category}</span>
                            <span>Submitted: {skill.submitted}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveSkill(skill.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectSkill(skill.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor and manage platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gray-600 text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{user.name}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>Joined: {user.joinDate}</span>
                              <span>Swaps: {user.swapsCompleted}</span>
                              <span>Rating: {user.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.reports > 0 && (
                            <Badge className="bg-red-600">
                              {user.reports} reports
                            </Badge>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Ban className="h-4 w-4 mr-1" />
                                Ban User
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 border-gray-700">
                              <DialogHeader>
                                <DialogTitle className="text-white">Ban User</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Are you sure you want to ban {user.name}? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Reason for ban..."
                                  value={banReason}
                                  onChange={(e) => setBanReason(e.target.value)}
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleBanUser(user.id)}
                                  disabled={!banReason.trim()}
                                >
                                  Ban User
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Swap Monitoring</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor all skill swap activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.map((swap) => (
                    <div key={swap.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-white">{swap.skill}</h3>
                            <Badge className={getStatusColor(swap.status)}>
                              {swap.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {swap.teacher} teaching {swap.student}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Date: {swap.date}</span>
                            <span>Duration: {swap.duration}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-gray-600 text-white">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Platform-Wide Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Send announcements, updates, or alerts to all users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message Type
                    </label>
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="info">Information</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="feature">New Feature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message Content
                  </label>
                  <Textarea
                    placeholder="Enter your message here..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-32"
                  />
                </div>
                
                <Button 
                  onClick={handleSendMessage}
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message to All Users
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Download Reports</CardTitle>
                <CardDescription className="text-gray-400">
                  Generate and download various platform reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">User Activity Report</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Complete user engagement and activity statistics
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDownloadReport('user-activity')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <Activity className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">Swap Statistics</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Detailed swap completion rates and trends
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDownloadReport('swap-stats')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <MessageSquare className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">Feedback Logs</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      User feedback, reviews, and report logs
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleDownloadReport('feedback-logs')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <TrendingUp className="h-8 w-8 text-yellow-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">Platform Analytics</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Growth metrics and platform performance
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => handleDownloadReport('analytics')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <Shield className="h-8 w-8 text-red-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">Security Report</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Banned users, violations, and security events
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleDownloadReport('security')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <Calendar className="h-8 w-8 text-teal-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">Monthly Summary</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Comprehensive monthly platform summary
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={() => handleDownloadReport('monthly-summary')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;