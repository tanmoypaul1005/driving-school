import React from 'react'
import CommonButton from '../../Components/Button/CommonButton'
import CommonButtonOutlined from '../../Components/Button/CommonButtonOutlined'
import { useTranslation } from 'react-i18next';

const NewInvoiceComment = ({

    commentDate = "NA",

    acceptAction = () => { },
    withAcceptAction = false,

    rejectAction = () => { },
    withRejectAction = false,

    cancelAction = () => { },
    withCancelAction = false,

    makePaymentAction = () => { },
    withMakePaymentAction = false,

    remindAction = () => { },
    remindTitle = "",
    withRemindAction = false,

    label = "NA",
    commentText = 'NA',
}) => {

    const { t } = useTranslation();

    return (
        <div className='text-sm'>
            <div className="flex justify-between items-start">
                <div className='w-full'>
                    <div className="flex items-start justify-between">
                        <div className='sub_title capitalize-first text-cBlack min-w-[100px]'>{label}</div>
                        <div className='body_text text-cGray capitalize-first text-right min-w-[100px]'>{commentDate}</div>
                    </div>

                    <div>{commentText}</div>
                </div>
            </div>

            {/*e            action button areas */}
            <div className={`relative ${(withAcceptAction || withRejectAction || withCancelAction || withMakePaymentAction || withRemindAction) ? "pt-5 h-[58px]" : ""}`}>

                {/*r        secondary actions */}
                <div className='absolute left-0'>
                    {
                        withCancelAction ?
                            <CommonButtonOutlined
                                btnLabel={t('cancel')}
                                colorType='danger'
                                onClick={() => {
                                    cancelAction();
                                }}
                            />
                            : withRejectAction ?
                                <CommonButtonOutlined
                                    btnLabel={t('reject')}
                                    colorType='danger'
                                    onClick={() => {
                                        rejectAction();
                                    }}
                                />
                                : ""
                    }
                </div>

                {/*b        primary actions */}
                <div className='absolute right-0'>
                    {
                        withAcceptAction ?
                            <CommonButton
                                btnLabel={t('accept')}
                                onClick={() => {
                                    acceptAction();
                                }}
                            />
                            : withMakePaymentAction ?
                                <CommonButton
                                    btnLabel={t('make payment')}
                                    onClick={() => {
                                        makePaymentAction();
                                    }}
                                />
                                : withRemindAction ?
                                    <CommonButton
                                        btnLabel={remindTitle}
                                        onClick={() => {
                                            remindAction();
                                        }}
                                    />
                                    : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default NewInvoiceComment