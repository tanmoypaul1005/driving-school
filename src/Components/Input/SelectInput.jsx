import React, { useEffect, useState } from 'react';

function SelectInput({
    label,
    placeholder,
    placeholderClick,
    required,
    selectOptionOnChange,
    value,
    disabled = false,
    dataArray, withStar = true, textSize = "text-fs16", height = "h-full", padding = "p-2.5", emptyText = "No Item Found"
}) {
    const [selectArray, setSelectArray] = useState([]);

    useEffect(() => {
        if (dataArray) setSelectArray(dataArray);
        else setSelectArray([
            {
                title: "Option 01",
                value: 10,
                selected: false
            }, {
                title: "Option 02",
                value: 20,
                selected: false,
            },
        ]);
    }, [dataArray]);

    return (
        <div className='capitalize'>
            <div className={`text-cHighlighted important_text mb-s8 w-full ${(required === true && withStar === true) ? "req-field" : ""}`}>{label}</div>

            <select
                disabled={disabled}
                required={required}
                onChange={(e) => {
                    selectOptionOnChange(e.target.value);
                    // console.log(e.target.value);
                }}
                defaultValue={value}
                value={value}
                className={`${textSize} ${height} font-fw400 cursor-pointer border-cInputBorder bg-cTextFieldGrey rounded-br4 w-full ${padding} border-r-[10px] border-r-transparent`}>
                <option onClick={placeholderClick} className={`text-cMainBlack ${textSize} font-fw400`} selected value='' >
                    {selectArray?.length>0? placeholder:emptyText}
                </option>
                {selectArray?.length > 0 ?
                    selectArray?.map((item, index) =>
                        item?.value ?
                            <option
                                key={index}
                                className='capitalize cursor-pointer py-s10 text-cMainBlack'
                                value={item?.value}
                                selected={item?.selected === true ? true : false}
                            >{item?.title}</option>
                            : ""
                    ) : ''
                }
            </select>
        </div>
    )
}

export default SelectInput
