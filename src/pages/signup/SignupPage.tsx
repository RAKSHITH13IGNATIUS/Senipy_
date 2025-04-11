
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import DynamicBackground from '@/components/DynamicBackground';
import BotLogo from '@/components/BotLogo';
import SignupForm from './components/SignupForm';
import PhoneVerification from './components/PhoneVerification';
import { useSignupState } from './hooks/useSignupState';

const SignupPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    showOTP,
    verificationType
  } = useSignupState();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
        
        {showOTP && verificationType === 'phone' ? (
          <PhoneVerification />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
