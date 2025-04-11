
import { supabase } from '@/integrations/supabase/client';
import { toast as useToast } from '@/hooks/use-toast';

export const signInWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const signUpWithEmail = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
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
  return true;
};

export const signOutUser = async () => {
  await supabase.auth.signOut();
};

export const signInWithOAuthProvider = async (provider: 'google' | 'github') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    }
  });
  
  if (error) throw error;
};

export const simulateSendPhoneOTP = async (phone: string): Promise<boolean> => {
  // In a real implementation, this would use Supabase phone auth or a third-party SMS provider
  // For demo purposes, we're simulating sending an OTP
  console.log(`Simulating sending OTP to ${phone}`);
  
  // In a production environment, you would call an API to send the OTP
  return true;
};

export const simulateVerifyPhoneOTP = async (phone: string, otp: string): Promise<boolean> => {
  // In a real implementation, this would verify the OTP with a service
  // For demo purposes, we'll accept "123456" as the valid OTP
  if (otp !== "123456") {
    throw new Error("Invalid verification code");
  }
  
  return true;
};
