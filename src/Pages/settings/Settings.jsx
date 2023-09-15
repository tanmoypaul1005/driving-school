import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLayoutStore from "../../App/Stores/LayoutStore";
import { RIGHT_ARROW } from "../../App/Utility/source";
import { PageTitle } from "../../App/Utility/UtilityFunctions";
import CommonTitle from "../../Components/Title/CommonTitle";
import Option from "./Components/Option";
import SettingsSchoolItem from "./SettingsItemArray/SettingsSchoolItem";
import { useTranslation } from "react-i18next";

const Settings = (props) => {

  const { t } = useTranslation()

  const { setBarTitle } = useLayoutStore();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    PageTitle(t("Settings"));
    setBarTitle("Settings");
  }, [setBarTitle, t]);


  return (
    <div className={`md:mx-s32"}`}>

      <div>
        <CommonTitle title={t("Settings")} />
      </div>

      <div className="grid grid-cols-12 gap-2 md:gap-8 2xl:gap-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white p-s12 shadow rounded-br8 flex-col space-y-2">
            {
              SettingsSchoolItem?.map((item, index) => (
                <Option
                  onClick={() => { navigate(`${item?.linkTo}`) }}
                  label={t(`${item.title}`)}
                  source={RIGHT_ARROW}
                  className={""}
                  isActive={location.pathname === item?.linkTo}
                />
              ))
            }
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
