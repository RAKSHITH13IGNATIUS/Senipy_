
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicBackground from '@/components/DynamicBackground';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    // In a real app, you would register the user on a backend
    // For now, we'll just simulate a successful registration
    localStorage.setItem('user', JSON.stringify({ 
      firstName, 
      lastName, 
      email 
    }));
    
    // Navigate to the download section
    navigate('/#download');
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
          <h1 className="text-3xl font-bold text-white">Join SENIPY</h1>
          <p className="text-blue-100 mt-2">Create an account to get started</p>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-lg">First Name</Label>
                    <Input 
                      id="firstName" 
                      className="input-field" 
                      placeholder="First name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-lg">Last Name</Label>
                    <Input 
                      id="lastName" 
                      className="input-field" 
                      placeholder="Last name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
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
                  <Label htmlFor="password" className="text-lg">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="input-field" 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Log in
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

export default Signup;
