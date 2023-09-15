import React from 'react'
import { useNavigate } from 'react-router-dom';

function NoLicenseCard({ title = "You don’t have any active license. Please purchase a license first.", subtitle = "Purchase License", onClick = () => { } }) {
    const navigateTo = useNavigate();
    return (
        <div className="p-s20 ring-2 ring-cBrand rounded-br10 w-[390px] h-[300px] grid grid-rows-1">
            <div className='place-self-center text-center important_text text-cBlack'>{title}</div>
            <div
                onClick={() => {navigateTo("/license/overview") }}
                className='button_text text-cBrand flex justify-center items-center cursor-pointer'>
                    {subtitle}
                </div>
        </div>
    )
}

export default NoLicenseCard
