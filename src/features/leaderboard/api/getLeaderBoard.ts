import { axios } from "@/lib/axios";
import { ILBScore } from "../types";

const getLeaderBoard = async (language: string): Promise<ILBScore[]> => {
    return await axios.get("/scores/leaderboard", {
        params: {
            language,
        },
    });
};

export default getLeaderBoard;
