import { Container } from "@mui/material";
import LoginForm from "./features/auth/components/LoginForm";
import { User } from "./types";
import { useState } from "react";
import { NotificationType, TNotification } from "./features/notification/types";
import Notification from "./features/notification/components/Notification";
import RegisterForm from "./features/auth/components/RegisterForm";
import { Routes, Route } from "react-router-dom";

function App() {
    const [user, setUser] = useState<User>();
    const [notification, setNotification] = useState<TNotification>(null);

    const addUser = (newUser: User) => {
        setUser(newUser);
    };

    const addNotification = (message: string, type: NotificationType) => {
        setNotification({
            message,
            type,
        });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <Container>
            <Notification notification={notification} />
            <Routes>
                <Route
                    path="/"
                    element={
                        !user ? (
                            <LoginForm
                                addUser={addUser}
                                addNotification={addNotification}
                            />
                        ) : (
                            <>Check</>
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !user ? (
                            <RegisterForm addNotification={addNotification} />
                        ) : (
                            <>Register Check</>
                        )
                    }
                />
            </Routes>
        </Container>
    );
}

export default App;
