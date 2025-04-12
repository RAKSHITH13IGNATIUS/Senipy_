
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from 'lucide-react';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  userId: string;
}

const ProfileAvatar = ({ firstName, lastName, avatarUrl, userId }: ProfileAvatarProps) => {
  const { uploading, uploadAvatar } = useAvatarUpload(userId);
  
  // Get user's initials for avatar
  const getUserInitials = () => {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };
  
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Update your profile picture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="bg-primary text-white text-2xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" />
          </div>
        </div>
        
        <div className="flex flex-col w-full space-y-2">
          <Label 
            htmlFor="avatar" 
            className="w-full bg-primary text-white py-2 px-4 rounded-md text-center cursor-pointer hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? "Uploading..." : (<><Upload size={16} /> Upload Image</>)}
          </Label>
          <Input 
            id="avatar" 
            type="file" 
            className="hidden" 
            onChange={uploadAvatar}
            accept="image/*"
            disabled={uploading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAvatar;
