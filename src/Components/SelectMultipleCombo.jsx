import { Select } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';

function SelectMultipleCombo({
    label = "Select Awesome Data",
    placeholder = "Please select options",
    required = false,
    selectedValue,
    onChange = () => { },
    optionArray,
}) {
    const [dataArray, setDataArray] = useState([]);
    const [selectedArray, setSelectedArray] = useState([]);

    const handleChange = (value) => {
        onChange(value);
        // console.log("selected: ", value);
        setSelectedArray(value);
    };

    useEffect(() => {
        if (selectedValue) setSelectedArray(selectedValue);
        else setSelectedArray([]);

        if (optionArray) setDataArray(optionArray);
        else setDataArray([
            {
                label: "BMW",
                value: 1
            },
            {
                label: "Ferrari",
                value: 2
            },
            {
                label: "Mercedes",
                value: 3
            },
            {
                label: "Bugatti",
                value: 4
            },
            {
                label: "Lamborghini",
                value: 5
            },
        ])
    }, [optionArray, selectedValue]);

    return (
        <div>
            <div
                className={`text-cHighlighted text-fs14 font-fw600 mb-s15 capitalize w-full ${required === true ? "req-field" : ""}`}
            >
                {label}
            </div>
            <Select
                allowClear
                className='ant-select'
                mode="multiple"
                size='large'
                bordered={false}
                style={{
                    width: '100%',
                    border:'2px solid #F4F4F4',
                    borderRadius: '10px',
                    // backgroundColor:'#F4F4F4',                    
                }}
                placeholder={placeholder}
                defaultValue={selectedArray}
                value={selectedArray}
                onChange={handleChange}

                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input) || (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={dataArray}
            // options={dataArray?.map((label, value) => ({ label: label, value: value }))}
            />
        </div>
    )
}

export default SelectMultipleCombo