import React, { useEffect, useState } from 'react';
import FreeDropDown from './DropDown/FreeDropDown';
import TimePickerNew from './Input/TimePickerNew';
import { iClockGray } from '../App/Utility/source';

const CommonTimePicker = ({
    selectAction = () => { },
    onChange = () => { },
    endTime,
    init_time,
    label = "Select Time",
    showExtendedTimeUi = true,
    required = false,
    heightClass = "h-s48",
    show_asterisk = true,
    withStar = true,
    disable=false
}) => {
    const [value, setValue] = useState('');
    const [showingTimePickerUi, setShowingTimePickerUi] = useState(false);

    useEffect(() => {
        setValue(init_time ?? '');
    }, [init_time]);
    return (
        <div className={`relative  w-full ${heightClass} `}>
            <div className='absolute bottom-0 left-0'>
                <input value={value ?? ''} onChange={() => { }} required={required} className="z-0 outline-none h-s1" />
            </div>
            <div className={`absolute top-0 left-0 bg-white ${heightClass} w-full z-10`}>
                <FreeDropDown
                    onUiUpdate={(data) => setShowingTimePickerUi(data)}
                    width={500}
                    body={!disable &&
                        <TimePickerNew
                            endTime={endTime}
                            init_time={value ? value : init_time}
                            showExtendedTimeUi={showExtendedTimeUi}
                            selectAction={(e, f) => {
                            // console.log(e, f);
                            setValue(e);
                            selectAction(e, f);
                            onChange(e, f);
                            disable={disable}
                        }}
                        />
                    }
                    button={
                        <>
                         <div className={` mb-s40 `}></div>
                            <div
                                className={`flex justify-between capitalize cursor-pointer border-cInputBorder bg-cTextFieldGrey rounded-br4 w-full p-2.5 border-r-[10px] border-r-transparent absolute  }
                            `}>
                            <div className='pl-s5 text-fs16 font-fw400'>{value ? value : label}</div>
                            <img src={iClockGray} alt="" className='pb-1' />
                            </div>
                        </>
                    }
                />
            </div>
        </div>
    )
}

export default CommonTimePicker