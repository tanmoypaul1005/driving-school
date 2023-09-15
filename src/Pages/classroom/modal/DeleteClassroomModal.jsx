import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useClassroomStore, { deleteSchoolClassroom } from '../../../App/Stores/classroomStore';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';

const DeleteClassroomModal = () => {

    const { setShowEditClassroomModal, showDeleteClassroomModal, setShowDeleteClassroomModal, setClassroomDeleteId } = useClassroomStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showDeleteClassroomModal}
                setShowModal={setShowDeleteClassroomModal}
                modalTitle={t("confirmation")}
                mainContent={
                    <>
                        <div className='my-s16 flex justify-center items-center body_text text-cGray'>
                            {t("Are you sure you want to delete this classroom")} ?
                        </div>
                        <div className='flex justify-center items-center'>
                            <CommonButton btnLabel={t('Delete')} colorType='warning'
                                roundedFull={false}
                                onClick={() => {
                                    const success = deleteSchoolClassroom();
                                    if (success) {
                                        setClassroomDeleteId("")
                                        setShowDeleteClassroomModal(false);
                                        setTimeout(() => {
                                            setShowEditClassroomModal(false)
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

export default DeleteClassroomModal;