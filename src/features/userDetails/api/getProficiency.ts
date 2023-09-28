import { axios } from "@/lib/axios";
import { Proficiency } from "../types";

const getUserProficiency = async (): Promise<Proficiency[]> => {
    return await axios.get("/scores/user");
};

export default getUserProficiency;
