import React from 'react'

const NewInvoiceStatusTracker = ({
    dataArray = [
        { title: "student", subtitle: "requested", value: "07-04-2023", isActive: true },
        { title: "school", subtitle: "created", value: "07-04-2023", isActive: true },
        { title: "student", subtitle: "accepted", value: "07-04-2023", isActive: false },
    ]
}) => {
    return (
        <div className='w-full'>
            <div
                onClick={() => console.log("data array:", dataArray)}
                className={`flex items-center justify-center -mt-[28px] h-[145px] px-[36px] w-full `}>

                {/* r           main array maps here..   */}
                {dataArray.map((item, index) => {
                    return <div key={index} className={`w-full `}>
                        {item?.isHidden ? "" :
                            <div key={index} className="w-full">
                                <div className={`flex items-center ${(index + 1) < dataArray.length ? "w-full" : "w-s10"} `}>
                                    <div className='relative'>

                                        {/*l       active dot  */}
                                        <div className={`${item.isActive ? "bg-cBrandColor" : "bg-cChipBorder"} h-s16 w-s16 rounded-full`}></div>

                                        {/*e         top title */}
                                        <div style={{}} className='absolute -top-[36px] left-0 capitalize -translate-x-[52px] w-[120px] text-center text-fs16 font-semibold text-cHighlighted'>{item.title}</div>

                                        {/*e         bottom data */}
                                        <div className={`absolute left-0 text-center -bottom-[39px] w-[140px] -translate-x-[62px]`}>
                                            <div className='text-center capitalize text-fs16 font-fw600 text-cHighlighted'>{item.subtitle}</div>
                                        </div>

                                        {/*p        date value */}
                                        {(item?.value === null || item?.value === "null") ? "" :
                                            <div className="absolute -bottom-[65px] w-[120px] left-0 -translate-x-[52px] text-center">
                                                <div className='text-center text-fs14 text-cHighlighted mt-s5'>{item?.value}</div>
                                            </div>
                                        }

                                    </div>

                                    {/*g       lines   */}
                                    {(index + 1) < dataArray.length ? <div className={`h-s4 w-full ${dataArray[index + 1]?.isActive ? "bg-cBrandColor" : "bg-cChipBorder"} `}>
                                    </div> : ""
                                    }

                                </div>

                            </div>
                        }

                    </div>
                })}
            </div>
        </div>
    );
};


export default NewInvoiceStatusTracker