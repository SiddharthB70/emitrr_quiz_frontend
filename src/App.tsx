import { Container } from "@mui/material";
import LoginForm from "./features/auth/components/LoginForm";
import { User } from "./types";
import { useEffect, useState } from "react";
import { NotificationType, TNotification } from "./features/notification/types";
import Notification from "./features/notification/components/Notification";
import RegisterForm from "./features/auth/components/RegisterForm";
import { Routes, Route } from "react-router-dom";
import BasePage from "./features/basePage/components/BasePage";
import checkLoginStatus from "./features/auth/api/checkLoginStatus";

function App() {
    const [user, setUser] = useState<User | undefined>();

    const [notification, setNotification] = useState<TNotification>(null);

    const addUser = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
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

    useEffect(() => {
        checkLoginStatus()
            .then((loggedInUser) => {
                setUser(loggedInUser);
            })
            .catch(() => {
                return;
            });
    }, []);

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
                            <BasePage
                                user={user}
                                addNotification={addNotification}
                            />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !user ? (
                            <RegisterForm addNotification={addNotification} />
                        ) : (
                            <BasePage
                                user={user}
                                addNotification={addNotification}
                            />
                        )
                    }
                />
            </Routes>
        </Container>
    );
}

export default App;
