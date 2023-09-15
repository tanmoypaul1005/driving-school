import { Select } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import useUtilityStore from '../../App/Stores/UtilityStore';

function AsyncSingleCombobox({
    label,
    placeholder = "Search or select an item",
    required = false,
    selectType = 'single',
    selectedValue,
    onSearchItem,
    onChange = () => { },
    onChangeLabel = () => { },
    optionArray,
}) {
    const [dataArray, setDataArray] = useState([]);
    const [selectedItem, setSelectedItem] = useState({ label: "", value: 0 });
    const { isLoadingSearch } = useUtilityStore();

    const handleChange = (value, data) => {
        // console.log("CHANGED::: ", value, data?.label);
        onChange(value);
        onChangeLabel(data?.label);
    };

    const onSearch = (value = "") => {
        // console.log('search-key:', value.toLowerCase());
        onSearchItem(value.toLocaleLowerCase());
    };

    useEffect(() => {
        if (selectedValue) setSelectedItem({ label: selectedValue?.label, value: selectedValue?.value });
        else setSelectedItem({});
    }, [selectedValue]);

    useEffect(() => {
        // console.log("optionArray UPDATED:::", optionArray);
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
    }, [optionArray]);

    return (
        <div>
            <div
                className={`text-cHighlighted text-fs14 font-fw600 mb-s15 capitalize w-full ${required === true ? "req-field" : ""}`}
            >
                {label}
            </div>
            <div className="relative">
                <Select
                    allowClear
                    showSearch
                    placeholder={placeholder}
                    optionFilterProp="children"
                    size='large'
                    bordered={false}
                    style={{
                        width: '100%',
                        border: '2px solid #F4F4F4',
                        borderRadius: '10px',
                        // backgroundColor:'#F4F4F4',                    
                    }}
                    onChange={handleChange}
                    onSearch={onSearch}

                    defaultValue={selectedItem}
                    value={selectedItem}

                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input) || (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={dataArray}
                    notFoundContent={
                        <div className='flex items-center space-x-5'>
                            {isLoadingSearch ? <ImSpinner2 className="animate-spin duration-150 text-gray-500 border-gray-400 w-5 h-[35px]" /> : ""}
                            <span>No result found, try again.</span>
                        </div>
                    }
                />
                {isLoadingSearch ? <div className='absolute right-[30px] top-1/2 -translate-y-1/2'>
                    <ImSpinner2 className="animate-spin duration-150 text-gray-500 border-gray-400 w-5 h-[35px]" />
                </div> : ""}
            </div>
        </div>
    )
}

export default AsyncSingleCombobox
