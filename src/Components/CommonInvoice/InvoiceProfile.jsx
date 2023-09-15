import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import CommonButton from '../Button/CommonButton';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../Image/Image';
import { formatDate } from '../../App/Utility/UtilityFunctions';

const InvoiceProfile = () => {

    const { invoiceDetailsData } = useInvoiceStore();

    const navigateTo = useNavigate();

    const { invoice_type } = useParams();

    return (
        <div className="flex justify-between items-center bg-cBackgroundAndCategory rounded-br10 h-h250 sm:h-h250 lg:h-h150">
            <div className="flex col-span-5 py-s20 px-s20">
                <Image className="rounded-full w-w88 h-h88" src={invoiceDetailsData?.image} />
                {/* <img src={invoiceDetailsData?.image ? (BaseUrlSrc + invoiceDetailsData?.image) : iUserAvatar} alt=""></img> */}
                <div className="ml-s15">
                    <div className="leading-9 font-fw600 text-cHighlighted mb-s2 text-fs14 md:text-fs24">{invoice_type === "system_generated" ? invoiceDetailsData?.school_info?.name : invoiceDetailsData?.user_name ? invoiceDetailsData?.user_name :
                        <CommonEmptyStatus fontWeight='font-fw600' leading='leading-9' size='text-fs24' textColor='text-cHighlighted' />}
                    </div>
                    {invoiceDetailsData?.role === "school" || invoice_type === "system_generated" ? <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">CVR: {invoice_type === "system_generated" ? invoiceDetailsData?.school_info?.cvr : invoiceDetailsData?.cvr ? invoiceDetailsData?.cvr :
                        <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' size='text-fs12' textColor='text-cImportantText' />
                    }
                    </div> : ""}
                    <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">Email: {invoice_type === "system_generated" ? invoiceDetailsData?.school_info?.user_email : invoiceDetailsData?.email ?? "NA"}</div>
                    <div className="leading-3 font-fw500 text-fs12 text-cImportantText pb-s6">Phone: {invoice_type === "system_generated" ? invoiceDetailsData?.school_info?.phone_number : invoiceDetailsData?.phone ? invoiceDetailsData?.phone :
                        <CommonEmptyStatus fontWeight='font-fw500' leading='leading-3' size='text-fs12' textColor='text-cImportantText' />}
                    </div>
                    <div className="leading-3 font-fw500 text-fs12 text-cImportantText mb-s6">joined: {invoice_type === "system_generated" ? formatDate(invoiceDetailsData?.school_info?.created_at) : invoiceDetailsData?.user_joined_date}</div>
                </div>
            </div>

            <div className='pr-5'>
                <CommonButton
                    btnLabel='go to profile'
                    colorType='primary'
                    roundedFull={true}
                    onClick={() => {
                        if (invoiceDetailsData?.role === "instructor") {
                            navigateTo("/instructor/details/" + invoiceDetailsData?.scl_ins_id);
                        }
                        if (invoiceDetailsData?.role === "school") {
                            navigateTo("/school/details/" + invoiceDetailsData?.scl_ins_id);
                        }
                        if (invoice_type==="system_generated") {
                            navigateTo("/school/details/" + invoiceDetailsData?.school_info?.id);
                        }

                        //else navigateTo(`/${invoiceDetailsData?.role}/details/` + invoiceDetailsData?.scl_ins_id);
                    }}
                />
            </div>
        </div>
    );
};

export default InvoiceProfile;