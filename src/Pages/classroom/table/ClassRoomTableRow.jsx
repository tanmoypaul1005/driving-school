import React from 'react'
import useClassroomStore, { getSchoolClassroomShow } from '../../../App/Stores/classroomStore';
import { Tooltip } from '@mui/material';

const ClassRoomTableRow = ({ data, index }) => {

    const { setShowEditClassroomModal } = useClassroomStore();

    return (
        <>
            <tr onClick={async () => {
                if (data?.id) {
                    await getSchoolClassroomShow(data?.id);
                    await setShowEditClassroomModal(true)
                }
            }}
                className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
                <th className='m-2 text-center border-r py-s10'>
                    <span className='mr-s12 body_text text-cGray'>{index}</span>
                </th>

                <td className='truncate border-r-[1px] p-s10 text-LEFT min-w-[180px] max-w-[180px]'>
                    <Tooltip title={data?.name}>
                        <span className='capitalize body_text text-cGray'>
                            {data?.name ? data?.name : "NA"}
                        </span>
                    </Tooltip>
                </td>

                <td className='p-s10 border-r-[1px] text-center max-w-[150px] min-w-[150px] truncate'>
                    {
                        data?.address ?
                            <Tooltip title={data?.address}>
                                <span className='body_text text-cGray'>
                                    {data?.address}
                                </span>
                            </Tooltip> : "NA"
                    }

                </td>

                <td className='p-s10 border-r-[1px]  text-fs14 text-center text-cTextBody max-w-[100px] min-w-[100px]'>
                    {data?.capacity ?? 'NA'}
                </td>
            </tr>
        </>
    )
}

export default ClassRoomTableRow;