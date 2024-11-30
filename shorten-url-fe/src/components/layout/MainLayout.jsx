import PropTypes from "prop-types";

import Footer from "./Footer";
import Headers from "./Header";
import Sidebar from "./Sidebar";

import AuthModal from "@/components/features/authentication";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthModal />
      <Headers />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
