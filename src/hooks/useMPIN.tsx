import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useMPIN = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, userData } = useAuth();

  const setMPIN = async (mpin: string) => {
    setLoading(true);
    try {
      if (!user || !userData) {
        throw new Error('User not authenticated');
      }

      // Hash the MPIN
      const hashedMPin = btoa(mpin + 'lifelin3_salt');

      // Update user metadata with MPIN info
      const { error: authError } = await supabase.auth.updateUser({
        data: { mpin_hash: hashedMPin }
      });

      if (authError) throw authError;

      // Update profiles table to mark MPIN as setup
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_mpin_setup: true })
        .eq('auth_user_id', user.id);

      if (updateError) {
        console.warn('Profile update failed:', updateError);
      }

      toast({
        title: "MPIN Set",
        description: "Your MPIN has been set successfully"
      });

      return { success: true };
    } catch (error: any) {
      console.error('MPIN setup error:', error);
      toast({
        title: "Failed to set MPIN",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyMPIN = async (mpin: string) => {
    setLoading(true);
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get the stored MPIN hash from user metadata
      const { data: userMeta, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const storedHash = userMeta.user?.user_metadata?.mpin_hash;
      if (!storedHash) {
        toast({
          title: "MPIN Not Set",
          description: "Please set up your MPIN first",
          variant: "destructive"
        });
        return { success: false };
      }

      // Hash the entered MPIN and compare
      const enteredHash = btoa(mpin + 'lifelin3_salt');
      
      if (storedHash !== enteredHash) {
        toast({
          title: "Invalid MPIN",
          description: "Incorrect MPIN entered",
          variant: "destructive"
        });
        return { success: false };
      }

      return { success: true };
    } catch (error: any) {
      console.error('MPIN verification error:', error);
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const hasMPIN = async () => {
    try {
      if (!userData) {
        return false;
      }
      
      // Check if MPIN is setup from the user record
      return userData.is_mpin_setup || false;
    } catch {
      return false;
    }
  };

  return {
    setMPIN,
    verifyMPIN,
    hasMPIN,
    loading
  };
};