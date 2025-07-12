import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, X, Search, Clock, Users, Star, Send, BookOpen, Target, Mail, Eye, EyeOff } from 'lucide-react';

export default function SkillSwapPages() {
  const [activeTab, setActiveTab] = useState('add');
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Add Skill Form State
  const [addForm, setAddForm] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    availability: '',
    tags: []
  });
  
  // Request Skill Form State
  const [requestForm, setRequestForm] = useState({
    title: '',
    category: '',
    urgency: '',
    description: '',
    duration: '',
    tags: []
  });

  const categories = [
    'Programming', 'Design', 'Marketing', 'Music', 'Languages', 
    'Cooking', 'Photography', 'Writing', 'Business', 'Other'
  ];

  const handleAddSkill = () => {
    if (addForm.title && addForm.category && addForm.level && addForm.description && addForm.availability) {
      setSkills([...skills, { ...addForm, id: Date.now() }]);
      setAddForm({
        title: '',
        category: '',
        level: '',
        description: '',
        availability: '',
        tags: []
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRequestSkill = () => {
    if (requestForm.title && requestForm.category && requestForm.urgency && requestForm.description && requestForm.duration) {
      setRequests([...requests, { ...requestForm, id: Date.now() }]);
      setRequestForm({
        title: '',
        category: '',
        urgency: '',
        description: '',
        duration: '',
        tags: []
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const addTag = (form, setForm) => {
    if (currentSkill && !form.tags.includes(currentSkill)) {
      setForm({ ...form, tags: [...form.tags, currentSkill] });
      setCurrentSkill('');
    }
  };

  const removeTag = (tag, form, setForm) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skill Swap Hub
          </h1>
          <p className="text-gray-400 text-lg">Share your skills, learn from others</p>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-teal-500/20 border-teal-500/50 text-teal-300">
            <AlertDescription>
              Successfully submitted! Your {activeTab === 'add' ? 'skill' : 'request'} has been posted.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-800 border-gray-700">
            <TabsTrigger 
              value="add" 
              className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </TabsTrigger>
            <TabsTrigger 
              value="request" 
              className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Search className="w-4 h-4" />
              Request Skill
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-white">
                    <BookOpen className="w-6 h-6 text-teal-500" />
                    Share Your Expertise
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Add a skill you can teach others
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="skill-title" className="text-gray-300">Skill Title</Label>
                      <Input
                        id="skill-title"
                        placeholder="e.g., React Development, Guitar Lessons"
                        value={addForm.title}
                        onChange={(e) => setAddForm({...addForm, title: e.target.value})}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-300">Category</Label>
                        <Select 
                          value={addForm.category} 
                          onValueChange={(value) => setAddForm({...addForm, category: value})}
                        >
                          <SelectTrigger id="category" className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat} className="text-gray-300 focus:bg-gray-700 focus:text-white">{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level" className="text-gray-300">Expertise Level</Label>
                        <Select 
                          value={addForm.level} 
                          onValueChange={(value) => setAddForm({...addForm, level: value})}
                        >
                          <SelectTrigger id="level" className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="beginner" className="text-gray-300 focus:bg-gray-700 focus:text-white">Beginner</SelectItem>
                            <SelectItem value="intermediate" className="text-gray-300 focus:bg-gray-700 focus:text-white">Intermediate</SelectItem>
                            <SelectItem value="advanced" className="text-gray-300 focus:bg-gray-700 focus:text-white">Advanced</SelectItem>
                            <SelectItem value="expert" className="text-gray-300 focus:bg-gray-700 focus:text-white">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what you can teach and your experience..."
                        value={addForm.description}
                        onChange={(e) => setAddForm({...addForm, description: e.target.value})}
                        rows={4}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-gray-300">Availability</Label>
                      <Input
                        id="availability"
                        placeholder="e.g., Weekends, Evenings after 6 PM"
                        value={addForm.availability}
                        onChange={(e) => setAddForm({...addForm, availability: e.target.value})}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag(addForm, setAddForm);
                            }
                          }}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                        />
                        <Button 
                          onClick={() => addTag(addForm, setAddForm)}
                          size="icon"
                          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {addForm.tags.map((tag, index) => (
                          <Badge key={index} className="bg-teal-500/20 text-teal-300 border-teal-500/50 px-3 py-1">
                            {tag}
                            <button
                              onClick={() => removeTag(tag, addForm, setAddForm)}
                              className="ml-2 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleAddSkill} className="w-full bg-teal-500 hover:bg-teal-600 text-white" size="lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Recently Added Skills</h3>
                {skills.length === 0 ? (
                  <Card className="text-center py-12 bg-gray-800/50 border-gray-700 border-dashed">
                    <CardContent>
                      <BookOpen className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-500">No skills added yet. Be the first!</p>
                    </CardContent>
                  </Card>
                ) : (
                  skills.slice(-3).reverse().map((skill) => (
                    <Card key={skill.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-white">{skill.title}</CardTitle>
                          <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/50">{skill.level}</Badge>
                        </div>
                        <CardDescription className="text-gray-400">{skill.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-3">{skill.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {skill.availability}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="request">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-white">
                    <Target className="w-6 h-6 text-teal-500" />
                    Request a Skill
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Find someone to teach you
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="request-title" className="text-gray-300">What do you want to learn?</Label>
                      <Input
                        id="request-title"
                        placeholder="e.g., Python Programming, Cooking Italian"
                        value={requestForm.title}
                        onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="request-category" className="text-gray-300">Category</Label>
                        <Select 
                          value={requestForm.category} 
                          onValueChange={(value) => setRequestForm({...requestForm, category: value})}
                        >
                          <SelectTrigger id="request-category" className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat} className="text-gray-300 focus:bg-gray-700 focus:text-white">{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="urgency" className="text-gray-300">Urgency</Label>
                        <Select 
                          value={requestForm.urgency} 
                          onValueChange={(value) => setRequestForm({...requestForm, urgency: value})}
                        >
                          <SelectTrigger id="urgency" className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="low" className="text-gray-300 focus:bg-gray-700 focus:text-white">Low - Anytime</SelectItem>
                            <SelectItem value="medium" className="text-gray-300 focus:bg-gray-700 focus:text-white">Medium - This month</SelectItem>
                            <SelectItem value="high" className="text-gray-300 focus:bg-gray-700 focus:text-white">High - This week</SelectItem>
                            <SelectItem value="urgent" className="text-gray-300 focus:bg-gray-700 focus:text-white">Urgent - ASAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="request-description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="request-description"
                        placeholder="Describe what you want to learn and your current level..."
                        value={requestForm.description}
                        onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                        rows={4}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-gray-300">Expected Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 2 weeks, 1 month"
                        value={requestForm.duration}
                        onChange={(e) => setRequestForm({...requestForm, duration: e.target.value})}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag(requestForm, setRequestForm);
                            }
                          }}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-500"
                        />
                        <Button 
                          onClick={() => addTag(requestForm, setRequestForm)}
                          size="icon"
                          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {requestForm.tags.map((tag, index) => (
                          <Badge key={index} className="bg-teal-500/20 text-teal-300 border-teal-500/50 px-3 py-1">
                            {tag}
                            <button
                              onClick={() => removeTag(tag, requestForm, setRequestForm)}
                              className="ml-2 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleRequestSkill} className="w-full bg-teal-500 hover:bg-teal-600 text-white" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Recent Skill Requests</h3>
                {requests.length === 0 ? (
                  <Card className="text-center py-12 bg-gray-800/50 border-gray-700 border-dashed">
                    <CardContent>
                      <Target className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-500">No requests yet. Be the first to request!</p>
                    </CardContent>
                  </Card>
                ) : (
                  requests.slice(-3).reverse().map((request) => (
                    <Card key={request.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-white">{request.title}</CardTitle>
                          <Badge 
                            className={
                              request.urgency === 'urgent' ? 'bg-red-500/20 text-red-300 border-red-500/50' : 
                              request.urgency === 'high' ? 'bg-orange-500/20 text-orange-300 border-orange-500/50' : 
                              'bg-gray-700 text-gray-300 border-gray-600'
                            }
                          >
                            {request.urgency}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-400">{request.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-3">{request.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {request.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center p-6 bg-gray-800/50 border-gray-700">
            <Users className="w-10 h-10 mx-auto mb-2 text-teal-500" />
            <h4 className="font-semibold text-lg text-white">500+</h4>
            <p className="text-sm text-gray-400">Active Members</p>
          </Card>
          <Card className="text-center p-6 bg-gray-800/50 border-gray-700">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-teal-500" />
            <h4 className="font-semibold text-lg text-white">150+</h4>
            <p className="text-sm text-gray-400">Skills Offered</p>
          </Card>
          <Card className="text-center p-6 bg-gray-800/50 border-gray-700">
            <Target className="w-10 h-10 mx-auto mb-2 text-teal-500" />
            <h4 className="font-semibold text-lg text-white">80+</h4>
            <p className="text-sm text-gray-400">Active Requests</p>
          </Card>
          <Card className="text-center p-6 bg-gray-800/50 border-gray-700">
            <Star className="w-10 h-10 mx-auto mb-2 text-teal-500" />
            <h4 className="font-semibold text-lg text-white">4.8</h4>
            <p className="text-sm text-gray-400">Average Rating</p>
          </Card>
        </div>
      </div>
    </div>
  );
}