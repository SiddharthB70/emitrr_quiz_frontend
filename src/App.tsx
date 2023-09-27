import { Container } from "@mui/material";
import LoginForm from "./features/auth/components/LoginForm";
import { User } from "./types";
import { useState } from "react";

function App() {
    const [user, setUser] = useState<User>();

    const addUser = (newUser: User) => {
        setUser(newUser);
    };

    return (
        <>
            <Container>
                {!user && <LoginForm addUser={addUser} />}
                {user && <>Check</>}
            </Container>
        </>
    );
}

export default App;
