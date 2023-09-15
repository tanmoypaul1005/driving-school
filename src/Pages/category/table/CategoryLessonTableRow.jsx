import React from 'react'
import { iDrivingCard, iExternalCard, iSchoolClassroomLesson } from '../../../App/Utility/source';
import useSchoolCategoryStore, { getSchoolCategoryLessonShow } from '../../../App/Stores/schoolCategoryStore';
import { Tooltip } from '@mui/material';
import { valueCheck } from '../../../Utility/UtilityFunctions';

const CategoryLessonTableRow = ({ data, index }) => {

  const { setShowEditCategoryListLessonModal } = useSchoolCategoryStore();

  return (
    <>
      <tr onClick={async () => {
        await getSchoolCategoryLessonShow(data?.id);
        setShowEditCategoryListLessonModal(true)
      }}
        className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
        <th className='m-2 font-normal text-center border-r py-s10'>
          <span className='mr-s12 dm:mrs12 md:mr-0'>{index}</span>
        </th>

        <td className='border-r-[1px] text-center p-s10 min-w-[200px] max-w-[200px] truncate'>
          <div className='flex items-center sm:flex-col md:flex-row'>
            <div className='min-w-[40px] max-w-[40px]'>
              <img className='w-s38 h-s38 grow-0'
                src={
                  (data?.lesson_type === 'driving' && iDrivingCard) ||
                  (data?.lesson_type === 'external' && iExternalCard) ||
                  (data?.lesson_type === 'classroom' && iSchoolClassroomLesson)}
                alt=""
              />
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

        <td className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          {data?.duration_title ? data?.duration_title : "NA"}
        </td>

        <td className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          {data?.price ? `DKK ${data?.price?.toLocaleString("da-DK")}` : "NA"}
        </td>

      </tr>
    </>
  )
}

export default CategoryLessonTableRow;