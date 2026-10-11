"use client";

import { useRef, useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button.jsx";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog.jsx";
import image from "../assets/AdminPhoto/imageIndex.js";

function AlertBoxDelete(props) {
  const [open, setOpen] = useState(true);
  const confirming = useRef(false);

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen && !confirming.current) props.hideFunction?.();
  };

  const handleDelete = () => {
    confirming.current = true;
    props.deleteFunction?.();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogPortal>
        <AlertDialogOverlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        </AlertDialogOverlay>
        <AlertDialogPrimitive.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[100] w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl sm:p-10"
          >
            <div className="flex flex-col items-center gap-5 text-center">
              <img alt="" aria-hidden="true" className="h-7 w-7" src={image.exclamation} />
              <AlertDialogTitle>{props.textAlert}</AlertDialogTitle>
              <AlertDialogDescription>{props.alertQuestion}</AlertDialogDescription>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <AlertDialogPrimitive.Action asChild>
                  <Button variant="destructive" onClick={handleDelete}>
                    {props.primary}
                  </Button>
                </AlertDialogPrimitive.Action>
                <AlertDialogCancel asChild>
                  <Button variant="outline">
                    {props.secondary}
                  </Button>
                </AlertDialogCancel>
              </div>
            </div>
          </motion.div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPortal>
    </AlertDialog>
  );
}

AlertBoxDelete.propTypes = {
  textAlert: PropTypes.string,
  alertQuestion: PropTypes.string,
  deleteFunction: PropTypes.func,
  primary: PropTypes.string,
  hideFunction: PropTypes.func,
  secondary: PropTypes.string,
};

export default AlertBoxDelete;
