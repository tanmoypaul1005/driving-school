import { Tooltip } from '@mui/material';
import React from 'react';
import Image from '../../../Components/Image/Image';
import { useNavigate } from 'react-router-dom';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';

const StudentTableRow = ({ data, index }) => {

    const navigateTo = useNavigate();

    const { setSchoolStudentInvoiceSearch } = useSchoolStudentStore();

    return (
        <>
            <tr
                onClick={() => {
                    navigateTo(`/school-student/details/${data.id}`);
                    setSchoolStudentInvoiceSearch("")
                }}
                className={`border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >
                <th className='text-center border-r body_text text-cGray p-s10'>
                    {index}
                </th>

                {/* name with image */}
                <td className='border-r-[1px] text-center p-s10 min-w-[150px] max-w-[150px] truncate'>
                    <div className='flex items-center sm:flex-col md:flex-row'>
                        <div className='min-w-[50px] max-w-[50px]'>
                        <Image
                                cursorPointerClass="cursor-pointer"
                                className='rounded-full w-w44 h-h44 grow-0'
                                src={data?.image}
                            />
                        </div>
                        <div className='items-center capitalize truncate ml-s8 body_text text-cGray' >
                            {data?.name ?
                                <Tooltip title={data?.name}>
                                    <span className='truncate'>{data?.name}</span>
                                </Tooltip>
                                : "NA"}
                        </div>
                    </div>
                </td>

                {/* category */}
                <td className='p-s10  border-r-[1px] text-fs14 text-center min-w-[150px] max-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]'>
                    <div className='truncate body_text text-cGray'>
                        {data?.category ? data?.category : 'NA'}
                    </div>
                </td>

                {/* amount */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] truncate body_text text-cGray'>
                    {data?.amount ? `DKK ${data?.amount?.toLocaleString("da-DK")}` : 'DKK 0'}
                </td>

                {/* remaining */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] truncate body_text text-cGray'>
                    {data?.remaining ? data?.remaining : 'NA'}
                </td>

                {/* status */}
                <td className='p-s10 border-r-[1px] text-center min-w-[110px] max-w-[110px] capitalize truncate body_text text-cGray'>
                    {data?.status ? data?.status : 'NA'}
                </td>

            </tr>
        </>
    )
}

export default StudentTableRow;