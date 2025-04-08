
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DynamicBackground from '@/components/DynamicBackground';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import BotLogo from '@/components/BotLogo';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { signIn, signInWithGitHub, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleGitHubLogin = async () => {
    await signInWithGitHub();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) {
        if (error.message.includes('phone_provider_disabled') || error.message.includes('Unsupported phone provider')) {
          toast({
            title: "SMS Authentication Not Available",
            description: "SMS authentication needs to be enabled in Supabase project settings",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error sending OTP",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        setShowOtpInput(true);
        toast({
          title: "OTP sent",
          description: "Check your phone for the verification code",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending OTP",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otpCode,
        type: 'sms'
      });

      if (error) {
        toast({
          title: "Error verifying OTP",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Successfully verified",
          description: "You are now logged in",
        });
        // Redirect is handled by auth state change
      }
    } catch (error) {
      toast({
        title: "Error verifying OTP",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <DynamicBackground />
      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
            <BotLogo />
          </div>
          <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
          <p className="text-blue-600 mt-2">Log in to your SENIPY account</p>
        </div>
        
        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Login</CardTitle>
            <CardDescription className="text-center">
              Choose a login method to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-primary/10">
                <TabsTrigger 
                  value="email" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger 
                  value="phone" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="animate-fade-in">
                <form onSubmit={handleLogin}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg text-primary">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-lg text-primary">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline transition-colors duration-300">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log In"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full py-6 hover:border-primary hover:bg-primary/5 transform hover:scale-105 transition-all duration-300"
                        onClick={handleGitHubLogin}
                        disabled={loading}
                      >
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="phone" className="animate-fade-in">
                <Alert className="mb-6 border-amber-300 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">SMS Authentication Notice</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    SMS authentication requires additional configuration in your Supabase project settings.
                  </AlertDescription>
                </Alert>
                
                {!showOtpInput ? (
                  <form onSubmit={handleSendOtp}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-lg text-primary">Phone Number</Label>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-5 w-5 text-primary" />
                          <Input 
                            id="phone" 
                            type="tel"
                            className="input-field focus:ring-primary/50 transition-all duration-300" 
                            placeholder="+91 9353152727" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          We'll send a one-time password to your phone
                        </p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                        disabled={loading}
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="animate-fade-in">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-lg text-primary">Enter OTP</Label>
                        <div className="flex justify-center my-4">
                          <InputOTP 
                            maxLength={6}
                            value={otpCode}
                            onChange={setOtpCode}
                            render={({ slots }) => (
                              <InputOTPGroup>
                                {slots.map((slot, index) => (
                                  <InputOTPSlot 
                                    key={index} 
                                    {...slot} 
                                    index={index} 
                                    className="border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                                  />
                                ))}
                              </InputOTPGroup>
                            )}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                          Enter the 6-digit code sent to {phoneNumber}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Button 
                          type="submit" 
                          className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                          disabled={loading}
                        >
                          {loading ? "Verifying..." : "Verify & Login"}
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          className="w-full hover:border-primary hover:bg-primary/5 transition-all duration-300"
                          onClick={() => setShowOtpInput(false)}
                        >
                          Change Phone Number
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-medium transition-all duration-300 hover:text-primary/80">
                Sign up
              </Link>
            </div>
            <Link to="/" className="text-gray-500 hover:text-primary text-sm text-center transition-colors duration-300">
              Return to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
