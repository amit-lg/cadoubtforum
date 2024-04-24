import axios from "axios";
import { backendUrl } from "../../config";

export const instance = axios.create({
    baseURL: backendUrl,
});



