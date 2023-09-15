/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useInvoiceStore from './../../App/Stores/InvoiceStore';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../App/Utility/UtilityFunctions';

const InvoiceStatusTracker = () => {

  const { invoiceDetailsData } = useInvoiceStore();

  const [trackerData, setTrackerData] = useState([]);

  const { invoice_type } = useParams();

  useEffect(() => {

    setTrackerData([
      // g    generated ONLY
      {
        userType: "School",
        statusType: "Generated",
        headerLeft: false,
        headerRight: true,
        leftLineActive: true,
        rightLineActive: (invoiceDetailsData?.action_dates?.paid !== "null") ? true : false,
        isActive: invoiceDetailsData?.action_dates?.generated === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.generated !== "null" ? (invoiceDetailsData?.action_dates?.generated) : " ",
        isHidden: invoice_type !== "system_generated" ? true : false,
      },

      // g    requested
      {
        userType: invoiceDetailsData?.role ?? "NA",
        statusType: "Requested",
        headerLeft: false,
        headerRight: true,
        leftLineActive: true,
        rightLineActive: (invoiceDetailsData?.action_dates?.created !== "null" || invoiceDetailsData?.action_dates?.rejected !== "null" || invoiceDetailsData?.action_dates?.cancelled !== "null") ? true : false,
        isActive: invoiceDetailsData?.action_dates?.requested === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.requested ?? "NA",
        isHidden: invoice_type === "system_generated" ? true : false,
      },
      // g    created
      {
        userType: "Admin",
        statusType: "created",
        headerLeft: false,
        headerRight: true,
        leftLineActive: false,
        rightLineActive: invoiceDetailsData?.action_dates?.paid1 !== "null" || invoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
        isActive: invoiceDetailsData?.action_dates?.created === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.created ?? "NA",
        isHidden: (invoice_type === "system_generated" || (invoiceDetailsData?.action_dates?.cancelled !== "null" && invoiceDetailsData?.action_dates?.created === "null") || (invoiceDetailsData?.action_dates?.rejected !== "null" && invoiceDetailsData?.action_dates?.created === "null")) ? true : false,
      },

      // g    paid ONLY
      {
        userType: "Admin",
        statusType: "Paid",
        headerLeft: false,
        headerRight: true,
        leftLineActive: false,
        rightLineActive: invoiceDetailsData?.action_dates?.accepted !== "null" ? true : false,
        isActive: invoiceDetailsData?.action_dates?.paid === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.paid !== "null" ? formatDate(invoiceDetailsData?.action_dates?.paid) : " ",
        isHidden: invoice_type !== "system_generated" ? true : false,
      },
      // g    paid 1
      {
        userType: invoiceDetailsData?.role ?? "NA",
        statusType: "paid",
        headerLeft: false,
        headerRight: true,
        leftLineActive: false,
        rightLineActive: invoiceDetailsData?.action_dates?.accepted !== "null" || invoiceDetailsData?.action_dates?.missing1 !== "null" ? true : false,
        isActive: invoiceDetailsData?.action_dates?.paid1 === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.paid1 ?? "NA",
        isHidden: (invoice_type === "system_generated" || (invoiceDetailsData?.action_dates?.paid1 === "null" && invoiceDetailsData?.action_dates?.rejected !== "null") || invoiceDetailsData?.action_dates?.cancelled !== "null") ? true : false,
      },

      // g    missing 1
      {
        userType: "Admin",
        statusType: "Missing payment",
        headerLeft: false,
        headerRight: true,
        leftLineActive: false,
        rightLineActive: invoiceDetailsData?.action_dates?.paid2 === "null" ? false : true,
        date: invoiceDetailsData?.action_dates?.missing1 ?? "NA",
        isActive: invoiceDetailsData?.action_dates?.missing1 === "null" ? false : true,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.missing1 === "null" || invoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
      },

      // g    paid 2
      {
        userType: invoiceDetailsData?.role ?? "NA",
        statusType: "paid",
        headerLeft: false,
        headerRight: true,
        leftLineActive: false,
        rightLineActive: invoiceDetailsData?.action_dates?.missing2 !== "null" || invoiceDetailsData?.action_dates?.accepted !== "null" ? true : false,
        date: invoiceDetailsData?.action_dates?.paid2 ?? "NA",
        isActive: invoiceDetailsData?.action_dates?.paid2 === "null" ? false : true,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.missing1 === "null" || invoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
      },

      // p    missing 2
      {
        userType: "Admin",
        statusType: "missing payment",
        headerLeft: false,
        headerRight: (invoiceDetailsData?.action_dates?.rejected === "null" && invoiceDetailsData?.action_dates?.cancelled === "null") || (invoiceDetailsData?.action_dates?.rejected !== "null" && invoiceDetailsData?.action_dates?.created !== "null") ? true : false,
        leftLineActive: false,
        rightLineActive: ((invoiceDetailsData?.action_dates?.rejected !== "null" && invoiceDetailsData?.action_dates?.missing2 !== "null") || (invoiceDetailsData?.action_dates?.accepted !== "null" && invoiceDetailsData?.action_dates?.missing2 !== "null")) ? true : false,
        isActive: invoiceDetailsData?.action_dates?.missing2 === "null" ? false : true,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.missing2 === "null" ? true : false,
        date: invoiceDetailsData?.action_dates?.missing2 ?? "NA"
      },

      // g    accepted ONLY
      {
        userType: "School",
        statusType: "accepted",
        headerLeft: false,
        headerRight: false,
        leftLineActive: false,
        rightLineActive: false,
        isActive: invoiceDetailsData?.action_dates?.accepted === "null" ? false : true,
        isHidden: invoice_type !== "system_generated" ? true : false,
        date: invoiceDetailsData?.action_dates?.accepted !== "null" ? (invoiceDetailsData?.action_dates?.accepted) : " "
      },

      // g    accepted
      {
        userType: "Admin",
        statusType: "accepted",
        headerLeft: false,
        headerRight: false,
        leftLineActive: false,
        rightLineActive: false,
        isActive: invoiceDetailsData?.action_dates?.accepted === "null" ? false : true,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.cancelled !== "null" ? true : invoiceDetailsData?.action_dates?.rejected !== "null" ? true : (invoiceDetailsData?.action_dates?.rejected !== "null" && invoiceDetailsData?.action_dates?.created !== "null" && invoiceDetailsData?.action_dates?.missing2 !== "null") ? true : ((invoiceDetailsData?.action_dates?.rejected === "null" && invoiceDetailsData?.action_dates?.cancelled === "null") || (invoiceDetailsData?.action_dates?.missing2 !== "null" && invoiceDetailsData?.action_dates?.accepted === "null")) ? false : false,
        date: invoiceDetailsData?.action_dates?.accepted ?? "NA"
      },

      // r    rejected
      {
        userType: "Admin",
        statusType: "rejected",
        headerLeft: false,
        headerRight: false,
        leftLineActive: false,
        rightLineActive: false,
        isActive: invoiceDetailsData?.action_dates?.rejected !== "null" ? true : false,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.rejected === "null" ? true : false,
        date: invoiceDetailsData?.action_dates?.rejected ?? "NA"
      },

      // y    cancelled
      {
        userType: invoiceDetailsData?.role ?? "NA",
        statusType: "cancelled",
        headerLeft: false,
        headerRight: false,
        leftLineActive: false,
        rightLineActive: false,
        isActive: invoiceDetailsData?.action_dates?.cancelled !== "null" ? true : false,
        isHidden: invoice_type === "system_generated" || invoiceDetailsData?.action_dates?.cancelled === "null" ? true : false,
        date: invoiceDetailsData?.action_dates?.cancelled ?? "NA"
      },
    ]);

  }, [invoiceDetailsData]);
  return (
    <div>
      <div
        onClick={() => console.log("trackerData", trackerData[0], typeof (trackerData))}
        className={`flex justify-center pt-[36px] h-[115px] _bg-emerald-400 pl-[36px] w-full
                ${invoiceDetailsData?.action_dates?.missing2 === "null" ? "pr-[45px]" : "pr-[40px]"}
                ${invoiceDetailsData?.action_dates?.rejected !== "null" ? "pr-[45px]" : ""}                
             `}>
        {trackerData.map((item, index) => {
          return <div key={index} className={`
                    ${item?.isHidden ? "" : item.headerRight ? "w-full" : item.userType ? "w-[0px]" : ""}
                    ${0 === "instructor_invoice" && item.statusType === "requested" ? "hidden" : ""}
                `}>
            {item?.isHidden ? "" :
              <div key={index} className="">
                <div className='flex items-center w-full'>

                  <div className='relative'>
                    <div className={`${item.isActive ? "bg-cBrandColor" : "bg-cChipBorder"} h-s16 w-s16 rounded-full`}></div>

                    {/* top title */}
                    <div style={{}} className='absolute -top-[36px] left-0 capitalize -translate-x-[52px] w-[120px] text-center text-fs16 font-semibold text-cHighlighted'>{item.userType}</div>

                    {/* bottom data */}
                    <div className={`absolute left-0 text-center -bottom-[39px] w-[140px] -translate-x-[62px]`}>
                      <div className='text-center capitalize text-fs16 font-fw600 text-cHighlighted'>{item.statusType}</div>
                    </div>
                    {(item?.date === null || item?.date === "null") ? "" :
                      <div className="absolute -bottom-[65px] w-[120px] left-0 -translate-x-[52px] text-center">
                        <div className='text-center text-fs14 text-cHighlighted mt-s5'>{item?.date}</div>
                      </div>
                    }

                  </div>

                  {
                    item.headerRight ? <div className={`h-s4 w-full ${item.rightLineActive ? "bg-cBrandColor" : "bg-cChipBorder"} `}>
                    </div>
                      : ""}
                </div>
              </div>}
          </div>
        })}
      </div>
    </div>
  );
};

export default InvoiceStatusTracker;
