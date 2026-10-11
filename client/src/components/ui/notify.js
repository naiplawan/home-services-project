let notificationHandler = null;

export const notify = {
  success: (text) => notificationHandler?.("success", text),
  error: (text) => notificationHandler?.("error", text),
  warning: (text) => notificationHandler?.("warning", text),
};

export function setNotificationHandler(handler) {
  notificationHandler = handler;
  return () => {
    if (notificationHandler === handler) notificationHandler = null;
  };
}
