import { dAuth } from "../../config";
import { getAccessToken } from "./cookies";

export const getHeaders = () => {
    const token = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        'D-Auth': dAuth,
        'Authorization': 'Bearer ' + token,
    }
    return headers;
}