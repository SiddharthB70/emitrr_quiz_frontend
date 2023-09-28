import { axios } from "@/lib/axios";
import { ILanguage } from "../types";

const getLanguages = async (): Promise<ILanguage[]> => {
    return await axios.get("/languages");
};

export default getLanguages;
