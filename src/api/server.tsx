import axios from "axios";
import { envs } from "../config/envs";

export const JustiAppApi = axios.create({
    baseURL: `${envs.EXPO_PUBLIC_API_URL}`
    // baseURL: 'http://tux-server.ddns.net:8085',
});