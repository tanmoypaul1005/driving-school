/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Settings from '../Settings'
import { useTranslation } from 'react-i18next';
import { iEdiItIcon, iUserAvatar } from '../../../App/Utility/source';
import { useLocation } from 'react-router-dom';
import { NACheck, PageTitle, htmlToPlainText } from '../../../Utility/UtilityFunctions';
import useLayoutStore from '../../../App/Stores/LayoutStore';
import useProfileStore, { getSchoolDashboard } from '../../../App/Stores/profileStore';
import Image from '../../../Components/Image/Image';
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import Clamp from 'react-multiline-clamp';

const Profile = () => {

    const { t } = useTranslation();

    const { setShowEditProfileModal, schoolDashboardDetails } = useProfileStore();

    const { setBarTitle } = useLayoutStore();

    const location = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("Profile"));
        setBarTitle(t("Profile"));
        fetchStudentDashboard();
    }, [])

    const fetchStudentDashboard = async () => {
        if (location.pathname === '/settings') {
            await getSchoolDashboard(true);
            console.log("school")
        }
    }

    return (
        <div>
            <Settings>
                <div className='flex items-center justify-between'>
                    <h1 className="section_title text-cBlack mb-s8 ">{t("Profile details")}</h1>
                    <div className="cursor-pointer">
                        <img
                            className="w-s28 h-s28"
                            src={iEdiItIcon}
                            onClick={() => {
                                setShowEditProfileModal(true) 
                            }}
                            alt="" />
                    </div>
                </div>

                <div className="h-full bg-cWhite rounded-br8 py-s20 px-s20 mt-s8">
                        <div className='flex justify-between lg:flex'>
                            <div className="flex w-full">
                                <div className='max-w-[144px] min-w-[144px] h-s144 mb-s18'>
                                    <Image className='rounded-full w-s144 h-s144' src={schoolDashboardDetails?.school?.cover} dummyImage={iUserAvatar} />
                                </div>
                                <div className="ml-s15">
                                    <div className="break-all section_title text-cBlack">
                                        {NACheck(!schoolDashboardDetails?.school?.name) ?
                                            <CommonEmptyStatus size='text-fs24' fontWeight='font-fw600' textColor='text-cHighlighted' /> :
                                            schoolDashboardDetails?.school?.name}
                                    </div>

                                    <CommonList title="CVR" value={schoolDashboardDetails?.school?.cvr ?? 'NA'} />
                                    <CommonList title={'Email'} value={schoolDashboardDetails?.school?.user_email ?? 'NA'} />
                                    <CommonList title={t('Contact Mail')} value={schoolDashboardDetails?.school?.contact_mail ?? 'NA'} />
                                    <CommonList title={t('Phone')} value={schoolDashboardDetails?.school?.phone_number ?? 'NA'} />
                                    <CommonList title={t('Website')} value={schoolDashboardDetails?.school?.website ?? 'NA'} />
                                    <CommonList title={t('Address')} value={schoolDashboardDetails?.school?.address ?? 'NA'} />
                                    <CommonList title={t('Zip code')} value={schoolDashboardDetails?.school?.zip ?? 'NA'} />
                                    <CommonList title={t('City')} value={schoolDashboardDetails?.school?.city ?? 'NA'} />

                                    <div className='mt-s20'>
                                        <div className="sub_title text-cBlack mb-s2">{t("Description")}</div>
                                        <Clamp
                                            lines={1}
                                            maxLines={100}
                                            withToggle
                                            showMoreElement={({ toggle }) => (
                                                <button className="cursor-pointer text-cBrandColor important_text" type="button" onClick={toggle}>
                                                    {t("Show more")}
                                                </button>
                                            )}
                                            showLessElement={({ toggle }) => (
                                                <span className="cursor-pointer text-cBrandColor important_text" type="button" onClick={toggle}>
                                                    {t("See Less")}
                                                </span>
                                            )}>
                                            <div className="break-all body_text text-cGray">
                                                {schoolDashboardDetails?.school?.l_description
                                                    === "null" || schoolDashboardDetails?.school?.l_description
                                                    === null ?
                                                    <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cTextGray' /> :
                                                    htmlToPlainText(schoolDashboardDetails?.school?.l_description
                                                    )}
                                            </div>
                                        </Clamp>

                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </Settings>
        </div>
    )
}

export default Profile


export const CommonList = ({ title = "", value = "" }) => {
    // todo:: small_body_text type class formate not ok. you can see all css class name formate use - instead of _ . check all class you defined
    return <div className="small_body_text text-cGray ">
        {title}: {value === "null" || value === null ? "NA" : value}
    </div>

}