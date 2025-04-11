
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  sendPhoneOTP: (phone: string) => Promise<boolean>;
  verifyPhoneOTP: (phone: string, otp: string) => Promise<boolean>;
  loading: boolean;
}
