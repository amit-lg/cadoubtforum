import { getAccessToken } from "./cookies";

export const getHeaders = () => {
    const token = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }
    return headers;
}

export const getHeadersWithFormData = () => {
    const token = getAccessToken();
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
    }
    return headers;
}