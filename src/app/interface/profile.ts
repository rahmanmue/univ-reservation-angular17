export interface UserProfile {
    fullName: string;
    phone: string;
    nim: string;
  }
  
  export interface UserProfileResponse {
    data: UserProfile;
  }