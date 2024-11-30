import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { AuthContext } from "@/hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  const openLoginModal = () => {
    if (!user) {
      setIsLogin(true);
      setIsOpen(true);
    }
  };

  const openRegisterModal = () => {
    if (!user) {
      setIsLogin(false);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleAuthMode = () => {
    if (!user) {
      setIsLogin(!isLogin);
    }
  };

  const value = !user
    ? {
        isOpen,
        isLogin,
        openLoginModal,
        openRegisterModal,
        closeModal,
        toggleAuthMode,
      }
    : {
        isOpen: false,
        isLogin: true,
        openLoginModal: () => {},
        openRegisterModal: () => {},
        closeModal: () => {},
        toggleAuthMode: () => {},
      };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
