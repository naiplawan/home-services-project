import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";

export default function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

Skeleton.propTypes = { className: PropTypes.string };
