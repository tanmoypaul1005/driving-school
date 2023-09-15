import React, { memo } from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, {  deleteSchoolCategoryPackage } from '../../../App/Stores/schoolCategoryStore';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeletePackageModal= memo(({id}) => {

    const { category_id } = useParams();

    const { t } = useTranslation();

    const { setShowDeletePackageModal ,showDeletePackageModal,setShowEditPackageModal} = useSchoolCategoryStore();

    return (
        <div>
            <CommonModal
                showModal={showDeletePackageModal}
                setShowModal={setShowDeletePackageModal}
                modalTitle="Conformation"
                mainContent={
                    <>
                        <div className='flex items-center justify-center my-s16 body_text'>{t('Are you sure you want to delete this package ?')}</div>
                        <div className='flex items-center justify-center'>
                            <CommonButton
                                width="w-[120px]"
                                roundedFull={false}
                                btnLabel={t('Delete')}
                                colorType='warning'
                                onClick={async () => {
                                    const success = deleteSchoolCategoryPackage(id,category_id);
                                    if (success) {
                                        setShowDeletePackageModal(false);
                                        setTimeout(() => {
                                            setShowEditPackageModal(false)
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

export default DeletePackageModal;