import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useClassStore, { deleteSchoolClass } from '../../../App/Stores/classStore';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';
import useDashboardStore, { getDashboard } from '../../../App/Stores/dashboardStore';

const DeleteClassModal = () => {

    const { setShowDeleteClassModal, showDeleteClassModal, setShowEditClassModal, setSchoolDeleteId } = useClassStore();

    const { t } = useTranslation();

    const { pendingBookingLessonsUpdate,pendingBookingLessonsUrl} = useDashboardStore();

    return (
        <div>
            <CommonModal
                showModal={showDeleteClassModal}
                setShowModal={setShowDeleteClassModal}
                modalTitle={t("Confirmation")}
                mainContent={
                    <>
                        <div className='mt-s16 mb-s16 flex justify-center items-center body_text text-cGray'>{t('Are you sure you want to delete this class ?')}</div>
                        <div className='flex justify-center items-center'>
                            <CommonButton
                                roundedFull={false}
                                btnLabel={t('Delete')}
                                colorType='warning'
                                onClick={() => {
                                    const success = deleteSchoolClass();
                                    if (success) {
                                        setSchoolDeleteId("")
                                        pendingBookingLessonsUpdate && getDashboard(pendingBookingLessonsUrl);
                                        setShowDeleteClassModal(false);
                                        setTimeout(() => {
                                            setShowEditClassModal(false)
                                        }, 300);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default DeleteClassModal;