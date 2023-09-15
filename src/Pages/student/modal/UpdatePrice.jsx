/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useEffect } from 'react';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';

const UpdatePrice = () => {

    const {
        newPricePercentage,
        setNewPricePercentage,
        schoolStudentNewReqDetails,
        setShowUpdatePriceModal,
        showUpdatePriceModal,
        setNewReqForm,
        newReqForm
    } = useSchoolStudentStore();

    const { t } = useTranslation();

    const [price, setPrice] = useState("")

    const submitData = async(e) => {
        e.preventDefault();
        if (schoolStudentNewReqDetails?.price_without_moms > price) {
            await setNewReqForm({ ...newReqForm, new_price: price });
            await setNewPricePercentage(((schoolStudentNewReqDetails?.price_without_moms - price) / schoolStudentNewReqDetails?.price_without_moms) * 100)
            setShowUpdatePriceModal(false);
        } else {
            Toastr({ message: t("The new price is higher then the current price"), type: "warning" });
        }
    }

    useEffect(() => {
        setPrice(newPricePercentage === null ? schoolStudentNewReqDetails?.price_without_moms : price ? price : schoolStudentNewReqDetails?.price_without_moms)
    }, [schoolStudentNewReqDetails])

    return (
        <div>
            <CommonModal
                showModal={showUpdatePriceModal}
                setShowModal={setShowUpdatePriceModal}
                modalTitle={t("Update price")}
                mainContent={
                    <div className='mt-s20'>
                        <form onSubmit={submitData}>
                            <div className='space-y-5'>

                                <CommonInput
                                    placeholder={t('Write new price')}
                                    withStar={false}
                                    type="number"
                                    unnecessaryCharacters = {true}
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    label={t('Updated price (Without Moms)')}
                                    required={true}
                                />

                                <div className='text-cRed body_text'>
                                    <div>{t("*New Price cannot exceed the original price")}</div>
                                    <div>{t("*Excluding MOMS amount")}</div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <CommonButton
                                        roundedFull={false}
                                        type='submit'
                                        btnLabel={t('Update')}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    );
};

export default UpdatePrice;