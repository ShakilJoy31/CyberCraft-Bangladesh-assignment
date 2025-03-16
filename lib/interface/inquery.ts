export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface InquiryResponse {
    message: string;
    messages: Inquiry[];
  }
  



  export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface MessageResponse {
    message: string;
    messages: Message[];
  }
  