import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore'
import { iDrivingCard, iExternalCard, iInstructorCard } from '../../../App/Utility/source';
import { useTranslation } from 'react-i18next';

const InvoiceDetailsLessonList = () => {
    const { showInvoiceDetailsLessonList, setShowInvoiceDetailsLessonList, invoiceDetailsLessonModalData } = useNewInvoiceStore();
    const { t } = useTranslation();
    return (
        <CommonModal
            showModal={showInvoiceDetailsLessonList}
            setShowModal={setShowInvoiceDetailsLessonList}
            modalTitle={invoiceDetailsLessonModalData?.title}
            mainContent={
                <div className='pt-5 space-y-2'>
                    {
                        invoiceDetailsLessonModalData?.dataArray?.length > 0 ?
                            invoiceDetailsLessonModalData?.dataArray?.map((item, index) =>
                                <LessonRow key={index} data={item} type={invoiceDetailsLessonModalData?.type} />
                            )
                            : <div className='flex justify-center text-cTextGray font-semibold'>{t("No lesson available here")}</div>
                    }
                </div>
            }
        />
    )
}

export default InvoiceDetailsLessonList

const LessonRow = ({ data, type }) => {
    return (
        <div>
            <div className='flex justify-between bg-cInvoiceLesson px-s10 py-s5 rounded-br10'>
                <div className='flex'>
                    <div className='flex justify-center items-center bg-cWhite rounded-full w-[50px] h-[50px]'>
                        <img src={type === "classroom" ? iInstructorCard : type === "driving" ? iDrivingCard : type === "external" ? iExternalCard : ""} alt="" />
                    </div>

                    <div className='ml-s12 flex justify-center items-center'>
                        <div>
                            <div className='text-[#202020] text-fs14 font-fw600'>{data?.lesson_name}</div>
                            <div className='text-[#202020] text-fs12 font-fw400'>{data?.date}</div>
                        </div>
                    </div>
                </div>

                <div className='text-fs12 text-[#202020] flex justify-center items-center'>
                    {data?.durationf}
                </div>
            </div>
        </div>
    )
}