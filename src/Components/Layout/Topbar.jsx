import { useTranslation } from "react-i18next";
import { iUserAvatar } from "../../App/Utility/source";
import FreeDropDown from "../DropDown/FreeDropDown";

import AccountSettingsDropDown from "./component/AccountSettingsDropDown";
// pink: image imports

const Topbar = ({ isOpen = true }) => {
  const { t } = useTranslation();

  return (
    <div className={`hidden fixed top-0 z-50 items-center w-full bg-white shadow-md lg:flex h-[50px]`} >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-end items-center pr-5">


        </div>
      </div>

      <div className="mr-5 rounded-full w-s35">
        <FreeDropDown
          width="w-[20vw]"
          shadowCustom="shadow-lg"
          button={
            <>
              <img
                src={iUserAvatar}
                alt=""
                className="object-cover rounded-full cursor-pointer w-s35 h-s35"
              />
            </>
          }
          body={
            <>
              <AccountSettingsDropDown />
            </>
          }
        />
      </div>
    </div>
  );
};

export default Topbar;

