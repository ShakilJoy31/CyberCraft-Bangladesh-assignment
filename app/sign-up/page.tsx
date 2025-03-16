import SignUp from "@/components/custom-component/Authentication/SignUp";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
    return generateMeta({
        title: "Signup Page - CyberCraft Bangladesh",
        description:
            "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
        canonical: "/login"
    });
}

export default function Home() {
    return (
      <SignUp></SignUp>
    );
}

