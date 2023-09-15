import React, { memo } from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, { deleteLessonFn  } from '../../../App/Stores/schoolCategoryStore';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeleteLessonModal = memo(() => {

    const { category_id } = useParams();

    const { t } = useTranslation();

    const { setShowEditCategoryListLessonModal, setSchoolCategoryLessonDeleteId, showDeleteCategoryListLessonModal, setShowDeleteCategoryListLessonModal } = useSchoolCategoryStore();

    return (
        <div>
            <CommonModal
                showModal={showDeleteCategoryListLessonModal}
                setShowModal={setShowDeleteCategoryListLessonModal}
                modalTitle="Conformation"
                mainContent={
                    <>
                        <div className='flex items-center justify-center my-s16 body_text'>{t('Are you sure you want to delete this lesson ?')}</div>
                        <div className='flex items-center justify-center'>
                            <CommonButton
                                width="w-[120px]"
                                roundedFull={false}
                                btnLabel={t('Delete')}
                                colorType='warning'
                                onClick={async () => {
                                    const success = deleteLessonFn(category_id);
                                    if (success) {
                                        await setSchoolCategoryLessonDeleteId("")
                                        setShowDeleteCategoryListLessonModal(false);
                                        setTimeout(() => {
                                            setShowEditCategoryListLessonModal(false)
                                        }, 300);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
});

export default DeleteLessonModal;