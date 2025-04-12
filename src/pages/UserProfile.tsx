
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import DynamicBackground from '@/components/DynamicBackground';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileInfo from '@/components/profile/ProfileInfo';
import { useToast } from '@/hooks/use-toast';

// Define a temporary interface for ProfileData until Supabase types are updated
interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      if (!user) return;

      // Use explicit typing to bypass TypeScript error
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single<ProfileData>();

      if (error) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (firstName: string, lastName: string, avatar: string | null) => {
    setFirstName(firstName);
    setLastName(lastName);
    if (avatar) {
      setAvatarUrl(avatar);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <DynamicBackground />
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl z-10 relative">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
        
        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          {user && (
            <>
              <ProfileAvatar 
                firstName={firstName} 
                lastName={lastName} 
                avatarUrl={avatarUrl} 
                userId={user.id} 
              />
              
              <ProfileInfo 
                userId={user.id}
                email={user.email}
                initialFirstName={firstName}
                initialLastName={lastName}
                avatarUrl={avatarUrl}
                onProfileUpdate={handleProfileUpdate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
