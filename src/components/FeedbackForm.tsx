
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Star } from 'lucide-react';

// Question type definition
interface FeedbackQuestion {
  id: number;
  text: string;
  rating: number;
}

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([
    { id: 1, text: "How would you rate the overall usability of the SENIPY app?", rating: 0 },
    { id: 2, text: "How effective do you find the voice-activated features in the Gen_0 APK?", rating: 0 },
    { id: 3, text: "How would you rate the engagement level of the games and music in SENIPY?", rating: 0 },
    { id: 4, text: "How satisfied are you with the health insights and emergency alerts feature?", rating: 0 },
    { id: 5, text: "How would you rate the overall idea of SENIPY as a virtual assistant for elderly care?", rating: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleRatingClick = (questionId: number, selectedRating: number) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, rating: selectedRating } : question
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if any question has a zero rating
    const hasZeroRating = questions.some(q => q.rating === 0);
    if (hasZeroRating) {
      toast({
        title: "Ratings Required",
        description: "Please provide a rating for all questions before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Calculate average rating from all questions
      const averageRating = questions.reduce((sum, q) => sum + q.rating, 0) / questions.length;
      
      // Prepare feedback data
      const feedbackData = {
        name,
        email,
        message,
        rating: Math.round(averageRating), // Round to nearest integer for the main rating
        user_id: user?.id || null,
        question_ratings: JSON.stringify(questions), // Store all question ratings in a JSON field
      };
      
      const { error } = await supabase
        .from('feedback')
        .insert(feedbackData);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will use it to improve our service.",
      });

      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');
      setQuestions(questions.map(q => ({ ...q, rating: 0 })));
    } catch (error: any) {
      toast({
        title: "Error submitting feedback",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-bold">Share Your Feedback</CardTitle>
        <CardDescription>
          We value your opinion! Let us know how we can improve your experience with SENIPY.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          
          {/* Specific Questions Section */}
          <div className="space-y-4 border rounded-md p-4 bg-gray-50">
            <h3 className="font-medium text-lg">Please rate the following aspects:</h3>
            
            {questions.map((question) => (
              <div key={question.id} className="space-y-2 pb-3 border-b last:border-b-0 last:pb-0">
                <Label>{question.text}</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(question.id, star)}
                      className="p-1 focus:outline-none transition-all duration-200"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          question.rating >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {question.rating > 0 ? `${question.rating}/5` : 'Select a rating'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Additional Comments</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your experience with SENIPY..."
              className="min-h-[120px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
