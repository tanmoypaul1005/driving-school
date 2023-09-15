import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommonLicense = ({ title = "", subtitle1 = "S", subtitle2 = "", link2 = "/" }) => {

    const navigateTo = useNavigate();

    return (
        <div className="flex justify-between w-full p-s20 ring-2 ring-cBrand rounded-br8">
            <div className='text-center important_text text-cBlack place-self-center'>{title}</div>
            <div className='flex space-x-5'>
                <div
                    onClick={() => {navigateTo('/license/overview')}}
                    className='flex items-center justify-center cursor-pointer button_text text-cBrand'>
                    {subtitle1}
                </div>
                <div
                    onClick={() => { navigateTo(`${link2}`) }}
                    className='flex items-center justify-center cursor-pointer button_text text-cBrand'>
                    {subtitle2}
                </div>
            </div>
        </div>
    );
};

export default CommonLicense;