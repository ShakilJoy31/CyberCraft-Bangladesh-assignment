

import { getBaseURL } from './baseURL';
import axios from 'axios';

export const axios_req = axios.create({
    baseURL: getBaseURL(),
});

export default async function imageUpload(file: any, setLoading?: any) {
    if (!file) return;
    if (setLoading) {
        setLoading(true);
    }

    const formData = new FormData();

    formData.append('file', file);

    try {
        const { data } = await axios_req.post('upload/single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
}
