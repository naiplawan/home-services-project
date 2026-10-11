"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Skeleton from "./skeleton.jsx";

export default function LoadingState({ label = "กำลังโหลด" }) {
  return (
    <motion.div
      role="status"
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex min-h-[12rem] w-full max-w-5xl flex-col justify-center gap-4 px-6 py-8"
    >
      <span className="sr-only">{label}</span>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </motion.div>
  );
}

LoadingState.propTypes = { label: PropTypes.string };
