import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { iFilter, iFilterWhite } from "../../App/Utility/source";
import CommonButtonOutlined from "../Button/CommonButtonOutlined";
import CommonSearchBox from "../Input/CommonSearchBox";
import AutoPaginate from "./AutoPaginate";

export default function CommonTable2(
  {
    currentTakeAmount,
    outerPadding = "p-s20",
    titleComponent,
    tableTitle = "",
    headers,
    items,

    // to show and manage take/entries in the table data [default: hidden ]
    showTakeOption = false,
    takeOptionOnChange = () => { },

    autoManageRow = false,
    TableRowComponent,

    // to show and manage search in the table data [default: hidden ]
    showSearchBox = false,
    searchValue,
    searchOnChange,
    onSearchClear,
    withClearSearch,
    search_loading = false,

    // for see all text button [ deprecated for now ]
    seeAllText,
    seeAllLink = "",
    seeAllOnClick,

    // for chip management [deprecated for now, need to re-enable]
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
      }
    ],

    // to show and manage pagination(bottom-right) and counter text (bottom-left) in the table data [default: hidden ]
    showPagination = false,
    showPageCountText = false,
    paginationOnClick,
    paginationObject,

    scroll = true,

    // to show and manage filter(top-right) data [default: hidden ]
    showTopRightFilter = false,
    isFilterDot = false,
    topRightFilterComponentText = 'filter',
    topRightFilterComponentOnClick = () => { },
    topRightFilterComponent = <> <CommonButtonOutlined isFilterDot={isFilterDot} width="w-[120px]" isFullRounded={false} btnLabel={topRightFilterComponentText} onClick={topRightFilterComponentOnClick} colorType="primary" iconLeft={iFilterWhite} iconLeftHover={iFilter} /></>,
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
      <div className={`w-full bg-white ${outerPadding} text-cMainBlack rounded-[8px]`} >

        {/*r      TOP ROW  */}
        <div className="flex items-end justify-between w-full">

          {/* l       take item */}
          {showTakeOption ?
            <div className="pb-5">
              <TakeItem takeOptionOnChange={takeOptionOnChange} currentTakeAmount={currentTakeAmount} />
            </div>
            : ""}

          <div></div>


          <div className="flex items-center space-x-5">
            {/* p: search box */}
            {showSearchBox === true ? (
              <div className="pb-5">
                <CommonSearchBox roundedFull={false} value={searchValue} onChange={searchOnChange} search_loading={search_loading} onSearchClear={onSearchClear} withClearSearch={withClearSearch} />
              </div>
            ) : ""}

            {/* b: filter button or custom component */}
            {showTopRightFilter ? (
              <div className="pb-5">{topRightFilterComponent}</div>
            ) : ""}

            {titleComponent ? (
              <div className="pb-5">{titleComponent}</div>
            ) : ""}

          </div>

        </div>


        {/* blue: main table ui */}
        {/* green: Headers... */}
        <div className="p-s5 lg:overflow-auto overflow-x-auto lg:max-w-full max-w-[1024px]">
          <table className="w-full overflow-hidden table-border-outer">
            <thead className="">
              <tr>
                {headers.map(({ index, name }) => {
                  return (
                    <th
                      key={index}
                      className={`
                      border-collapse text-center text-capitalize text-lowercase  text-fs16 font-fw700 py-s10
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
                <div className="body_text text-cGray">
                  {t("Showing")} {paginationObject?.from} {t("to")} {paginationObject?.to}, {t("out of")} {paginationObject?.total} {t("results.")}
                </div>
                :
                <div className="body_text text-cGray">
                  {t("No results available.")}
                </div>
            ) : (
              ""
            )}

            {paginationObject?.last_page !== 1 ? (
              <div className="">
                <AutoPaginate
                  scroll={scroll}
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


function NoDataRow({ message = ("No Data Found !"), columnNumber = 5 }) {

  const { t } = useTranslation();

  return (
    <tr className='w-full'>
      <th colSpan={columnNumber} className="py-s10">
        {t("No Data Found !")}
      </th>
    </tr>
  )
}


const TakeItem = ({ takeArray = [10, 25, 50, 100], currentTakeAmount, takeOptionOnChange = () => { } }) => {
  const { t } = useTranslation();
  return (
    <div className='flex items-end'>
      <div className='pr-s10'>{t("Show")}</div>
      <select
        value={currentTakeAmount}
        onChange={(e) => {
          takeOptionOnChange(e.target.value);
        }}
        className='pl-2 pr-1 h-[22px] rounded-br4 select-style bg-white border border-cTextGray'
      >
        {
          takeArray?.map((item, index) =>
            <option
              key={index}
              className='py-s10 text-cMainBlack'
              value={item}
            >{item}</option>
          )
        }

      </select>
      {/* <div className='pl-s10'>Entries</div> */}

    </div>
  )
}