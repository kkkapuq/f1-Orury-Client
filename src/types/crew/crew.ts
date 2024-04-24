export interface CrewDetailProps {
  capacity: number;
  created_at: string;
  description: string;
  head_name: string;
  head_profile_image: string;
  user_images: string[];
  icon: string;
  id: number;
  is_member: boolean;
  member_count: number;
  name: string;
  region: string[];
  status: string;
  tags: string[];
  updated_at: string;
  question: string;
}

export interface CrewMembersProps {
  id: number;
  nickname: string;
  profile_image: string;
  is_me: boolean;
  is_crew_creator: boolean;
}
