
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import DynamicBackground from '@/components/DynamicBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you would authenticate against a backend
    // For now, we'll just simulate a successful login
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        email,
        loginTime: new Date().toISOString()
      }));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to SENIPY!",
      });
      
      // Navigate to the download section
      setIsLoading(false);
      navigate('/#download');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <DynamicBackground />
      <div className="w-full max-w-md animated-element z-10">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-secondary rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-blue-100 mt-2">Log in to your SENIPY account</p>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="input-field" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-lg">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    className="input-field" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
            <Link to="/" className="text-gray-500 hover:text-primary text-sm text-center">
              Return to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
