import React from 'react'
import useNewInvoiceStore, { updateNewInvoiceStatus } from '../../../App/Stores/NewInvoiceStore';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonModal from '../../../Components/Modal/CommonModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InvoiceRejectNote = () => {
    const { showInvoiceRejectModal, setShowInvoiceRejectModal } = useNewInvoiceStore();
    const [commentValue, setCommentValue] = useState("");
    const { invoice_id, invoice_type } = useParams();
    const { t } = useTranslation();
    return (
        <CommonModal
            showModal={showInvoiceRejectModal}
            setShowModal={setShowInvoiceRejectModal}
            modalTitle={t("Rejection reason")}
            mainContent={
                <div>
                    <div className="pt-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <CommonInput
                                max_input={255}
                                withStar={false}
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
                                        let updateSuccess = await updateNewInvoiceStatus(invoice_id, invoice_type, "rejected", commentValue, "");
                                        if (updateSuccess) {
                                            setCommentValue("");
                                            setShowInvoiceRejectModal(false);
                                        }
                                    }}
                                    btnLabel={t('Submit')}
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

export default InvoiceRejectNote