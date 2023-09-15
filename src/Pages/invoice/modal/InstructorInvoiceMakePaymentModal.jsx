import React, { useState } from 'react'
import useNewInvoiceStore, { updateInstructorInvoiceStatus } from '../../../App/Stores/NewInvoiceStore'
import CommonButton from '../../../Components/Button/CommonButton';
import ImageUploaderWide from '../../../Components/Image/ImageUploaderWide';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonModal from '../../../Components/Modal/CommonModal'
import { useParams } from 'react-router-dom';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const InstructorInvoiceMakePaymentModal = () => {
    const { showInstructorInvoicePaymentModal, setShowInstructorInvoicePaymentModal } = useNewInvoiceStore();
    const { invoice_id, invoice_type } = useParams();
    const [commentValue, setCommentValue] = useState("");
    const [attachmentValue, setAttachmentValue] = useState("");
    const { t } = useTranslation();

    return (
        <CommonModal
            showModal={showInstructorInvoicePaymentModal}
            setShowModal={setShowInstructorInvoicePaymentModal}
            modalTitle={t('details of payment')}
            mainContent={
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="pt-5">
                        <ImageUploaderWide
                            valueBase64={attachmentValue}
                            finalBase64={(e) => {
                                setAttachmentValue(e);
                            }}
                        />
                    </div>
                    <div className="pt-5">
                        <CommonInput
                            max_input={255}
                            required={true}
                            label={t('Comment')}
                            placeholder={t('Write a comment')}
                            textarea={true}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center pt-5">
                        <CommonButton
                            roundedFull={false}
                            btnLabel={t('submit')}
                            type='submit'
                            onClick={async () => {
                                if (!attachmentValue.length > 0) return Toastr({ message: "Please upload an attachment", type: "error" });
                                if (commentValue.length > 0 && attachmentValue.length > 0) {
                                    let updateSuccess = await updateInstructorInvoiceStatus(invoice_id, invoice_type, commentValue, attachmentValue);
                                    if (updateSuccess) {
                                        setAttachmentValue("");
                                        setCommentValue("");
                                        setShowInstructorInvoicePaymentModal(false);
                                    }
                                }
                            }}
                        />
                    </div>
                </form>
            }
        />
    )
}

export default InstructorInvoiceMakePaymentModal