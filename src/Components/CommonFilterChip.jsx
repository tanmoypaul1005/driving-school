import React from 'react'
import { iGrayCross } from '../App/Utility/source';

const  CommonFilterChip= ({title="Filter",selected = false, onClick = () => { } }) => {
    return (
            <div  onClick={onClick} className="flex items-center justify-center space-x-2 text-center rounded-full bg-cWhite py-s10 px-s12 text-fs16 font-fw500 text-cHighlighted">
            <div>{title}</div>
            <img src={iGrayCross} alt="" className="cursor-pointer w-s14 h-s14" />
        </div>
    )
}

export default CommonFilterChip;