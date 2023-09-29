import { axios } from "@/lib/axios";

const postScore = async (
    score: number,
    language: string,
    proficiency: number,
): Promise<void> => {
    return await axios.post("/scores/user", {
        language,
        score,
        proficiency,
    });
};

export default postScore;
