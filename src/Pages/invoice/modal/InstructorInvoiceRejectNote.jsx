import React from 'react'
import useNewInvoiceStore, { updateInstructorInvoiceReject } from '../../../App/Stores/NewInvoiceStore';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonModal from '../../../Components/Modal/CommonModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InstructorInvoiceRejectNote = () => {
    const { showInstructorInvoiceRejectModal, setShowInstructorInvoiceRejectModal } = useNewInvoiceStore();
    const [commentValue, setCommentValue] = useState("");
    const { invoice_id, invoice_type } = useParams();
    const { t } = useTranslation();
    return (
        <CommonModal
            showModal={showInstructorInvoiceRejectModal}
            setShowModal={setShowInstructorInvoiceRejectModal}
            modalTitle={t("Rejection reason")}
            mainContent={
                <div>
                    <div className="pt-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <CommonInput
                                max_input={255}
                                label={t("Rejection reason")}
                                value={commentValue}
                                onChange={(e) => { setCommentValue(e.target.value) }}
                                placeholder={t('Write a rejection reason')}
                                required={true}
                                textarea={true}
                            />

                            <div className="flex justify-center pt-5">
                                <CommonButton
                                    roundedFull={false}
                                    onClick={async () => {
                                        console.log(invoice_id, invoice_type, "rejected", commentValue, "");
                                        let updateSuccess = await updateInstructorInvoiceReject(invoice_id, invoice_type, commentValue);
                                        if (updateSuccess) {
                                            setCommentValue("");
                                            setShowInstructorInvoiceRejectModal(false);
                                        }
                                    }}
                                    btnLabel={t('submit')}
                                    type='submit'
                                    colorType='danger'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    )
}

export default InstructorInvoiceRejectNote