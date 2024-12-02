import PropTypes from "prop-types";

import Footer from "./Footer";
import Headers from "./Header";
import Sidebar from "./Sidebar";

import AuthModal from "@/components/features/authentication";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col bg-background">
      <AuthModal />
      <Headers />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
