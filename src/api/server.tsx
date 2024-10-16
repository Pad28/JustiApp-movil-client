import axios from "axios";
import { envs } from "../config/envs";

export const JustiAppApi = axios.create({
    baseURL: envs.API_URL,
});