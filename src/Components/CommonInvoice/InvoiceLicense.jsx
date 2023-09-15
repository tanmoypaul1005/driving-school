import React, { useEffect, useState } from 'react';
import useInvoiceStore from '../../App/Stores/InvoiceStore';
import { dateDifference2, formatDate, getFormatedStringFromDays } from '../../App/Utility/UtilityFunctions';
import Clamp from "react-multiline-clamp";
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';

const InvoiceLicense = ({ license }) => {
  const { invoiceDetailsData } = useInvoiceStore();
  const [liDuration, setLiDuration] = useState(0);

  useEffect(() => {
    setLiDuration(getFormatedStringFromDays(dateDifference2(invoiceDetailsData?.purchase_lisence?.start_time, invoiceDetailsData?.purchase_lisence?.end_time)))
  }, [invoiceDetailsData]);

  return (
    <>
      {license === true ?
        <div className="col-span-2 sm:col-span-2 mt-s8">
          <span className="leading-6 text-fs16 font-fw600 text-cHighlighted">Applied for</span>

          <div className="bg-cBrandColor px-s16 py-s16 w-w320 rounded-br10 my-s16">

            <div className='flex justify-between'>
              <div className="text-fs20 font-fw600 text-cBrandColor2 mb-s10">{invoiceDetailsData?.lisence_title}</div>
              {/* <div onClick={() => { setShowEditLicenseModal(true) }} className='rounded-full cursor-pointer bg-cBrandColor2 w-w28 h-h28'><img className="m-s7 w-w14" src={iVector} alt="" /></div> */}
            </div>
            <div className="text-cBrandColor2 text-fs14 mb-s10 font-fw600">Package Duration: {invoiceDetailsData?.duration}</div>

            <div className="text-cBrandColor2 text-fs32 font-fw600">DKK {invoiceDetailsData?.price}</div>
            <span className="text-cBrandColor2 text-fs14 font-fw400">(Included MOMS: DKK {invoiceDetailsData?.moms})</span>

            <div className="my-s20">
              <div className="text-cBrandColor2 text-fs14 font-fw400">Start Date: {invoiceDetailsData?.purchase_lisence?.start_time ? formatDate(invoiceDetailsData?.purchase_lisence?.start_time) :
               <CommonEmptyStatus fontWeight='font-fw400' leading='leading-1' size='text-fs14' textColor='text-cBrandColor2'/>}
               </div>
              <div className="text-cBrandColor2 text-fs14 font-fw400">End Date: {invoiceDetailsData?.purchase_lisence?.end_time ? formatDate(invoiceDetailsData?.purchase_lisence?.end_time)
               : <CommonEmptyStatus fontWeight='font-fw400' leading='leading-1' size='text-fs14' textColor='text-cBrandColor2'/>}</div>
            </div>
            <div className="capitalize text-cBrandColor2 text-fs14 mb-s10 font-fw600">Purchased Duration: {liDuration ? liDuration : 
           <CommonEmptyStatus fontWeight='font-fw600' leading='leading-1' size='text-fs14' textColor='text-cBrandColor2'/>}
            </div>

            <Clamp withTooltip lines={2}>
              <div dangerouslySetInnerHTML={{ __html: invoiceDetailsData?.lisence?.details }}className="text-cBrandColor2 text-fs14 font-fw400">
            </div>
            </Clamp>
          </div>
        </div>

        :

        <div className="bg-cBrandColor w-w320 rounded-br10 my-s16 h-s317">
          <div className='flex justify-center items-center h-s317'>
            <div className='text-center'>
              <div className='text-fs20 font-fw600 text-cBrandColor2 mb-s10'>No Active License</div>
              <div className='bg-cBrandColor2 text-cBrandColor text-fs12 rounded-br100 s48'>
                <span className='flex justify-center items-center cursor-pointer h-s48'>Apply For License</span>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default InvoiceLicense;