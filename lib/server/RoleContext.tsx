// contexts/RolePermissionsContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getBaseURL } from "../baseURL";
import { RolePermissions } from "../interface/user-interface";
import { usePathname } from "next/navigation";

// Define the shape of the role and permissions


// Define the shape of the context value
interface RolePermissionsContextProps {
  rolePermissions: RolePermissions | null;
  setRolePermissions: (rolePermissions: RolePermissions) => void;
}

// Create the context
const RolePermissionsContext = createContext<RolePermissionsContextProps | undefined>(undefined);

// Provider component
export const RolePermissionsProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [rolePermissions, setRolePermissions] = useState<RolePermissions | null>(null);
  // Fetch role and permissions from the database
  const pathname = usePathname();
  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("admin-user") || "{}");
        // Fetch role and permissions from your API
        const response = await fetch(`${getBaseURL()}/authentication/get-role-permission/${user.user.role}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch role permissions");
        }
        const data: RolePermissions = await response.json();
        setRolePermissions(data);
      } catch (error) {
        console.error("Error fetching role permissions:", error);
      }
    };

    fetchRolePermissions();
  }, [pathname]);

  return (
    <RolePermissionsContext.Provider value={{ rolePermissions, setRolePermissions }}>
      {children}
    </RolePermissionsContext.Provider>
  );
};

// Custom hook for consuming the context
export const useRolePermissions = (): RolePermissionsContextProps => {
  const context = useContext(RolePermissionsContext);
  if (!context) {
    throw new Error("useRolePermissions must be used within a RolePermissionsProvider");
  }
  return context;
};