import IndividualContactInformation from "@/components/custom-component/Authentication/IndividualContactPage";
import { getDataFromServer } from "@/lib/baseURL";
import { generateMeta } from "@/lib/utils";
import Image from "next/image";
import btn from '../../../assets/Frame 6024.png';
import CustomButton from "@/components/ReusableComopnents/Button";
import Link from "next/link";

export async function generateMetadata() {
    return generateMeta({
        title: "Logout - CyberCraft Bangladesh",
        description:
            "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
        canonical: "/login"
    });
}

export default async function Home() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-xl rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                    src={btn}
                    alt="Login Background"
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    className="w-64 h-36 block mx-auto"
                />

                <div className="px-6 py-4">
                    <p className="text-gray-900 text-xl px-4 text-center">
                        Thank you so much for your nice contribution for today.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-6">
                    <Link href={'/login'}>
                    <CustomButton className="bg-[#345485] rounded-lg w-full">Go back to Login</CustomButton>
                    </Link>
                  
                </div>
            </div>
        </div>
    );
}