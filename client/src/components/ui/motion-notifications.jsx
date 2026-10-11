"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, CircleX, TriangleAlert, X } from "lucide-react";
import { setNotificationHandler } from "./notify.js";

const notificationStyles = {
  success: { Icon: CircleCheck, color: "text-green-700", border: "border-green-200" },
  error: { Icon: CircleX, color: "text-red", border: "border-red/20" },
  warning: { Icon: TriangleAlert, color: "text-yellow-900", border: "border-yellow-100" },
};

export default function MotionNotifications() {
  const [items, setItems] = useState([]);
  const dismiss = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  useEffect(
    () =>
      setNotificationHandler((type, text) => {
        const id = `${Date.now()}-${Math.random()}`;
        setItems((current) => [...current, { id, type, text }]);
        window.setTimeout(() => dismiss(id), 5000);
      }),
    [dismiss],
  );

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[120] flex w-[min(92vw,24rem)] flex-col gap-3"
      aria-live="polite"
      aria-relevant="additions"
    >
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const { Icon, color, border } = notificationStyles[item.type];
          return (
            <motion.div
              key={item.id}
              role={item.type === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${border} bg-white p-4 shadow-lg`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} aria-hidden="true" />
              <p className="flex-1 text-sm leading-6 text-grey900">{String(item.text)}</p>
              <button
                type="button"
                aria-label="ปิดการแจ้งเตือน"
                onClick={() => dismiss(item.id)}
                className="rounded p-1 text-grey600 hover:bg-grey100"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
