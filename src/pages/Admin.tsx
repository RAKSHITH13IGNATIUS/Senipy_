
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useNavigate } from 'react-router-dom';

// Mock data
const usersData = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "+1 555-123-4567", location: "New York", lastActive: "2 hours ago", status: "active" },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", phone: "+1 555-234-5678", location: "Los Angeles", lastActive: "1 day ago", status: "active" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", phone: "+1 555-345-6789", location: "Chicago", lastActive: "3 days ago", status: "inactive" },
  { id: 4, name: "Lisa Chen", email: "lisa@example.com", phone: "+1 555-456-7890", location: "Houston", lastActive: "5 hours ago", status: "active" },
  { id: 5, name: "David Wilson", email: "david@example.com", phone: "+1 555-567-8901", location: "Miami", lastActive: "1 week ago", status: "inactive" },
  { id: 6, name: "Sarah Adams", email: "sarah@example.com", phone: "+1 555-678-9012", location: "Denver", lastActive: "3 hours ago", status: "active" },
  { id: 7, name: "Michael Patel", email: "michael@example.com", phone: "+1 555-789-0123", location: "Seattle", lastActive: "2 days ago", status: "active" },
  { id: 8, name: "Jennifer Martinez", email: "jennifer@example.com", phone: "+1 555-890-1234", location: "Boston", lastActive: "1 month ago", status: "inactive" },
];

const activityData = [
  { name: 'Jan', users: 65 },
  { name: 'Feb', users: 78 },
  { name: 'Mar', users: 90 },
  { name: 'Apr', users: 81 },
  { name: 'May', users: 95 },
  { name: 'Jun', users: 110 },
  { name: 'Jul', users: 129 },
  { name: 'Aug', users: 140 },
  { name: 'Sep', users: 155 },
  { name: 'Oct', users: 170 },
  { name: 'Nov', users: 188 },
  { name: 'Dec', users: 205 },
];

const usageData = [
  { name: 'Memory Match', value: 35 },
  { name: 'Word Games', value: 25 },
  { name: 'Digital Puzzles', value: 20 },
  { name: 'Art Studio', value: 15 },
  { name: 'Trivia', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // In a real app, this would check if the user is authenticated as an admin
  // For now, we'll just simulate this check
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    // Redirect non-admin users to login
    setTimeout(() => navigate('/login'), 2000);
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">Admin Access Required</CardTitle>
            <CardDescription className="text-center">
              You do not have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p>Redirecting to login page...</p>
            <Button onClick={() => navigate('/login')}>
              Login Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold">SENIPY Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Website
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8 bg-white border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,845</div>
                  <p className="text-sm text-green-600 mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">482</div>
                  <p className="text-sm text-green-600 mt-2">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Games Played</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18,932</div>
                  <p className="text-sm text-green-600 mt-2">+25% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Avg. Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24m</div>
                  <p className="text-sm text-green-600 mt-2">+3% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={activityData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Game Usage</CardTitle>
                  <CardDescription>Most popular games by usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
                <div className="mt-4">
                  <Input 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.location}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage games and application content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Games</h3>
                    <Button>Add New Game</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['Memory Match', 'Word Games', 'Digital Puzzles', 'Art Studio', 'Trivia Challenges'].map((game, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{game}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Status: Active</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Details</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure system preferences and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Site Name</label>
                        <Input defaultValue="SENIPY Admin Dashboard" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Email</label>
                        <Input defaultValue="senipy08@gmail.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Description</label>
                      <Input defaultValue="Admin dashboard for managing SENIPY application" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Increase security by requiring an additional verification step</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-gray-500">Automatically log out inactive sessions</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" className="w-24" defaultValue="30" />
                        <span>minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
