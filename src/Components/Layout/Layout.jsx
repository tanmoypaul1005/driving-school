import { useEffect, useState } from "react";
import { k_role } from "../../App/Utility/const";
import CommonModalArea from "./CommonModalArea";
import './Layout.css';
import Sidebar from "./Sidebar";
import useUtilityStore from "../../App/Stores/UtilityStore";
const Layout = (props) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [isShopAdminState, setIsShopAdminState] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { role } = useUtilityStore();

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    // console.log(width);

    if (width <= 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, [width]);


  return (
    <>
      <CommonModalArea />
      <div className="flex flex-row min-h-screen bg-cBgLayout text-gray-800 z-50">
        <Sidebar
          isOpenSidebar={role === k_role?.admin ? isSidebarOpen : true}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="main flex items-start justify-start flex-col flex-grow transition-all duration-150 ease-in w-full relative">
          {/* lg:pr-[48px] pr-5 */}
          <div
            className={`w-full lg:pb-12 pb-5`}>
            <div className={`py-s24 md:px-5 px-5 `}>
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
