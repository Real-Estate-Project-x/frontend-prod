import { browser } from "$app/environment";
import type {
  AppNotification,
  NotificationOptions,
  NotificationType,
} from "$lib/types/notification";

/** Default auto-dismiss time (ms) per status. Edit here to change them app-wide. */
export const DEFAULT_DURATIONS: Record<NotificationType, number> = {
  info: 5000,
  success: 5000,
  warning: 6000,
  error: 8000,
};

/** Most notifications shown at once; the oldest is moved to history when exceeded. */
const MAX_ACTIVE = 5;
/** Most recently closed notifications kept in memory (never persisted to storage). */
const MAX_HISTORY = 20;

let active = $state.raw<AppNotification[]>([]);
let history = $state.raw<AppNotification[]>([]);
let counter = 0;

const isValidDuration = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

function archive(items: readonly AppNotification[]) {
  // items arrive oldest -> newest; history is newest first
  history = [...items].reverse().concat(history).slice(0, MAX_HISTORY);
}

function notify(
  type: NotificationType,
  message: string,
  options: NotificationOptions = {},
): string {
  // Module state is shared across requests on the server, so never touch it there.
  if (!browser) return "";

  const text = message.trim();
  if (!text) return "";

  const duration = isValidDuration(options.duration)
    ? options.duration
    : DEFAULT_DURATIONS[type];

  const notification: AppNotification = {
    id: `n${++counter}-${Date.now().toString(36)}`,
    type,
    message: text,
    title: options.title?.trim() || undefined,
    duration,
    // a persistent notification must always be closable
    dismissible: duration === 0 ? true : (options.dismissible ?? true),
    createdAt: Date.now(),
  };

  const next = [...active, notification];
  const overflow = next.length - MAX_ACTIVE;
  if (overflow > 0) {
    archive(next.slice(0, overflow));
    active = next.slice(overflow);
  } else {
    active = next;
  }
  return notification.id;
}

/** Idempotent: dismissing an unknown or already-closed id does nothing. */
function dismiss(id: string) {
  const target = active.find((n) => n.id === id);
  if (!target) return;
  active = active.filter((n) => n.id !== id);
  archive([target]);
}

function dismissAll() {
  if (active.length === 0) return;
  archive(active);
  active = [];
}

export const notifications = {
  /** Notifications currently on screen, oldest first. */
  get active(): readonly AppNotification[] {
    return active;
  },
  /** Recently closed notifications, newest first (in memory only). */
  get history(): readonly AppNotification[] {
    return history;
  },
  notify,
  info: (message: string, options?: NotificationOptions) =>
    notify("info", message, options),
  success: (message: string, options?: NotificationOptions) =>
    notify("success", message, options),
  error: (message: string, options?: NotificationOptions) =>
    notify("error", message, options),
  warning: (message: string, options?: NotificationOptions) =>
    notify("warning", message, options),
  dismiss,
  dismissAll,
};
