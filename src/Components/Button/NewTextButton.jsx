import React from 'react'

const NewTextButton = ({
    btnLabel = "Trek",
    onClick = () => { },
    iconRight,
    iconLeft,
    withBg = true,
    width = "w-fit",
}) => {
    return (
        <div
            className={`
                ${withBg ? "bg-white py-1.5 px-3" : ""}
                ${width}
                 flex items-center space-x-2.5  rounded-lg cursor-pointer select-none
             `}
            onClick={onClick}
        >
            {iconLeft ? <img src={iconLeft} alt="" /> : ""}
            <div className='font-semibold text-cBrandColor capitalize'>{btnLabel}</div>
            {iconRight ? <img src={iconRight} alt="" /> : ""}
        </div>
    )
}

export default NewTextButton