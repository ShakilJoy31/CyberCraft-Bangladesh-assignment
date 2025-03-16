export interface IAuthorityUser {
    id: number;
    name: string;
    email: string;
    image: string | null;
    password: string;
    mobileNumber: string;
    dateOfBirth: string; // Alternatively, you can use `Date` if you parse it
    gender: string;
    role: string;
    doctorId: number;
    createdAt: string; // Alternatively, you can use `Date` if you parse it
    updatedAt: string; // Alternatively, you can use `Date` if you parse it
}



export interface IPatientUser {
    id: number;
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    dateOfBirth: string; // or Date if you want to handle it as a Date object
    gender: string;
    role: string // Add roles as needed
    createdAt: string; // or Date
    updatedAt: string; // or Dat
}



export interface AuthorityUser {
    id: number;
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    dateOfBirth: string;
    gender: string;
    role: string;
    doctorId: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}





// The role and its types
export interface Permission {
    permissionName: string;
    checked: boolean;
}

export interface RolePermissions {
    roleName: string;
    permissions: Permission[];
}














//  ISP billing
export interface UserDetails {
    id: number;
    package: string;
    userId: string;
    location: string;
    flatAptNo: string;
    area: string;
    createdAt: string;
    email: string;
    fullName: string;
    houseNo: string;
    landmark: string;
    mobileNo: string;
    nidNo: string;
    password: number;
    phoneNo: string;
    roadNo: string;
    role: string;
    updatedAt: string;
    message: string;
}

export interface UserData {
    data: UserDetails;
}







export interface ITicket {
    id: number;
    ticketMadeBy: string;
    ticketId: string;
    status: string;
    title: string;
    description: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
}