
import React from 'react';
import { Navbar } from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';

const Feedback = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              We Value Your Feedback
            </h1>
            <p className="text-muted-foreground">
              Help us improve by sharing your thoughts and experiences with our app
            </p>
          </div>
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
