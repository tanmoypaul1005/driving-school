/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useSchoolCategoryStore, { schoolCategoryEdit } from '../../../App/Stores/schoolCategoryStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EditDetailsModal = () => {

    const { schoolCategoryDetails, setCategoryEditForm, categoryEditForm, setShowEditSchoolCategoryDetailsModal, showEditSchoolCategoryDetailsModal } = useSchoolCategoryStore();

    useEffect(() => {
        setCategoryEditForm({
            id: schoolCategoryDetails?.id,
            price: schoolCategoryDetails?.price === 0 ? schoolCategoryDetails?.total_lesson_price : schoolCategoryDetails?.price,
            description: schoolCategoryDetails?.description === "null" || schoolCategoryDetails?.description === "null" ? "" : schoolCategoryDetails?.description,
            requirement: schoolCategoryDetails?.requirement === "null" || schoolCategoryDetails?.requirement === "null" ? "" : schoolCategoryDetails?.requirement
        })
    }, [schoolCategoryDetails])

    const { t } = useTranslation();

    const submitData = (e) => {
        e.preventDefault();
        // const price = schoolCategoryDetails?.total_lesson_price
        // if (categoryEditForm?.price !== "" && (price > categoryEditForm?.price || price === categoryEditForm?.price)) {
        //     const success = schoolCategoryEdit();
        //     if (success) {
        //         setShowEditSchoolCategoryDetailsModal(false)
        //     }
        // } else if (categoryEditForm?.price === "") {
        //     const success = schoolCategoryEdit();
        //     if (success) {
        //         setShowEditSchoolCategoryDetailsModal(false)
        //     }
        // } else {
        //     Toastr({ message: `The new price is higher then the current price ${price}`, type: "warning" });
        // }

        const success = schoolCategoryEdit();
        if (success) {
            setShowEditSchoolCategoryDetailsModal(false)
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showEditSchoolCategoryDetailsModal}
                setShowModal={setShowEditSchoolCategoryDetailsModal}
                modalTitle={t("Edit category details")}
                mainContent={
                    <>

                        <form onSubmit={submitData}>
                            <div className='space-y-4 mt-s20'>
                                {/* <CommonInput
                                    type='number'
                                     unnecessaryCharacters = {true}
                                    max_input={7}
                                    required={false}
                                    value={categoryEditForm?.price}
                                    label={t('Update price')}
                                    onChange={(e) => { setCategoryEditForm({ ...categoryEditForm, price: e.target.value }) }}
                                /> */}
                                <CommonInput
                                    type='text'
                                    max_input={255}
                                    value={categoryEditForm?.description}
                                    textarea={true}
                                    placeholder={t('Description')}
                                    label={t('Description')}
                                    onChange={(e) => { setCategoryEditForm({ ...categoryEditForm, description: e.target.value }) }}
                                />
                                <CommonInput
                                    type='text'
                                    max_input={255}
                                    value={categoryEditForm?.requirement}
                                    textarea={true}
                                    placeholder={t('Requirement')}
                                    label={t('Requirement')}
                                    onChange={(e) => { setCategoryEditForm({ ...categoryEditForm, requirement: e.target.value }) }}
                                />

                                <div className='flex justify-center'>
                                    <CommonButton
                                        type='submit'
                                        btnLabel={t("Update")}
                                        roundedFull={false}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default EditDetailsModal;