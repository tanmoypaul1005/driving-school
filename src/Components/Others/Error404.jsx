import { useEffect } from "react";
import useLayoutStore from "../../App/Stores/LayoutStore";
import { PageTitle } from "../../App/Utility/UtilityFunctions";
import Err404Logo from "../../Images/logo/error404.svg";

const Error404 = () => {
  const { setBarTitle } = useLayoutStore();
  useEffect(() => {
    setBarTitle("Page not found");
    PageTitle("Page not found");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-cIconColor h-[80vh] flex flex-col justify-center items-center">
      <div className="">
        <img
          src={Err404Logo}
          alt="404-logo"
          className=" w-[35vw] h-full object-cover"
        />
      </div>
      <div className="text-[65px] pt-10 text-white font-bold">
        Page Not Found
      </div>
    </div>
  );
};

export default Error404;
