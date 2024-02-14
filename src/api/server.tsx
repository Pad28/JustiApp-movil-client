import axios from "axios";
import { envs } from "../config/envs";

export const JustiAppApi = axios.create({
    baseURL: `${envs.EXPO_PUBLIC_API_URL}`
});