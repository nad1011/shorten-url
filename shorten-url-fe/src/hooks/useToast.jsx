import { createContext, useContext } from "react";

export const ToastContext = createContext({
  showToast: () => {},
});

const useToast = () => useContext(ToastContext);

export default useToast;
