import React from 'react';
import useSettingsStore from '../../../App/Stores/SettingsStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BankInfoEditModal = () => {

    const { setShowEditBankInfoModal, showEditBankInfoModal } = useSettingsStore();

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showEditBankInfoModal}
                setShowModal={setShowEditBankInfoModal}
                modalTitle={t("Confirmation")}
                mainContent={
                    <>
                        <div className='flex justify-center py-s20 font-fw600 text-fs14 text-[#39394D]'>
                            {t("You can not update your bank information. Please contact us to update.")}
                        </div>
                        <div onClick={() => {
                            setShowEditBankInfoModal(false)
                            navigateTo("/settings/school/contact-us")
                        }} className='flex justify-center cursor-pointer font-fw600 text-fs16 text-cBrand'>
                            {t("Contact us")}
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default BankInfoEditModal;