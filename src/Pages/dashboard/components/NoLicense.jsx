import React from 'react'
import { useNavigate } from 'react-router-dom';

function NoLicense({ title = "You don’t have any active license. Please purchase a license first.", subtitle = "Purchase License", onClick = () => { } }) {
    const navigateTo = useNavigate();
    return (
        <div className="flex items-center justify-between w-full p-s20 ring-2 ring-cBrand rounded-br10">
            <div className='text-center place-self-center important_text text-cBlack'>{title}</div>
            <div
                onClick={() => {navigateTo("/license/overview") }}
                className='flex items-center justify-center cursor-pointer button_text text-cBrand'>
                    {subtitle}
                </div>
        </div>
    )
}

export default NoLicense