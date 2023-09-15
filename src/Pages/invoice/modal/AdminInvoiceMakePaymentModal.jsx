import React, { useState } from 'react'
import useNewInvoiceStore, { paySchoolAdminInvoice } from '../../../App/Stores/NewInvoiceStore'
import CommonButton from '../../../Components/Button/CommonButton';
import ImageUploaderWide from '../../../Components/Image/ImageUploaderWide';
import CommonInput from '../../../Components/Input/CommonInput';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import CommonModal from '../../../Components/Modal/CommonModal';

const AdminInvoiceMakePaymentModal = () => {
    const { showAdminInvoicePaymentModal, setShowAdminInvoicePaymentModal } = useNewInvoiceStore();
    const [commentValue, setCommentValue] = useState("");
    const [attachmentValue, setAttachmentValue] = useState("");
    const { t } = useTranslation();

    const { invoice_id, invoice_type } = useParams();
    return (
        <CommonModal
            showModal={showAdminInvoicePaymentModal}
            setShowModal={setShowAdminInvoicePaymentModal}
            modalTitle={t('details of payment')}
            mainContent={

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="pt-5">
                        <ImageUploaderWide
                            valueBase64={attachmentValue}
                            finalBase64={(value) => setAttachmentValue(value)}
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
                            onChange={(e) => { setCommentValue(e.target.value) }}
                        />
                    </div>

                    <div className="flex justify-center pt-5">
                        <CommonButton
                            roundedFull={false}
                            btnLabel={t('submit')}
                            type='submit'
                            onClick={async () => {
                                if (!attachmentValue) return Toastr({ message: "Please upload an attachment", type: "error" });

                                let updateSuccess = await paySchoolAdminInvoice(invoice_id, invoice_type, commentValue, attachmentValue);
                                if (updateSuccess) {
                                    setCommentValue("");
                                    setAttachmentValue("");
                                    setShowAdminInvoicePaymentModal(false);
                                }
                            }}
                        />
                    </div>
                </form>
            }
        />
    )
}

export default AdminInvoiceMakePaymentModal