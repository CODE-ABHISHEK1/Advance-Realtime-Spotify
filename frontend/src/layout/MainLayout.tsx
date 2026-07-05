import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import LeftSidebar from "./Components/LeftSidebar";
import FriendsActivity from "./Components/FriendsActivity";
import AudioPlayer from "./Components/AudioPlayer";
import { PlaybackControls } from "./Components/PlaybackControls";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <AudioPlayer /> 
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          <Outlet />
        ) : (
          <Allotment>
            {/* Left SideBar */}
            <Allotment.Pane preferredSize={250} minSize={200} maxSize={400}>
              <div className="h-full pr-2">
                <LeftSidebar />
              </div>
            </Allotment.Pane>

            {/* Main Content */}
            <Allotment.Pane>
              <div className="h-full px-2">
                <Outlet />
              </div>
            </Allotment.Pane>

            {/* Friends Activity */}
            <Allotment.Pane preferredSize={250} minSize={200} maxSize={400}>
              <div className="h-full pl-2">
                <FriendsActivity />
              </div>
            </Allotment.Pane>
          </Allotment>
        )}
      </div>
      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
