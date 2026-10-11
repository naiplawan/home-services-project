"use client";

import { MotionConfig } from "framer-motion";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/authentication.jsx";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import MotionNotifications from "./components/ui/motion-notifications.jsx";

export default function NextRuntime() {
  useEffect(() => {
    jwtInterceptor();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ConfigProvider wave={{ disabled: true }}>
        <AuthProvider>
          <App />
          <MotionNotifications />
        </AuthProvider>
      </ConfigProvider>
    </MotionConfig>
  );
}
