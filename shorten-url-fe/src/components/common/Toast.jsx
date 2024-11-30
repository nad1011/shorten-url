import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "fixed bottom-4 right-4 z-10 pointer-events-auto items-center justify-between overflow-hidden rounded-md border shadow-lg transition-all animate-in fade-in slide-in-from-top-5 duration-300",
  {
    variants: {
      type: {
        default: "bg-background text-foreground",
        success: "bg-green-50 text-green-900 border-green-200",
        error: "bg-red-50 text-red-900 border-red-200",
        warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
);

const iconMap = {
  default: "Info",
  success: "CheckCircle",
  error: "XCircle",
  warning: "AlertTriangle",
};

const Toast = ({ message, type = "default" }) => {
  return (
    <div
      className={cn(
        toastVariants({ type }),
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      )}
    >
      <div className="flex items-center gap-2 p-4">
        <Icon name={iconMap[type]} className="h-5 w-5" />
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "success", "error", "warning"]),
};

export default Toast;
