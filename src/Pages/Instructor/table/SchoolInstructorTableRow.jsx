import { Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../Components/Image/Image';
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { NACheck, valueCheck } from '../../../Utility/UtilityFunctions';
import useSchoolInstructorStore from '../../../App/Stores/schoolInstructorStore';

const SchoolInstructorTableRow = ({ data, index }) => {

    const navigate = useNavigate();

    const { setInstructor_invoice_search, setSchoolInstructorDetails } = useSchoolInstructorStore.getState();

    return (
        <>
            <tr onClick={async () => {
                await setInstructor_invoice_search("");
                await localStorage.setItem("instructor_is_updated", data?.is_updated)
                if (data?.is_updated === 0) {
                    await setSchoolInstructorDetails({});
                }
                navigate("/school-instructor/details/" + data?.id + "/schedule");
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
                                src={data?.instructor?.profile_photo}
                                alt="" />
                        </div>
                        <div className='items-center capitalize truncate ml-s8 body_text text-cGray' >
                            {
                                data?.instructor?.name ?
                                    <Tooltip title={data?.instructor?.name}>
                                        <span className='truncate'>{valueCheck(data?.instructor?.name)} </span>
                                    </Tooltip>
                                    : <>{data?.name}</>
                            }
                        </div>
                    </div>
                </td>

                <td className='truncate py-s10 border-r-[1px] p-s10 text-center min-w-[150px] max-w-[150px]'>
                    {
                        data?.instructor?.user_email ? <Tooltip title={data?.instructor?.user_email}>
                            <span className='body_text text-cGray'>
                                {data?.instructor?.user_email ? valueCheck(data?.instructor?.user_email) : <CommonEmptyStatus />}
                            </span>
                        </Tooltip> : 'NA'
                    }
                </td>

                <td className='truncate py-s10 border-r-[1px] text-center p-s10 min-w-[150px] body_text text-cGray'>
                 {data?.instructor?.phone_number ? NACheck(data?.instructor?.phone_number) : "NA"}
                </td>

                <td className='py-s10 border-r-[1px] px-s15 text-center min-w-[150px] capitalize body_text text-cGray'>
                    {
                        data?.status ?
                            data?.status === "Me" ? "Special instructor" : valueCheck(data?.status)
                            : "NA"}
                </td>
            </tr>
        </>

    );
};

export default SchoolInstructorTableRow;