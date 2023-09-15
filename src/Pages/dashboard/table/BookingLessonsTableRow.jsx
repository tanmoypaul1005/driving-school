import { Tooltip } from '@mui/material';
import React from 'react';
import Image from '../../../Components/Image/Image';
import { iCategory } from '../../../App/Utility/source';
import { valueCheck } from '../../../Utility/UtilityFunctions';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import useClassStore, { getSchoolClassDetails } from '../../../App/Stores/classStore';
import useDashboardStore from '../../../App/Stores/dashboardStore';

const BookingLessonsTableRow = ({ data, index }) => {

    const { setShowEditClassModal } = useClassStore();
    const {setPendingBookingLessonsUpdate}=useDashboardStore();

    return (
        <>
            <tr onClick={async () => {
                await getSchoolClassDetails(data?.id);
                await setShowEditClassModal(true);
                await setPendingBookingLessonsUpdate(true);
                console.log("")
            }} className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView m-s10`} >
                <th className='text-center border-r body_text text-cGray p-s10'>
                    <span>{index}</span>
                </th>

                <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] 2xl:min-w-[220px] 2xl:max-w-[220px] capitalize'>
                    <div className='flex items-center space-x-2'>
                        <div className='rounded-full w-[50px] h-[50px] flex justify-center items-center bg-cBackgroundAndCategory'>
                            <Image cursorPointerClass="cursor-pointer"
                                className='min-h-[24px] max-h-[24px] max-w-[26px] min-w-[26px]' src={data?.icon}
                                dummyImage={iCategory}
                                isCategoryImage={true} />
                        </div>

                        {data?.lesson_name ?
                            <Tooltip title={data?.lesson_name}>
                                <span className='truncate'>{valueCheck(data?.lesson_name)}</span>
                            </Tooltip> : "NA"}
                    </div>
                </td>

                <td className='capitalize body_text text-cGray  py-s10 border-r-[1px] p-s10 text-center min-w-[150px] max-w-[150px] truncate'>
                    {data?.lesson_type ?? 'NA'}
                </td>

                {/* <td className='truncate py-s10 border-r-[1px] text-center p-s10 min-w-[150px]'>
                    <span className='body_text text-cGray'>
                        CR1
                    </span>
                </td> */}

                <td className='py-s10 border-r-[1px] px-s15 text-center min-w-[150px]'>
                    <span className="capitalize body_text text-cGray">
                        {data?.class_date ? formatDate(data?.class_date) : 'NA'}
                    </span>
                </td>
            </tr>
        </>

    );
};

export default BookingLessonsTableRow;