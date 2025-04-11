
-- Add a new column to the feedback table to store question ratings
ALTER TABLE public.feedback 
ADD COLUMN question_ratings JSONB;
