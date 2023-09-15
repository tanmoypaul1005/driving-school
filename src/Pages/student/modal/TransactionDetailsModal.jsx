import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal';
import { formatDate, formatDateOrTime } from '../../../App/Utility/UtilityFunctions';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';
import { useTranslation } from 'react-i18next';


function TransactionDetailsModal() {

    const { setShowTransactionDetailsModal, showTransactionDetailsModal, transactionDetails } = useSchoolStudentStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showTransactionDetailsModal}
                setShowModal={setShowTransactionDetailsModal}
                modalTitle={t("Transaction details")}
                widthClass='w-[650px]'
                mainContent={
                    <>
                        <div className='bg-[#EDF1F8] p-s20 space-y-1 rounded-br8 mt-s20'>

                            {
                                transactionDetails?.transaction_type === 'refund' ?
                                    <RefundView transactionDetails={transactionDetails} />
                                    : transactionDetails?.transaction_type === 'booking' ?
                                        <BookingView transactionDetails={transactionDetails} />
                                        : (transactionDetails?.transaction_type === "payment" && transactionDetails?.payment_method === "manual") ?
                                            <ManualPayView transactionDetails={transactionDetails} />
                                            : <GatewayPayView transactionDetails={transactionDetails} />
                            }

                        </div>
                    </>
                }
            />
        </div>
    )
}

export default TransactionDetailsModal

const RefundView = ({ transactionDetails }) => {

    const { t } = useTranslation();

    return (
        <>
            <CommonList name={t("Status")} value={transactionDetails?.transaction_type ?? "NA"} />
            <CommonList name={t("Form")} value={transactionDetails?.school_name ?? "NA"} />
            <CommonList name={"CVR"} value={transactionDetails?.school_cvr ?? "NA"} />
            <CommonList name={t("Payment type")} value={transactionDetails?.payment_method ?? "NA"} />
            <CommonList name={t("Paid amount")}
                value={transactionDetails?.amount ? `DKK ${transactionDetails?.amount?.toLocaleString("da-DK")}` : "NA"} />
            <CommonList name={t("Payment Date & time")} value={formatDate(transactionDetails?.transaction_date) + ", " + formatDateOrTime(transactionDetails?.transaction_date)} />

            <div className='flex justify-between'>
                <div className='body_text text-cGray capitalize'>{t("Comment")}</div>
                <div className='body_text text-cGray text-capitalize text-lowercase break-all w-[300px] flex justify-end'>
                    {transactionDetails?.comment ? transactionDetails?.comment : "NA"}
                </div>
            </div>

        </>
    )
}

const BookingView = ({ transactionDetails }) => {

    const { t } = useTranslation();

    return (
        <>
            <CommonList name={t("Status")} value={transactionDetails?.transaction_type === "booking" ? transactionDetails?.status : transactionDetails?.transaction_type} />
            <CommonList name={t("Sent to")} value={transactionDetails?.school_name ?? "NA"} />
            <CommonList name={"CVR"} value={transactionDetails?.school_cvr ?? "NA"} />
            <CommonList name={t("Lesson name")} value={transactionDetails?.title ?? "NA"} />
            <CommonList name={t("Price")} value={transactionDetails?.amount?.toLocaleString("da-DK") ?? "NA"} />
            <CommonList name={t("Instructor name")} value={transactionDetails?.instructor_name ?? "NA"} />
            <CommonList name={t("Booking Date & time")} value={formatDate(transactionDetails?.transaction_date) + ", " + formatDateOrTime(transactionDetails?.transaction_date)} />

            <div className='flex justify-between'>
                <div className='body_text text-cGray capitalize'>{t("Comment")}</div>
                <div className='body_text text-cGray text-capitalize text-lowercase break-all w-[300px] flex justify-end'>
                    {transactionDetails?.comment ? transactionDetails?.comment : "NA"}
                </div>
            </div>
        </>
    )
}

const ManualPayView = ({ transactionDetails }) => {

    const { t } = useTranslation();

    return (
        <>
            <CommonList name={t("Status")} value={'paid'} />
            <CommonList name={t("Sent to")} value={transactionDetails?.school_name ?? "NA"} />
            <CommonList name={"CVR"} value={transactionDetails?.school_cvr ?? "NA"} />
            <CommonList name={t("Payment type")} value={transactionDetails?.payment_method ?? "NA"} />
            <CommonList name={t("Paid amount")}
                value={transactionDetails?.amount ? `DKK ${transactionDetails?.amount?.toLocaleString("da-DK")}` : "NA"} />
            <CommonList name={t("Payment Date & Time")} value={formatDate(transactionDetails?.transaction_date) + ", " + formatDateOrTime(transactionDetails?.transaction_date)} />
            <div className='flex justify-between'>
                <div className='body_text text-cGray capitalize'>{t("Comment")}</div>
                <div className='body_text text-cGray text-capitalize text-lowercase break-all w-[300px] flex justify-end'>
                    {transactionDetails?.comment ? transactionDetails?.comment : "NA"}
                </div>
            </div>
        </>
    )
}

const GatewayPayView = ({ transactionDetails }) => {
    const { t } = useTranslation();
    return (
        <>
            <CommonList name={t("Status")} value={'paid'} />
            <CommonList name={t("Sent to")} value={transactionDetails?.school_name ?? "NA"} />
            <CommonList name={"CVR"} value={transactionDetails?.school_cvr ?? "NA"} />
            <CommonList name={t("Transaction ID")} value={transactionDetails?.freepay_transaction_id ?? "NA"} />
            <CommonList name={t("Authorization ID")} value={transactionDetails?.freepay_authorization_id ?? "NA"} />
            <CommonList name={t("Paid amount")}
                value={transactionDetails?.amount ? `DKK ${transactionDetails?.amount?.toLocaleString("da-DK")}` : "NA"} />
            <CommonList name={t("Payment Date & time")} value={formatDate(transactionDetails?.transaction_date) + ", " + formatDateOrTime(transactionDetails?.transaction_date)} />
            <CommonList name={t("MaskedPan")} value={transactionDetails?.freepay_masked_number ?? "NA"} />
            <div className='flex justify-between'>
                <div className='body_text text-cGray capitalize'>{t("Comment")}</div>
                <div className='body_text text-cGray text-capitalize text-lowercase break-all w-[300px] flex justify-end'>
                    {transactionDetails?.comment ? transactionDetails?.comment : "NA"}
                </div>
            </div>
        </>
    )
}

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='body_text text-cGray capitalize'>{name ? name : 'NA'}</div>
            <div className='body_text text-cGray capitalize text-lowercase break-all'>{value ? value : 'NA'}</div>
        </div>
    )
}