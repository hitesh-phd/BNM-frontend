import React from "react";
import { Tab } from "@headlessui/react";
import ConnectionTab from "./ConnectionTab";
import { RequestTab } from "./RequestTab";

// Define the names of the tabs for navigation
const TAB_NAVIGATION = ["Connections", "Requests"];

// Map tab names to their corresponding components
const TAB_COMPONENTS = {
  Connections: <ConnectionTab />,
  Requests: <RequestTab />,
};

const ConnectionPageTab = () => {
  return (
    <div>
      <div className="mx-auto">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex flex-wrap justify-around my-4 mb-6">
            {TAB_NAVIGATION.map((button, index) => (
              <Tab
                className="h-12 text-sm transition-colors border-0 md:text-lg base1 text-n-5 hover:text-primary-1 ui-selected:border-3 ui-selected:border-primary-1 ui-selected:rounded-3xl ui-selected:text-n-1 ui-selected:p-2 ui-selected:px-4 ui-selected:font-medium ui-selected:bg-primary-1 ui-selected:shadow-lg ui-selected:hover:text-white "
                key={index}
              >
                {button}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="py-5">
            {TAB_NAVIGATION.map((tabName, index) => (
              <Tab.Panel key={index}>{TAB_COMPONENTS[tabName]}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ConnectionPageTab;
