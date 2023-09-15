import { Tooltip } from '@mui/material';
import React from 'react';
import useNotificationStore, { getNotificationDetails } from '../../../App/Stores/notificationStore';
import { valueCheck } from '../../../Utility/UtilityFunctions';
import { formatDate } from '../../../App/Utility/UtilityFunctions';

const NotificationTableRow = ({ data, index }) => {

    const { setShowNotificationDetailsModal } = useNotificationStore();

    return (
        <>
            <tr onClick={async () => {
                await getNotificationDetails(data?.id);
                setShowNotificationDetailsModal(true)
            }}
            className={`border-b border-collapse ${data?.status === 'read' ? "bg-cGridView text-cGray body_text": "bg-cInvoiceLesson text-cBlack important_text" }
             cursor-pointer border-cNmSelect m-s10`} >
                <th className='font-normal text-center border-r p-s10'>
                    <span>{index}</span>
                </th>


                <td className='truncate border-r-[1px] p-s10 text-center min-w-[180px] max-w-[180px]'>
                    <Tooltip title={data?.title}>
                        <span className=''>
                            {data?.title ? valueCheck(data?.title) : "NA"}
                        </span>
                    </Tooltip>
                </td>

                <td className='truncate border-r-[1px] p-s10 text-center min-w-[200px] max-w-[200px]'>
                    <Tooltip title={data?.description}>
                        <span className=''>
                            {data?.description ? valueCheck(data?.description) : "NA"}
                        </span>
                    </Tooltip>
                </td>

                <td className='truncate p-s10 border-r-[1px] text-center min-w-[120px] max-w-[120px]'>
                    {data?.created_date && data?.created_time ?
                        `${formatDate(data?.created_date)}, ${data?.created_time}` : "NA"}
                </td>


                {/* <td className='p-s10 border-r-[1px] text-center  min-w-[100px] capitalize'>
                        {data?.status ? valueCheck(data?.status) : "NA"}
                </td> */}
            </tr>
        </>

    );
};

export default NotificationTableRow;