import React from 'react'
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import { useTranslation } from 'react-i18next';

const InvoicePaymentDetailsModal = () => {

    const { showInvoicePaymentDetailsModal, setShowInvoicePaymentDetailsModal, invoiceBalanceDetailsData } = useNewInvoiceStore();
    const { t } = useTranslation();
    return (
        <CommonModal
            showModal={showInvoicePaymentDetailsModal}
            setShowModal={setShowInvoicePaymentDetailsModal}
            modalTitle={t('payment details')}
            mainContent={
                <div>
                    <div className="mt-5 space-y-2 bg-cSettingsOptionBgColor p-5 rounded-[8px]">
                        {
                            invoiceBalanceDetailsData?.length > 0 ? invoiceBalanceDetailsData?.map((item, index) => {
                                return (
                                    <DetailsDataRows
                                        key={index}
                                        title={item.title}
                                        data={item.data === 'success' ? "Payment" : item.data}
                                    />
                                )
                            })
                                : <span>{t("No data found")}</span>
                        }
                    </div>
                </div>
            }
        />
    )
}

export default InvoicePaymentDetailsModal

const DetailsDataRows = ({
    title = "some title",
    data = "some data"
}) => {
    return (
        <div className='flex items-center justify-between body_text text-cGray'>
            <div className='w-full'>{title}</div>
            <div title={data} className='text-right break-words truncate w-full'>{data}</div>
        </div>
    )
}