
import React from 'react';
import useClassStore, { getSchoolClassDetails } from '../../../App/Stores/classStore';
import { iCategory } from '../../../App/Utility/source';
import { Tooltip } from '@mui/material';
import Image from '../../../Components/Image/Image';
import useDashboardStore from '../../../App/Stores/dashboardStore';

const ClassTableRow = ({ data, index }) => {

    const { setShowEditClassModal, setShowClassDetailsModal } = useClassStore();

    const { pendingBookingLessonsUpdate } = useDashboardStore();

    // console.log("data",data)

    return (
        <>
            <tr onClick={async () => {
                getSchoolClassDetails(data?.id);
                if (data?.status_show === "pending") {
                    await setShowEditClassModal(true);
                } else {
                    setShowClassDetailsModal(true)
                }
                pendingBookingLessonsUpdate(false);

            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >

                <th className='font-normal text-center border-r p-s10'>
                    {index}
                </th>

                <td className='border-r-[1px] text-center p-s10 min-w-[150px] max-w-[150px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='rounded-full max-w-[45px] min-w-[45px]  h-s45 flex justify-center items-center bg-cBackgroundAndCategory'>
                            <Image
                                className='min-h-[25px] max-h-[25px] max-w-[27px] min-w-[27px]'
                                src={data?.category_icon}
                                dummyImage={iCategory}
                                isCategoryImage={true} />
                        </div>
                        <div className='items-center capitalize truncate ml-s8 body_text text-cGray' >
                            {data?.lesson_name ?
                                <Tooltip title={data?.lesson_name}>
                                    <span className='truncate'>{data?.lesson_name}</span>
                                </Tooltip>
                                : "NA"}
                        </div>
                    </div>
                </td>

                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[80px] max-w-[80px] truncate'>
                    {data?.class_date ? data?.class_date : 'NA'}
                </td>

                {/* start_time */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[80px] max-w-[80px] truncate'>
                    {data?.start_time && data?.end_time ? `${data?.start_time} - ${data?.end_time}` : 'NA'}
                </td>

                {/* classroom Name */}
                <td className='truncate py-s10 border-r-[1px] body_text text-cGray p-s10 text-center capitalize min-w-[120px] max-w-[120px]'>
                    {/* {data?.classroom_name === null || data?.classroom_name === "null" ? "NA"
                        : <Tooltip title={data?.classroom_name}>
                            <span className='body_text text-cGray'>
                                {data?.classroom_name ? data?.classroom_name : 'NA'}
                            </span>
                        </Tooltip>} */}
                    {data?.type === "null" || data?.type === null ? 'NA' : data?.type}
                </td>


                {/* status */}
                <td className='p-s10 border-r-[1px] text-center body_text text-cGray min-w-[110px] max-w-[110px] truncate capitalize'>
                    {data?.status_show ? data?.status_show : 'NA'}
                </td>

            </tr>
        </>
    )
}

export default ClassTableRow;