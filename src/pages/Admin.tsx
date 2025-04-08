
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import DynamicBackground from '@/components/DynamicBackground';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  lastLogin: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  
  // Mock data - In a real app, this would be fetched from a database
  useEffect(() => {
    // Check for authentication
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Mock users data
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        lastLogin: '2023-04-01 10:30 AM'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        lastLogin: '2023-04-02 02:15 PM'
      },
      {
        id: 3,
        email: 'guest@example.com',
        lastLogin: '2023-04-03 05:45 PM'
      },
    ];
    
    // Also add any users from localStorage
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        mockUsers.push(...parsedUsers);
      }
      
      // Also add the current user
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (currentUser.email) {
        mockUsers.push({
          id: mockUsers.length + 1,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          lastLogin: new Date().toLocaleString()
        });
      }
    } catch (e) {
      console.error("Error parsing stored users:", e);
    }
    
    setUsers(mockUsers);
  }, [navigate]);

  return (
    <div className="min-h-screen relative">
      <DynamicBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 pt-32 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users and application settings</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">User Management</h2>
            
            <Table>
              <TableCaption>List of registered users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : "Guest User"}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
