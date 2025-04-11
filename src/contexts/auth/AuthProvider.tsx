
import React, { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthContext from './AuthContext';
import { 
  signInWithPassword, 
  signUpWithEmail, 
  signOutUser, 
  signInWithOAuthProvider,
  simulateSendPhoneOTP,
  simulateVerifyPhoneOTP
} from '@/utils/auth.utils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Login Successful",
            description: "Welcome to SENIPY!",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed Out",
            description: "You have been signed out successfully",
          });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithPassword(email, password);
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Only proceed with email signup if email is provided
      if (email && email.includes('@')) {
        await signUpWithEmail(email, password, firstName, lastName);
        
        toast({
          title: "Registration Initiated",
          description: "Please check your email to confirm your account",
        });
        navigate('/login');
      } else {
        // If no email is provided, we assume it's a phone-only signup
        // Store user details for later completion after phone verification
        console.log("Phone-only signup detected");
        return true; // Return success for phone verification flow to continue
      }
      
      return true;
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing up:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing out:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithOAuthProvider('google');
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithOAuthProvider('github');
    } catch (error: any) {
      toast({
        title: "GitHub Login Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in with GitHub:', error);
    }
  };

  const sendPhoneOTP = async (phone: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      await simulateSendPhoneOTP(phone);
      
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phone}`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to Send OTP",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error sending OTP:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneOTP = async (phone: string, otp: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      await simulateVerifyPhoneOTP(phone, otp);
      
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error verifying OTP:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut,
      signInWithGoogle,
      signInWithGitHub,
      sendPhoneOTP,
      verifyPhoneOTP,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
