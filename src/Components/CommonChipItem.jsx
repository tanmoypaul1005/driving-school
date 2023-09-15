import React from 'react'
import { iRightArrowDark, iRightArrowWhite } from '../App/Utility/source'

const CommonChipItem = ({ title1, title2, selected = false, onClick = () => { } }) => {

    return (
        <div
            onClick={onClick}
            className={`
                flex items-center space-x-2 capitalize px-3 py-1.5 rounded-br4
                cursor-pointer select-none
                ${selected ? "bg-cBrandColor text-white" : "bg-white text-cMainBlack"}
                transition-all duration-300 ease-in-out button_text
            `}>
            <div>{title1}</div>
            {title2 ?
                <>
                    <img src={selected ? iRightArrowWhite : iRightArrowDark} alt="" />
                    <div>{title2}</div>
                </>
                : ""}
        </div>
    )
}

export default CommonChipItem