"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "@/components/ReusableComopnents/Button";
import { Download } from "lucide-react";
import { toastShowing } from "@/lib/toastShowing";
import jsPDF from "jspdf";
import { getFromLocalStorage } from "@/lib/theFunctions";

interface Contact {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IndividualContactInformationProps {
    contact: Contact;
}

export default function IndividualContactInformation({ contact }: IndividualContactInformationProps) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (contact) {
            setLoading(false); // Stop loading once data is available
        }
    }, [contact]);
    
     useEffect(() => {
            const storedUserData = getFromLocalStorage("cybercraft-bangladesh");
            if (!storedUserData) {
                router.push("/login");
            }
        }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

      const handleDownloadUserPDF = (user: Contact) => {
            const doc = new jsPDF();
            doc.text(`User Information: ${user.name}`, 10, 10);
            doc.text(`Name: ${user.name}`, 10, 20);
            doc.text(`Email: ${user.email}`, 10, 30);
            doc.text(`Message: ${user.message}`, 10, 40);
            doc.text(`Created At: ${new Date(user.createdAt).toLocaleString()}`, 10, 50);
            doc.save(`${user.name}_information.pdf`);
            toastShowing(`Downloaded ${user.name}'s information as PDF`, "top-center", 2500, "black", "white");
        };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Contact Information</h1>
                <button
                        onClick={() => handleDownloadUserPDF(contact)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                    >
                        <Download size={25} />
                    </button>
                </div>
              
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="font-semibold w-32">ID:</span>
                        <span>{contact._id}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold w-32">Name:</span>
                        <span>{contact.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold w-32">Email:</span>
                        <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold w-32">Message:</span>
                        <span>{contact.message}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold w-32">Time:</span>
                        <span>{new Date(contact.createdAt).toLocaleString()}</span>
                    </div>
                    
                </div>
                <CustomButton onClick={() => router.back()}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go Back</CustomButton>
                
            </div>
            <ToastContainer />
        </div>
    );
}