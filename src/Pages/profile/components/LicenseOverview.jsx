/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import LicenseCard from './LicenseCard'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useProfileStore, { addSchoolAddLicense, getSchoolDashboard, getSchoolGetLicense } from '../../../App/Stores/profileStore';
import CommonTitle from '../../../Components/Title/CommonTitle';
import BackLink from '../../../Components/Pagination/BackLink';
import LicenseOverviewHeader from './LicenseOverviewHeader';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';

function LicenseOverview() {

    const { setLicenseStatus, setLicenseOverViewDetails, setShowLicenseOverViewDetailsModal, schoolLicenseOverview, schoolDashboardDetails, setSelectedLicense, selectedLicense } = useProfileStore();

    const [comment, setComment] = useState("");
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        fetchStudentDashboard()
    }, [])

    const fetchStudentDashboard = async () => {
        await setSelectedLicense(null)
        await getSchoolGetLicense();
        if (location.pathname === "/license/overview") {
            await getSchoolDashboard(false);
        }
        console.log("")

    }


    return (
        <>
            <CommonTitle title={t("License overview")} >
                <BackLink linksArray={[
                    { label: t("Dashboard"), linkTo: "/" },
                    { label: t("License overview"), linkTo: "" },
                ]} />
            </CommonTitle>

            <LicenseOverviewHeader />

            <div className="w-full overflow-hidden bg-cBrandColor2 rounded-br8 px-s20 py-s20">
                {schoolLicenseOverview?.lisences?.length > 0 ? <div className="grid h-full rounded-br10 gap-x-8 grid-col-1 gap-y-5 md:gap-y-0 md:grid-cols-2 lg:grid-cols-3">
                    {schoolLicenseOverview?.lisences?.map((item, index) => (
                        <LicenseCard
                            onClick={() => {
                                if (
                                    schoolDashboardDetails?.license_info?.status === "new" ||
                                    schoolDashboardDetails?.license_info?.status === "expire" ||
                                    schoolDashboardDetails?.license_info?.status === "expire_warning") {
                                    setSelectedLicense(item?.id)
                                }
                            }}
                            key={index}
                            title={item?.title}
                            price={item?.price}
                            main_price={item?.main_price}
                            duration={item?.duration}
                            selected={
                                // selectedLicense === null ?
                                // schoolLicenseOverview?.existing_lisence?.lisence?.id === item?.id :
                                item?.id === selectedLicense
                            }
                            details={item?.details}
                            // todo:: and or conditions are proper. unexpected mix of && ||
                            status={
                                schoolLicenseOverview?.existing_lisence?.lisence?.id === item?.id ?
                                    // selectedLicense === item?.id?"":"" ||
                                    (schoolLicenseOverview?.existing_lisence?.status === "created" && 'Applied') ||
                                    (schoolLicenseOverview?.existing_lisence?.status === "requested" && 'Requested') ||
                                    (schoolLicenseOverview?.existing_lisence?.status === "paid1" && 'Applied') ||
                                    (schoolLicenseOverview?.existing_lisence?.status === "paid2" && 'Applied') ||
                                    (schoolDashboardDetails?.license_info?.status === "expire_warning" && 'Current License') ||
                                    (schoolDashboardDetails?.license_info?.status === "expire" && 'Current License') ||
                                    (schoolLicenseOverview?.existing_lisence?.status === "accepted" && 'Active') ||
                                    (schoolDashboardDetails?.license_info?.status === "new" && '') ||
                                    (schoolDashboardDetails?.license_info?.status === "not_active" && 'Purchased') : ''
                            }
                            detailsModal={async () => {
                                await setLicenseStatus(
                                    schoolLicenseOverview?.existing_lisence?.lisence?.id === item?.id && schoolLicenseOverview?.existing_lisence?.status === "accepted" ?
                                        true : false)
                                await setLicenseOverViewDetails(item);
                                setShowLicenseOverViewDetailsModal(true)
                            }}
                        />
                    ))}
                </div> :
                    <div className='flex items-center justify-center rounded-br8 h-s200 bg-cBrandColor2 text-cBlack sub_title'>
                        {t("No License yet!")}
                    </div>
                }
                {
                    schoolDashboardDetails?.license_info?.status === "new" ||
                        schoolDashboardDetails?.license_info?.status === "expire" ||
                        schoolDashboardDetails?.license_info?.status === "expire_warning"
                        ? selectedLicense === null ? "" : <div className='mt-s20'>
                            <form>
                                <CommonInput
                                    max_input={255}
                                    value={comment}
                                    onChange={(e) => { setComment(e.target.value) }}
                                    textarea={true}
                                    rows={4}
                                    placeholder={t('Write comment')}
                                    label={t('Write comment')}
                                />
                                <div className='flex items-center justify-center mt-s20'>
                                    <CommonButton onClick={() => {
                                        if (selectedLicense === null) {
                                            Toastr({ message: t("Please select the license"), type: "warning" });
                                        } else {
                                            addSchoolAddLicense(selectedLicense, comment)
                                        }
                                    }} text='type' roundedFull={false} btnLabel={t('Submit Request')} />
                                </div>
                            </form>
                        </div> : ''}
            </div>
        </>
    )
}

export default LicenseOverview
