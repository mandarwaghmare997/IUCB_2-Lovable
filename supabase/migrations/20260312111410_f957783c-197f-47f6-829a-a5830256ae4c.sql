
-- Fix the permissive complaints policy by adding basic validation
DROP POLICY "Anyone can submit complaints" ON public.complaints;

CREATE POLICY "Anyone can submit complaints" ON public.complaints
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND name <> '' AND
    email IS NOT NULL AND email <> '' AND
    message IS NOT NULL AND message <> ''
  );
