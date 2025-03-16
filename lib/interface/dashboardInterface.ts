
// Admin user ......................................
export interface IAdminUser {
    id: number;
    name: string;
    email: string;
    image: string;
    password: string;
    mobileNumber: string;
    dateOfBirth: string; // You can use Date type if you plan to parse it
    gender: "male" | "female" | "other"; // Adjust based on possible values
    role: "admin" | "user" | "doctor"; // Modify based on available roles
    doctorId: number;
    createdAt: string; // Consider Date if using actual date objects
    updatedAt: string;
  }  


export interface SuperAdminApiResponse {
    message: string;
    data: {
        totalPatients: number;
        totalDoctors: number;
        totalDirectors: number;
        totalRevenue: number;
        totalSpecialities: number;
        totalTestItems: number;
        totalAppointments: number;
        totalPendingAppointments: number;
        totalCompleteAppointments: number;
        todaysPendingAppointments: any[];
        adminUsers: IAdminUser[];
        latestMessages: {
            id: number;
            name: string;
            email: string;
            message: string;
            createdAt: string;
            updatedAt: string;
        }[];
        latestInquiries: {
            id: number;
            name: string;
            email: string;
            phone: string;
            message: string;
            createdAt: string;
            updatedAt: string;
        }[];
        superAdminUsers: {
            id: number;
            name: string;
            email: string;
            image: string;
            password: string;
            mobileNumber: string;
            dateOfBirth: string;
            gender: string;
            role: string;
            doctorId: null | number;
            createdAt: string;
            updatedAt: string;
        }[];
    };
}








// Interface for the doctors..........................
export interface AppointmentBookedBy {
    userName: string;
    userEmail: string;
    userPhone: string;
    userAge: string;
    userGender: string;
}

export interface Appointment {
    appointmentBookedBy: AppointmentBookedBy;
    id: number;
    branch: string;
    date: string;
    time: string;
    status: string;
    doctor: string;
    specialty: string;
    userNote: string;
    createdAt: string;
    updatedAt: string;
}

export interface Doctor {
    speciality: string[];
    id: number;
    name: string;
    visitFee: number;
    degree: string;
    profilePicture: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardData {
    totalPatients: number;
    totalDoctors: number;
    totalDirectors: number;
    totalRevenue: number;
    totalSpecialities: number;
    totalTestItems: number;
    totalAppointments: number;
    totalPendingAppointments: number;
    totalCompleteAppointments: number;
    doctorsWithMatchingSpecialities: Doctor[];
    todaysPendingAppointments: Appointment[];
    latestMessages: Message[];
    latestInquiries: Inquiry[];
}

export interface ApiResponse {
    message: string;
    data: DashboardData;
}