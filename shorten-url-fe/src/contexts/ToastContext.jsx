import PropTypes from "prop-types";
import { useState } from "react";

import Toast from "@/components/common/Toast";
import { ToastContext } from "@/hooks/useToast";

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "default") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  );
};
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
