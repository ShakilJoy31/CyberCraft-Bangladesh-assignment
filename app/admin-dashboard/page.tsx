import AdminDashboard from "@/components/custom-component/Authentication/AdminDashboard";
import Login from "@/components/custom-component/Authentication/Login";
import { getDataFromServer } from "@/lib/baseURL";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
    return generateMeta({
        title: "Admin Dashboard - CyberCraft Bangladesh",
        description:
            "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
        canonical: "/login"
    });
}

export default async function Home() {
    let data;
    try {
        const response = await getDataFromServer("/api/v1/CyberCraft-Bangladesh-assignment/get-contact-information?page=1&limit=10");
        if (!response || !response.pagination || !response.data) {
            throw new Error("Invalid data structure");
        }
        data = response;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        data = { 
            status: "error", 
            data: [], 
            pagination: { 
                total: 0, 
                totalPages: 1, 
                currentPage: 1, 
                currentLimit: 10 
            } 
        }; // Fallback data
    }

    return (
        <AdminDashboard data={data}></AdminDashboard>
    );
}

