import React, { useState } from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useNewInvoiceStore, { acceptPaymentAdminSchoolInvoice } from '../../../App/Stores/NewInvoiceStore'
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SchoolAcceptNoteToSystem = () => {
    const { showAdminToSchoolAcceptModal, setShowAdminToSchoolAcceptModal } = useNewInvoiceStore();
    const [commentValue, setCommentValue] = useState("");

    const { invoice_id, invoice_type } = useParams();

    const { t } = useTranslation();

    const OnSubmitHandler = async () => {
        if (commentValue) {
            let acceptSuccess = await acceptPaymentAdminSchoolInvoice(invoice_id, invoice_type, commentValue);
            if (acceptSuccess) {
                setCommentValue("");
                setShowAdminToSchoolAcceptModal(false);
            }
        }
    }

    return (
        <CommonModal
            showModal={showAdminToSchoolAcceptModal}
            setShowModal={setShowAdminToSchoolAcceptModal}
            modalTitle={t("Acceptance note")}
            mainContent={
                <>
                    <form onSubmit={(e) => e.preventDefault()} className="pt-5">
                        <div className="pt-5">
                            <CommonInput
                                max_input={255}
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                withStar={false}
                                textarea={true}
                                required={true}
                                label={t("Acceptance note")}
                                placeholder={t("Acceptance note")}
                            />
                        </div>
                        <div className="flex justify-center pt-5">
                            <CommonButton
                                roundedFull={false}
                                type='submit'
                                btnLabel={t('submit')}
                                onClick={OnSubmitHandler}
                            />
                        </div>
                    </form>
                </>
            }
        />
    )
}

export default SchoolAcceptNoteToSystem