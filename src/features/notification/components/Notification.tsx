import { Alert } from "@mui/material";
import { TNotification } from "../types";

const Notification = ({ notification }: { notification: TNotification }) => {
    return (
        <>
            {notification ? (
                <Alert severity={`${notification.type}`}>
                    {notification.message}
                </Alert>
            ) : null}
        </>
    );
};

export default Notification;
