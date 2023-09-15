import { Tooltip } from '@mui/material';
import React from 'react';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import { useNavigate } from 'react-router-dom';

const StudentInvoiceTableRow = ({ data, index }) => {

    const navigateTo = useNavigate();

    return (
        <>
            <tr
                onClick={async () => {
                    navigateTo("/invoice/details/" + data?.id + "/admission_invoice")
                    // await schoolStudentInvoiceDetails(data?.id);
                    // setSchoolStudentInvoiceModal(true)
                }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='text-center border-r body_text text-cGray p-s10'>
                    {index}
                </th>

                {/* invoice_id */}
                <td className='p-s10 border-r-[1px] text-left 
                min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    {data?.invoice_id ? <Tooltip title={data?.invoice_id}>
                        <div className='truncate body_text text-cGray'>
                            {data?.invoice_id ? data?.invoice_id : 'NA'}
                        </div>
                    </Tooltip> : <span className='truncate body_text text-cGray'>NA</span>}
                </td>

                {/* create_date */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate'>
                    {data?.create_date ? formatDate(data?.create_date) : 'NA'}
                </td>

                {/* Price */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate'>
                    {data?.price ? `DKK ${data?.price?.toLocaleString("da-DK")}` : '0'}
                </td>

                {/* status */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[110px] max-w-[110px] truncate capitalize'>
                    {data?.invoice_status ? data?.invoice_status : 'NA'}
                </td>

            </tr>
        </>
    )
}

export default StudentInvoiceTableRow;