
import React from 'react'
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { iCategory } from '../../../App/Utility/source';
import Image from '../../../Components/Image/Image';
import useSchoolCategoryStore from '../../../App/Stores/schoolCategoryStore';

const CategoryTableRow = ({ data, index }) => {

  const navigate = useNavigate();

  const { setPackage_overview_take,setPackage_overview_search } = useSchoolCategoryStore();

  const HandleClick =async () => {
    await setPackage_overview_take(10);
    await setPackage_overview_search("")
    navigate(`/school/category-list/details/${data?.id}`)
  }

  return (
    <>
      <tr onClick={HandleClick}
        className={`border-b border-collapse cursor-pointer  border-cNmSelect hover:bg-cGridView`} >

        <th className='m-2 min-w-[10px] max-w-[10px] font-normal text-center border-r py-s10'>
          {index}
        </th>

        <td className='border-r-[1px] text-center p-s10 min-w-[400px] max-w-[160px] 2xl:min-w-[220px] 2xl:max-w-[220px]'>
          <div className='flex items-center'>
            <div className='rounded-full w-[50px] h-[50px] flex justify-center items-center
            bg-cBackgroundAndCategory'>
              <Image cursorPointerClass="cursor-pointer"
                className='min-h-[25px] max-h-[25px] max-w-[27px] min-w-[27px]' src={data?.icon}
                dummyImage={iCategory}
                isCategoryImage={true} />
            </div>

            {data?.category_name === "null" || data?.name === null ?
              <CommonEmptyStatus /> :
              <Tooltip title={data?.category_name}>
                <span className='truncate body_text text-cGray ml-s10 capitalize'>
                  {data?.category_name}</span>
              </Tooltip>
            }
          </div>
        </td>


        {/* <td className='p-s10 border-r-[1px] text-center body_text text-cGray'>
          {data?.lessons ?? 'NA'}
        </td>


        <td className='p-s10 border-r-[1px] text-center body_text text-cGray'>
          {data?.duration === "null" || data?.duration === null ? 'NA' : data?.duration}
        </td>

        <td className='py-s10 border-r-[1px] text-center body_text text-cGray'>
          {data?.price === 0 ? `DKK ${data?.total_lesson_price?.toLocaleString("da-DK")}` :
            `DKK ${data?.price?.toLocaleString("da-DK")}`}
        </td> */}

        <td className='p-s10 border-r-[1px] text-center min-w-[180px] max-w-[100px] body_text text-cGray'>
          {data?.is_active ? "Active" : "Inactive"}
        </td>

      </tr>
    </>
  )
}

export default CategoryTableRow;