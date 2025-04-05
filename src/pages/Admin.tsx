
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DynamicBackground from '@/components/DynamicBackground';
import { Link } from 'react-router-dom';
import { UserPlus, Users, Download, Settings, LogOut } from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials against a backend
    if (email === 'admin@senipy.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DynamicBackground />
        <div className="w-full max-w-md z-10">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                    <div className="h-5 w-5 bg-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl text-center">SENIPY Admin</CardTitle>
              <CardDescription className="text-center">
                Sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@senipy.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-primary">
                Return to Home
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Mock data for the admin panel
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joined: '2023-05-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joined: '2023-06-22' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Inactive', joined: '2023-07-10' },
    { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', status: 'Active', joined: '2023-08-05' },
  ];

  const downloads = [
    { id: 1, version: '1.2.3', platform: 'Android', downloads: 1245, released: '2023-09-15' },
    { id: 2, version: '1.2.2', platform: 'Android', downloads: 3578, released: '2023-08-01' },
    { id: 3, version: '1.2.1', platform: 'Android', downloads: 2890, released: '2023-07-10' },
    { id: 4, version: '1.2.0', platform: 'Android', downloads: 4120, released: '2023-06-15' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white hidden md:block">
          <div className="p-4 flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold">SENIPY Admin</span>
          </div>
          <nav className="mt-8">
            <div className="px-4 py-2 text-gray-400 text-xs font-semibold">MAIN</div>
            <a href="#dashboard" className="flex items-center px-4 py-3 bg-gray-800 text-white">
              <Users className="mr-3 h-5 w-5" />
              <span>Users</span>
            </a>
            <a href="#downloads" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">
              <Download className="mr-3 h-5 w-5" />
              <span>Downloads</span>
            </a>
            <a href="#settings" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors">
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </a>
            <div className="absolute bottom-0 w-64 border-t border-gray-800">
              <button 
                onClick={() => setIsLoggedIn(false)} 
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors w-full"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Mobile header */}
          <div className="md:hidden bg-white p-4 shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
                <span className="font-bold">SENIPY Admin</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoggedIn(false)}
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">Total Users</p>
                      <h3 className="text-2xl font-bold">{users.length}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">New Users (Week)</p>
                      <h3 className="text-2xl font-bold">12</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Download className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500">Total Downloads</p>
                      <h3 className="text-2xl font-bold">11,833</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage your app users and their permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md overflow-hidden border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.status}
                                </span>
                              </TableCell>
                              <TableCell>{user.joined}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="downloads" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>App Downloads</CardTitle>
                    <CardDescription>Track app downloads across different versions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md overflow-hidden border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Version</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Downloads</TableHead>
                            <TableHead>Released</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {downloads.map((download) => (
                            <TableRow key={download.id}>
                              <TableCell>{download.version}</TableCell>
                              <TableCell>{download.platform}</TableCell>
                              <TableCell>{download.downloads.toLocaleString()}</TableCell>
                              <TableCell>{download.released}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
