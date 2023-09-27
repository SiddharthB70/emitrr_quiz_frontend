import { axios } from "@/lib/axios";
import { User } from "@/types";

interface UserCredentials {
    username: string;
    password: string;
}

const register = async (user: UserCredentials): Promise<User> => {
    return await axios.post("users/register", user);
};

export default register;
