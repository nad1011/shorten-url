import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ErrorPage from "@/pages/404";
import RedirectPage from "@/pages/[id]";
import AnalyticPage from "@/pages/AnalyticPage";
import QrPage from "@/pages/QrPage";
import SettingsPage from "@/pages/SettingPage";
import ShortenPage from "@/pages/ShortenPage";
import store from "@/store/index";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider>
            <MainLayout>
              <Routes
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <Route path="/" element={<ShortenPage />} />
                <Route path="/:id" element={<RedirectPage />} />
                <Route path="/qr" element={<QrPage />} />
                <Route path="/analytics" element={<AnalyticPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/404" element={<ErrorPage />} />
              </Routes>
            </MainLayout>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
