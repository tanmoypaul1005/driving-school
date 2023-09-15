import React from 'react'
import { useTranslation } from 'react-i18next';
import useProfileStore from '../../../App/Stores/profileStore';
import { formatDate } from '../../../App/Utility/UtilityFunctions';

function LicenseOverviewHeader() {

    const { schoolLicenseOverview, schoolDashboardDetails } = useProfileStore();

    const { t } = useTranslation();

    return (
        <div>
            {
                schoolDashboardDetails?.license_info?.status === "requested" &&
                <HeaderList title={t('Request Submitted (Waiting for admin’s confirmation)')} />
            }

            {
                schoolDashboardDetails?.license_info?.status === "created" &&
                <HeaderList title={t('You got an order from admin (Please check your invoice to pay)')} />
            }

            {
                schoolDashboardDetails?.license_info?.status === "paid" &&
                <HeaderList title={t('Waiting for admin’s confirmation (License fee has been paid)')} />
            }

            {
                schoolDashboardDetails?.license_info?.status === "accepted" && schoolLicenseOverview?.existing_lisence?.end_time?
                <HeaderList title={`${t("Your license will be expired on")} ${schoolLicenseOverview?.existing_lisence?.end_time}. ${t("You can renew you license 1 month before the expire date")}`} />:''
            }

            {schoolDashboardDetails?.license_info?.status === "expire_warning" &&
                <div className='flex items-center py-s10 bg-[#FFE9E9] px-s16 rounded-br8 mb-s24'>
                    <span className='capitalize important_text text-cRed text-ellipsis text-capitalize text-lowercase'>
                        {schoolDashboardDetails?.license_info?.license_text ?
                            schoolDashboardDetails?.license_info?.license_text :
                            `${t("Your license will be expired on")} ${formatDate(schoolLicenseOverview?.existing_lisence?.end_time)}`}

                    </span>
                </div>
            }

            {schoolDashboardDetails?.license_info?.status === "expire" &&
                <div className='flex items-center py-s10 bg-[#FFE9E9] px-s16 rounded-br8 mb-s24'>
                    <span className='text-ellipsis text-capitalize text-lowercase important_text text-cRed'>
                        {schoolDashboardDetails?.license_info?.license_text ? schoolDashboardDetails?.license_info?.license_text :
                            `${t("Your license has been expired on")} ${formatDate(schoolLicenseOverview?.existing_lisence?.end_time)}`}
                    </span>
                </div>
            }

            {
                schoolDashboardDetails?.license_info?.status === "not_active" &&
                <HeaderList title={schoolDashboardDetails?.license_info?.license_text} />
            }
        </div>
    )
}

export default LicenseOverviewHeader

const HeaderList = ({ title = "" }) => {
    return (
        <div className='flex items-center py-s10 bg-cLightSkyBlue px-s16 rounded-br8 mb-s24'>
            <span className='text-ellipsis text-capitalize text-lowercase important_text text-cBlack'>{title ?? 'NA'}</span>
        </div>
    )
}
