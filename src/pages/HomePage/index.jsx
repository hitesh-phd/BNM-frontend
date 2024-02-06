import React from "react";
import MediaQuery from "react-responsive";

import FeedPage from "./FeedPage";
import MessagePage from "./MessagePage";
import ConnectionPage from "./ConnectionPage";
import TopBar from "@/components/TopBar";

const HomePage = () => {
  return (
    <div className="bg-white">
      <TopBar />
      <div className="w-full p-2">
        <div className="grid grid-cols-5 lg:grid-cols-4 gap-x-6">
          <MediaQuery minWidth={766}>
            <ConnectionPage />
          </MediaQuery>
          <FeedPage />
          <MediaQuery minWidth={1024}>
            <MessagePage />
          </MediaQuery>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
