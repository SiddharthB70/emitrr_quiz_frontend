import { Button, Link, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { NotificationType } from "@/features/notification/types";
import register from "../api/register";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const RegisterForm = ({
    addNotification,
}: {
    addNotification: (message: string, type: NotificationType) => void;
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
        };

        try {
            const registeredUser = await register(newUser);
            addNotification(
                `Registered user ${registeredUser.username}`,
                "success",
            );
            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError && error.response)
                addNotification(error.response.data, "error");
        }
    };

    return (
        <>
            <Typography
                variant="h3"
                gutterBottom
                component="h1"
            >
                Register
            </Typography>
            <form onSubmit={registerUser}>
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
                    margin="normal"
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
                    margin="normal"
                    required
                ></TextField>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Register
                    <LoginIcon />
                </Button>
                <Link
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    sx={{
                        marginLeft: "20px",
                    }}
                >
                    <Typography sx={{ display: "inline" }}>Login</Typography>
                </Link>
            </form>
        </>
    );
};

export default RegisterForm;
