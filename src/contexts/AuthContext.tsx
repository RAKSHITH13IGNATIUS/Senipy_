
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  sendPhoneOTP: (phone: string) => Promise<boolean>;
  verifyPhoneOTP: (phone: string, otp: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
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

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      
      // Only proceed with email signup if email is provided
      if (email && email.includes('@')) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
            emailRedirectTo: `${window.location.origin}/login`,
          }
        });
        
        if (error) throw error;
        
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
      await supabase.auth.signOut();
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) throw error;
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) throw error;
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
      
      // In a real implementation, this would use Supabase phone auth or a third-party SMS provider
      // For demo purposes, we'll simulate sending an OTP
      console.log(`Simulating sending OTP to ${phone}`);
      
      // In a production environment, you would call an API to send the OTP
      // For our demo, we'll return success and use a fixed OTP (123456)
      
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
      
      // In a real implementation, this would verify the OTP with a service
      // For demo purposes, we'll accept "123456" as the valid OTP
      if (otp !== "123456") {
        throw new Error("Invalid verification code");
      }
      
      // In a production environment, you would now create the user account
      // and associate it with the verified phone number
      
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
