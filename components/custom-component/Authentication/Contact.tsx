"use client";

import Image from "next/image";
import loginScreen from '../../../assets/Contact Us.jpg'; // Import the background image
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { toastShowing } from "@/lib/toastShowing";
import CustomButton from "@/components/ReusableComopnents/Button";
import axios from "axios";
import { getBaseURL } from "@/lib/baseURL";

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        if (!name || !email || !message) {
            toastShowing("All fields are required!", "top-center", 2500, "red", "white");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${getBaseURL()}/api/v1/CyberCraft-Bangladesh-assignment/add-contact-information`, {
                name,
                email,
                message,
            });

            if (response.status === 200 || response.status === 201) {
                toastShowing("Message sent successfully!", "top-center", 2500, "black", "white");
                // setName("");
                // setEmail("");
                // setMessage("");
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
        <div className="flex min-h-screen">


            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src={loginScreen} // Use the imported image
                    alt="Login Background"
                    layout="fill" // Make the image cover the entire container
                    objectFit="cover" // Ensure the image covers the entire area
                    quality={100} // Set image quality
                    className="z-0" // Ensure the image stays behind other content
                />
            </div>

            {/* Form Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-start ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg mx-auto md:absolute md:left-[195px] md:top-[365px] "
                >

                    {/* Name Input */}
                    <div className="mb-[51px]">

                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[490px] h-[57px] focus:outline-none pl-2 rounded-lg mt-1"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-[48px]">

                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[490px] h-[57px] rounded-lg pl-2 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Message Textarea */}
                    <div className="mb-[22px]">

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-[490px] h-[134px] rounded-lg pl-2 pt-2 focus:outline-none"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <CustomButton
                        type="submit"
                        className="w-[490px] bg-[#345485] text-white h-[55px] p-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </CustomButton>

                    <h1 onClick={()=> router.push("/sign-up")} className="font-bold hover:underline mt-4 hover:cursor-pointer">Sign up</h1>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}

