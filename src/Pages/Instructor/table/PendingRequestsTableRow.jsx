import { Tooltip } from '@mui/material';
import React from 'react';
import Image from '../../../Components/Image/Image';
import useSchoolInstructorStore ,{schoolInstructorsAllTypeDetails} from '../../../App/Stores/schoolInstructorStore';
import { iUserAvatar } from '../../../App/Utility/source';
import { valueCheck } from '../../../Utility/UtilityFunctions';
import { formatDate } from '../../../App/Utility/UtilityFunctions';

const PendingRequestsTableRow = ({ data, index }) => {

    const {setShowLessonDetailsModal}=useSchoolInstructorStore();

    return (
        <>
            <tr onClick={async () => {
                await schoolInstructorsAllTypeDetails(data?.id, data?.type)
                await setShowLessonDetailsModal(true);
                console.log("");
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='text-center border-r body_text text-cGray p-s10'>
                    <span>{index}</span>
                </th>

                <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='ml-s4 min-w-[50px] max-w-[50px]'>
                            <Image
                                cursorPointerClass="cursor-pointer"
                                className='rounded-full w-w44 h-h44'
                                src={iUserAvatar}
                                alt="" />
                        </div>
                        <div className='items-center capitalize truncate ml-s8 body_text text-cGray' >
                            {
                                data?.student_name ?
                                    <Tooltip title={data?.student_name}>
                                        <span className='truncate'>
                                            {valueCheck(data?.student_name)}
                                        </span>
                                    </Tooltip>
                                    : "NA"
                            }
                        </div>
                    </div>
                </td>

                <td className='truncate py-s10 border-r-[1px] p-s10 text-center min-w-[150px] max-w-[150px]'>
                    {
                        data?.lesson_name ? <Tooltip title={data?.lesson_name}>
                            <span className='capitalize body_text text-cGray'>
                                {data?.lesson_name ? valueCheck(data?.lesson_name) : "NA"}
                            </span>
                        </Tooltip> : 'NA'
                    }
                </td>

                <td className='truncate py-s10 border-r-[1px] text-center p-s10 min-w-[150px] body_text text-cGray'>
                    {data?.category_name ? valueCheck(data?.category_name) : "NA"}
                </td>

                <td className='py-s10 border-r-[1px] px-s15 text-center min-w-[150px] capitalize body_text text-cGray'>
                    {data?.date ? formatDate(data?.date) : "NA"}
                </td>
            </tr>
        </>

    );
};

export default PendingRequestsTableRow;