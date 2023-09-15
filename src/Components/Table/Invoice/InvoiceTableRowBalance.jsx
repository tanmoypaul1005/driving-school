import { Tooltip } from '@mui/material';
import React from 'react';

import { formatDate } from '../../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../../Image/Image';
import { formatDateOrTime } from '../../../Utility/UtilityFunctions';
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore';
import useProfileStore from '../../../App/Stores/profileStore';


const InvoiceTableRowBalance = ({ data, index }) => {
    const { schoolDashboardDetails } = useProfileStore();
    const { setShowInvoicePaymentDetailsModal, setInvoiceBalanceDetailsData } = useNewInvoiceStore();

    const invoiceClick = () => {
        // console.log(schoolDashboardDetails?.school);
        let content = [
            {
                title: "Status",
                data: data?.status ?? "NA"
            },
            {
                title: "Sent To",
                data: schoolDashboardDetails?.school?.name ?? "NA"
            },
            {
                title: "CVR",
                data: schoolDashboardDetails?.school?.cvr ?? "NA"
            },
            {
                title: "Transection ID",
                data: data?.transaction_id ?? "NA"
            },
            {
                title: "Authorization ID",
                data: data?.transaction_details?.gateway_authorization_id ?? "NA"
            },
            {
                title: "Paid Type",
                data: data?.payment_method === "freepay" ? "Gateway" : "NA"
            },
            {
                title: "Paid Amount",
                data: data?.amount ? "DKK " + data?.amount : "DKK 0"
            },
            {
                title: "Payment Date & Time",
                data: data?.transaction_date ? formatDate(data?.transaction_date) + ", " + formatDateOrTime(data?.transaction_date) : "NA"
            },
            {
                title: "MaskedPan",
                data: data?.transaction_details?.gateway_masked_pan ?? "NA"

            },
            {
                title: "Comment",
                data: data?.comment ?? "NA"
            },
        ];
        setInvoiceBalanceDetailsData(content);

        setShowInvoicePaymentDetailsModal(true);
    }

    return (
        <>
            <tr
                onClick={() => { invoiceClick() }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='px-s10 font-normal text-center border-r py-s10'>
                    <span className=''>{index}</span>
                </th>

                {/* name with image */}
                <td className='border-r-[1px] px-s10 min-w-[180px] 2xl:min-w-[250px]'>
                    <span className='flex items-center py-s10'>
                        <span className='min-w-[50px]'>
                            <Image cursorPointerClass="cursor-pointer" className='rounded-full w-w44 h-h44 grow-0' src={data?.user?.image} alt="" />
                        </span>
                        <Tooltip title={data?.title}>
                            <div className=' ml-s5 body_text text-cGray max-w-[130px] 2xl:max-w-[200px] truncate'>{data?.title ??
                                <CommonEmptyStatus />}</div>
                        </Tooltip>
                    </span>
                </td>

                {/* email address */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    <Tooltip title={""}>
                        <div className='truncate'>
                            {formatDate(data?.transaction_date) + ", " + formatDateOrTime(data?.transaction_date) ?? <CommonEmptyStatus />}
                        </div>
                    </Tooltip>
                </td>

                {/* order id  */}
                {/* <td className='py-s10 border-r-[1px] px-s10 body_text text-cGray text-center min-w-[120px] capitalize'>
                    {data?.invoice_id ?? <CommonEmptyStatus />}
                </td> */}

                {/* create date */}
                <td className='py-s10 border-r-[1px] px-s10 body_text text-cGray text-center min-w-[120px]'>
                    {data?.amount ?`DKK ${data?.amount.toLocaleString("da-DK")}` : "NA"}
                </td>

            </tr>
        </>
    )
}

export default InvoiceTableRowBalance