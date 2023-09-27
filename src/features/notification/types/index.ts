export type NotificationType = "error" | "warning" | "info" | "success";
interface INotification {
    message: string;
    type: NotificationType;
}

export type TNotification = INotification | null;
