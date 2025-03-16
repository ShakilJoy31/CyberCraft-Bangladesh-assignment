"use client";

import Image from "next/image";
import loginScreen from '../../../assets/Frame 6024.png'; // Import the background image
import btn1 from '../../../assets/Button.png';
import btn2 from '../../../assets/Button (1).png';
import btn3 from '../../../assets/Button (2).png';
import btn4 from '../../../assets/Button (3).png';
import btn5 from '../../../assets/refresh.png';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoMdNotifications } from "react-icons/io";
import { SearchIcon, Eye, Download, Trash2 } from "lucide-react"; // For icons
import TheTable from "@/components/ReusableComopnents/TheTable";
import { useEffect, useState } from "react";
import { getBaseURL } from "@/lib/baseURL";
import { toastShowing } from "@/lib/toastShowing";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table PDF generation
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@/lib/theFunctions";
import { IoLogOut } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import CustomModal from "../CustomModal";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    currentLimit: number;
}

interface ApiResponse {
    status: string;
    data: Message[];
    pagination: Pagination;
}

// Utility function to highlight matching text
const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
        regex.test(part) ? (
            <span key={index} style={{ backgroundColor: "yellow" }}>
                {part}
            </span>
        ) : (
            part
        )
    );
};

export default function AdminDashboard({ data = { 
    status: "error", 
    data: [], 
    pagination: { 
        total: 0, 
        totalPages: 1, 
        currentPage: 1, 
        currentLimit: 10 
    } 
} }: { data: ApiResponse }) {
    const [currentPage, setCurrentPage] = useState(data.pagination.currentPage);
    const [tableData, setTableData] = useState(data.data);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteService, setDeleteService] = useState<boolean | null>(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserData = getFromLocalStorage("cybercraft-bangladesh");
        if (!storedUserData) {
            router.push("/login");
        }
    }, [router]);

    // Fetch data for pagination
    const fetchData = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${getBaseURL()}/api/v1/CyberCraft-Bangladesh-assignment/get-contact-information?page=${page}&limit=10`
            );
            const result: ApiResponse = await response.json();
            setTableData(result.data);
            setCurrentPage(page);
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    };

    // Filter data based on search query
    const filteredData = tableData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle row selection
    const handleRowSelect = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        try {
            await Promise.all(
                selectedRows.map((id) =>
                    fetch(`${getBaseURL()}/api/v1/CyberCraft-Bangladesh-assignment/delete-contact/${id}`, {
                        method: "DELETE",
                    })
                )
            );
            toastShowing("Deleted successfully!", "top-center", 2500, "black", "white");
            setTableData(tableData.filter((item) => !selectedRows.includes(item._id)));
            setSelectedRows([]);
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    // Handle bulk download
    const handleBulkDownload = () => {
        const doc = new jsPDF();
        selectedRows.forEach((id, index) => {
            const user = tableData.find((item) => item._id === id);
            if (user) {
                if (index > 0) doc.addPage();
                doc.text(`User Information: ${user.name}`, 10, 10);
                doc.text(`Name: ${user.name}`, 10, 20);
                doc.text(`Email: ${user.email}`, 10, 30);
                doc.text(`Message: ${user.message}`, 10, 40);
                doc.text(`Created At: ${new Date(user.createdAt).toLocaleString()}`, 10, 50);
            }
        });
        doc.save("selected_users_information.pdf");
        toastShowing(`Downloaded selected users' information as PDF`, "top-center", 2500, "black", "white");
    };

    // Define columns for the table
    const columns = [
        {
            key: "select",
            header: "",
            render: (row: Message) => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => handleRowSelect(row._id)}
                />
            ),
        },
        {
            key: "_id",
            header: "ID",
        },
        {
            key: "name",
            header: "Name",
            render: (row: Message) => highlightText(row.name, searchQuery),
        },
        {
            key: "email",
            header: "Email",
            render: (row: Message) => highlightText(row.email, searchQuery),
        },
        {
            key: "message",
            header: "Message",
            render: (row: Message) => highlightText(row.message, searchQuery),
        },
        {
            key: "createdAt",
            header: "Time",
            render: (row: Message) => new Date(row.createdAt).toLocaleString(), // Format date
        },
        {
            key: "actions",
            header: "Actions",
            render: (row: Message) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleDownloadUserPDF(row)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={() => handleView(row)}
                        className="p-1 text-green-500 hover:text-green-700"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    // Handle download individual user data as PDF
    const handleDownloadUserPDF = (user: Message) => {
        const doc = new jsPDF();
        doc.text(`User Information: ${user.name}`, 10, 10);
        doc.text(`Name: ${user.name}`, 10, 20);
        doc.text(`Email: ${user.email}`, 10, 30);
        doc.text(`Message: ${user.message}`, 10, 40);
        doc.text(`Created At: ${new Date(user.createdAt).toLocaleString()}`, 10, 50);
        doc.save(`${user.name}_information.pdf`);
        toastShowing(`Downloaded ${user.name}'s information as PDF`, "top-center", 2500, "black", "white");
    };

    // Handle view action
    const handleView = (row: Message) => {
        router.push(`/admin-dashboard/${row._id}`);
    };

    // Handle delete action
    const handleDelete = async (id: string) => {
        try {
            await fetch(`${getBaseURL()}/api/v1/CyberCraft-Bangladesh-assignment/delete-contact/${id}`, {
                method: "DELETE",
            });
            toastShowing("Deleted successfully!", "top-center", 2500, "black", "white");
            setTableData(tableData.filter((item) => item._id !== id));
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    // Pagination controls
    const renderPagination = () => {
        const totalPages = data.pagination.totalPages;
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
            <div className="flex justify-center items-center mt-4 space-x-2">
                <button
                    onClick={() => fetchData(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => fetchData(page)}
                        disabled={currentPage === page || isLoading}
                        className={`px-4 py-2 ${currentPage === page ? "bg-blue-700" : "bg-blue-500"
                            } text-white rounded disabled:bg-gray-300`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => fetchData(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("cybercraft-bangladesh");

        // Redirect to /dashboard/default
        router.push("/login");

        // Force a full page reload after redirecting
        setTimeout(() => {
            window.location.href = "/login";
        }, 200);
    };

    const JSX = <motion.div
        className="bg-white rounded-lg p-8 w-[90%] md:w-[60%] lg:w-[40%]"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold tracking-tight">
                Are you sure to log out?
            </h1>
        </div>
        <div className="">
            <div className="flex justify-center gap-x-6">
                <button onClick={() => setDeleteService(null)} className="font-medium text-white bg-black rounded-md w-32 hover:bg-white border hover:border-black gap-x-6rder-black hover:text-black py-1">No</button>

                <button onClick={handleLogout} className="font-medium text-white bg-red-600 rounded-md w-32 hover:bg-white border hover:border-red-600 hover:text-black py-1">Yes</button>
            </div>
        </div>
    </motion.div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="h-screen bg-white ">
                <Image
                    src={loginScreen}
                    alt="Login Background"
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    className="w-48 h-28"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 ">
                {/* Header */}
                <div className="flex justify-end items-center mb-6 bg-white p-4">
                    <div className="relative w-full max-w-lg mr-4">
                        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
                        <input
                            className="h-9 w-full rounded-md border bg-white pl-10 pr-4 text-sm shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search by name"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <IoMdNotifications className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
                        <div className="flex items-center space-x-2">
                            <div>
                                <h1 className="text-sm font-semibold">Shakil</h1>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                            <Image
                                src={'https://selfcare.dotinternetbd.com/resources/mx-theme/assets/images/user.png'}
                                alt="Admin Profile"
                                width={32}
                                height={32}
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center m-4">
                    <h1 className="text-3xl font-bold">Employee</h1>
                    <div className="flex gap-x-4">
                        <Image
                            src={btn1}
                            alt="Download Table"
                            width={32}
                            height={32}
                            className="w-12 h-12 hover:cursor-pointer"
                        />
                        <Image src={btn2} alt="Button 2" width={32} height={32} className="w-12 h-12" />
                        <Image src={btn3} alt="Button 3" width={32} height={32} className="w-12 h-12" />
                        <Image onClick={() => router.push("/sign-up")} src={btn4} alt="Button 4" width={32} height={32} className="w-12 h-12 hover:cursor-pointer" />
                        <span><IoLogOut onClick={() => setDeleteService(true)} className="w-12 h-12 hover:cursor-pointer"></IoLogOut></span>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedRows.length > 0 && (
                    <div className="flex justify-end gap-x-4 items-center m-4">
                        <button
                            onClick={handleBulkDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Delete Selected
                        </button>
                        <button
                            onClick={handleBulkDownload}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Download Selected
                        </button>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mx-4">
                    <div className="flex justify-end gap-x-4 items-center mb-4">
                        <div className="relative w-full max-w-lg mr-4">
                            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
                            <input
                                className="h-9 w-full rounded-md border bg-white pl-10 pr-4 text-sm shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search by name"
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Image
                            onClick={() => window.location.reload()}
                            src={btn5}
                            alt="Refresh"
                            width={32}
                            height={32}
                            className="w-12 h-12 hover:cursor-pointer"
                        />
                    </div>
                    <TheTable columns={columns} data={filteredData} />
                    {renderPagination()}
                </div>
            </div>

            <AnimatePresence>
                {deleteService && (
                    <CustomModal JSX={JSX}></CustomModal>
                )}
            </AnimatePresence>

            <ToastContainer />
        </div>
    );
}