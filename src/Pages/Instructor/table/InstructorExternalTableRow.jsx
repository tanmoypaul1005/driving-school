import { Tooltip } from '@mui/material';
import React from 'react';
import { valueCheck } from '../../../Utility/UtilityFunctions';
import useSchoolInstructorStore, { schoolInstructorsAllTypeDetails } from '../../../App/Stores/schoolInstructorStore';
import { iExternalCard } from '../../../App/Utility/source';
import Image from '../../../Components/Image/Image';
import { formatDate } from '../../../App/Utility/UtilityFunctions';

const InstructorExternalTableRow = ({ data, index }) => {

    const { setShowLessonDetailsModal } = useSchoolInstructorStore();

    return (
        <>
            <tr onClick={async () => {
                await schoolInstructorsAllTypeDetails(data?.id, "external")
                setShowLessonDetailsModal(true)
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='text-center border-r body_text text-cGray p-s10'>
                    <span>{index}</span>
                </th>

                <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='ml-s4 min-w-[44px] max-w-[44px]'>
                            <Image
                                cursorPointerClass="cursor-pointer"
                                className='rounded-full w-w44 h-h44'
                                src={iExternalCard}
                                alt="" />
                        </div>
                        <div className='items-center capitalize truncate ml-s8 body_text text-cGray' >
                            {data?.lesson_name ?
                                <Tooltip title={data?.lesson_name}>
                                    <span className='truncate'>{valueCheck(data?.lesson_name)} </span>
                                </Tooltip>
                                : "NA"}
                        </div>
                    </div>
                </td>


                <td className='truncate p-s10 border-r-[1px] text-center min-w-[150px] max-w-[150px]'>
                    <span className='flex flex-col body_text text-cGray'>
                        <span>{data?.date ? formatDate(data?.date) : "NA"}</span>
                        <span>{data?.end_time ? data?.end_time : "NA"}</span>
                    </span>
                </td>

                <td className='truncate p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px]'>
                    {data?.category_name ? valueCheck(data?.category_name) : "NA"}
                </td>


                <td className='truncate p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px] capitalize'>
                    {data?.status ? data?.status === 'passed' ? 'Attended': data?.status === 'failed' ? 'Absent':data?.status: 'NA'}
                </td>

                <td className='p-s10 border-r-[1px] text-center min-w-[150px] capitalize body_text text-cGray'>
                    {data?.payment_status ? valueCheck(data?.payment_status) : "NA"}
                </td>
            </tr>
        </>

    );
};

export default InstructorExternalTableRow;