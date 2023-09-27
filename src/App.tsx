import { Container } from "@mui/material";
import LoginForm from "./features/auth/components/LoginForm";
import { User } from "./types";
import { useState } from "react";
import { NotificationType, TNotification } from "./features/notification/types";
import Notification from "./features/notification/components/Notification";

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
        <>
            <Notification notification={notification} />
            <Container>
                {!user && (
                    <LoginForm
                        addUser={addUser}
                        addNotification={addNotification}
                    />
                )}
                {user && <>Check</>}
            </Container>
        </>
    );
}

export default App;
