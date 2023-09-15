import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CommonSearchBox from "../Input/CommonSearchBox";
import AutoPaginate from "./AutoPaginate";

export default function CommonTable(
  {
    currentTakeAmount,
    outerPadding = "p-s20",
    titleComponent,
    tableTitle = "",
    topLeftComponent = "",
    headers,
    items,

    autoManageRow = false,
    TableRowComponent,

    searchValue,
    searchOnChange,
    onSearchClear,
    shoSearchBox = true,
    withClearSearch,

    seeAllText,
    seeAllLink = "",
    seeAllOnClick,


    showChip = false,
    chipWidth = "min-w-[180px]",
    chipAreaWidth = "max-w-[95vw]",
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

    paginationOnClick,
    showPagination = true,
    showPageCountText = true,
    paginationObject,
    topRightComponent,
    search_loading = false,
  }
) {
  const { t } = useTranslation();

  const [indexArray, setIndexArray] = useState([]);

  useEffect(() => {
    let t_array = [];
    for (let i = paginationObject?.from; i <= paginationObject?.to; i++) {
      t_array.push(i);
      setIndexArray(t_array);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationObject?.from, paginationObject?.to]);

  return (
    <>
      <div className={`w-full bg-white ${outerPadding} text-cMainBlack rounded-[20px]`} >

        {/*r top row 01 */}
        <div className="flex justify-between w-full">

          {/* e: table title (if exists one) */}
          {tableTitle ? (
            <div className="pb-5 w-full capitalize text-fs20 font-fw600">
              {tableTitle}
            </div>
          ) : (
            <div></div>
          )}

          {/* e: see all text custom with link */}
          {seeAllText ? (
            <div onClick={seeAllOnClick} className="pb-5 w-full text-right">
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

        {/*r top row 02 */}
        <div className="w-full">
          {/* l: chip to show... */}
          {showChip ?
            <div className={`flex space-x-5 overflow-x-auto mb-s10 ${seeAllText ? "max-w-[75vw]" : chipAreaWidth}`}>
              {
                chipArray.map((item, index) =>
                  <div
                    key={index}
                    onClick={item.action}

                    className={`
                        mb-s10 px-s10 ${chipWidth} capitalize h-s36 flex items-center justify-center rounded-full cursor-pointer select-none text-fs12 font-fw400 lg:text-fs14 md:font-fw600 
                        ${item.selected ? "bg-cBrand text-white" : "bg-white text-cBrand border border-cChipBorder hover:bg-cBrand hover:border-cBrand hover:text-white"}
                      `}

                  >{item.title}</div>
                )}
            </div> : <div></div>}
          {
            showChip && shoSearchBox ? <div className="mb-5 w-full">
              <hr />
            </div> : ""
          }

        </div>

        {/*r top row 03 */}
        <div className="flex justify-between w-full">

          {/* p: search box */}
          {shoSearchBox === true ? (
            <div className="self-start pb-5">
              <CommonSearchBox value={searchValue} onChange={searchOnChange} search_loading={search_loading} onSearchClear={onSearchClear} withClearSearch={withClearSearch} />
            </div>
          ) : (
            <div>          {
              topLeftComponent && <>{topLeftComponent}</>
            }</div>
          )}



          {/* b: filter button or custom component */}
          {titleComponent ? (
            <div className="">{titleComponent}</div>
          ) : (
            <div></div>
          )}

        </div>

        {/*r top row 04 */}
        <div className={`flex justify-between items-center`}>
          {/* e: take item component */}
          {topRightComponent ?
            <div className="pb-5">
              {topRightComponent}
            </div>
            : ""}
        </div>

        {/* blue: main table ui */}
        {/* green: Headers... */}
        <div className="p-s5 lg:overflow-auto overflow-x-auto lg:max-w-full max-w-[1024px]">
          <table className="w-full table-border-outer overflow-hidden">
            <thead className="">
              <tr>
                {headers.map(({ index, name }) => {
                  return (
                    <th
                      key={index}
                      className={`
                      border-collapse text-center capitalize text-fs16 font-fw700 py-s10
                      ${index === headers.length ? "border-r-[0px]" : "border-r-[1px]"}
                    `}
                    >
                      <span className="px-s10">{name}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {!autoManageRow ?
              <>
                {/* r: manual table body rows..  */}
                <tbody className="border-collapse border-[1px]">
                  {items}
                </tbody>
              </>
              :
              <>
                {/* b: auto table row management */}
                <tbody className="border-collapse border-[1px]">
                  {
                    paginationObject?.data?.length > 0 ? paginationObject?.data?.map((item, index) => <TableRowComponent key={index} index={indexArray[index]} data={item} />)
                      : <NoDataRow columnNumber={headers?.length ?? 3} />
                  }
                </tbody>
              </>
            }



          </table>
        </div>

        {/* blue: Pagination goes here ! */}
        {(paginationObject?.last_page !== 1 && showPagination === true) ? (
          <div className={`flex justify-between items-center ${paginationObject?.last_page !== 1 || showPageCountText ? "h-s60 pt-5" : ""}`} >
            {showPageCountText ? (
              paginationObject?.total > 0 ?
                <div className="text-sm">
                  {t("Showing")} {paginationObject?.from} {t("to")} {paginationObject?.to}, {t("out of")} {paginationObject?.total} {t("results.")}
                </div>
                :
                <div className="text-sm">
                  No results available.
                </div>
            ) : (
              ""
            )}

            {paginationObject?.last_page !== 1 ? (
              <div className="">
                <AutoPaginate
                  currentTakeAmount={currentTakeAmount}
                  paginationObject={paginationObject}
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
    <div className='mb-5'>
      <span className='pr-s10'>Show</span>
      <select
        onChange={(e) => {
          takeOptionOnChange(e.target.value);
          // setDriverTakeAmount(e.target.value);

          // getDrivers();
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