
import { create } from 'zustand';

type SignupState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  agreedToTerms: boolean;
  showOTP: boolean;
  isVerifying: boolean;
  signupState: 'initial' | 'otp_sent' | 'completed';
  verificationType: 'email' | 'phone';
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setPassword: (value: string) => void;
  setAgreedToTerms: (value: boolean) => void;
  setShowOTP: (value: boolean) => void;
  setIsVerifying: (value: boolean) => void;
  setSignupState: (value: 'initial' | 'otp_sent' | 'completed') => void;
  setVerificationType: (value: 'email' | 'phone') => void;
  resetOTPProcess: () => void;
};

export const useSignupState = create<SignupState>((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  agreedToTerms: false,
  showOTP: false,
  isVerifying: false,
  signupState: 'initial',
  verificationType: 'email',
  setFirstName: (value) => set({ firstName: value }),
  setLastName: (value) => set({ lastName: value }),
  setEmail: (value) => set({ email: value }),
  setPhone: (value) => set({ phone: value }),
  setPassword: (value) => set({ password: value }),
  setAgreedToTerms: (value) => set({ agreedToTerms: value }),
  setShowOTP: (value) => set({ showOTP: value }),
  setIsVerifying: (value) => set({ isVerifying: value }),
  setSignupState: (value) => set({ signupState: value }),
  setVerificationType: (value) => set({ verificationType: value }),
  resetOTPProcess: () => set({ showOTP: false, signupState: 'initial' }),
}));
