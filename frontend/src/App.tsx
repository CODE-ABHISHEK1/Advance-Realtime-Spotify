import "./App.css";
import { Route, Routes } from "react-router-dom";
import Toaster from "@/components/ui/toaster";

import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import AlbumPage from "./pages/album/AlbumPage.tsx";
import AdminPage from "./pages/admin/AdminPage.tsx";
import NotFoundPage from "./pages/404/NotFound.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
        
      <Toaster />
      
    </>
  );
}

export default App;
