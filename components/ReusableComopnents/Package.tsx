"use client";

import { FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";
import { FaPlug, FaUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import CustomButton from "@/components/ReusableComopnents/Button";
import { TbWorldWww, TbCopy } from "react-icons/tb"; // Import TbCopy for the copy icon
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/lib/theFunctions";
import { UserData } from "@/lib/interface/user-interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastShowing } from "@/lib/toastShowing";

export default function CurrentPackage() {
    const [userReferId, setUserReferId] = useState<string | undefined>("");

    useEffect(() => {
        const storedUserData = getFromLocalStorage<UserData>("ringtel-user");
        setUserReferId(storedUserData?.data.userId);
    }, []);

    // Function to copy userReferId to clipboard
    const copyReferId = () => {
        if (userReferId) {
            navigator.clipboard.writeText(userReferId)
                .then(() => {
                    toastShowing(
                        'Refer ID copied to clipboard!',
                        "top-center",
                        2500,
                        "white",
                        "black"
                    );
                })
                .catch(() => {
                    toastShowing('OPPS! Failed to copy Refer ID.', "top-center", 2500, "red", "white");
                });
        }
    };

    const accountInfo = [
        {
            icon: <FaUser />,
            title: 'Account Status',
            value: 'Expired',
        },
        {
            icon: <FaPlug />,
            title: 'Connection Status',
            value: 'ONLINE',
        },
        {
            icon: <FaCalendarAlt />,
            title: 'Expiry Date',
            value: 'Mar 1, 2025',
        },
        {
            icon: <FaMoneyBillAlt />,
            title: 'Plan rate',
            value: '1050.0',
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between bg-[#363e61] w-full p-6 rounded-lg shadow-lg text-white">
                <div>
                    <h1 className="text-lg font-semibold">Current Package</h1>
                    <h1 className="text-xl font-bold">Gold+ (60Mbps) <span className="text-yellow-400">1050tk</span></h1>
                </div>
                <div className="flex gap-4">
                    {/* Website Button */}
                    <CustomButton className="bg-blue-600 hover:bg-blue-700 w-16">
                        <span className="flex justify-center">
                            <TbWorldWww size={25} />
                        </span>
                    </CustomButton>

                    {/* Copy ReferId Button with Tooltip */}
                    <div className="relative group">
                        <CustomButton
                            className="bg-blue-600 hover:bg-blue-700 w-16"
                            onClick={copyReferId}
                        >
                            <span className="flex justify-center">
                                <TbCopy size={25} /> {/* Replace text with copy icon */}
                            </span>
                        </CustomButton>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-32">
                            Copy Refer ID
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                {accountInfo.map((info, index) => (
                    <div key={index} className="flex items-center p-4 bg-[#363e61] rounded-lg shadow-md">
                        <div className="text-2xl mr-4">{info.icon}</div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">{info.title}</h3>
                            <p className="text-lg font-bold">{info.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}