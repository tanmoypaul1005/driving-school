
import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonModal from '../../../Components/Modal/CommonModal';
import { roughLicenseDurationFormatter } from '../../../App/Utility/UtilityFunctions';
import useProfileStore from '../../../App/Stores/profileStore';
import { htmlToPlainText } from '../../../Utility/UtilityFunctions';

const LicenseOverViewDetails = () => {

    const { licenseStatus, licenseOverViewDetails, showLicenseOverViewDetailsModal, setShowLicenseOverViewDetailsModal } = useProfileStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showLicenseOverViewDetailsModal}
                setShowModal={setShowLicenseOverViewDetailsModal}
                modalSpace={true}
                modalTitle={t("License details")}
                widthClass='w-[45vw]'
                mainContent={
                    <>
                        <div className='space-y-1 bg-cBackgroundAndCategory p-s20 rounded-br8 my-s20'>
                            {licenseStatus && 
                            <CommonList name={t("Status")}value="Active" />}
                            <CommonList name={t("License name")} value={licenseOverViewDetails?.title ?? 'NA'} />
                            <CommonList name={t("Duration")} value={roughLicenseDurationFormatter(licenseOverViewDetails?.duration)} />
                            <CommonList
                                name={t("Price")}
                                value={licenseOverViewDetails?.main_price ? `DKK ${licenseOverViewDetails?.main_price?.toLocaleString("da-DK")}` : 'NA'}
                            />
                            <CommonList
                                name={`${t("Including")} MOMS`}
                                value={licenseOverViewDetails?.price ? `DKK ${licenseOverViewDetails?.price?.toLocaleString("da-DK")}` : 'NA'}
                            />
                        </div>

                        <div className='sub_title text-cBlack'>{t("Description")}</div>
                        <div className='break-all body_text text-cGray mt-s4'>
                            {htmlToPlainText(licenseOverViewDetails?.details)}
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default LicenseOverViewDetails;

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='capitalize body_text text-cGray'>{name ? name : 'NA'}</div>
            <div className='break-all body_text text-cGray text-capitalize text-lowercase'>{value ? value : 'NA'}</div>
        </div>
    )
}