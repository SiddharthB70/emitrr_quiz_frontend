import { Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React, { useState } from "react";
import login from "../api/login";
import { AxiosError } from "axios";
import { User } from "@/types";
import { NotificationType } from "@/features/notification/types";

const LoginForm = ({
    addUser,
    addNotification,
}: {
    addUser: (newUser: User) => void;
    addNotification: (message: string, type: NotificationType) => void;
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
        };

        try {
            const loggedUser = await login(newUser);
            addUser(loggedUser);
            addNotification(
                `Logged in with user ${loggedUser.username}`,
                "success",
            );
        } catch (error) {
            if (error instanceof AxiosError && error.response)
                addNotification(error.response.data, "error");
        }
    };

    return (
        <>
            <Typography
                variant="h2"
                gutterBottom
                component="h1"
            >
                Login
            </Typography>
            <form onSubmit={loginUser}>
                <TextField
                    label="username"
                    variant="outlined"
                    size="small"
                    sx={{
                        display: "block",
                    }}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    required
                ></TextField>
                <TextField
                    label="password"
                    variant="outlined"
                    size="small"
                    sx={{
                        display: "block",
                    }}
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                ></TextField>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Login
                    <LoginIcon />
                </Button>
                <Button
                    color="secondary"
                    variant="outlined"
                >
                    Register
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
