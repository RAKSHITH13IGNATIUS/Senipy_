
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/auth';
import { toast } from "@/hooks/use-toast";
import { Check, Loader, Smartphone } from "lucide-react";
import { useSignupState } from '../hooks/useSignupState';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Link } from 'react-router-dom';

const PhoneVerification = () => {
  const navigate = useNavigate();
  const { verifyPhoneOTP, signUp } = useAuth();
  const {
    firstName,
    lastName,
    phone,
    password,
    isVerifying,
    signupState,
    setIsVerifying,
    resetOTPProcess,
    setSignupState
  } = useSignupState();

  const otpForm = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Enter the verification code to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <form onSubmit={handleVerification} className="space-y-6">
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
  );
};

export default PhoneVerification;
