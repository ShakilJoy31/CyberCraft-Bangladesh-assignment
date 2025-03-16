import { getBaseURL } from "../baseURL";

export async function postSettingsHeaderData(payload: { 
    favicon: string; 
    headerLogo: string; 
    siteTitle: string; 
    siteURL: string; 
  }) {
    try {
      const response = await fetch(`${getBaseURL()}/settings/header`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error("Failed to save settings header data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to save settings header data:", error);
      return error;
    }
  }
  