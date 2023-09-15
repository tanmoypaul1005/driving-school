import React from "react";
import { useTranslation } from "react-i18next";
import useLayoutStore from "../../../App/Stores/LayoutStore";
import useUtilityStore from "../../../App/Stores/UtilityStore";
import { iUserAvatar } from "../../../App/Utility/source";
import { BaseUrlSrc } from "../../../App/Utility/Url";
import { iLogout } from './../../../App/Utility/source';

export default function AccountSettingsDropDown() {
  const { t } = useTranslation();

  const { loggedUser } = useUtilityStore();
  const { setShowLogoutModal } = useLayoutStore();

  return (
    <>
      {/* <EditAccount /> */}
      <div className="w-full h-full bg-cBrandColor2 text-fs16 font-fw500 rounded-br5">
        <div className="flex items-center p-s16">
          <img
            src={loggedUser?.image_url ? BaseUrlSrc + "/" + loggedUser?.image_url : iUserAvatar}
            alt=""
            className="object-cover rounded-full w-s35 h-s35"
          />

          <div className="flex flex-col justify-center pl-s10">
            <div className="font-semibold capitalize text-fs18">{loggedUser.name ? loggedUser.name : ""}</div>
            <div className="font-normal text-fs16">
              {loggedUser.email ? loggedUser.email : ""}
            </div>
          </div>
        </div>

        <div className="px-4 w-full">
          <div className="h-[1px] bg-cTextGray"></div>
        </div>
        <div onClick={() => setShowLogoutModal(true)} className="flex pl-5 hover:bg-cBackgroundAndCategory cursor-pointer">
          <img className="cursor-pointer" src={iLogout} alt="" />
          <div className="pl-5 pr-s5 py-s16">{t("Logout")}</div>
        </div>

        {/* <div className="flex pl-5 hover:bg-cBackgroundAndCategory">
          <img className="cursor-pointer" src={iSettings} alt="" />
          <div onClick={() => { }} className="pl-5 cursor-pointer py-s16">Account Settings</div>
        </div> */}
      </div>
    </>

  );
}
