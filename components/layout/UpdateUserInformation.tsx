"use client"

import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import imageUpload from "@/lib/imageUploads";
import Image from "next/image";
import axios from 'axios';
import { getBaseURL } from "@/lib/baseURL";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toastShowing } from "@/lib/toastShowing";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface UpdateUserInformationProps {
    setIsUserUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateUserInformation: React.FC<UpdateUserInformationProps> = ({ setIsUserUpdateModal }) => {
    const pathname = usePathname()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState({});
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        mobileNumber: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        image: ""
    });

    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await imageUpload(file);
            if (data?.url) {
                setFormData(prevState => ({
                    ...prevState, // Copy the existing state
                    image: data.url // Update the image field
                }));
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectFile(e);
        if (fileInputRef.current) {
            setTimeout(() => {
                fileInputRef.current!.value = "";
            }, 0);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem("admin-user");
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                setFormData({
                    id: parsedData.user?.id || "",
                    name: parsedData.user?.name || "",
                    email: parsedData.user?.email || "",
                    mobileNumber: parsedData.user?.mobileNumber || "",
                    dateOfBirth: parsedData.user?.dateOfBirth || "",
                    gender: parsedData.user?.gender || "",
                    password: parsedData.user?.password || "",
                    image: parsedData.user?.image || ""
                });
                setDoctor(parsedData.doctorInfo);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFormSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.put(
                `${getBaseURL()}/authentication/authority-update-account/${formData.id}`,
                formData
            );
            if (response?.data?.message === "User updated successfully") {
                localStorage.setItem("admin-user", JSON.stringify({ user: response.data.user, doctorInfo: doctor }));
                toastShowing(
                    "User updated successfully",
                    "bottom-right",
                    2500,
                    "#000",
                    "white"
                );
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.log(error)
            toastShowing("Something went wrong!", "bottom-right", 2500, "red", "white");
        } finally {
            setLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <motion.div
                className={`bg-white rounded-lg p-8 ${pathname === '/dashboard/pages/settings/account-settings' ? '' : 'w-[90%] md:w-[60%] lg:w-[40%]'}`}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex justify-center items-center mb-4">
                    <h1 className="text-2xl font-bold tracking-tight">My Account Information</h1>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                type="text"
                                className="w-full"
                                id="doctor-name"
                                placeholder="Type doctor's name"
                                value={formData.name}
                                onChange={handleChange}
                                name="name" // Add this line
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="text"
                                className="w-full"
                                id="doctor-email"
                                placeholder="Type doctor's email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email" // Add this line
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <Input
                                type="text"
                                className="w-full"
                                id="doctor-mobile"
                                placeholder="Type doctor's mobile number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                name="mobileNumber" // Add this line
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <Input
                                type="date"
                                className="w-full"
                                id="doctor-dob"
                                placeholder="Type doctor's date of birth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                name="dateOfBirth" // Add this line
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Update password</label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="w-full"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {formData?.image && (
                            <div className="bg-white rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Profile Picture Preview</h2>
                                <div className="relative h-32 w-32">
                                    <Image
                                        src={formData?.image || ''}
                                        alt="Profile picture"
                                        className="h-32 w-32 rounded-md object-cover"
                                        width={300}
                                        height={200}
                                    />
                                </div>
                            </div>
                        )}
                        <Input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleFileSelect(e)
                                }
                            }}
                            type="file"
                            className="w-full"
                            id="profile-picture"
                            placeholder="Upload Profile Picture"
                            ref={fileInputRef}
                            name="image" // Add this line
                        />
                    </div>
                    <div className="flex justify-end gap-x-6 mt-6">
                        {
                            pathname === '/dashboard/pages/settings/account-settings' ? '' :  <button onClick={() => setIsUserUpdateModal(false)}
                            type="button"
                            className="font-medium text-white bg-red-600 hover:bg-red-400 rounded-md w-32 border hover:border-red-600 hover:text-white py-1.5"
                        >
                            Cancel
                        </button>
                        }
                       

                        <Button disabled={loading}
                            className="flex items-center gap-x-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-500 transition">
                            <FiUploadCloud size={20} /> {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </motion.div>
            <ToastContainer></ToastContainer>
        </>
    )
}