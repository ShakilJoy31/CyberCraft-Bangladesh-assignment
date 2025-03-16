import IndividualContactInformation from "@/components/custom-component/Authentication/IndividualContactPage";
import { getDataFromServer } from "@/lib/baseURL";
import { generateMeta } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateMetadata() {
    return generateMeta({
        title: "Admin Dashboard - CyberCraft Bangladesh",
        description:
            "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.",
        canonical: "/login"
    });
}

export default async function Home({ params }: { params: { id: string } }) {
    const { id } = params; // Extract the id from the URL

    // Fetch individual contact data
    const contactData = await getDataFromServer(
        `/api/v1/CyberCraft-Bangladesh-assignment/get-individual-contact/${id}`
    );

    if (!contactData || contactData.status !== "success") {
        return notFound(); // Show a 404 page if the contact is not found
    }

    return (
        <div>
            <IndividualContactInformation contact={contactData.data} />
        </div>
    );
}