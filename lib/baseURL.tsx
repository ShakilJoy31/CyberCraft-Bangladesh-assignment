// const productionURL = 'http://localhost:5000';
const productionURL = 'https://cybercraft-bangladesh-assignment-server-1.onrender.com'
export const getBaseURL = () => {
    return productionURL;
}

export async function getDataFromServer(getUrl: string) {
    try {
        const res = await fetch(getBaseURL() + getUrl, { cache: 'no-store' });
        const data = await res?.json();
        return data;
    } catch (error) {
        return [];
    }
}