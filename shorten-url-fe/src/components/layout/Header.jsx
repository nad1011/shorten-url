import { useSelector } from "react-redux";

import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { openLoginModal, openRegisterModal } = useAuth();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="border-b bg-background flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2">
        <Icon name="Link" size={24} />
        <h2 className="text-xl font-semibold text-foreground">
          <span className="text-primary">S</span>horten Link
        </h2>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="default" onClick={() => {}}>
            Log Out
          </Button>
          <Avatar src={user.avatar} alt={user.username} />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button variant="default" size="default" onClick={openLoginModal}>
            Sign In
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={openRegisterModal}
          >
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
