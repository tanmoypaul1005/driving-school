import React from 'react'
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore'
import CommonModal from '../../../Components/Modal/CommonModal';
import { iDrivingCard, iExternalCard, iInstructorCard } from '../../../App/Utility/source';
import { useTranslation } from 'react-i18next';

const InvoiceLessonListModal = () => {
    const { showInvoiceLessonModal, setShowInvoiceLessonModal, invoiceDetailsData } = useNewInvoiceStore();
    const { t } = useTranslation();
    return (
        <div>
            <CommonModal
                showModal={showInvoiceLessonModal}
                setShowModal={setShowInvoiceLessonModal}
                modalTitle={t("Invoice lesson")}
                mainContent={
                    <div className='pt-5 space-y-1.5'>
                        {invoiceDetailsData?.lessons?.length > 0 ?
                            invoiceDetailsData?.lessons?.map((item, index) =>
                                <LessonRow key={index} data={item} />
                            ) : ""
                        }

                    </div>
                }
            />
        </div>
    )
}

export default InvoiceLessonListModal

const LessonRow = ({ data }) => {
    const { invoicePriceChangeFactor } = useNewInvoiceStore();
    return (
        <div className='flex justify-between bg-cInvoiceLesson px-s10 py-s5 rounded-br8'>
            <div className='flex'>
                <div className='flex justify-center items-center bg-cWhite rounded-full w-[50px] h-[50px]'>
                    <img className='w-full h-full p-2' src={data?.type === "driving" ? iDrivingCard : data?.type === "external" ? iExternalCard : data?.type === "classroom" ? iInstructorCard : ""} alt="" />
                </div>

                <div className='ml-s12 flex justify-center items-center'>
                    <div>
                        <div className='text-[#202020] text-fs14 font-fw600 capitalize'>{data?.name}</div>
                        <div className='text-[#202020] body_text'>{data?.duration}</div>
                    </div>
                </div>
            </div>

            <div className='small_body_text text-[#202020] flex justify-center items-center'>
                DKK {
                    invoicePriceChangeFactor !== 100 ?
                        Math.round(data?.price - (data?.price * (Math.abs(invoicePriceChangeFactor) / 100)))?.toLocaleString("da-DK"):
                        data?.price?.toLocaleString("da-DK")
                }
            </div>
        </div>
    )
}