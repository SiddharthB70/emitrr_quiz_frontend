import { axios } from "@/lib/axios";
import { IQuestion } from "../types";

const getQuestions = async (
    language: string,
    difficulty: number,
): Promise<IQuestion[]> => {
    return await axios.get("/questions", {
        params: {
            language,
            difficulty,
            limit: 5,
        },
    });
};

export default getQuestions;
