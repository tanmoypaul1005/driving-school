import React, { memo } from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, { packageToggleStatusIndex } from '../../../App/Stores/schoolCategoryStore';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DeActivatePackageModal= memo(({id}) => {

    const { category_id } = useParams();

    const { t } = useTranslation();

    const { setShowPackageDeActivateModal ,showPackageDeActivateModal,packageActivateId,setPackageActivateId} = useSchoolCategoryStore();

    return (
        <div>
            <CommonModal
                showModal={showPackageDeActivateModal}
                setShowModal={setShowPackageDeActivateModal}
                modalTitle="Conformation"
                mainContent={
                    <>
                        <div className='flex items-center justify-center my-s16 body_text'>  
                        {t("Are you sure you want to Inactivate this package?")}</div>
                        <div className='flex items-center justify-center'>
                            <CommonButton
                                width="w-[120px]"
                                roundedFull={false}
                                btnLabel={t('Inactivate')}
                                colorType='warning'
                                onClick={async () => {
                                    const success =   await packageToggleStatusIndex(packageActivateId,category_id);
                                    if (success) {
                                        setPackageActivateId(null)
                                        setShowPackageDeActivateModal(false);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
});

export default DeActivatePackageModal;