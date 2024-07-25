export interface UserProfileRequestBody {
    [x: string]: any;
    id?: string;              
    nim: number;             
    fullName: string;        
    dateofbirth: string;     
    phone: string;           
    photo: string;           
    user?: {
      id?: string;            
    };
  }
  