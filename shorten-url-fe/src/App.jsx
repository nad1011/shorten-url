import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Route path="/" element={<h1>hello link</h1>} />
          <Route path="/qr" element={<h1>hello details</h1>} />
          <Route path="/analytics" element={<h1>hello analytics</h1>} />
          <Route path="/settings" element={<h1>hello settings</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
