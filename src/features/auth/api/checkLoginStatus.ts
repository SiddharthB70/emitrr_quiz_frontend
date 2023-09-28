import { axios } from "@/lib/axios";
import { User } from "@/types";

const checkLoginStatus = async (): Promise<User> => {
    return await axios.get("/users/loggedIn");
};

export default checkLoginStatus;
