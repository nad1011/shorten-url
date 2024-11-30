import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import ShortenPage from "./pages/ShortenPage";

import MainLayout from "@/components/layout/MainLayout";
import { ToastProvider } from "@/contexts/ToastContext";
import QrPage from "@/pages/QrPage";
import store from "@/store/index";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastProvider>
          <MainLayout>
            <Routes
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Route path="/" element={<ShortenPage />} />
              <Route path="/qr" element={<QrPage />} />
              <Route path="/analytics" element={<h1>hello analytics</h1>} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </MainLayout>
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
