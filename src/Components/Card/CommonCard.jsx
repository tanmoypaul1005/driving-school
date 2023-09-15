import React from 'react'
import { useState } from 'react';

const CommonCard = ({ title, number, onClick, note, cardIcon, isActive = true, isSelected = false }) => {
  const [color, setColor] = useState("text-cHighlighted");
  const [color2, setColor2] = useState("text-cImportantText");
  return (
    <div
      onClick={onClick} onMouseOver={() => {
        if (isActive) {
          setColor("text-cLessImportant")
          setColor2("text-cLessImportant")
        }
      }}
      onMouseOut={() => {
        if (isActive) {
          setColor("text-cHighlighted")
          setColor2("text-cImportantText")
        }
      }}
      className={`
          flex relative flex-col justify-center items-center h-40 border cursor-pointer 
          shadow-cShopItem bg-cBrandColor2 ${isSelected === true ? 'border-cBrand' : 'border-cChipBorder'} rounded-br8 lg:h-44
           ${isActive ? "hover:border-cBrand hover:bg-cBrandColor " : "cursor-default bg-gray-200 text-cMainBlack"}
      `}>
      {title && number && <div className=""></div>}
      <div className='flex justify-center items-center rounded-full bg-cBackgroundAndCategory w-s60 h-s60 mb-s8'>{cardIcon && <img className='w-s30 h-s30' src={cardIcon ? cardIcon : ''} alt="" />}</div>
      {title && <div className={`text-fs16 ${note && "h-12"} h-h24 font-fw600  ${color2}`} >{title}</div>}
      {note && <div className={`body_text h-h12 ${color2}`} >{note}</div>}
    </div>
  )
}

export default CommonCard