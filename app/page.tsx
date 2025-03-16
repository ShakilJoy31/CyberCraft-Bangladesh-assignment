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



// const handleLoginButton = async () => {
//     setLoading(true);
//     const formData = { userId: email, password: password };

//     try {
//         const response = await axios.post(
//             `${getBaseURL()}/authentication/login`,
//             formData
//         );

//         if (response?.status === 201 || response.status === 200) {
//             localStorage.setItem("ringtel-user", JSON.stringify(response.data));
//             toastShowing(
//                 response?.data?.message,
//                 "top-center",
//                 2500,
//                 "white",
//                 "black"
//             );
//             setTimeout(() => {
//                 router.push("/customer/dashboard");
//             }, 1500);
//         }
//     } catch (error) {
//         // Check if the error is an AxiosError (for API errors)
//         if (axios.isAxiosError(error)) {
//             toastShowing(error.response?.data?.message, "top-center", 2500, "red", "white");
//         } else if (error instanceof Error) {
//             // Handle generic errors
//             toastShowing(error.message, "top-center", 2500, "red", "white");
//         } else {
//             toastShowing("An unknown error occurred", "top-center", 2500, "red", "white");
//         }
//     } finally {
//         setLoading(false);
//     }
// };

