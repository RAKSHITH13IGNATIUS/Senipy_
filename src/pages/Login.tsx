
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md animated-element">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-secondary rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Log in to your Robo Companion account</p>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input id="email" type="email" className="input-field" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-lg">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" className="input-field" placeholder="Enter your password" />
                </div>
                <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
                  Log In
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
