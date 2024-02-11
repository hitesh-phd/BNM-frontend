import TopBar from "../TopBar";

const Layout = ({ backUrl, children }) => {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen py-0 overflow-hidden bg-white min-h-screen-ios">
        <TopBar />
        <div className="flex">
          <div className="relative flex max-w-full rounded-none grow bg-n-1">
            <div className="relative flex flex-col max-w-full px-3 py-4 mt-20 sm:p-4 grow">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
