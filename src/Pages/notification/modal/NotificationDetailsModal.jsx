import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonModal from '../../../Components/Modal/CommonModal';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import useNotificationStore from '../../../App/Stores/notificationStore';

const NotificationDetailsModal = () => {

    const { notificationDetails, showNotificationDetailsModal, setShowNotificationDetailsModal } = useNotificationStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showNotificationDetailsModal}
                setShowModal={setShowNotificationDetailsModal}
                modalTitle={t("Notification details")}
                mainContent={
                    <>
                        <div className='flex justify-between mt-s8'>
                            <div className='flex items-center font-fw600 text-fs14 text-cBlack'>{notificationDetails?.title}</div>
                            <div className='flex items-center body_text text-cGray pt-s4'>
                                {`${formatDate(notificationDetails?.created_date)}, ${notificationDetails?.created_time}`}
                            </div>
                        </div>
                        <div className='body_text text-cGray'>
                            {notificationDetails?.description}
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default NotificationDetailsModal;