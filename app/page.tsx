import Contact from "@/components/custom-component/Authentication/Contact";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
    return generateMeta({
        title: "Contact Page - CyberCraft Bangladesh",
        description:
            "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
        canonical: "/login"
    });
}

export default function Home() {
    return (
      <Contact></Contact>
    );
}