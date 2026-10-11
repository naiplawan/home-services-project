import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils.js";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;
const AlertDialogAction = AlertDialogPrimitive.Action;

const AlertDialogOverlay = ({ className, ...props }) => (
  <AlertDialogPrimitive.Overlay
    className={cn("fixed inset-0 z-[99] bg-black/45 backdrop-blur-[2px]", className)}
    {...props}
  />
);

const AlertDialogContent = ({ className, ...props }) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn("fixed left-1/2 top-1/2 z-[100] w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2", className)}
      {...props}
    />
  </AlertDialogPortal>
);

const AlertDialogTitle = ({ className, ...props }) => (
  <AlertDialogPrimitive.Title className={cn("text-xl font-semibold text-grey950", className)} {...props} />
);

const AlertDialogDescription = ({ className, ...props }) => (
  <AlertDialogPrimitive.Description className={cn("text-sm leading-6 text-grey700", className)} {...props} />
);

AlertDialogOverlay.propTypes = { className: PropTypes.string };
AlertDialogContent.propTypes = { className: PropTypes.string };
AlertDialogTitle.propTypes = { className: PropTypes.string };
AlertDialogDescription.propTypes = { className: PropTypes.string };

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
