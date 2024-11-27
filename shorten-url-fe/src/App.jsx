import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import QrPage from "@/pages/QrPage";
import store from "@/store/index";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainLayout>
          <Routes
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Route path="/" element={<h1>hello link</h1>} />
            <Route path="/qr" element={<QrPage />} />
            <Route path="/analytics" element={<h1>hello analytics</h1>} />
            <Route path="/settings" element={<h1>hello settings</h1>} />
          </Routes>
        </MainLayout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
