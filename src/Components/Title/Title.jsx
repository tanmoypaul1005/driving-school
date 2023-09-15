import React, { useState } from 'react'
import { iBackArrow, iBackArrowActive } from '../../App/Utility/source'
import { iRightArrow } from './../../App/Utility/source';
import { useNavigate } from 'react-router-dom';

function Title({title}) {

    const navigate = useNavigate();
    const [is_mouse_over_back_arrow, setIsMouseOverBackArrow] = useState(false);

    return (
        <>
            <div className="mb-s20 mt-s20 cursor-pointer ">
                <div className="mb-s15 text-fs32 font-fw600 flex justify-start">
                    <img onMouseLeave={() => { setIsMouseOverBackArrow(false) }} onMouseOver={() => { setIsMouseOverBackArrow(true); }} onClick={() => { navigate("/dashboard") }} src={is_mouse_over_back_arrow ? iBackArrowActive : iBackArrow} alt="" className="" />
                    <span className="text-fs28 ml-s20 font-fw600 leading-8">{title}</span>
                </div>

                <div className="text-fs14 font-fw600 flex justify-start">
                    <span onClick={() => { navigate("/") }} className="text-[#A1A6BB] text-fs14 hover:text-cBrandColor ">Dashboard</span>
                    <img src={iRightArrow} alt="" className="my-s4 text-fs14" />
                    <span>{title}</span></div>
            </div>

        </>
    )
}

export default Title
