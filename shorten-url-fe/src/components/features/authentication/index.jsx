import { useSelector } from "react-redux";

import LoginModal from "@/components/features/authentication/LoginModal";
import RegisterModal from "@/components/features/authentication/RegisterModal";
import useAuth from "@/hooks/useAuth";

const AuthModal = () => {
  const { isOpen, isLogin, toggleAuthMode } = useAuth();
  const user = useSelector((state) => state.auth.user);

  if (user || !isOpen) return null;

  return (
    <>
      {isLogin ? (
        <LoginModal toggleAuthMode={toggleAuthMode} />
      ) : (
        <RegisterModal toggleAuthMode={toggleAuthMode} />
      )}
    </>
  );
};

export default AuthModal;
