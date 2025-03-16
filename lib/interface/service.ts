interface PracticeDay {
  day: string;
  consultationHours: string;
}

export interface Doctor {
  id: number;
  name: string;
  degree: string;
  speciality: string[];
  visitFee: number;
  branch: string;
  practiceDays: PracticeDay[];
  phoneNumber: string;
  roomNo: string;
  yearsOfExperience: number;
  consultationHours: string;
  onlineConsultation: string; // "yes" or "no"
  profilePicture: string;
  address: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface DoctorsResponse {
  message: string;
  doctors: Doctor[];
}
