"use client";

import Image from "next/image";
import loginScreen from '../../../assets/login.png'; // Import the background image
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { toastShowing } from "@/lib/toastShowing";
import CustomButton from "@/components/ReusableComopnents/Button";
import axios from "axios";
import { getBaseURL } from "@/lib/baseURL";
import { Eye, EyeOff } from "lucide-react"; // For show/hide password icons

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Check if all fields are filled
        if (!email || !password) {
            toastShowing("All fields are required!", "top-center", 2500, "red", "white");
            return;
        }

        setLoading(true); // Start loading

        try {
            // Prepare the payload
            const payload = {
                email,
                password,
            };

            // Send the data to the backend
            const response = await axios.post(`${getBaseURL()}/api/v1/CyberCraft-Bangladesh-assignment/login`, payload);
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("cybercraft-bangladesh", JSON.stringify(response.data));
                toastShowing("Login successful!", "top-center", 2500, "black", "white");
                setTimeout(() => {
                    router.push("/admin-dashboard");
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toastShowing(error.response?.data?.message, "top-center", 2500, "red", "white");
            } else {
                toastShowing("An error occurred. Please try again.", "top-center", 2500, "red", "white");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            {/* Background Image */}
            <div className="fixed inset-0 z-0 flex items-center justify-center">
                <Image
                    src={loginScreen} // Use the imported image
                    alt="Login Background"
                    layout="" // Make the image cover the entire container
                    objectFit="cover" // Ensure the image covers the entire area
                    quality={100} // Set image quality
                    className="z-0" // Ensure the image stays behind other content
                />
            </div>

            {/* Form Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-start ">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto md:absolute md:right-[480px] md:top-[245px] ">
                  
                    {/* Email Input */}
                    <div className="mt-[46px]">
                       
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[352px] h-[53px] focus:outline-none pl-2 rounded-lg mt-1 "
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mt-[46px] w-[352px] ">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[352px] h-[53px] focus:outline-none pl-2 rounded-lg mt-1 "
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <CustomButton
                        type="submit"
                        className="w-full mt-[55px] bg-[#345485] text-white h-[55px] p-2 rounded-lg md:w-[352px]"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </CustomButton>
                    <h1 onClick={()=> router.push("/sign-up")} className="font-bold hover:underline hover:cursor-pointer mt-[65px] absolute right-[170px]">Signup</h1>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}