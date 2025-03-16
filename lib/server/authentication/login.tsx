import { getBaseURL } from "../../baseURL";


export async function adminLogin(payload: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${getBaseURL()}/authentication/authority-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to Login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to Login: ", error);
    return null;
  }
}




export async function adminSignup(payload: {
  name: string;
  email: string;
  image: string;
  doctorId?: string; // Optional, only required for doctors and doctor assistants
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  role: string;
}) {
  try {
    const response = await fetch(`${getBaseURL()}/authentication/authority-signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to sign up: ", error);
    return null;
  }
}
