import React from "react";
import { BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import Clamp from "react-multiline-clamp";

function NotificationItem({
  is_seen,
  isSelected = true,
  onSelect, title = "NA",
  description = "NA",
  date = "NA",
  time = "NA"
}) {
  return (
    <div className={`flex flex-row justify-start items-center`} onClick={onSelect}>
      <div className={`w-[6px] h-[85px]  ${isSelected ? "bg-cBrandColor" : "bg-[#F8F8F8]"} py-0`}></div>

      <div className={`${isSelected ? 'bg-[#DFEAFB]' : 'bg-white'} flex flex-row w-full justify-between items-center my-[5px] ml-[15px] mr-[20px] rounded-md cursor-pointer`}>
        <div className="flex flex-col pl-[10px] w-full">
          <div className={`${isSelected ? 'text-[#333333]' : 'text-[#828282]'} text-capitalize text-lowercase font-fw600 text-fs12 my-1 ${is_seen === 0 ? "text-cMainBlack" : "text-cIconColor2"}`} >
            {title}
          </div>

          <div className={`text-fs10 font-fw400 text-ellipsis text-capitalize text-lowercase ${is_seen === 0 ? "text-cTextBody" : "text-cIconColor2"}}`} >
            <Clamp withTooltip lines={2}>
              {description ? description : 'NA'}
            </Clamp >
          </div>

          <div className="flex justify-end mr-2.5 items-center text-gray-500 text-xs my-2">
            <div className="flex justify-end items-center mr-4">
              <FaRegCalendarAlt className="mr-0 text-sm" />
              <span className='ml-s5 text-fs10 font-fw400 text-cTextBody'>
                {date}
              </span>
            </div>

            <div className="flex justify-end items-center ">
              <BsClock className="mr-0 text-sm" />
              <span className='ml-s5 text-fs10 font-fw400 text-cTextBody'>
                {time}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
