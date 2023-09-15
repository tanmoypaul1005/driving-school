import React from 'react';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import { iImageIogo } from '../../App/Utility/source';
import Image from '../Image/Image';

const InvoiceComment2 = () => {
    const { invoiceDetailsData } = useInvoiceStore();

    return (
        <div className=''>
            <div className='text-fs16 font-fw600 text-cBlack'>Comments</div>

            {invoiceDetailsData?.request_comment ?
                <div className='my-s10 bg-cCommentBG p-s10 rounded-br10'>
                    <div className="flex justify-between">
                        <span className='capitalize text-fs14 font-fw600 text-cBlack mb-s5'>{invoiceDetailsData?.role} Comment</span>
                        {invoiceDetailsData?.action_dates?.requested !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{invoiceDetailsData?.action_dates?.requested}</span> : ""}
                    </div>
                    <div>{invoiceDetailsData?.request_comment}</div>
                </div> : ""}

            {(invoiceDetailsData?.invoice_comment === null || invoiceDetailsData?.invoice_comment === "null") ? "" :
                <div className='bg-cSettingsOptionBgColor p-s10 rounded-br10 mb-s10'>
                    <div className="flex justify-between">
                        <span className='mb-5 text-fs14 font-fw600 text-cBlack'>Admin Comment</span>
                        {invoiceDetailsData?.action_dates?.created !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{invoiceDetailsData?.action_dates?.created}</span> : ""}
                    </div>
                    <div>{invoiceDetailsData?.invoice_comment}</div>
                </div>}

            {(invoiceDetailsData?.invoice_attachments?.length > 0) ?
                invoiceDetailsData?.invoice_attachments?.map((item, index) =>
                    <div key={index}>

                        {(item?.payment_details === null || item?.payment_details === "null") ? "" :
                            <div className={`${invoiceDetailsData?.role === 'admin' ? "bg-cSettingsOptionBgColor" : "bg-cCommentBG"} p-s10 rounded-br10 my-s10`}>
                                <div className="flex justify-between">
                                    <span className='capitalize mb-s10 text-fs14 font-fw600 text-cBlack'>{invoiceDetailsData?.role} Comment</span>

                                    {item?.created_at_formated !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{item?.created_at_formated}</span> : ""}
                                </div>

                                <div>{item?.payment_details}</div>

                                <div className='pt-s10'>
                                    <Image dummyImage={iImageIogo} className="h-[200px] rounded-br5" withPreview={true} src={item?.attachment} alt="" />
                                </div>
                            </div>
                        }

                        {(item?.reply === null || item?.reply === "null") ? "" :
                            <div className='py-5 bg-cSettingsOptionBgColor p-s10 rounded-br10'>
                                <div className="flex justify-between">
                                    <span className='capitalize mb-s10 text-fs14 font-fw600 text-cBlack'>Admin Comment</span>
                                    {item?.created_at_formated !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{item?.created_at_formated}</span> : ""}
                                </div>
                                <div>{item?.reply}</div>
                            </div>
                        }
                    </div>
                )
                : ""}


            {(invoiceDetailsData?.a_r_c_note === null || invoiceDetailsData?.a_r_c_note === "null") ? "" :
                <div className={`p-s10 rounded-br10 mt-s10 ${1 ? "bg-cSettingsOptionBgColor" : "bg-cCommentBG"}`}>
                    {/* <div className={`p-s10 rounded-br10 mt-s10 ${invoiceDetailsData?.role === "admin" ? "bg-cSettingsOptionBgColor" : "bg-cCommentBG"}`}> */}
                    <div className="flex justify-between">
                        <span className='mb-5 capitalize text-fs14 font-fw600 text-cBlack'>{invoiceDetailsData?.status === "cancelled" ? invoiceDetailsData?.role : "Admin"}
                            {/* {" "}{invoiceDetailsData?.status === "cancelled" ? "Cancelled" : invoiceDetailsData?.status === "accepted" ? "accepted" : invoiceDetailsData?.status === "rejected" ? "Rejected" : invoiceDetailsData?.status === "expired" ? "expired" : ""} */}
                            {" Comment"}</span>
                        {invoiceDetailsData?.action_dates?.accepted !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{invoiceDetailsData?.action_dates?.accepted}</span> : ""}
                        {invoiceDetailsData?.action_dates?.rejected !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{invoiceDetailsData?.action_dates?.rejected}</span> : ""}
                        {invoiceDetailsData?.action_dates?.cancelled !== "null" ? <span className='mb-5 text-fs12 text-cBlack'>{invoiceDetailsData?.action_dates?.cancelled}</span> : ""}
                    </div>
                    <div>{invoiceDetailsData?.a_r_c_note}</div>
                </div>}

        </div>
    );
};

export default InvoiceComment2;