import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CommonTitle(props) {

    const navigate = useNavigate();

    const [is_mouse_over_back_arrow, setIsMouseOverBackArrow] = useState(false);

    return (
        <>
            <div onClick={props.onClick} className="mb-s24">
                <div className="flex justify-start mb-s8 page_title">
                    {/* <img onMouseLeave={() => { setIsMouseOverBackArrow(false) }} onMouseOver={() => { setIsMouseOverBackArrow(true); }} onClick={() => navigate(-1)} src={is_mouse_over_back_arrow ? iBackArrowActive : iBackArrow} alt="" className="cursor-pointer" /> */}
                    {props.title}
                </div>
                <div className=''>
                    {
                        props.children
                    }
                </div>
            </div>
        </>
    )
}

export default CommonTitle;