import React from 'react';
import { useNavigate } from 'react-router-dom';

const LicenseRequested = ({ title = "", subtitle1 = "S", subtitle2 = "", link2 = "/" }) => {

    const navigateTo = useNavigate();

    return (
        <div className="p-s20 ring-2 ring-cBrand rounded-br8 max-w-[350px] min-w-[350px] h-[300px] grid grid-rows-1">
            <div className='important_text text-cBlack place-self-center text-center'>{title}</div>

            <div className='flex justify-between items-center'>
                <div
                    onClick={() => {navigateTo('/license/overview')}}
                    className='button_text text-cBrand flex justify-center items-center cursor-pointer'>
                    {subtitle1}
                </div>
                <div
                    onClick={() => { navigateTo(`${link2}`) }}
                    className='button_text text-cBrand flex justify-center items-center cursor-pointer'>
                    {subtitle2}
                </div>
            </div>
        </div>
    );
};

export default LicenseRequested;