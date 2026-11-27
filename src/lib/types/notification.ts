export type NotificationType = "info" | "success" | "error" | "warning";

export interface NotificationOptions {
  /** Optional heading. When omitted, the host shows the status label ("Error", "Success"...). */
  title?: string;
  /** Milliseconds before auto-dismiss. `0` keeps it until dismissed. */
  duration?: number;
  /** Whether the user can close it manually. Ignored (forced true) when `duration` is 0. */
  dismissible?: boolean;
}

export interface AppNotification {
  readonly id: string;
  readonly type: NotificationType;
  readonly message: string;
  readonly title?: string;
  readonly duration: number;
  readonly dismissible: boolean;
  readonly createdAt: number;
}
