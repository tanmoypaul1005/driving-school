import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../App/Stores/authStore';
import useLayoutStore from '../../App/Stores/LayoutStore';
import useSettingsStore from '../../App/Stores/SettingsStore';
import UseTestStore from '../../App/Stores/TestStore';
import useUtilityStore from '../../App/Stores/UtilityStore';
import { iUserAvatar } from '../../App/Utility/source';

export default function MobileTopBar() {
    const { isLoggedIn } = useAuthStore();

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isExtendDrawer, setIsExtendDrawer] = useState(false);
    return (
        <div className={`w-full flex items-start lg:hidden overflow-hidden transition-all duration-500 fixed top-0 z-50
                ${isOpenDrawer ? isLoggedIn ? isExtendDrawer ? "h-[175px]" : "h-[175px]" : "h-[175px]" : "h-s60"}             
                bg-white shadow-lg `}>
            {/* ${isLoggedIn ? isExtendDrawer ? "h-[521px]" : "h-[316px]" : "h-s60"} */}
            <TopBarLinks
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                isExtendDrawer={isExtendDrawer}
                setIsExtendDrawer={setIsExtendDrawer}
            />
        </div>
    )
}


const TopBarLinks = ({ isOpenDrawer, setIsOpenDrawer, isExtendDrawer, setIsExtendDrawer }) => {
    const { t } = useTranslation();
    const navigateTo = useNavigate();

    const { isLoggedIn } = useAuthStore();
    const { loggedUser } = useUtilityStore();
    const { setUserData } = useSettingsStore();
    const { setShowLogoutModal } = useLayoutStore();
    const { setShowTestModal, setShowEditPassModal } = UseTestStore();


    const fillAuthUserData = () => {

        let tempName = {
            target: {
                name: "name",
                value: loggedUser?.name,
            }
        }
        setUserData(tempName)

        let tempEmail = {
            target: {
                name: "email",
                value: loggedUser?.email,
            }
        }
        setUserData(tempEmail)

        let tempPhone = {
            target: {
                name: "phone",
                value: loggedUser?.phone,
            }
        }
        setUserData(tempPhone)

        let tempImage = {
            target: {
                name: "image_url",
                value: loggedUser?.image_url,
            }
        }
        setUserData(tempImage)

        // console.log(userData);
    }

    return (
        <div className={`flex flex-col justify-center items-start w-full capitalize bg-white text-fs16 font-fw400 pl-s80`}>
            <div className='flex items-center justify-between w-full px-5 bg-white shadow-lg h-s60'>
                {/* <img onClick={() => navigateTo("/")} src={iAPP_LOGO_SM} alt="app-logo" className="w-auto cursor-pointer drop-shadow-md h-s40" /> */}
                <div className='flex flex-row-reverse items-center w-full'>
                    <div className="pr-5"></div>
                    <div
                        onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                        className={`cursor-pointer ${isOpenDrawer ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out`}
                    >
                        {
                            !isOpenDrawer ? <AiOutlineMenu className='text-3xl' />
                                : <AiOutlineClose className='text-3xl' />
                        }
                    </div>
                </div>
            </div>

            <div className="w-full bg-cBgDrawer">
                {isLoggedIn ?
                    <div className={`px-s15 transition-all ease-in-out duration-500 overflow-hidden ${isExtendDrawer ? "h-[162px]" : "h-[70px]"}`}>
                        <div 
                        // onClick={() => setIsExtendDrawer(!isExtendDrawer)} 
                        className='flex items-center justify-between pt-s15'>
                            <div className="flex items-center">
                                <img src={iUserAvatar} alt="user-logo" className="object-cover rounded-full w-s35 h-s35" />
                                {/* <img src={loggedUser?.image_url ? BaseUrlSrc + "/" + loggedUser?.image_url : ""} alt="user-logo" className="object-cover rounded-full w-s35 h-s35" /> */}
                                <div className="flex flex-col justify-center pl-s10">
                                    <div>{loggedUser.name ? loggedUser.name : ""}</div>
                                    <div>
                                        {loggedUser.email ? loggedUser.email : ""}
                                    </div>
                                </div>
                            </div>
                            {/* <FiChevronDown className={`text-3xl transition-all ease-in-out duration-500 ${isExtendDrawer ? "rotate-180" : "rotate-0"}`} /> */}
                        </div>

                        <div className="pt-5 pl-5 pb-s10" onClick={() => { fillAuthUserData(); setShowTestModal(true); }} > {t("Edit Profile")} </div>
                        <div className="pl-5 py-s10" onClick={() => setShowEditPassModal(true)} >{t("Change Password")}</div>

                    </div> : ""}
            </div>
            {/* 
            <div className="flex items-center w-full pl-5 cursor-pointer hover:bg-cBrand hover:text-white py-s10">{t("create")}</div>
            <div className="flex items-center w-full pl-5 cursor-pointer hover:bg-cBrand hover:text-white py-s10">{t("post cards")}</div>
            <div className="flex items-center w-full pl-5 cursor-pointer hover:bg-cBrand hover:text-white py-s10">{t("shops")}</div>
            <div className="flex items-center w-full pl-5 cursor-pointer hover:bg-cBrand hover:text-white py-s10">{t("contact us")}</div> */}
            {/* {
                isLoggedIn && window.location.pathname === "/" ?
                    <>

                        <div className="w-full pl-5 cursor-pointer py-s16 hover:bg-cBrand hover:text-white" >
                            <Link to="/dashboard" >{t("Go To Dashboard")}</Link>
                        </div>
                    </>
                    : ""
            } */}
            {
                isLoggedIn ?
                    <div onClick={() => setShowLogoutModal(true)} className="w-full pl-5 cursor-pointer py-s10 hover:bg-cBrand hover:text-white">{t("Logout")}</div>
                    :
                    <div onClick={() => navigateTo('/login')} className="w-full pl-5 cursor-pointer py-s10 hover:bg-cBrand hover:text-white">{t("Login")}</div>
            }

        </div>
    )
}