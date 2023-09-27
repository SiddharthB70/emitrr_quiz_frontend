import { axios } from "@/lib/axios";
import { User } from "@/types";

interface UserCredentials {
    username: string;
    password: string;
}

const login = async (user: UserCredentials): Promise<User> => {
    return await axios.post("users/login", user);
};

export default login;
