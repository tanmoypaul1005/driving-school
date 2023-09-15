import React from 'react'
import { useTranslation } from 'react-i18next';
import useProfileStore from '../../../App/Stores/profileStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import { dateDiffCalendar, formatDate, roughLicenseDurationFormatter } from '../../../App/Utility/UtilityFunctions';

function LicenseDetails() {

    const { schoolDashboardDetails, showLicenseDetailsModal, setShowLicenseDetailsModal } = useProfileStore();

    const { t } = useTranslation();

    const start_date = schoolDashboardDetails?.license_info?.license_exist?.start_time;
    const end_date = schoolDashboardDetails?.license_info?.expired_date;

    let today = new Date();
    let end_dateFormatted = new Date(end_date);
    let startDateFormatted = new Date(start_date);

    return (
        <div>
            <CommonModal
                showModal={showLicenseDetailsModal}
                setShowModal={setShowLicenseDetailsModal}
                modalSpace={true}
                modalTitle={t("License details")}
                widthClass='w-[45vw]'
                mainContent={
                    <>

                        <div className='space-y-1 bg-cBorderBottom p-s20 rounded-br8 mt-s20'>

                            <LicenseDetailsList title={t('Status')}
                                value={schoolDashboardDetails?.license_info?.status === "expire_warning" ? "Expire Warning" : schoolDashboardDetails?.license_info?.status}
                            />

                            <LicenseDetailsList title={t('License name')}
                                value={schoolDashboardDetails?.license_info?.license_details?.title ?? 'NA'}
                            />

                            <LicenseDetailsList title={t('Duration')}
                                value={schoolDashboardDetails?.license_info?.license_details?.duration ?
                                    `${roughLicenseDurationFormatter(schoolDashboardDetails?.license_info?.license_details?.duration)}` : 'NA'}
                            />

                            <LicenseDetailsList title={t('Price')}
                                value={
                                    schoolDashboardDetails?.license_info?.license_details?.license_type ?
                                        `DKK ${schoolDashboardDetails?.license_info?.license_details?.price?.toLocaleString("da-DK")}` :
                                        'NA'}
                            />

                            <LicenseDetailsList title={t('License type')}
                                value={schoolDashboardDetails?.license_info?.license_details?.license_type ?? 'NA'}
                            />

                            <LicenseDetailsList title={t('Period')}
                                value={schoolDashboardDetails?.license_info?.license_exist?.start_time &&
                                    schoolDashboardDetails?.license_info?.license_exist?.end_time ?
                                    `${formatDate(schoolDashboardDetails?.license_info?.license_exist?.start_time)} -
                                     ${formatDate(schoolDashboardDetails?.license_info?.license_exist?.end_time)}` : 'NA'
                                }
                            />

                            <LicenseDetailsList title={t('Remaining')}
                                value={(end_date === "null" || end_date === null || today > end_dateFormatted) ? "0 Days Remaining" : dateDiffCalendar(startDateFormatted > today ? start_date : new Date(), end_date) + ""}
                            />

                        </div>

                        <div className="text-cBlack sub_title pt-s16 pb-s4">{t("Description")}</div>
                        <div className='body_text text-cGray text-capitalize text-lowercase p-s15 bg-cBorderBottom rounded-br8'>
                            {schoolDashboardDetails?.license_info?.license_text}
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default LicenseDetails

const LicenseDetailsList = ({ title = "Title", value = "Value" }) => {
    return (
        <>
            <div className='flex justify-between'>
                <div className='body_text text-cGray'>{title ?? 'NA'}</div>
                <div className='capitalize body_text text-cGray'>
                    {value ?? 'NA'}
                </div>
            </div>
        </>
    )
}
