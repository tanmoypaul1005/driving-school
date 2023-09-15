/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import useUtilityStore from '../../../App/Stores/UtilityStore';
import { useLocation } from 'react-router-dom';
import useProfileStore, { getSchoolDashboard } from '../../../App/Stores/profileStore';
import { formatDate, roughLicenseDurationFormatter } from '../../../App/Utility/UtilityFunctions';
import ActiveLicense from './ActiveLicense';
import { useTranslation } from 'react-i18next';
import NoLicense from './NoLicense';
import CommonLicense from './CommonLicense';
import LicenseMissing from './LicenseMissing';
import LicenseExpire from './LicenseExpire';

const DashboardLicense = () => {

    const { setLoading, isLoading } = useUtilityStore.getState();

    const { setShowLicenseDetailsModal, schoolDashboardDetails } = useProfileStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchStudentDashboard();
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [isLoading])


    const fetchStudentDashboard = async () => {
        await getSchoolDashboard(true);
        console.log("school")
    }

    return (
        <div className="w-full p-s20 bg-cBrandColor2 rounded-br8">
            {
                schoolDashboardDetails?.license_info?.status === "accepted" ||
                    schoolDashboardDetails?.license_info?.status === "purchased" ?
                    <ActiveLicense
                        title={schoolDashboardDetails?.license_info?.license_details?.title}
                        duration={roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}
                        start_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)}
                        end_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.end_time)}
                        linkTo="/license/overview"
                        onClick={() => { setShowLicenseDetailsModal(true) }}
                        status={schoolDashboardDetails?.license_info?.status}
                    /> : ''}

            {
                schoolDashboardDetails?.license_info?.status === "new" &&
                <NoLicense
                    title={t("You don’t have any active license. Please purchase a license first.")}
                    subtitle={t("Purchase License")}
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "not_active" &&
                <NoLicense
                    subtitle={t("Purchase License")}
                    title={schoolDashboardDetails?.license_info?.license_text}
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "requested" &&
                <CommonLicense
                    title={t("Waiting for Admin’s Confirmation")}
                    subtitle1={t('License overview')}
                    subtitle2={t('Check status')}
                    link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "created" &&
                <CommonLicense
                    title={t('Please check your invoice to Pay. You got an invoice.')}
                    subtitle1={t('License overview')}
                    subtitle2={t('Check status')}
                    link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "paid" &&
                <CommonLicense title={t('License fee has been paid. Waiting for admin’s confirmation')}
                    subtitle1={t('License overview')}
                    subtitle2={t('Check status')}
                    link2={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "missing2" || schoolDashboardDetails?.license_info?.status === "missing1" ?
                    <LicenseMissing
                        link={`/invoice/details/${schoolDashboardDetails?.license_info?.license_id}/license_invoice`}
                    /> : ''
            }

            {
                schoolDashboardDetails?.license_info?.status === "expire_warning" &&
                <LicenseExpire
                    message={`${t("Your license will be expired on")} ${schoolDashboardDetails?.license_info?.expired_date}`}
                    title={schoolDashboardDetails?.license_info?.license_details?.title}
                    duration={roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}
                    start_date={formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)}
                    end_date={schoolDashboardDetails?.license_info?.expired_date}
                    onClick={() => { setShowLicenseDetailsModal(true) }}
                    linkTo='/license/overview'
                />
            }

            {
                schoolDashboardDetails?.license_info?.status === "expire" &&
                <LicenseExpire
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
    )
}

export default DashboardLicense