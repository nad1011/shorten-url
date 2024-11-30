import { useContext, createContext } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return {
      isOpen: false,
      openLoginModal: () => {},
      openRegisterModal: () => {},
      closeModal: () => {},
      toggleAuthMode: () => {},
    };
  }

  return context;
};

export default useAuth;
