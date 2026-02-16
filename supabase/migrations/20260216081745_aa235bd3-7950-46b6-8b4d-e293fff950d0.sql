
-- Drop the broken RESTRICTIVE policies
DROP POLICY IF EXISTS "Anyone can like a project" ON public.project_likes;
DROP POLICY IF EXISTS "Anyone can view likes" ON public.project_likes;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "Anyone can like a project"
ON public.project_likes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view likes"
ON public.project_likes
FOR SELECT
TO anon, authenticated
USING (true);
