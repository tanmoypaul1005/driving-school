import React, { useState } from 'react'
import { Tooltip } from '@mui/material';
import useSchoolCategoryStore, { packageToggleStatusIndex } from '../../../App/Stores/schoolCategoryStore';
import { MinToHour, valueCheck } from '../../../Utility/UtilityFunctions';
import GreenSwitch from '../../../Components/Switch/GreenSwitch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PackageOverviewTable = ({ data, index }) => {

  const { setShowEditPackageModal, setPackageDetails, setPackageActivateId, setShowPackageDeActivateModal } = useSchoolCategoryStore();

  const [enabled, setEnabled] = useState(false);

  const { category_id } = useParams();

  const HandleDeactivate = async () => {
    if (enabled === true) {
      await setPackageActivateId(data?.id)
      await setShowPackageDeActivateModal(true);
    } else {
      await packageToggleStatusIndex(data?.id, category_id);
    }
  }

  useEffect(() => {
    setEnabled(parseInt(data?.is_active) === 1 ? true : false)
  }, [data?.is_active])

  const ClickEvent = async () => {
    await setPackageDetails(data);
    await setShowEditPackageModal(true);
    console.log("")
  }

  return (
    <>
      <tr
        className={`border-b cursor-pointer border-collapse border-cNmSelect`} >
        <th onClick={() => { ClickEvent() }} className='m-2 font-normal text-center border-r py-s10'>
          <span className='mr-s12 dm:mr-s12 md:mr-0'>{index}</span>
        </th>

        <td onClick={() => { ClickEvent() }} className='truncate p-s10 border-r-[1px] text-center max-w-[150px] min-w-[150px] body_text text-cGray'>
          {data?.title ?
            <Tooltip title={data?.title}>
              <span className='capitalize truncate'>{valueCheck(data?.title)}</span>
            </Tooltip> : "NA"}
        </td>

        <td onClick={() => { ClickEvent() }} className='p-s10 border-r-[1px] text-center max-w-[80px] min-w-[80px] body_text text-cGray'>
          {data?.lessons?.length}
        </td>

        <td onClick={() => { ClickEvent() }} className='p-s10 border-r-[1px] text-center max-w-[80px] min-w-[80px] body_text text-cGray'>
          {data?.duration ? MinToHour(data?.duration) : '00:00'}
        </td>

        <td onClick={() => { ClickEvent() }} className='p-s10 border-r-[1px] text-center max-w-[80px] min-w-[80px] body_text text-cGray'>
          {data?.stock ? data?.stock : '0'}
        </td>

        <td onClick={() => { ClickEvent() }} className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          {data?.price ? `DKK ${data?.price?.toLocaleString("da-DK")}` ?? 'NA' : 'DKK 0'}
        </td>

        <td className='p-s10 border-r-[1px] text-center max-w-[100px] min-w-[100px] body_text text-cGray'>
          <GreenSwitch
            enabled={enabled}
            setEnabled={() => HandleDeactivate()}
          />
        </td>

      </tr>

    </>
  )
}

export default PackageOverviewTable;