/*  */import React from 'react'
import useNewInvoiceStore, { shareInvoiceDetails } from '../../../App/Stores/NewInvoiceStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { checkValidEmail } from '../../../Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const NewInvoiceShareModal = () => {
    const {
        showInvoiceShareModal,
        setShowInvoiceShareModal,
        invoiceShareForm,
        setInvoiceShareForm
    } = useNewInvoiceStore();

    const { t } = useTranslation();

    return (
        <>
            <CommonModal
                showModal={showInvoiceShareModal}
                setShowModal={setShowInvoiceShareModal}
                modalTitle={t("Share order")}
                widthClass='w-[45vw]'
                mainContent={
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="py-5">
                            <CommonInput
                                withStar={false}
                                label={t("Email")}
                                required={true}
                                type="email"
                                placeholder={t("Enter a valid email")}
                                value={invoiceShareForm?.email ?? ""}
                                onChange={(e) => setInvoiceShareForm({ ...invoiceShareForm, email: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <CommonButton
                                roundedFull={false}
                                width='w-[120px]'
                                btnLabel={t('share')}
                                type='submit'
                                onClick={async () => {
                                    if (checkValidEmail(invoiceShareForm?.email)) {
                                        console.log("SHARE INVOICE: ", invoiceShareForm);
                                        let sendSuccess = await shareInvoiceDetails(invoiceShareForm);
                                        if (sendSuccess) {
                                            // Toastr({ message: ("Invoice Shared Successfully !"), type: "success" });
                                            setShowInvoiceShareModal(false);
                                            setInvoiceShareForm({ ...invoiceShareForm, email: "" })
                                        }
                                    }
                                }}
                            />
                        </div>
                    </form>
                }
            />
        </>
    )
}


export default NewInvoiceShareModal