/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { iExpertiseArea1Gray, iExpertiseArea2, iExpertiseArea3Gray } from '../../App/Utility/source';
import { iExpertiseArea1, iExpertiseArea3, iExpertiseArea2Gray } from './../../App/Utility/source';

const InstructorCard = ({
  data,
  click = false,
  width = "w-s170",
  classRoomSelect = false,
  drivingSelect = false,
  externalSelect = false,
  onSelectClassRoom,
  onSelectDriving,
  onSelectExternal,
  title = ""
}) => {


  return (
    <>
      <div className={`${width} border-2 border-cChipBorder rounded-br10`}>
        <div className='p-s10'>
          <div className="flex justify-center mb-s10">
            {/* <img className='w-s26 h-s26 mt-s3' src={iBike} alt=""></img> */}
            <span className='flex items-center truncate sub_title text-cBlack'>
              {title ? title : "NA"} {classRoomSelect}
            </span>
          </div>

          <div className='flex justify-between'>
            <img
              onClick={onSelectClassRoom}
              className={`${click && "cursor-pointer"} mr-s6 w-s45 h-s45`}
              src={classRoomSelect ? iExpertiseArea1 : iExpertiseArea1Gray}
              alt=""
            />
            <img
              onClick={onSelectDriving}
              className={`${click && "cursor-pointer"} mr-s6 w-s45 h-s45`}
              src={drivingSelect ? iExpertiseArea2 : iExpertiseArea2Gray}
              alt=""
            />
            <img
              onClick={onSelectExternal}
              className={`${click && "cursor-pointer"} mr-s6 w-s45 h-s45`}
              src={externalSelect ? iExpertiseArea3 : iExpertiseArea3Gray}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorCard;