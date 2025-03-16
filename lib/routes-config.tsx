import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { FaHospitalAlt } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";


import { ReactNode } from "react";

type PageRoutesType = {
  title: string;
  items: PageRoutesItemType;
};

type PageRoutesItemType = {
  title: string;
  href: string;
  icon?: string | ReactNode;  // Allow both string and ReactNode
  isComing?: boolean;
  items?: PageRoutesItemType;
}[];

export const page_routes: PageRoutesType[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard/default",
        icon:  <MdDashboard size={20} />
      },

      { 
        title: "Manage Doctor", 
        href: "/dashboard/pages/doctors/upload-doctor", 
        icon: <FaUserDoctor size={20} />
      },
      { 
        title: "About Hospital", 
        href: "/dashboard/pages/about-hospital/gallery", 
        icon: <FaHospitalAlt size={20} />
      },
      {
        title: "Manage Appointments", 
        href: "/dashboard/pages/manage-appointments/pending", 
        icon: <FaCalendarPlus size={20} />
      },

      { 
        title: "Communication", 
        href: "/dashboard/pages/inquiry-message/inquiry", 
        icon: <LuMessageSquare size={20} />
      },
      { 
        title: "For Patient",
        href: "/dashboard/pages/for-patients/admission-and-payment", 
        icon: <FaHospitalUser size={20} />
      },
      {
        title: "User & Permissions",
        href: "/dashboard/pages/user-management/authority-user-management",
        icon: <FaUser size={20} />
      },
      {
        title: "Settings",
        href: "/dashboard/pages/settings/header-settings",
        icon: <IoSettingsSharp size={20} />
      },

    ]
  }
];
