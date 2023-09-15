/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { iEdiItIcon, iUserAvatar } from '../../App/Utility/source'
import CommonEmptyStatus from '../../Components/CommonEmptyStatus/CommonEmptyStatus'
import Image from '../../Components/Image/Image'
import Clamp from 'react-multiline-clamp';
import useProfileStore, { getSchoolDashboard } from '../../App/Stores/profileStore';
import { useEffect } from 'react';
import { NACheck, PageTitle, htmlToPlainText } from '../../Utility/UtilityFunctions';
import ActiveLicenseCard from './components/ActiveLicenseCard';
import NoLicenseCard from './components/NoLicenseCard';
import LicenseRequested from './components/LicenseRequested';
import LicenseExpireCard from './components/LicenseExpireCard';
import MissingCard from './components/MissingCard';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useUtilityStore from '../../App/Stores/UtilityStore';
import { formatDate, roughLicenseDurationFormatter } from '../../App/Utility/UtilityFunctions';
import CommonTitle from '../../Components/Title/CommonTitle';
import useLayoutStore from '../../App/Stores/LayoutStore';


function SchoolProfile() {

    const { setShowEditProfileModal, setShowLicenseDetailsModal, schoolDashboardDetails } = useProfileStore();

    const { setBarTitle } = useLayoutStore();

    const location = useLocation();

    const { setLoading,isLoading } = useUtilityStore.getState();

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("Profile"));
        setBarTitle(t("Profile"));
        fetchStudentDashboard();
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [isLoading])
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchStudentDashboard = async () => {
        if (user?.email) {
            await getSchoolDashboard(true);
            console.log("school")
        }
    }

    return (
        <div className=''>
            <CommonTitle title={t("School profile")} />
            <div className="flex w-full overflow-hidden bg-cBrandColor2 rounded-br8 px-s20 py-s20">
                <div className="w-full pr-s20">
                    <div className="h-full bg-cBackgroundAndCategory rounded-br8 py-s20 px-s20">
                        <div className='flex justify-between lg:flex'>
                            <div className="flex w-full">
                                <div className='max-w-[88px] min-w-[88px] h-s88 mb-s18'>
                                    <Image className='rounded-full w-s86 h-s86 ' src={schoolDashboardDetails?.school?.cover} dummyImage={iUserAvatar} />
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
                            <div className="cursor-pointer">
                                <img
                                    className="w-s28 h-s28"
                                    src={iEdiItIcon}
                                    onClick={() => { setShowEditProfileModal(true) }}
                                    alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {schoolDashboardDetails?.license_info?.status === "accepted" ||
                    schoolDashboardDetails?.license_info?.status === "purchased" ?
                    <ActiveLicenseCard
                        title={schoolDashboardDetails?.license_info?.license_details?.title}
                        duration={roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}
                        start_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)}
                        end_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.end_time)}
                        linkTo="/license/overview"
                        onClick={() => { setShowLicenseDetailsModal(true) }}
                        status={schoolDashboardDetails?.license_info?.status}
                    /> : ''}

                {schoolDashboardDetails?.license_info?.status === "new" &&
                    <NoLicenseCard title={t("You don’t have any active license. Please purchase a license first.")} subtitle={t("Purchase License")} />
                }


                {schoolDashboardDetails?.license_info?.status === "not_active" &&
                    <NoLicenseCard subtitle={t("Purchase License")} title={schoolDashboardDetails?.license_info?.license_text} />
                }

                {schoolDashboardDetails?.license_info?.status === "requested" &&
                    <LicenseRequested
                        title={t("Waiting for Admin’s Confirmation")}
                        subtitle1={t('License overview')}
                        subtitle2={t('Check status')}
                        link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                    />
                }

                {schoolDashboardDetails?.license_info?.status === "created" &&
                    <LicenseRequested
                        title={t('Please check your invoice to Pay. You got an invoice.')}
                        subtitle1={t('License overview')}
                        subtitle2={t('Check status')}
                        link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                    />
                }

                {schoolDashboardDetails?.license_info?.status === "paid" &&
                    <LicenseRequested title={t('License fee has been paid. Waiting for admin’s confirmation')}
                        subtitle1={t('License overview')}
                        subtitle2={t('Check status')}
                        link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                    />
                }

                {schoolDashboardDetails?.license_info?.status === "missing2" || schoolDashboardDetails?.license_info?.status === "missing1" ?
                    <MissingCard
                        link={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                    /> : ''
                }

                {schoolDashboardDetails?.license_info?.status === "expire_warning" &&
                    <LicenseExpireCard
                        message={`${t("Your license will be expired on")} ${schoolDashboardDetails?.license_info?.expired_date}`}
                        title={schoolDashboardDetails?.license_info?.license_details?.title}
                        duration={roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}
                        start_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)}
                        end_date={schoolDashboardDetails?.license_info?.expired_date}
                        onClick={() => { setShowLicenseDetailsModal(true) }}
                        linkTo='/license/overview'
                    />
                }


                {schoolDashboardDetails?.license_info?.status === "expire" &&
                    <LicenseExpireCard
                        message={`${t("Your license has been expired on")} ${schoolDashboardDetails?.license_info?.expired_date}`}
                        title={schoolDashboardDetails?.license_info?.license_details?.title}
                        duration={roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}
                        start_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)}
                        end_date={schoolDashboardDetails?.license_info?.expired_date}
                        onClick={() => { setShowLicenseDetailsModal(true) }}
                        linkTo='/license/overview'
                    />
                }

            </div>
        </div>
    )
}

export default SchoolProfile

export const CommonList = ({ title = "", value = "" }) => {
    // todo:: small_body_text type class formate not ok. you can see all css class name formate use - instead of _ . check all class you defined
    return <div className="small_body_text text-cGray ">
        {title}: {value === "null" || value === null ? "NA" : value}
    </div>

}
