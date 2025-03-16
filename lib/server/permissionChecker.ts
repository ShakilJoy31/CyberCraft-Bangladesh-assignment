import { RolePermissions } from "../interface/user-interface";

export const permissionChecker = (getChecker: string, rolePermissions: RolePermissions | null) => {

    // Check if rolePermissions is not null before accessing permissions
    if (rolePermissions) {
        const editUserPermission = rolePermissions.permissions.find(
            (perm) => perm.permissionName === getChecker
        );
        // Check if the permission exists and whether it's checked
        if (editUserPermission) {
            return editUserPermission.checked
        } else {
            return false;
        }
    } else {
        console.log("rolePermissions is null.");
    }
}







// The permissions list
export const predefinedPermissions = [
        "Upload Doctor",
        "Delete Doctor",
        "Checkout Doctor",
        "Edit Doctor",
        "Manage Speciality",
        "Hospital Gallery",
        "About Supermedical Hospital",
        "Board of Director",
        "Add Management",
        "Award & Affilliation",
        "Mission & Vission",
        "Milestones",
        "News & Media",
        "Manage Client Home page",
        "Pending Appointments",
        "Approved Appointments",
        "Rejected Appointments",
        "Complete Appointments",
        "Delete Appointments",
        "Manage Inquiry",
        "Manage Message",
        "Manage Contact Information",
        "Manage Admission & Payment",
        "Birth Certificate",
        "Blood Bank",
        "Health Tips",
        "Test List",
        "Vaccination",
        "Authorty Management",
        "Patients Management",
        "Permission Management",
        "Add New User with Role",
        "Account Update",
        "Header Settings",
        "Footer Settings",
        "Theme Settings",
        "Account Settings",
        "Delete User",
        "Edit User",
        "View Reports"
    ];
