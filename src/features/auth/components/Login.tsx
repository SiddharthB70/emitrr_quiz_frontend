import { Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Typography
                variant="h2"
                gutterBottom
                component="h1"
            >
                Login
            </Typography>
            <form>
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

export default Login;
