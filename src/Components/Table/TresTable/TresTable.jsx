import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CommonSearchBox from "../../Input/CommonSearchBox";
import AutoPaginate from "./AutoPaginate";

function TresTable({
    filterButtonTopRight,

    headers = [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
    ],

    RowOnClick = () => { },
    rowDataArray,
    TableRowComponent,
    showTakeAmount = false,
    takeOptionOnChange = () => { },
    takeArray = [
        {
            title: "10",
            value: 10,
            selected: false,
        },
        {
            title: "25",
            value: 25,
            selected: true,
        },
        {
            title: "50",
            value: 50,
            selected: false,
        },
        {
            title: "100",
            value: 100,
            selected: false,
        },
    ],

    searchValue,
    searchOnChange,
    onSearchClear,
    showSearchBox = false,
    withClearSearch,

    seeAllText,
    seeAllLink = "",

    showChip = false,
    chipWidth = "min-w-[180px]",
    chipAreaWidth = "max-w-[100vw]",
    chipArray = [
        {
            title: "Option 01",
            selected: false,
            action: () => {
                console.log("Option 01");
            },
        },
        {
            title: "Option 02",
            selected: true,
            action: () => {
                console.log("Option 02");
            },
        },
        {
            title: "Option 03",
            selected: false,
            action: () => {
                console.log("Option 03");
            },
        },
        {
            title: "Option 04",
            selected: false,
            action: () => {
                console.log("Option 04");
            },
        },
        {
            title: "Long Option 05 that has more data",
            selected: false,
            action: () => {
                console.log("Option 05");
            },
        },
        {
            title: "Long Option 06",
            selected: false,
            action: () => {
                console.log("Option 06");
            },
        },
    ],

    paginationOnClick = () => { },
    showPagination = true,
    showPageCountText = true,
    mainObject = {
        data: []
    },
    search_loading = false,
}) {

    const { t } = useTranslation();

    const [indexArray, setIndexArray] = useState([]);

    useEffect(() => {
        let t_array = [];
        for (let i = mainObject?.from; i <= mainObject?.to; i++) {
            t_array.push(i);
            setIndexArray(t_array);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainObject?.from, mainObject?.to]);

    return (
        <>
            <div className={`p-5 w-full bg-white text-cMainBlack rounded-br5`} >

                {/* blue: table upper side components */}
                <div>

                    {/* green: FIRST/TOP LAYER */}
                    <div className="flex justify-between items-center">
                        {/* idea: chip to show... */}
                        {showChip ?
                            <div className={`flex space-x-5 overflow-x-auto mb-s10 ${seeAllText ? "max-w-[95vw]" : chipAreaWidth}`}>
                                {
                                    chipArray.map((item, index) =>
                                        <div
                                            key={index}
                                            onClick={item.action}

                                            className={`
                            mb-s10 px-s10 ${chipWidth} capitalize h-s36 flex items-center justify-center rounded-full cursor-pointer select-none text-fs16 font-fw600 
                            ${item.selected ? "bg-cBrand text-white" : "bg-white text-cBrand border border-cChipBorder hover:bg-cBrand hover:border-cBrand hover:text-white"}
                          `}>{item.title}</div>
                                    )}
                            </div> : ""}

                        {/* idea: see all text custom with link */}
                        {seeAllText ? (
                            <div className="pb-5 w-full text-right">
                                <Link
                                    to={seeAllLink}
                                    className="text-fs16 font-fw600 text-cBrand hover:text-cBrand"
                                >
                                    {seeAllText}
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {showChip || seeAllText ?
                        <div className="pb-5 pt-s10">
                            <hr />
                        </div> : ""}

                    {/* green: SECOND LAYER */}

                    <div className="flex justify-between items-center">
                        {/* idea: search box */}
                        {showSearchBox === true ? (
                            <div className="pb-5">
                                <CommonSearchBox value={searchValue} onChange={searchOnChange} search_loading={search_loading} onSearchClear={onSearchClear} withClearSearch={withClearSearch} />
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {/* idea: right side top title or custom component */}
                        {filterButtonTopRight ? (
                            <div className="pb-5">{filterButtonTopRight}</div>
                        ) : (
                            <div></div>
                        )}

                    </div>

                    {/* green: THIRD LAYER */}
                    {
                        showTakeAmount ? <TakeItem takeArray={takeArray} takeOptionOnChange={takeOptionOnChange} /> : ""
                    }

                </div>

                {/* blue: main table ui */}
                {/* green: Headers... */}
                <div
                    className="p-s5 lg:overflow-visible overflow-x-auto lg:max-w-full max-w-[1024px]">
                    <table className="w-full table-border-outer">
                        <thead className="">
                            <tr>
                                {headers.map((item, index) => {
                                    return (
                                        <th
                                            key={index}
                                            className={`
                                                border-collapse text-center capitalize text-fs16 font-fw700 py-s10
                                                ${index === headers.length ? "border-r-[0px]" : "border-r-[1px]"}
                                            `}>
                                            <span className="px-s10">{item}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>


                        {/* b: auto table row management */}
                        <tbody className="border-collapse border-[1px]">
                            {
                                mainObject?.data?.length > 0 ? mainObject?.data?.map((item, index) =>
                                    <TableRowComponent key={index} index={indexArray[index]} data={item} />
                                )
                                    : <NoDataRow columnNumber={headers?.length ?? 3} />
                            }
                        </tbody>



                    </table>
                </div>

                {/* blue: Pagination goes here ! */}
                {(mainObject?.last_page !== 1 && showPagination === true) ? (
                    <div className={`flex justify-between items-center ${mainObject?.last_page !== 1 || showPageCountText ? "h-[65px] pt-5" : ""}`} >
                        {showPageCountText ? (
                            mainObject?.total > 0 ?
                                <div className="text-sm">
                                    {t("Showing")} {mainObject?.from} {t("to")} {mainObject?.to}, {t("out of")} {mainObject?.total} {t("results.")}
                                </div>
                                :
                                <div className="text-sm">
                                    No results available.
                                </div>
                        ) : (
                            ""
                        )}

                        {mainObject?.last_page !== 1 ? (
                            <div className="">
                                <AutoPaginate
                                    mainObject={mainObject}
                                    paginationOnClick={paginationOnClick}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

            </div>
        </>
    );
}

export default TresTable



function NoDataRow({ message = "No Data Found !", columnNumber = 5 }) {
    return (
        <tr className='w-full'>
            <th colSpan={columnNumber} className="py-s10">
                {message}
            </th>
        </tr>
    )
}


const TakeItem = ({ takeArray, takeOptionOnChange }) => {
    // const { setDriverTakeAmount, driverTakeAmount } = useDriverStore();
    return (
        <div className='pb-5 font-semibold'>
            <span className='pr-s10'>Show</span>
            <select
                onChange={(e) => {
                    takeOptionOnChange(e);
                }}
                className='pl-5 h-s30 rounded-br5 select-style space-y-s5'
            >
                {
                    takeArray?.map((item, index) =>
                        <option
                            key={index}
                            className='py-s10 text-cMainBlack'
                            selected={item?.selected}
                            value={item?.value}
                        >{item?.title}</option>
                    )
                }

            </select>   <span className='pl-s10'>Entries</span>

        </div>
    )
}