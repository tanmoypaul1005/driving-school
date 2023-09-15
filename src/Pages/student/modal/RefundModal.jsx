import React from 'react';

import { useParams } from 'react-router-dom';
import useSchoolStudentStore, { getSchoolStudentShow, schoolStudentBalanceRefund } from '../../../App/Stores/schoolStudentStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';

const RefundModal = () => {

    const { setShowRefundModal, showRefundModal, refundForm, setRefundForm, schoolStudentDetails } = useSchoolStudentStore();

    const { school_student_id } = useParams();

    const { t } = useTranslation();

    const submitRefund = async (e) => {
        e.preventDefault();
        await setRefundForm({ ...refundForm, student_id: school_student_id })
        const success = await schoolStudentBalanceRefund();
        if (success) {
            getSchoolStudentShow(school_student_id);
            setShowRefundModal(false);
            setRefundForm({
                student_id: '',
                amount: "",
                type: "refund",
                comment: ""
            })
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showRefundModal}
                setShowModal={setShowRefundModal}
                modalTitle={t("Refund")}
                mainContent={
                    <div className='mt-s20'>
                        <form onSubmit={submitRefund}>
                            <div className='space-y-4'>
                                <CommonInput
                                    label={t('Write amount')}
                                    placeholder={t('Write amount')}
                                    required={true}
                                    withStar={false}
                                    max_number={schoolStudentDetails?.balance?.actual_balance}
                                    min_number={0}
                                    unnecessaryCharacters={true}
                                    type="number"
                                    value={refundForm.amount}
                                    onChange={(e) => { setRefundForm({ ...refundForm, amount: e.target.value }); }}
                                />

                                <CommonInput
                                    max_input={255}
                                    label={t('Write comment')}
                                    placeholder={t('Write comment')}
                                    required={true}
                                    textarea={true}
                                    withStar={false}
                                    value={refundForm.comment}
                                    onChange={(e) => { setRefundForm({ ...refundForm, comment: e.target.value }) }}
                                />

                                <div className="flex items-center justify-center">
                                    <CommonButton
                                        roundedFull={false}
                                        type='submit'
                                        btnLabel={('Refund')}
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

export default RefundModal;