
-- Create project_likes table
CREATE TABLE public.project_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a like
CREATE POLICY "Anyone can like a project"
  ON public.project_likes FOR INSERT
  WITH CHECK (true);

-- Anyone can count likes
CREATE POLICY "Anyone can view likes"
  ON public.project_likes FOR SELECT
  USING (true);
