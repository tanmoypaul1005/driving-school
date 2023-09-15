import React, { useState } from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useNewInvoiceStore, { payAdminSchoolInvoice } from '../../../App/Stores/NewInvoiceStore'
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminToSchoolPayModal = () => {
    const { showAdminToSchoolPayModal, setShowAdminToSchoolPayModal } = useNewInvoiceStore();

    const { invoice_id, invoice_type } = useParams();

    const [commentValue, setCommentValue] = useState("");

    const { t } = useTranslation();

    const OnSubmitHandler = async () => {
        if (commentValue) {
            let paymentSuccess = await payAdminSchoolInvoice(invoice_id, invoice_type, commentValue);
            if (paymentSuccess) {
                setCommentValue("");
                setShowAdminToSchoolPayModal(false);
            }
        }
    }

    return (

        <CommonModal
            showModal={showAdminToSchoolPayModal}
            setShowModal={setShowAdminToSchoolPayModal}
            modalTitle={t("details of payment")}
            mainContent={
                <>
                    <form onSubmit={(e) => e.preventDefault()} className="pt-5">
                        <CommonInput
                            max_input={255}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}

                            label={t("Payment note")}
                            type="text"
                            textarea={true}
                            placeholder={t("Payment note")}
                            required={true}
                        />
                        <div className="flex justify-center pt-5">
                            <CommonButton
                                btnLabel={t('submit')}
                                roundedFull={false}

                                type='submit'
                                onClick={OnSubmitHandler}
                            />
                        </div>
                    </form>
                </>
            }
        />
    )
}

export default AdminToSchoolPayModal