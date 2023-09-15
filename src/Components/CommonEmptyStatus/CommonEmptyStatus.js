
import React from 'react';

const CommonEmptyStatus = ({
    size = "text-fs14",
    fontWeight="font-fw400",
    textColor="text-cTextBody",
    leading="leading-3"
    }) => {
    return (
        <span className={`${leading} ${fontWeight} ${size} ${textColor}`}>
            NA
        </span>
    );
};

export default CommonEmptyStatus;