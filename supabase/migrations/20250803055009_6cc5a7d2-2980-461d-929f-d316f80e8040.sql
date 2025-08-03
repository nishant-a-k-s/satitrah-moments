-- Fix security warnings by updating search_path for functions
CREATE OR REPLACE FUNCTION public.hash_mpin(mpin_plain text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- In production, use proper hashing with salt
  -- For now, using a simple hash (replace with bcrypt in edge function)
  RETURN encode(digest(mpin_plain || 'satitrah_salt', 'sha256'), 'hex');
END;
$$;

-- Function to verify MPIN with proper search_path
CREATE OR REPLACE FUNCTION public.verify_mpin(user_email text, mpin_plain text)
RETURNS table(user_id uuid, is_valid boolean, auth_user_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_uuid uuid;
  auth_uuid uuid;
  stored_hash text;
  attempt_count integer;
  is_locked boolean;
BEGIN
  -- Get user by email with security info
  SELECT u.id, u.auth_user_id, us.mpin_hash, us.mpin_attempts, 
         (us.mpin_locked_until > now()) as locked
  INTO user_uuid, auth_uuid, stored_hash, attempt_count, is_locked
  FROM public.users u
  LEFT JOIN public.user_security us ON u.id = us.user_id
  WHERE u.email = user_email;
  
  -- Check if user exists
  IF user_uuid IS NULL THEN
    RETURN QUERY SELECT null::uuid, false, null::uuid;
    RETURN;
  END IF;
  
  -- Check if account is locked
  IF is_locked THEN
    RETURN QUERY SELECT user_uuid, false, auth_uuid;
    RETURN;
  END IF;
  
  -- Verify MPIN
  IF stored_hash = public.hash_mpin(mpin_plain) THEN
    -- Reset attempts on successful login
    UPDATE public.user_security 
    SET mpin_attempts = 0, last_mpin_attempt = now()
    WHERE user_id = user_uuid;
    
    RETURN QUERY SELECT user_uuid, true, auth_uuid;
  ELSE
    -- Increment attempts
    UPDATE public.user_security 
    SET mpin_attempts = COALESCE(mpin_attempts, 0) + 1,
        last_mpin_attempt = now(),
        mpin_locked_until = CASE 
          WHEN COALESCE(mpin_attempts, 0) + 1 >= 5 
          THEN now() + interval '30 minutes'
          ELSE null
        END
    WHERE user_id = user_uuid;
    
    RETURN QUERY SELECT user_uuid, false, auth_uuid;
  END IF;
END;
$$;