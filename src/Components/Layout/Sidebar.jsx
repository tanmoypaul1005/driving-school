import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLayoutStore from "../../App/Stores/LayoutStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { iAPP_LOGO, iAPP_LOGO_SM, iLEFT_ARROW } from "../../App/Utility/source";
import { k_role } from "../../App/Utility/const";
import NormalSideBarItem from "./NormalSideBarItem";
import useUtilityStore from "../../App/Stores/UtilityStore";

const Sidebar = ({ isOpenSidebar, setIsSidebarOpen }) => {

  const { t } = useTranslation();

  const navigateTo = useNavigate();

  const location = useLocation();

  const { setExpandRole, activeSection, setActiveSection, setExpandSettings, sidebarItemsList } = useLayoutStore();

  const { role } = useUtilityStore();

  const { invoice_id, invoice_type, school_id, school_user_id } = useParams();

  useEffect(() => {
    if (location.pathname) {
      switch (location.pathname) {
        case "/":
          setActiveSection("dashboard");
          break;

        case "/category":
          setActiveSection("category");
          break;

        case "/school/category-list":
          setActiveSection("category");
          break;

        case "/notification":
          setActiveSection("notification");
          break;


        case "/school-instructor":
          setActiveSection("instructor");
          break;


        case "/classes/list":
          setActiveSection("class");
          break;

        case "/classes/calendar":
          setActiveSection("class");
          break;

        case "/invoice":
          setActiveSection("invoice");
          break;

        case "/classroom":
          setActiveSection("classroom");
          break;

        case "/school-student":
          setActiveSection("student");
          break;

        case "/license/overview":
          setActiveSection("dashboard");
          break;


        case "/settings":
          setActiveSection("settings");
          break;

        default:
          setActiveSection("");
      }

      if (window.location.pathname.includes("/invoice/details/")) setActiveSection("invoice")

      if (window.location.pathname.includes(`/school/details/${school_id}/invoice/${invoice_id}/${school_user_id}`)) setActiveSection("invoice")

      if (window.location.pathname.includes(`/invoice/details/${invoice_id}/instructor`)) setActiveSection("instructor")
      if (window.location.pathname.includes(`/school/invoice/details/${invoice_id}/school/${school_id}`)) setActiveSection("invoice")
      if (window.location.pathname.includes(`/invoice/details/${invoice_id}/instructor`)) setActiveSection("instructor")

      if (window.location.pathname.includes(`/settings/`)) setActiveSection("settings")
      if (window.location.pathname.includes(`/school-instructor/details/`)) setActiveSection("instructor")
      if (window.location.pathname.includes(`/school/category-list`)) setActiveSection("category")
      if (window.location.pathname.includes(`/school-student/details/`)) setActiveSection("student")
      if (window.location.pathname.includes(`/invoice/details/${invoice_id}/${invoice_type}`)) setActiveSection("invoice")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (activeSection && activeSection !== "role") {
      setExpandRole(false);
    } else if (activeSection && activeSection === "role") {
      setExpandRole(true);
    }
    if (activeSection && activeSection !== "settings") {
      setExpandSettings(false);
    } else if (activeSection && activeSection === "settings") {
      setExpandSettings(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);


  return (
    <div className="relative">
      {/*b       main sidebar */}
      <aside
        className={`
        ${isOpenSidebar ? "w-s230" : "w-s80"}
         ${role === k_role?.admin ? "fixed top-0 bottom-0 z-index-120" : ""} h-full overflow-y-auto overflow-x-visible md:shadow-md transform transition-all duration-150 ease-in bg-cSidebarDarkBg`}
      >
        <div className={`flex flex-col bg-cSidebarDarkBg ${isOpenSidebar ? "px-[20px] pt" : "items-center px-0"} select-none outline-none`}>

          <div
            onClick={() => navigateTo("/")}
            className={`${isOpenSidebar ? "mx-auto mt-10 mb-s35" : "mt-s20 mb-s10"} cursor-pointer`}>
            <img
              src={isOpenSidebar === true ? iAPP_LOGO : iAPP_LOGO_SM}
              alt="BrandLogo"
              className={`${isOpenSidebar ? "h-s88 w-s122" : "pt-s10 w-s30"} `}
            />
          </div>

          {sidebarItemsList?.map((item, index) => (
            <NormalSideBarItem
              key={index}
              onClick={item.onClick}
              title={t(`${item?.title}`)}
              linkTo={item?.linkTo}
              isActiveLink={activeSection === item?.isActiveLink ? true : false}
              isOpenSidebar={isOpenSidebar}
              normalIcon={item?.selectedIcon}
              selectedIcon={item?.normalIcon}
              total={item?.total}
            />
          ))}

        </div>
      </aside>

    </div>
  );
};

export default Sidebar;
