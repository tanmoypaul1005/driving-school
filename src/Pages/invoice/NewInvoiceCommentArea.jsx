import React, { useEffect, useState } from 'react'
import NewInvoiceComment from './NewInvoiceComment'
import { useParams } from 'react-router-dom'
import useNewInvoiceStore, { commonInvoiceReminder, commonRemindAdmin } from '../../App/Stores/NewInvoiceStore';
import { NACheck, valueCheck } from '../../Utility/UtilityFunctions';
import CommonButtonOutlined from '../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../Components/Button/CommonButton';
import Image from '../../Components/Image/Image';
import { iImageIogo } from '../../App/Utility/source';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../App/Utility/UtilityFunctions';

const NewInvoiceCommentArea = () => {
    const { invoice_type } = useParams();
    return (
        <div>
            {
                invoice_type === 'admission_invoice' ?
                    <StudentSchoolComments />
                    : invoice_type === 'instructor_invoice' ?
                        <InstructorSchoolComments />
                        : invoice_type === 'license_invoice' ?
                            <SchoolAdminComments />
                            : invoice_type === 'system_generated' ?
                                <AdminSchoolComments />
                                : invoice_type === 'freepay_school' ?
                                    <AdminSchoolCommentsSchoolWeb />
                                    : ""
            }

        </div>
    )
}

export default NewInvoiceCommentArea

// e            student              
const StudentSchoolComments = () => {
    const { invoiceDetailsData, setShowInvoiceAcceptModal, setShowInvoiceRejectModal } = useNewInvoiceStore();
    const { invoice_id, invoice_type } = useParams();
    const { t } = useTranslation();
    return (
        <div className='space-y-2'>

            {/*e        ARC comment      */}
            {
                valueCheck(invoiceDetailsData?.action_dates?.accepted)
                    || valueCheck(invoiceDetailsData?.action_dates?.rejected)
                    || valueCheck(invoiceDetailsData?.action_dates?.cancelled)
                    ?
                    <NewInvoiceComment
                        commentDate={
                            valueCheck(invoiceDetailsData?.action_dates?.accepted) ? invoiceDetailsData?.action_dates?.accepted
                                : valueCheck(invoiceDetailsData?.action_dates?.rejected) ? invoiceDetailsData?.action_dates?.rejected
                                    : valueCheck(invoiceDetailsData?.action_dates?.cancelled) ? invoiceDetailsData?.action_dates?.cancelled
                                        : " "
                        }
                        label={
                            invoiceDetailsData?.status === "rejected" ? t('rejection note')
                                : invoiceDetailsData?.status === "cancelled" ? t('cancellation note')
                                    : invoiceDetailsData?.status === "accepted" ? t('student note')
                                        : invoiceDetailsData?.status === "completed" ? t('student note')
                                            : '... note'
                        }
                        commentText={NACheck(invoiceDetailsData?.a_r_c_note)}
                    /> : ''}

            {/*e        school create comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.created) ?
                <NewInvoiceComment
                    commentDate={valueCheck(invoiceDetailsData?.action_dates?.created) ? invoiceDetailsData?.action_dates?.created : " "}
                    label={t('school note')}
                    commentText={NACheck(invoiceDetailsData?.invoice_note)}
                // withRemindAction={invoiceDetailsData?.is_remind ? true : false}
                />
                : ''}


            {/*g        student request comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.requested) ?
                <NewInvoiceComment
                    commentDate={valueCheck(invoiceDetailsData?.action_dates?.requested) ? invoiceDetailsData?.action_dates?.requested : " "}
                    label={t('student note')}
                    commentText={NACheck(invoiceDetailsData?.student_note)}
                />
                : ""}

            {/* y   student action button area...*/}
            <div className='pt-5'>
                {invoiceDetailsData?.status === "requested" ?
                    <div className="flex justify-between items-center">
                        <CommonButtonOutlined
                            isFullRounded={false}
                            btnLabel={t('Reject')}
                            colorType='danger'
                            onClick={() => {
                                setShowInvoiceRejectModal(true);
                            }}
                        />
                        <CommonButton
                            roundedFull={false}
                            btnLabel={t('Accept')}
                            onClick={() => {
                                setShowInvoiceAcceptModal(true);
                            }}
                        />
                    </div>
                    : invoiceDetailsData?.is_remind ?
                        <div className="flex justify-end">
                            <CommonButton
                                roundedFull={false}
                                btnLabel={
                                    invoice_type === 'admission_invoice' ? t('Remind Student')
                                        : invoice_type === 'instructor_invoice' ? t('remind instructor')
                                            : invoice_type === 'license_invoice' ? t('remind admin')
                                                : ''
                                }
                                onClick={() => {
                                    commonInvoiceReminder(invoice_id, invoice_type,
                                        invoice_type === 'admission_invoice' ? 'school_student'
                                            : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                                : invoice_type === 'license_invoice' ? 'admin_lisence'
                                                    : ''
                                    )
                                }}
                            />
                        </div>
                        : ""
                }
            </div>

        </div>
    )
}

// l            instructor              
const InstructorSchoolComments = () => {
    const { invoiceDetailsData, setShowInstructorInvoicePaymentModal, setShowInstructorInvoiceRejectModal } = useNewInvoiceStore();
    const { invoice_id, invoice_type } = useParams();
    const { t } = useTranslation();

    const [attachmentOne, setAttachmentOne] = useState({});
    const [attachmentTwo, setAttachmentTwo] = useState({});

    useEffect(() => {
        if (invoiceDetailsData?.invoice_attachments) {
            if (invoiceDetailsData?.invoice_attachments?.length === 1) {
                setAttachmentOne(invoiceDetailsData?.invoice_attachments[0]);
                setAttachmentTwo({});
            } else {
                setAttachmentOne(invoiceDetailsData?.invoice_attachments[1]);
                setAttachmentTwo(invoiceDetailsData?.invoice_attachments[0]);
            }
        }
    }, [invoiceDetailsData]);

    return (
        <div className='space-y-2'>

            {/*e        ARC comment      */}
            {
                valueCheck(invoiceDetailsData?.action_dates?.accepted)
                    || valueCheck(invoiceDetailsData?.action_dates?.rejected)
                    || valueCheck(invoiceDetailsData?.action_dates?.cancelled)
                    ?
                    <NewInvoiceComment
                        commentDate={
                            valueCheck(invoiceDetailsData?.action_dates?.accepted) ? invoiceDetailsData?.action_dates?.accepted
                                : valueCheck(invoiceDetailsData?.action_dates?.rejected) ? invoiceDetailsData?.action_dates?.rejected
                                    : valueCheck(invoiceDetailsData?.action_dates?.cancelled) ? invoiceDetailsData?.action_dates?.cancelled
                                        : " "
                        }
                        label={
                            invoiceDetailsData?.status === "rejected" ? t('rejection note') : invoiceDetailsData?.status === "cancelled" ? t('cancellation note')
                                : invoiceDetailsData?.status === "accepted" ? t('instructor note')
                                    : invoiceDetailsData?.status === "completed" ? t('instructor note')
                                        : '... note'
                        }
                        commentText={NACheck(invoiceDetailsData?.a_r_c_note)}
                    /> : ''}


            {/*e        school missing2 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.missing2) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.missing2}
                    label={t('Missing payment note')}
                    commentText={NACheck(attachmentTwo?.reply)}
                />
                : ''}

            {/*e        school paid2 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid2) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.paid2}
                    label={t('school note')}
                    commentText={NACheck(attachmentTwo?.payment_details)}
                />
                : ''
            }
            {
                attachmentTwo?.attachment ?
                    <div className='pb-2'>
                        <Image dummyImage={iImageIogo} withPreview={true} src={attachmentTwo?.attachment} alt="" className="w-auto object-contain h-[250px] rounded-lg" />
                    </div>
                    : ""
            }

            {/*e        school missing1 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.missing1) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.missing1}
                    label={t('Missing payment note')}
                    commentText={NACheck(attachmentOne?.reply)}
                />
                : ''}

            {/*e        school paid1 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid1) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.paid1}
                    label={t('school note')}
                    commentText={NACheck(attachmentOne?.payment_details)}
                />
                : ''}
            {
                attachmentOne?.attachment ?
                    <div className='pb-2'>
                        <Image dummyImage={iImageIogo} withPreview={true} src={attachmentOne?.attachment} alt="" className="w-auto object-contain h-[250px] rounded-lg" />
                    </div>
                    : ""
            }


            {/*g        instructor create comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.created) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.created}
                    label={t('instructor note')}
                    commentText={NACheck(invoiceDetailsData?.instructor_note)}
                />
                : ""}

            {/* y   instructor action button area...*/}
            <div className='pt-5'>
                {invoiceDetailsData?.status === "created" ?
                    <div className="flex justify-between items-center">
                        <CommonButtonOutlined
                            isFullRounded={false}
                            btnLabel={t('Reject')}
                            colorType='danger'
                            onClick={() => {
                                setShowInstructorInvoiceRejectModal(true);
                            }}
                        />
                        <CommonButton
                            roundedFull={false}
                            btnLabel={t('make payment')}
                            onClick={() => {
                                setShowInstructorInvoicePaymentModal(true);
                            }}
                        />
                    </div>
                    : invoiceDetailsData?.status === "missing1" ?
                        <div className='flex flex-row-reverse'>
                            <CommonButton
                                roundedFull={false}
                                btnLabel={t('make payment')}
                                onClick={() => {
                                    setShowInstructorInvoicePaymentModal(true);
                                }}
                            />
                        </div>
                        : invoiceDetailsData?.status === "missing2" ?
                            <div className="flex justify-end">
                                <CommonButton
                                    width='w-[180px]'
                                    btnLabel={t('contact admin')}
                                    roundedFull={false}
                                    onClick={() => {
                                        commonRemindAdmin(invoice_id, invoice_type);
                                    }}
                                />
                            </div>
                            : invoiceDetailsData?.is_remind ?
                                <div className="flex justify-end">
                                    <CommonButton
                                        roundedFull={false}
                                        btnLabel={
                                            invoice_type === 'admission_invoice' ? t('Remind Student')
                                                : invoice_type === 'instructor_invoice' ? t('remind instructor')
                                                    : invoice_type === 'license_invoice' ? t('remind admin')
                                                        : ''
                                        }
                                        onClick={() => {
                                            commonInvoiceReminder(invoice_id, invoice_type,
                                                invoice_type === 'admission_invoice' ? 'school_student'
                                                    : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                                        : invoice_type === 'license_invoice' ? 'admin_lisence'
                                                            : ''
                                            )
                                        }}
                                    />
                                </div>
                                : ""
                }
            </div>

        </div>
    )
}

// y            school->admin              
const SchoolAdminComments = () => {
    const { invoiceDetailsData, setShowAdminInvoicePaymentModal, setShowAdminInvoiceCancelModal } = useNewInvoiceStore();
    const { invoice_id, invoice_type } = useParams();

    const [attachmentOne, setAttachmentOne] = useState({});
    const [attachmentTwo, setAttachmentTwo] = useState({});

    const { t } = useTranslation();

    useEffect(() => {
        if (invoiceDetailsData?.invoice_attachments) {
            if (invoiceDetailsData?.invoice_attachments?.length === 1) {
                setAttachmentOne(invoiceDetailsData?.invoice_attachments[0]);
                setAttachmentTwo({});
            } else {
                setAttachmentOne(invoiceDetailsData?.invoice_attachments[1]);
                setAttachmentTwo(invoiceDetailsData?.invoice_attachments[0]);
            }
        }
    }, [invoiceDetailsData]);

    return (
        <div className='space-y-2'>

            {/*e        ARC comment      */}
            {
                valueCheck(invoiceDetailsData?.action_dates?.accepted)
                    || valueCheck(invoiceDetailsData?.action_dates?.rejected)
                    || valueCheck(invoiceDetailsData?.action_dates?.cancelled)
                    ?
                    <NewInvoiceComment
                        commentDate={
                            valueCheck(invoiceDetailsData?.action_dates?.accepted) ? invoiceDetailsData?.action_dates?.accepted
                                : valueCheck(invoiceDetailsData?.action_dates?.rejected) ? invoiceDetailsData?.action_dates?.rejected
                                    : valueCheck(invoiceDetailsData?.action_dates?.cancelled) ? invoiceDetailsData?.action_dates?.cancelled
                                        : " "
                        }
                        label={
                            invoiceDetailsData?.status === "rejected" ? t('rejection note')
                                : invoiceDetailsData?.status === "cancelled" ? t('cancellation note')
                                    : invoiceDetailsData?.status === "accepted" ? t('admin note')
                                        : invoiceDetailsData?.status === "expired" ? t('admin note')
                                            : '... note'
                        }
                        commentText={valueCheck(invoiceDetailsData?.a_r_c_note)}
                    /> : ''}


            {/*e        school missing2 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.missing2) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.missing2}
                    label={t('Missing payment note')}
                    commentText={NACheck(attachmentTwo?.reply)}
                />
                : ''}

            {/*e        school paid2 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid2) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.paid2}
                    label={t('school note')}
                    commentText={NACheck(attachmentTwo?.payment_details)}
                />
                : ''
            }
            {
                attachmentTwo?.attachment ?
                    <div className='pb-2'>
                        <Image dummyImage={iImageIogo} withPreview={true} src={attachmentTwo?.attachment} alt="" className="w-auto object-contain h-[250px] rounded-lg" />
                    </div>
                    : ""
            }

            {/*e        school missing1 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.missing1) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.missing1}
                    label={t('Missing payment note')}
                    commentText={NACheck(attachmentOne?.reply)}
                />
                : ''}

            {/*e        school paid1 comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid1) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.paid1}
                    label={t('school note')}
                    commentText={NACheck(attachmentOne?.payment_details)}
                />
                : ''}
            {
                attachmentOne?.attachment ?
                    <div className='pb-2'>
                        <Image dummyImage={iImageIogo} withPreview={true} src={attachmentOne?.attachment} alt="" className="w-auto object-contain h-[250px] rounded-lg" />
                    </div>
                    : ""
            }


            {/*l        admin create comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.created) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.created}
                    label={t('admin note')}
                    commentText={NACheck(invoiceDetailsData?.invoice_comment)}
                />
                : ""}


            {/*g        school request comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.requested) ?
                <NewInvoiceComment
                    commentDate={invoiceDetailsData?.action_dates?.requested}
                    label={t('school note')}
                    commentText={NACheck(invoiceDetailsData?.request_comment)}
                />
                : ""}

            {/* y   instructor action button area...*/}
            <div className='pt-5'>
                {
                    invoiceDetailsData?.status === "requested" ?
                        <div className={`flex ${invoiceDetailsData?.is_remind ? "justify-between" : 'justify-end'}  items-center`}>
                            <CommonButtonOutlined
                                isFullRounded={false}
                                btnLabel={t('Cancel')}
                                colorType='danger'
                                onClick={() => {
                                    setShowAdminInvoiceCancelModal(true);
                                }}
                            />
                            {invoiceDetailsData?.is_remind ?
                                <div className="flex justify-end">
                                    <CommonButton
                                        roundedFull={false}
                                        btnLabel={
                                            invoice_type === 'admission_invoice' ? t('Remind Student')
                                                : invoice_type === 'instructor_invoice' ? t('remind instructor')
                                                    : invoice_type === 'license_invoice' ? t('remind admin')
                                                        : ''
                                        }
                                        onClick={() => {
                                            commonInvoiceReminder(invoice_id, invoice_type,
                                                invoice_type === 'admission_invoice' ? 'school_student'
                                                    : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                                        : invoice_type === 'license_invoice' ? 'admin_lisence'
                                                            : ''
                                            )
                                        }}
                                    />
                                </div>
                                : ""}
                        </div>
                        : invoiceDetailsData?.status === "created" ?
                            <div className="flex justify-between items-center">
                                <CommonButtonOutlined
                                    isFullRounded={false}
                                    btnLabel={t('cancel')}
                                    colorType='danger'
                                    onClick={() => {
                                        setShowAdminInvoiceCancelModal(true);
                                    }}
                                />
                                <CommonButton
                                    roundedFull={false}
                                    btnLabel={t('make payment')}
                                    onClick={() => {
                                        setShowAdminInvoicePaymentModal(true);
                                    }}
                                />
                            </div>
                            : invoiceDetailsData?.status === "missing1" ?
                                <div className='flex flex-row-reverse'>
                                    <CommonButton
                                        roundedFull={false}
                                        btnLabel={t('make payment')}
                                        onClick={() => {
                                            setShowAdminInvoicePaymentModal(true);
                                        }}
                                    />
                                </div>
                                : invoiceDetailsData?.status === "missing2" ?
                                    <div className="flex justify-end">
                                        <CommonButton
                                            btnLabel={t('contact admin')}
                                            roundedFull={false}
                                            onClick={() => {
                                                commonRemindAdmin(invoice_id, invoice_type);
                                            }}
                                        />
                                    </div>
                                    : invoiceDetailsData?.is_remind ?
                                        <div className="flex justify-end">
                                            <CommonButton
                                                roundedFull={false}
                                                btnLabel={
                                                    invoice_type === 'admission_invoice' ? t('Remind Student')
                                                        : invoice_type === 'instructor_invoice' ? t('remind instructor')
                                                            : invoice_type === 'license_invoice' ? t('remind admin')
                                                                : ''
                                                }
                                                onClick={() => {
                                                    commonInvoiceReminder(invoice_id, invoice_type,
                                                        invoice_type === 'admission_invoice' ? 'school_student'
                                                            : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                                                : invoice_type === 'license_invoice' ? 'admin_lisence'
                                                                    : ''
                                                    )
                                                }}
                                            />
                                        </div>
                                        : ""
                }
            </div>

        </div>
    )
}

// y            [ MAWAY-ADMIN ] admin->school              
const AdminSchoolComments = () => {
    const { invoiceDetailsData } = useInvoiceStore();
    const { setShowAdminToSchoolPayModal } = useNewInvoiceStore();
    const { t } = useTranslation();

    return (
        <div className='space-y-2'>

            {/*e        school accept comment      */}
            {
                valueCheck(invoiceDetailsData?.action_dates?.accepted) ?
                    <NewInvoiceComment
                        commentDate={valueCheck(invoiceDetailsData?.action_dates?.accepted) ? formatDate(invoiceDetailsData?.action_dates?.accepted) : " "}
                        label={invoiceDetailsData?.status === "accepted" ? t('School note') : 'NA'}
                        commentText={valueCheck(invoiceDetailsData?.school_comment)}
                    /> :
                    ''}


            {/*l        admin paid comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid) ?
                <NewInvoiceComment
                    commentDate={formatDate(invoiceDetailsData?.action_dates?.paid)}
                    label={t('admin note')}
                    commentText={NACheck(invoiceDetailsData?.admin_comment)}
                />
                : ''}

            {/*l    comment      */}

            <NewInvoiceComment
                commentDate={formatDate(invoiceDetailsData?.action_dates?.generated)}
                label={t('Comment')}
                commentText={NACheck(invoiceDetailsData?.comment)}
            />


            {/* y   action button area...*/}
            <div className='pt-5'>
                {
                    invoiceDetailsData?.status === "generated" ?
                        <div className=" flex justify-end">
                            <CommonButton
                                roundedFull={false}
                                btnLabel={t('Pay')}
                                onClick={() => {
                                    setShowAdminToSchoolPayModal(true);
                                }}
                            />
                            {
                                // todo: for remind school (from admin panel)   
                                // invoiceDetailsData?.is_remind ?
                                //     <div className="flex justify-end">
                                //         <CommonButton
                                //             roundedFull={false}
                                //             btnLabel={
                                //                 invoice_type === 'admission_invoice' ? 'Remind Student'
                                //                     : invoice_type === 'instructor_invoice' ? 'remind instructor'
                                //                         : invoice_type === 'license_invoice' ? 'remind admin'
                                //                             : ''
                                //             }
                                //             onClick={() => {
                                //                 console.log('invoice type::: ', invoice_type);
                                //                 commonInvoiceReminder(invoice_id, invoice_type,
                                //                     invoice_type === 'admission_invoice' ? 'school_student'
                                //                         : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                //                             : invoice_type === 'license_invoice' ? 'admin_lisence'
                                //                                 : ''
                                //                 )
                                //             }}
                                //         />
                                //     </div>
                                //     : ""
                            }
                        </div>
                        : ""
                }
            </div>

        </div>
    )
}

// y            [ MAWAY-SCHOOL_WEB ] admin->school              
const AdminSchoolCommentsSchoolWeb = () => {
    const { setShowAdminToSchoolAcceptModal, invoiceDetailsData } = useNewInvoiceStore();
    const { t } = useTranslation();
    return (
        <div className='space-y-2'>
            {/*e        school accept comment      */}
            {
                valueCheck(invoiceDetailsData?.action_dates?.accepted) ?
                    <NewInvoiceComment
                        commentDate={valueCheck(invoiceDetailsData?.action_dates?.accepted) ? formatDate(invoiceDetailsData?.action_dates?.accepted) : " "}
                        label={invoiceDetailsData?.status === "accepted" ? t('School note') : 'NA'}
                        commentText={valueCheck(invoiceDetailsData?.school_comment)}
                    /> :
                    ''}


            {/*l        admin paid comment      */}
            {valueCheck(invoiceDetailsData?.action_dates?.paid) ?
                <NewInvoiceComment
                    commentDate={formatDate(invoiceDetailsData?.action_dates?.paid)}
                    label={t('admin note')}
                    commentText={NACheck(invoiceDetailsData?.admin_comment)}
                />
                : ''}

            {/*l    comment      */}
            <NewInvoiceComment
                commentDate={formatDate(invoiceDetailsData?.action_dates?.generated)}
                label={t('Comment')}
                commentText={NACheck(invoiceDetailsData?.comment)}
            />
            {/* y   action button area...*/}
            <div className='pt-5'>
                {
                    invoiceDetailsData?.status === "paid" ?
                        <div className="flex justify-end items-center">
                            <CommonButton
                                roundedFull={false}
                                btnLabel={t('Accept')}
                                onClick={() => {
                                    setShowAdminToSchoolAcceptModal(true);
                                }}
                            />
                            {
                                // todo: for remind school (from admin panel)   
                                // invoiceDetailsData?.is_remind ?
                                //     <div className="flex justify-end">
                                //         <CommonButton
                                //             roundedFull={false}
                                //             btnLabel={
                                //                 invoice_type === 'admission_invoice' ? 'Remind Student'
                                //                     : invoice_type === 'instructor_invoice' ? 'remind instructor'
                                //                         : invoice_type === 'license_invoice' ? 'remind admin'
                                //                             : ''
                                //             }
                                //             onClick={() => {
                                //                 console.log('invoice type::: ', invoice_type);
                                //                 commonInvoiceReminder(invoice_id, invoice_type,
                                //                     invoice_type === 'admission_invoice' ? 'school_student'
                                //                         : invoice_type === 'instructor_invoice' ? 'school_instructor'
                                //                             : invoice_type === 'license_invoice' ? 'admin_lisence'
                                //                                 : ''
                                //                 )
                                //             }}
                                //         />
                                //     </div>
                                //     : ""
                            }
                        </div>
                        : ""
                }
            </div>

        </div>
    )
}