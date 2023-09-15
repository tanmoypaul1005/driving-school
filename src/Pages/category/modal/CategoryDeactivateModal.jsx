import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSchoolCategoryStore, { schoolCategoryToggleIndex } from '../../../App/Stores/schoolCategoryStore';

const CategoryDeactivateModal = () => {

    const {setShowSchoolCategoryListDeactivateModal,showSchoolCategoryListDeactivateModal}=useSchoolCategoryStore();

    const { category_id } = useParams();

    const {t}=useTranslation();

    const toggleStatus=async ()=>{
        let value=await schoolCategoryToggleIndex(category_id);
        if(value) return setShowSchoolCategoryListDeactivateModal(false)
    }

    return (
        <div>
            <CommonModal
            showModal={showSchoolCategoryListDeactivateModal}
            setShowModal={setShowSchoolCategoryListDeactivateModal}
            modalTitle={t("Confirmation")}
            mainContent={
               <>
                 <div className='flex justify-center body_text text-cHighlighted my-s16'>
                    {t("Are you sure you want to Inactivate this category?")}
                </div>
               <div className='flex justify-center'>
               <CommonButton width='w-[120px]' roundedFull={false} onClick={()=>{toggleStatus()}} btnLabel={t("Inactive")} colorType="warning" />
               </div>
               </>
            }
            />
        </div>
    );
};

export default CategoryDeactivateModal;