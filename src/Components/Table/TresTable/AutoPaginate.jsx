import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function AutoPaginate({
    mainObject,
    paginationOnClick
}) {
    const { t } = useTranslation();
    const [mainArray, setMainArray] = useState([]);

    const makePaginationArray = () => {
        let p_array = [];
        let array_size = 0;
        if (mainObject?.last_page > 5) {
            array_size = 5;
        } else {
            array_size = mainObject?.last_page;
        }
        for (let i = 0; i < array_size; i++) {
            let t_active = false;
            if (mainObject?.current_page === (i + 1)) {
                t_active = true;
            }
            p_array.push({
                active: t_active,
                label: (i + 1),
                url: mainObject?.path + "?page=" + (i + 1),
            })
        }

        // console.log("mainObject TECH  ::::", p_array);
        setMainArray(p_array);
    }

    const manualPageArray = () => {
        let p_array = [];

        if (mainObject?.last_page === mainObject?.current_page && mainObject?.last_page > 4) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page - 4),
                url: mainObject?.path + "?page=" + (mainObject?.current_page - 4),
            })
        }


        if (((mainObject?.last_page - 1) === mainObject?.current_page) && ((mainObject?.last_page - 1) > 3)) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page - 3),
                url: mainObject?.path + "?page=" + (mainObject?.current_page - 3),
            })
        }

        if (mainObject?.last_page === mainObject?.current_page && mainObject?.last_page > 3) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page - 3),
                url: mainObject?.path + "?page=" + (mainObject?.current_page - 3),
            })
        }

        if (mainObject?.current_page > 2) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page - 2),
                url: mainObject?.path + "?page=" + (mainObject?.current_page - 2),
            })
        }

        if (mainObject?.current_page > 1) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page - 1),
                url: mainObject?.path + "?page=" + (mainObject?.current_page - 1),
            })
        }


        p_array.push({
            active: true,
            label: (mainObject?.current_page),
            url: mainObject?.path + "?page=" + (mainObject?.current_page),
        })

        if (mainObject?.last_page - mainObject?.current_page > 1) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page + 1),
                url: mainObject?.path + "?page=" + (mainObject?.current_page + 1),
            })
        }

        if (mainObject?.last_page - mainObject?.current_page > 2) {
            p_array.push({
                active: false,
                label: (mainObject?.current_page + 2),
                url: mainObject?.path + "?page=" + (mainObject?.current_page + 2),
            })

            if ((p_array.length < 5) && (mainObject?.last_page - mainObject?.current_page > 3)) {
                p_array.push({
                    active: false,
                    label: (mainObject?.current_page + 3),
                    url: mainObject?.path + "?page=" + (mainObject?.current_page + 3),
                })
            }

            if ((p_array.length < 5) && (mainObject?.last_page - mainObject?.current_page > 4)) {
                p_array.push({
                    active: false,
                    label: (mainObject?.current_page + 4),
                    url: mainObject?.path + "?page=" + (mainObject?.current_page + 4),
                })
            }
        }

        // console.log("mainObject TECH  ::::", p_array);
        setMainArray(p_array);
    }

    useEffect(() => {
        console.log("NEW mainObject:::", mainObject);
        if (mainObject?.last_page < 6) {
            makePaginationArray()
        } else {
            manualPageArray();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainObject])
    return (
        <>
            <div>
                <ul className="flex">
                    <li>
                        <div onClick={() => {
                            if (mainObject?.prev_page_url) {
                                paginationOnClick(mainObject?.prev_page_url);
                            }
                        }}
                            className={`py-s10 px-s15 text-cIconColor bg-cWhite rounded-l-br6 border border-cNmSelect 
                                            ${mainObject?.prev_page_url
                                    ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                                    : "cursor-not-allowed"}`}
                        >
                            {t("Previous")}
                        </div>
                    </li>

                    {mainObject?.first_page_url ? (
                        <>
                            <li>
                                <div
                                    onClick={() => paginationOnClick(mainObject?.first_page_url)}
                                    className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"} 
                                        ${mainObject.current_page === 1
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-white hover:text-cTextShopDetails"
                                        }
                                        border border-cNmSelect cursor-pointer`}
                                >
                                    1
                                </div>
                            </li>
                            {(mainObject.current_page > 4) && (mainObject.last_page > 5) ?
                                <li>
                                    <div
                                        // onClick={() => paginationOnClick(firstItem.url)}
                                        className={`border cursor-default py-s10 px-s12 text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails border-cNmSelect`}
                                    >
                                        ...
                                    </div>
                                </li> : ""}
                        </>
                    ) : (
                        ""
                    )}

                    {mainArray?.map((item, index) => (
                        item.label !== 1 && item.label !== mainObject?.last_page ?
                            <li key={index}>
                                <div
                                    onClick={() => paginationOnClick(item?.url)}
                                    className={`py-s10 px-s12 
                                        ${item?.active === true
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"
                                        }   border border-cNmSelect cursor-pointer`}
                                >
                                    {item?.label}
                                </div>
                            </li> : ""
                    ))}

                    {mainObject?.last_page_url ? (
                        <>
                            {(mainObject.last_page - mainObject.current_page > 3) && (mainObject.last_page > 5) ?
                                <li>
                                    <div
                                        // onClick={() => paginationOnClick(firstItem.url)}
                                        className={`border cursor-default py-s10 px-s12 text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails border-cNmSelect`}
                                    >
                                        ...
                                    </div>
                                </li> : ""}

                            <li>
                                <div
                                    onClick={() => paginationOnClick(mainObject?.last_page_url)}
                                    className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"} 
                                        ${mainObject.last_page === mainObject.current_page
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-white hover:text-cTextShopDetails"
                                        }  border border-cNmSelect cursor-pointer`}
                                >
                                    {mainObject?.last_page}
                                </div>
                            </li>
                        </>
                    ) : (
                        ""
                    )}

                    <li>
                        <div onClick={() => {
                            if (mainObject?.next_page_url) {
                                paginationOnClick(mainObject?.next_page_url);
                            }
                        }}
                            className={`py-s10 px-s12 text-cIconColor bg-white rounded-r-br6 border border-cNmSelect
                                        ${mainObject?.next_page_url
                                    ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                                    : "cursor-not-allowed"
                                }`}
                        >
                            {t("Next")}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
