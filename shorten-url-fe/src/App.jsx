import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import QrPage from "@/pages/QrPage";
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
                <Route path="/qr" element={<QrPage />} />
                <Route path="/analytics" element={<h1>hello analytics</h1>} />
                <Route path="/settings" element={<h1>hello settings</h1>} />
              </Routes>
            </MainLayout>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
