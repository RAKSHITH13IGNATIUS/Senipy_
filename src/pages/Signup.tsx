
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicBackground from '@/components/DynamicBackground';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from "@/components/ui/separator";
import BotLogo from '@/components/BotLogo';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Check, Loader, Mail, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [signupState, setSignupState] = useState<'initial' | 'otp_sent' | 'completed'>('initial');
  const [verificationType, setVerificationType] = useState<'email' | 'phone'>('email');
  const { signUp, signInWithGitHub, user, loading, sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const navigate = useNavigate();

  const otpForm = useForm({
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }

    // Validate input fields
    if (!firstName || !lastName || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (verificationType === 'email') {
      // Handle email signup
      if (!email) {
        toast({
          title: "Email Required",
          description: "Please enter your email address",
          variant: "destructive"
        });
        return;
      }
      
      try {
        await signUp(email, password, firstName, lastName);
        toast({
          title: "Registration Initiated",
          description: "Please check your email to confirm your account",
        });
      } catch (error: any) {
        toast({
          title: "Registration Failed",
          description: error.message || "An error occurred during registration",
          variant: "destructive"
        });
      }
    } else if (verificationType === 'phone') {
      // Handle phone verification
      if (!phone) {
        toast({
          title: "Phone Number Required",
          description: "Please enter your phone number",
          variant: "destructive"
        });
        return;
      }
      
      // First step - send verification code if not already sent
      if (signupState === 'initial') {
        const success = await sendPhoneOTP(phone);
        if (success) {
          setSignupState('otp_sent');
          setShowOTP(true);
        }
        return;
      }
      
      // Second step - verify OTP and complete registration
      if (signupState === 'otp_sent') {
        try {
          setIsVerifying(true);
          const otpValue = otpForm.getValues().otp;
          
          const success = await verifyPhoneOTP(phone, otpValue);
          if (success) {
            // Create a unique email-like identifier using the phone number
            // This is a workaround since Supabase requires an email
            const phoneEmail = `phone_${phone.replace(/[^0-9]/g, '')}@senipy.com`;
            
            // Complete registration with the phone-based account
            const signupSuccess = await signUp(phoneEmail, password, firstName, lastName);
            
            if (signupSuccess) {
              setSignupState('completed');
              toast({
                title: "Registration Successful",
                description: "Your phone has been verified and your account has been created",
              });
              navigate('/login');
            }
          }
        } catch (error: any) {
          toast({
            title: "Verification Failed",
            description: error.message || "An error occurred during verification",
            variant: "destructive"
          });
        } finally {
          setIsVerifying(false);
        }
      }
    }
  };

  const handleGitHubLogin = async () => {
    await signInWithGitHub();
  };

  const resetOTPProcess = () => {
    setShowOTP(false);
    setSignupState('initial');
    otpForm.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <DynamicBackground />
      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
            <BotLogo />
          </div>
          <h1 className="text-3xl font-bold text-primary">Join SENIPY</h1>
          <p className="text-blue-600 mt-2">Create an account to get started</p>
        </div>
        
        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Sign Up</CardTitle>
            <CardDescription className="text-center">
              {showOTP && verificationType === 'phone'
                ? "Enter the verification code to continue" 
                : "Enter your details to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showOTP && verificationType === 'phone' ? (
              <div className="space-y-6">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Verification code sent to {phone}
                  </p>
                </div>
                
                <Form {...otpForm}>
                  <form onSubmit={handleSignup} className="space-y-6">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-center block">Verification Code</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} className="border-primary/30" />
                                <InputOTPSlot index={1} className="border-primary/30" />
                                <InputOTPSlot index={2} className="border-primary/30" />
                                <InputOTPSlot index={3} className="border-primary/30" />
                                <InputOTPSlot index={4} className="border-primary/30" />
                                <InputOTPSlot index={5} className="border-primary/30" />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Verify and Create Account
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    className="text-sm text-primary hover:underline"
                    onClick={resetOTPProcess}
                  >
                    Back to signup
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="transition-all">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-lg text-primary">First Name</Label>
                      <Input 
                        id="firstName" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="First name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-lg text-primary">Last Name</Label>
                      <Input 
                        id="lastName" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Tabs defaultValue={verificationType} onValueChange={(value) => setVerificationType(value as 'email' | 'phone')}>
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="email" className="text-sm">Email</TabsTrigger>
                      <TabsTrigger value="phone" className="text-sm">Phone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-2">
                      <Label htmlFor="email" className="text-lg text-primary">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You'll receive a confirmation email to verify your account
                      </p>
                    </TabsContent>
                    <TabsContent value="phone" className="space-y-2">
                      <Label htmlFor="phone" className="text-lg text-primary">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        className="input-field focus:ring-primary/50 transition-all duration-300" 
                        placeholder="Enter your phone number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You'll receive a verification code via SMS (use 123456 for demo)
                      </p>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-lg text-primary">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      className="input-field focus:ring-primary/50 transition-all duration-300" 
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
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
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
                  
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                    disabled={loading || !agreedToTerms}
                  >
                    {loading ? "Processing..." : verificationType === 'email' ? "Create Account" : "Send Verification Code"}
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
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium transition-all duration-300 hover:text-primary/80">
                Log in
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

export default Signup;
